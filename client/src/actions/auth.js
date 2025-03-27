import axios from "axios";
import { REGISTER_FAIL , REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,LOGIN_FAIL, LOGIN_OUT, CLEAR_PROFILE} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


//Load User
export const loadUser = ()=> async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
        
    }
}



//Register

export const register =({name, email, password})=> async dispatch=>{
 const config ={
    headers: {"Content-Type":"application/json"}
 }
 const body = JSON.stringify({name, email, password});
 try {
    const res = await axios.post("/api/users", body, config);
    console.log("REGISTER_SUCCESS action dispatched with payload:", res.data);  // 添加调试信息
    dispatch({
        type:REGISTER_SUCCESS,
        payload: res.data,

    });
    dispatch(loadUser());
 } catch (err) {
    const errors= err.response.data.errors;
    if(errors){
        errors.forEach(error=> {
            dispatch(setAlert(error.msg, "danger"));

        });
    }

    dispatch({
        type: REGISTER_FAIL
    })
 }
}


//Login User

export const login =({email, password})=> async dispatch=>{
    console.log("Login action triggered");  
    const config ={
       headers: {"Content-Type":"application/json"}
    }
    const body = JSON.stringify({ email, password});
    try {
       const res = await axios.post("/api/auth", body, config);
       console.log("Login_Success action dispatched with payload:", res.data);  // 添加调试信息
       dispatch({
           type:LOGIN_SUCCESS,
           payload: res.data,
   
       });
       dispatch(loadUser());
    } catch (err) {
       const errors= err.response.data.errors;
       if(errors){
           errors.forEach(error=> {
               dispatch(setAlert(error.msg, "danger"));
   
           });
       }
   
       dispatch({
           type: LOGIN_FAIL
       })
    }
   }
   
   //LOGOUT
 

export const logout = () => dispatch => {
    // ✅ 清除 localStorage 中的 token
    localStorage.removeItem("token");
    
    // ✅ 清除默认请求头中的 token
    setAuthToken(null);

    dispatch({
        type: CLEAR_PROFILE
    });
    // ✅ 触发 Redux action，更新状态
    dispatch({
        type: LOGIN_OUT
    });
   
};
