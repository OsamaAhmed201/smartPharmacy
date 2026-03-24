import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./Components/Shere/AuthLayout/AuthLayout"
import Login from "./Components/Auth/Login/Login"
import Register from "./Components/Auth/Register/Register"
import { ToastContainer } from "react-toastify"
import Notfound from "./Components/Shere/Notfound/Notfound"
import ProtectedRouting from "./Components/Shere/ProtectedRouting/ProtectedRouting"
import MasterLayout from "./Components/Shere/MasterLayout/MasterLayout"
import Dashboard from "./Components/Dashboard/Dashboard"
import VerifyAcount from "./Components/Auth/VerifyAcount/VerifyAcount"
import Forget_PassWord from "./Components/Auth/Forget_PassWord/Forget_PassWord"
import ResetPassword from "./Components/Auth/Reset Password/ResetPassword"


function App() {

  let routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forget_pass', element: <Forget_PassWord /> },
        { path: 'verify', element: <VerifyAcount /> },
           { path: 'resetPassword', element: <ResetPassword /> },

      ]
      ,
      errorElement: <Notfound />
    },
    {
      path: '/dashboard',
      element: <ProtectedRouting><MasterLayout /></ProtectedRouting>,
      children: [
        { index: true, element: <Dashboard /> },
       
      

      ],
      errorElement: <Notfound />
    }

  ])

  return (
    <>
   
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer />
    
    </>
  )
}

export default App
