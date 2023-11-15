import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import { fetchPosts } from '../../api/posts';
import { useAuth } from '../../Auth';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../api/auth';

type Post = {
  id: number,
  content: string,
  created_by: string,
  created_at: string,
  updated_at: string,
};

const PostPage = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [myPost, setMyPost] = useState<boolean>(false);
  const [anonFilter, setAnonFilter] = useState("ALL");
  const { isAuthenticated } = useAuth();
  const [username, setUsename] = useState<string>("");
  const navigate = useNavigate();

  async function fetchData(myPost: boolean = false) {
    try {
      const data = await fetchPosts(myPost);
      setFilteredPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchData();
    async function fetchUserDetails() {
      try {
        const response = await fetchUserProfile();  
        if (response.username) {
          setUsename(response.username);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
    fetchUserDetails();
  }, []);

  useEffect(() => {
    fetchPosts(myPost, anonFilter)
      .then(data => {
        setFilteredPosts(data);
      })
      .catch(error => {
        console.error("Error while fetching data");
      })
  }, [myPost, anonFilter])

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMyPost(event.target.value === 'my');
  };

  const handleAnonFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAnonFilter(event.target.value);
  };

  return (
    <div className="bg-primary text-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:w-[700px] gap-10">
        {/* Content goes here */}
        <div>
          <div className="text-left mb-4">
            <div className="font-medium text-[28px] tracking-[0] leading-[normal]">
              Hello {username}
            </div>
          </div>
          <div className="text-left mb-4">
            <p className="font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[24px]">
              How are you doing today? Would you like to share something with the community 🤗
            </p>
          </div>
        </div>
        <CreatePostForm fetchData={fetchData} />
        <div className="mb-4">
          <div className='flex justify-between'>
            <select
              className="mt-1 block w-32 py-2 px-2 border border-black bg-[#27292d] text-[#7f8084] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              value={myPost ? 'my' : 'all'}
              onChange={handleFilterChange}
            >
              <option value="my">My Posts</option>
              <option value="all">My feed</option>
            </select>

            <select
              className="mt-1 block w-48 py-2 px-2 border border-black bg-[#27292d] text-[#7f8084] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              value={anonFilter}
              onChange={handleAnonFilterChange}
            >
              <option value="ALL">All Posts</option>
              <option value="NON_ANON">Non Anonymous Post</option>
              <option value="ANON">Anonymous Posts</option>
            </select>
          </div>
        </div>
        <PostList filteredPosts={filteredPosts} />
      </div>
    </div>
  );
};

export default PostPage;
