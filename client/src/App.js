import React from "react";
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

function App() {
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
