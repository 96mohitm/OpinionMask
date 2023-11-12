from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):

  content = models.TextField(blank=True, null=True)
  is_anon = models.BooleanField(default=False)
  # Timestamps for record-keeping
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  # To trace which user created a post
  created_by = models.ForeignKey(User, related_name='created_posts', on_delete=models.CASCADE)

  def __str__(self):
    return self.content
