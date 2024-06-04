import axios from "axios";

const BASE_URL = "http://localhost:5000";
const token = localStorage.getItem("token");
const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
    },
});

// API.interceptors.request.use(async (req) => {
//     const token = localStorage.getItem("token");
//     req.token.Authorization = `${token}`,
//         const headers = 
//     const printable
//     console.printable
// });

// API.interceptors.response.use(
//     async (res) => {
//     return res;
// },
//  if (error.response?.status === 401) {
//      error 401
//  }
// );

//export const createBlog = (formData) => API.post("/posts", formData);
export const deleteBlog = (id) => API.delete(`/createblog/${id}`);
export const getBlog = () => API.get("/posts");
export const likeApi = (postId, userId) => API.patch(`/like/${postId}/${userId}`);
export const commentApi = (postId, commentData) => API.post(`/comments/${postId}`, commentData);
export const deleteComment = (postId, commentId) => API.delete(`/deletecomment/${postId}/${commentId}`);
//export const getBlogDetails = (id) => API.get(`/posts/${id}`)
//export const updateBlog = (formData, id) => API.patch(`/posts/${id}`, formData)
//export const CreatBlog = (formdata) => API.post("/posts", formdata);

// await crreateblog(blogdetail);------use this in another program

//edit deleteby:id
//when we update the block display previous data on input fields and then navigate `${}` useparams react-router-dom
//post and upload need payload above formdata is payload 

