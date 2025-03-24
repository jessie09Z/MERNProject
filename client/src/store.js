import { configureStore } from '@reduxjs/toolkit';  // 引入 Redux Toolkit
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';  // 引入你的根 reducer

const store = configureStore({
  reducer: rootReducer,  // 设置 reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),  // 添加中间件
  devTools: process.env.NODE_ENV !== 'production',  // 启用 Redux DevTools 调试（只在开发模式下）
});

export default store;
