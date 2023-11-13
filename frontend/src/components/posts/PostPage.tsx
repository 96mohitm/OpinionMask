import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import { fetchPosts } from '../../api/posts';

type Post = {
  id: number,
  content: string,
  created_by: string,
  created_at: string,
  updated_at: string,
};


const PostPage = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  
  async function fetchData() {
    try {
      const data = await fetchPosts();
      setFilteredPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
<div className="bg-primary text-white min-h-screen flex items-center justify-center">
  <div className="flex flex-col md:w-[700px] gap-10">
    {/* Content goes here */}
    <div className="text-left mb-4">
      <div className="font-medium text-[28px] tracking-[0] leading-[normal]">
        Hello Jane
      </div>
    </div>
    <div className="text-left mb-4">
      <p className="font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[24px]">
        How are you doing today? Would you like to share something with the community 🤗
      </p>
    </div>
    <CreatePostForm fetchData={fetchData} />
    <PostList filteredPosts={filteredPosts} />
  </div>
</div>

  );
};

export default PostPage;
