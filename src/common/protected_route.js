import React from 'react'
import {  Route, Redirect } from 'react-router-dom';
import { withContext } from './context';

// PRIVATE ROUTE ACCESSIBLE TO USER AND ADMIN
const Private = ({loggedIn,user,permission,...props})=>   loggedIn  ? 
   ( permission === '*' || permission == null || permission.length < 1) ?  
  <Route {...props}/>  : 
  user.permissions.findIndex(item=>item == permission) > -1 ? <Route {...props}/> : <Redirect to="/forbidden"/>
  : <Redirect to="/login"/>;
export const PrivateRoute = withContext(Private);

// ADMIN ONLY ACCESS ROUTE
const  Admin = (props) => {
 return( props.loggedIn  ? 
    props.user.role === 'admin' && ( props.permission === '*' || props.permission == null || props.permission.length < 1) ?  
    <Route {...props}/>  : 
    props.user.permissions.findIndex(item=>item == props.permission) > -1 ? <Route {...props}/> : <Redirect to="/forbidden"/>
  : <Redirect to="/login"/>)
};
export const AdminPrivateRoute =  withContext(Admin);

// USER ONLY ACCESS ROUTE
const UserRoute = ({ user,loggedIn,permission,...props })=>
  loggedIn  ? 
    user.role === 'user' && ( permission === '*' || permission == null || permission.length < 1) ?  
      <Route {...props}/>  : 
      user.permissions.findIndex(item=>item == props.permission) > -1 ? <Route {...props}/> : <Redirect to="/forbidden"/>
  : <Redirect to="/login"/>;
export const UserPrivateRoute = withContext(UserRoute);

const LoginRoute = ({ loggedIn,...props })=> loggedIn ? <Redirect to="/dashboard" /> : <Route {...props}/>;
export const NotLoggedInRoute = withContext(LoginRoute);
