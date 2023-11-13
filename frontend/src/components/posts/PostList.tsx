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

const PostList = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPosts();
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
      {
        filteredPosts.map(post => (
          <PostDetail key={post.id} post={post} />
        ))
      }
      </div>
    </div>
  )
}

export default PostList;