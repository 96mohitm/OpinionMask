from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ['id', 'content', 'created_at', 'updated_at', 'created_by', 'is_anon']

  def create(self, validated_data):
    user = self.context['request'].user
    validated_data['created_by'] = user
    return super(PostSerializer, self).create(validated_data)
