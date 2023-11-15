from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from posts.error_util import format_errors
from .serializers import PostSerializer
from .services import PostService
from posts.constants import ANON_FILTER_OPTIONS

class PostListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order_by = request.GET.get("ordering", "-created_at")
        my_post = request.GET.get("my_post", "false").lower() == "true"
        anon_filter = request.GET.get("anon_filter", ANON_FILTER_OPTIONS['ALL'])
        posts = PostService.get_filtered_posts(request.user, order_by, my_post, anon_filter)
        serialized_data = PostService.format_post_data(posts)
        
        return Response(serialized_data)

    def post(self, request):
        request.data['created_by'] = request.user.id
        serializer = PostSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            PostService.create_post(serializer.validated_data)
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
