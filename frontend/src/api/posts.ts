import axiosInstance from "./axiosInstance";

export const fetchPosts = async () => {
  let endpoint = 'posts/';
  const params: any = {};

  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
