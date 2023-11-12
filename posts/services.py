# services.py
from .models import Post

class PostService:
  @staticmethod
  def get_filtered_posts(user, order_by='-created_at'):
    return Post.objects.filter(created_by=user).order_by(order_by)

  @staticmethod
  def create_post(data, user):
    return Post.objects.create(created_by=user, **data)

  @staticmethod
  def get_post_by_id(post_id, user):
      try:
          return Post.objects.get(id=post_id, created_by=user)
      except Post.DoesNotExist:
          return None

  @staticmethod
  def get_post_details(post_id, user):
      post = PostService.get_post_by_id(post_id, user)
      if post:
          return post
      else:
          raise ValueError("Post not found")

  @staticmethod
  def delete_post(post_id, user):
      post = PostService.get_post_by_id(post_id, user)
      if post:
          post.delete()
      else:
          raise ValueError("Post not found")
