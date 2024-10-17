/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const ProtectedRouteForVendor = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user?.role === "vendor") {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}