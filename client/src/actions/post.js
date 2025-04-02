import axios from "axios";
import { ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, SET_ALERT, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT } from "./types";
import {setAlert} from "./alert"
// getPosts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    console.log(res, "posts from backend");
    
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
  }
};

// getLikes
export const addLikes = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${post_id}`);
    console.log(res, "likes from backend");
    
    dispatch({
      type: UPDATE_LIKES,
      payload: {likes:res.data, post_id},
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
  }
};

// unLike
export const removeLikes = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${post_id}`);
    console.log(res, "likes from backend");
    
    dispatch({
      type: UPDATE_LIKES,
      payload: {likes:res.data, post_id},
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
  }
};

//delete post
export const deletePost =(post_id)=> async(dispatch)=>{
  try {
    const res = await axios.delete(`/api/posts/${post_id}`);
    console.log(res, "delete post");
    dispatch({ type: DELETE_POST, payload: post_id });
    dispatch(setAlert("Post removed", "success"));
    
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
    
  }
}
//add post
export const addPost =(formData)=>async(dispatch)=>{
  try {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };
    const res = await axios.post("/api/posts", formData, config);
    console.log(res, "create post");
    dispatch({
      type:ADD_POST,
      payload:res.data
    })
    dispatch(setAlert("Post created", "success"));
  } catch (error) {
    
    
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
  }
}

//get post
export const getPost =(post_id)=> async(dispatch)=>{
  try {
    const res = await axios.get(`/api/posts/${post_id}`);
    console.log(res, "get new post");
    dispatch({ type: GET_POST, payload: res.data });
    dispatch(setAlert("get new post", "success"));
    
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
    
  }
}

//add COMMENT
export const addComment =(post_id,formData)=>async(dispatch)=>{
  try {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };
    const res = await axios.post(`/api/posts/comments/${post_id}`, formData, config);
    console.log(res, "create comment for post");
    dispatch({
      type:ADD_COMMENT,
      payload:res.data
    })
    dispatch(setAlert("Comment created", "success"));
  } catch (error) {
    
    
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
  }
}

//delete COMMENT
export const deleteComment =(post_id, comment_id)=>async(dispatch)=>{
  try {
   
    const res = await axios.delete(`/api/posts/comments/${post_id}/${comment_id}`);
    console.log(res, "delete comment");
    dispatch({
      type:REMOVE_COMMENT,
      payload:comment_id
    })
    dispatch(setAlert("Comment DELETED", "success"));
  } catch (error) {
    
    
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response?.statusText || "Server Error",
        status: error.response?.status || 500,
      },
    });
  }
}