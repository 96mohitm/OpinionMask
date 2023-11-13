import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/posts';
import PostDetail from './PostDetail';

type Post = {
  id: number,
  content: string,
  created_by: string,
  created_at: string,
  updated_at: string,
}

type PostListProps = {
  filteredPosts: Post[];
};

const PostList: React.FC<PostListProps> = ({ filteredPosts }) => {

  return (
    <>
      <>
      { filteredPosts && filteredPosts.map(post => (
          <PostDetail key={post.id} post={post} />
        ))
      }
      </>
    </>
  );
};

export default PostList;
