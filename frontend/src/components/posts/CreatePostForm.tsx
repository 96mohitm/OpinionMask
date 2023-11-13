import React, { useState } from 'react';
import { createPost } from '../../api/posts';
import { AxiosError } from 'axios';

interface APIErrorResponse {
  error: string;
}
type PostFormData = {
  content: string,
  isAnon: boolean,
}

const defaultState = { content: '', isAnon: false};

type CreatePostFormProps = {
  fetchData: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ fetchData }) => {
  const [formData, setFormData] = useState<PostFormData>(defaultState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createPost(formData);
      setFormData(defaultState);
      fetchData();
    } catch (error) {
      const axiosError = error as AxiosError<APIErrorResponse>;
      console.error(axiosError?.response?.data?.error || "Error processing task.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isContentEmptyOrSpaces = formData.content.trim() === '';

  return (
    <div className="w-[700px] h-[223px]">
      <div className="w-[702px] h-[223px] top-0 left-0">
        <div className="relative w-[704px] h-[227px] top-[-2px] left-[-2px] bg-[#27292d] rounded-[8px] border-2 border-solid border-[#35373b]">
          <div className="absolute top-[24px] left-[20px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#c5c7ca] text-[18px] tracking-[0] leading-[normal]">
            Create post
          </div>
          <form onSubmit={handleSubmit}>
            <div className="absolute w-[662px] h-[78px] top-[62px] left-[20px]">
              <div className="relative w-[660px] h-[78px] bg-[#191920] rounded-[8px]">
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="How are you feeling today?"
                  className="absolute top-[31px] left-[80px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[16px] whitespace-nowrap bg-[#191920] border-none outline-none resize-none w-[560px] h-[48px] overflow-hidden"
                ></textarea>
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
              <button
                className={`relative w-[111px] h-[43px] rounded-[4px] ${(isContentEmptyOrSpaces || isSubmitting) ? 'bg-gray-400' : 'bg-[#4a96ff]'
                  }`}
                type="submit"
                disabled={isContentEmptyOrSpaces || isSubmitting}
              >
                <div className="absolute top-[12px] left-[38px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                  Post
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;
