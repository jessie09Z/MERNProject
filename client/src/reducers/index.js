import { combineReducers } from "@reduxjs/toolkit";
import alert from "./alert"
import authReducer from "./auth";
import profile from "./profile"



export default combineReducers({
alert,
auth:authReducer,
profile
});
