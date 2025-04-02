import axios from "axios";
import { setAlert } from "./alert";
import { CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE , GET_PROFILES,GET_REPOS,NO_REPOS} from "./types";
import setAuthToken from "../utils/setAuthToken";

//get curren users profile
export const getCurrentProfile =()=> async dispatch =>{
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token); // Debugging log
    

    // If a token exists, set it in the Authorization header
    if (token) {
        setAuthToken(token);
    } else {
        // If there is no token, clear the Authorization header
        setAuthToken(null);
    }

      // Logging the headers before making the request
      console.log("Request Headers:", axios.defaults.headers);
    try {
        const res = await axios.get("/api/profile/me", {
            baseURL: 'http://localhost:5000'  // 确保请求发往正确的端口
        });
        console.log(res,"profile res data")
        dispatch({
            type: GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status}
           
        })
    }

};




// create or update profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Profile updated" : "Profile created", "success"));

        if (!edit) {
            navigate('/dashboard'); // 这里改成 useNavigate
        }
    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }
};

//add experience
export const addExperience=(formData, navigate, )=> async dispatch=>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/experience', formData, config);
        console.log(res, "added experience");

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Experience added", "success"));

        setTimeout(() => navigate("/dashboard"), 1000);
        
    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }
}

//Add education


export const addEducation=(formData, navigate )=> async dispatch=>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/education', formData, config);
        console.log(res, "education debugging");

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education added", "success"));

        setTimeout(() => navigate("/dashboard"), 1000);
        
    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }
}

//delete Experience
export const deleteExperience =(id)=> async dispatch=>{

    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        console.log(res, "delete experience")
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert( "Experience deleted", "success"));

        
    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }
}

//delete Education
export const deleteEducation =(id)=> async dispatch=>{

    try {
        const res =await axios.delete(`/api/profile/education/${id}`);
        console.log(res, "delete education")
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert( "Education deleted", "success"));

        
    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }
}

//delete  account and clear profile

export const deleteAccount =()=> async dispatch=>{

    if(window.confirm("Are you sure you want to delete your account?")){try {
        const res =await axios.delete(`/api/profile`);
        console.log(res, "delete Account")
        dispatch({
            type:DELETE_ACCOUNT,
            
        });
        dispatch(setAlert( "Your account deleted, unable to restore"));

        
    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }}
}

// get Profiles
export const getProfiles=()=> async dispatch=>{
    dispatch({type:CLEAR_PROFILE});
    try {
        const res = await axios.get("/api/profile");
        console.log(res, "delete Account")
        dispatch({
            type:GET_PROFILES,
            payload:res.data
            
        });
        dispatch(setAlert( "All profiles are loaded","success"));


    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }
    }

    // get Profile by id
export const getProfileById=(user_id)=> async dispatch=>{
   
    try {
        const res = await axios.get(`/api/profile/user/${user_id}`);
        console.log(res, "get profile by ID")
        dispatch({
            type:GET_PROFILE,
            payload:res.data
            
        });
        dispatch(setAlert( "All profiles are loaded","success"));


    } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response?.statusText || "Server Error",
                status: error.response?.status || 500
            }
        });
    }
    }


    export const getGithubRepos = (username) => async (dispatch) => {
        try {
          const res = await axios.get(`/api/profile/github/${username}`);
      
          dispatch({
            type: GET_REPOS,
            payload: res.data
          });
        } catch (err) {
          dispatch({
            type: NO_REPOS
          });
        }
      };