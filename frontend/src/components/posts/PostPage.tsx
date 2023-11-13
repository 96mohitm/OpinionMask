import React from 'react';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';

const PostPage = () => {

  return (
    <div className="bg-primary text-white">
      <div className=''>
        {/* Header */}
        <div className="w-[140px] h-[34px]">
          <div className="top-0 left-0 [font-family:'Inter-Medium',Helvetica] font-medium text-[#c5c7ca] text-[28px] tracking-[0] leading-[normal]">
            Hello Jane
          </div>
        </div>
        <div className="w-[580px] h-[48px]">
          <p className="w-[580px] top-0 left-0 [font-family:'Inter-Regular',Helvetica] font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[24px]">
            How are you doing today? Would you like to share something with the community 🤗
          </p>
        </div>

        <CreatePostForm />
        <PostList />
      </div>
    </div>
  )
}

export default PostPage;