import React from 'react'

type PostDetailProps = {
  post: {
    id: number,
    content: string,
    created_by: string,
  }
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <div className="w-[700px] h-[250px]">
      <div className=" w-[704px] h-[250px] top-0 left-0">
        <div className="relative h-[254px] top-[-2px] left-[-2px] bg-[#27292d] rounded-[8px] border-2 border-solid border-[#35373b]">
          <img
            className="absolute w-[20px] h-[20px] top-[36px] left-[660px]"
            alt="Dots horizontal"
            src="dots-horizontal.svg"
          />
          <div className="absolute w-[20px] h-[20px] top-[207px] left-[22px]">
            <img className="absolute w-[20px] h-[17px] top-[3px] left-0" alt="Shape" src="shape.svg" />
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
              5mins ago
            </div>
            <img className="absolute w-[44px] h-[44px] top-0 left-0 object-cover" alt="Ellipse" src="default_profile_pic.png" />
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