from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from posts.constants import ANON_FILTER_OPTIONS
from posts.models import Post
from .services import PostService
from .views import PostListView, PostDetailView
from rest_framework.test import APIRequestFactory, force_authenticate


class PostServiceTests(TestCase):
  def setUp(self):
    self.user = User.objects.create_user(username='testuser', password='testpassword')

  def test_get_filtered_posts(self):
    # Test for get_filtered_posts method in PostService
    post1 = Post.objects.create(content='Post 1', created_by=self.user, is_anon=False)
    post2 = Post.objects.create(content='Post 2', created_by=self.user, is_anon=True)

    result_all = PostService.get_filtered_posts(self.user)
    result_anon = PostService.get_filtered_posts(self.user, anon_filter='ANON')
    result_non_anon = PostService.get_filtered_posts(self.user, anon_filter='NON_ANON')

    self.assertEqual(len(result_all), 2)
    self.assertEqual(len(result_anon), 1)
    self.assertEqual(len(result_non_anon), 1)

  def test_format_post_data(self):
    # Test for format_post_data method in PostService
    post = Post.objects.create(content='Test Post', created_by=self.user, is_anon=False)
    serialized_data = PostService.format_post_data([post])

    self.assertEqual(serialized_data[0]['content'], 'Test Post')
    self.assertEqual(serialized_data[0]['created_by'], 'testuser')
  
  def test_get_filtered_posts_all(self):
    # Test getting all posts
    Post.objects.create(content='Post 1', created_by=self.user, is_anon=False)
    Post.objects.create(content='Post 2', created_by=self.user, is_anon=True)
    posts = PostService.get_filtered_posts(self.user)
    self.assertEqual(posts.count(), 2)

  def test_get_filtered_posts_anon(self):
    # Test getting anonymous posts
    Post.objects.create(content='Post 1', created_by=self.user, is_anon=False)
    Post.objects.create(content='Post 2', created_by=self.user, is_anon=True)
    posts = PostService.get_filtered_posts(self.user, anon_filter=ANON_FILTER_OPTIONS['ANON'])
    self.assertEqual(posts.count(), 1)

  def test_get_filtered_posts_non_anon(self):
    # Test getting non-anonymous posts
    Post.objects.create(content='Post 1', created_by=self.user, is_anon=False)
    Post.objects.create(content='Post 2', created_by=self.user, is_anon=True)
    posts = PostService.get_filtered_posts(self.user, anon_filter=ANON_FILTER_OPTIONS['NON_ANON'])
    self.assertEqual(posts.count(), 1)

  def test_format_post_data(self):
    # Test formatting post data
    post = Post.objects.create(content='Test Post', created_by=self.user, is_anon=False)
    formatted_data = PostService.format_post_data([post])
    self.assertEqual(len(formatted_data), 1)
    self.assertEqual(formatted_data[0]['id'], post.id)
    self.assertEqual(formatted_data[0]['content'], post.content)

class PostViewTests(TestCase):
  def setUp(self):
    self.user = User.objects.create_user(username='testuser', password='testpassword')
    self.factory = RequestFactory()

  def test_post_list_view(self):
    request = self.factory.get('/posts/')
    force_authenticate(request, user=self.user)  # Authenticate the request
    view = PostListView.as_view()
    response = view(request)
    self.assertEqual(response.status_code, 200)

  def test_post_detail_view(self):
    post = Post.objects.create(content='Test Post', created_by=self.user, is_anon=False)
    request = self.factory.get(f'/posts/{post.id}/')
    force_authenticate(request, user=self.user)  # Authenticate the request
    view = PostDetailView.as_view()
    response = view(request, post_id=post.id)
    self.assertEqual(response.status_code, 200)
