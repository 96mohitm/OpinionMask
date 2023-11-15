# services.py
from posts.constants import ANON_FILTER_OPTIONS
from .models import Post

class PostService:
  @staticmethod
  def get_filtered_posts(user, order_by='-created_at', my_post=False, anon_filter=ANON_FILTER_OPTIONS['ALL']):

    if anon_filter == ANON_FILTER_OPTIONS['ALL']:
      posts = Post.objects.all()
    elif anon_filter == ANON_FILTER_OPTIONS['ANON']:
      posts = Post.objects.filter(is_anon=True)
    elif anon_filter == ANON_FILTER_OPTIONS['NON_ANON']:
      posts = Post.objects.filter(is_anon=False)
    else:
      raise ValueError("Invalid value for is_anon parameter")

    if my_post:
      posts = posts.filter(created_by=user)

    return posts.order_by(order_by)
  
  @staticmethod
  def format_post_data(posts):
    serialized_data = []
    for post in posts:
        serialized_post = {
            'id': post.id,
            'content': post.content,
            'created_at': post.created_at,
            'updated_at': post.updated_at,
            'is_anon': post.is_anon,
        }
        if post.is_anon:
            serialized_post['created_by'] = 'Anonymous'
        else:
            serialized_post['created_by'] = post.created_by.username
        serialized_data.append(serialized_post)
    return serialized_data

  @staticmethod
  def create_post(data):
    return Post.objects.create(**data)

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
      # Check if the user trying to delete the post is the owner
      if post.created_by == user:
        post.delete()
      else:
        raise ValueError("You don't have permission to delete this post")
    else:
      raise ValueError("Post not found")
