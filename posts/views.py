from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from posts.error_util import format_errors
from .serializers import PostSerializer
from .services import PostService

class PostListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order_by = request.GET.get("ordering", "-created_at")
        posts = PostService.get_filtered_posts(request.user, order_by)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['created_by'] = request.user.id
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        error_message = format_errors(serializer.errors)
        return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

class PostDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        try:
            post = PostService.get_post_details(post_id, request.user)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, post_id):
        try:
            PostService.delete_post(post_id, request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_404_NOT_FOUND)
