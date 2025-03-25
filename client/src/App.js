import React, {useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

//Redux
import { Provider } from 'react-redux';  // 用于提供 Redux store 给 React 组件
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken
 from "./utils/setAuthToken";
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(()=>{
    if(localStorage.token) {
      setAuthToken(localStorage.token);  // 这里依旧调用
  } else {
      // 如果没有 token，可以确保清除 token 设置
      setAuthToken(null);  // 清除 token 设置
  }
  store.dispatch(loadUser());
  },[])
  return (
    <Provider store={store}> {/* 将 store 传递给 Provider */}
      <Router>
        <>
          <Navbar />
          <h1>Hello testing result</h1>
          <section className="container">
            <Alert/>
            <Routes>
              {/* Use element prop for Route */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
           
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
