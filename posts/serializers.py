from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  content = serializers.CharField(allow_blank=False, trim_whitespace=True)
  class Meta:
    model = Post
    fields = ['id', 'content', 'created_at', 'updated_at', 'created_by', 'is_anon']

  def create(self, validated_data):
    return super(PostSerializer, self).create(validated_data)
