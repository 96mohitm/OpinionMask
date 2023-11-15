import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { BsThreeDots } from "react-icons/bs";
import { IoChatboxOutline } from "react-icons/io5";

type PostDetailProps = {
  post: {
    id: number,
    content: string,
    created_by: string,
    created_at: string,
  }
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  return (
    <div className="w-[700px] h-[250px]">
      <div className=" w-[704px] h-[250px] top-0 left-0">
        <div className="relative h-[254px] top-[-2px] left-[-2px] bg-[#27292d] rounded-[8px] border-2 border-solid border-[#35373b]">
          <BsThreeDots color='#C5C7CA' className='absolute w-[20px] h-[20px] top-[36px] left-[660px]'/>
          <div className="absolute w-[20px] h-[20px] top-[207px] left-[22px]">
            <IoChatboxOutline color='#C5C7CA' className="absolute w-[20px] h-[17px] top-[3px] left-0" />
          </div>
          <div className="absolute w-[660px] h-[107px] top-[90px] left-[22px] bg-[#191920] rounded-[8px]">
            <p className="absolute w-[551px] top-[16px] left-[80px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[24px]">
              {post.content}
            </p>
            <div className="absolute w-[50px] h-[48px] top-[15px] left-[16px]">
              <div className="relative w-[48px] h-[48px] bg-[#27292d] rounded-[24px]">
                <div className="absolute top-[15px] left-[15px] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[18px] tracking-[0] leading-[normal] whitespace-nowrap">
                  👋
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[175px] h-[44px] top-[24px] left-[20px]">
            <div className="absolute top-[2px] left-[60px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#c5c7ca] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
              {post.created_by}
            </div>
            <div className="absolute top-[25px] left-[60px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#7f8084] text-[14px] tracking-[0] leading-[normal]">
              {timeAgo}
            </div>
            <img className="absolute w-[44px] h-[44px] top-0 left-0 object-cover rounded-[44px]" alt="Ellipse" src="default_profile_pic.png" />
          </div>
          <div className="absolute top-[209px] left-[50px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#7f8084] text-[14px] tracking-[0] leading-[normal]">
            24 comments
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail