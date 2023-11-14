import axiosInstance from "./axiosInstance";

export const fetchPosts = async (myPost:boolean = false) => {
  let endpoint = 'posts/';
  const params: any = {};

  params.my_post = myPost;
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (data: any) => {
  try {
    const response = await axiosInstance.post('posts/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
