import React from 'react'

const CreatePostForm = () => {
  return (
    <div className="w-[700px] h-[223px]">
      <div className="w-[702px] h-[223px] top-0 left-0">
        <div className="relative w-[704px] h-[227px] top-[-2px] left-[-2px] bg-[#27292d] rounded-[8px] border-2 border-solid border-[#35373b]">
          <div className="absolute top-[24px] left-[20px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#c5c7ca] text-[18px] tracking-[0] leading-[normal]">
            Create post
          </div>
          <div className="absolute w-[662px] h-[78px] top-[62px] left-[20px]">
            <div className="relative w-[660px] h-[78px] bg-[#191920] rounded-[8px]">
              <p className="absolute top-[31px] left-[80px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[16px] whitespace-nowrap">
                How are you feeling today?
              </p>
              <div className="absolute w-[50px] h-[48px] top-[15px] left-[16px]">
                <div className="relative w-[48px] h-[48px] bg-[#27292d] rounded-[24px]">
                  <div className="absolute top-[15px] left-[15px] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[18px] tracking-[0] leading-[normal] whitespace-nowrap">
                    💬
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[113px] h-[43px] top-[156px] left-[569px]">
            <div className="relative w-[111px] h-[43px] bg-[#4a96ff] rounded-[4px]">
              <div className="absolute top-[12px] left-[38px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;
