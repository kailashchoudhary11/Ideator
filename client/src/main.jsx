import ReactDOM from 'react-dom/client'
import React from 'react';
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App';
import Layout from "./components/Layout"
import Home, {loader as homePageLoader} from "./pages/Home"
import Login, {action as loginPageAction} from "./pages/Login"
import Register, {action as registerPageAction} from "./pages/Register"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    loader: {homePageLoader}
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>,
    loader: loginPageAction
  },
  {
    path: '/register',
    element: <Register/>,
    loader: registerPageAction
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
