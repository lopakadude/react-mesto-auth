import { Route, Navigate } from "react-router-dom";

export default function ProtectedRoute({component: Component, ...props}){
  return(
      <Route>{
          () => props.isLoggedIn ? <Component {...props}/> : <Navigate to="/sign-in"/>
      }
      </Route>
  )
}