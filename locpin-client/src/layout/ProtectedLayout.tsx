import {Link, Navigate, Outlet, useOutlet} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import 'bulma/css/bulma.min.css'
import React, {useState} from "react";

export const ProtectedLayout = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  // @ts-ignore
  const {user, logout } = useAuth();
  const outlet = useOutlet();
  console.log("protectedLayout", user)
  if (!user) {
    return <Navigate to="/" />;
  }

  return(
   <div>
     <nav className="navbar" role="navigation" aria-label="main navigation">
       <div className="navbar-brand">
         <a className="navbar-item" href="https://bulma.io">
           <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
         </a>

         <a
           onClick={() => {
             setIsActive(!isActive)
           }}
           role='button'
           className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
           aria-label='menu'
           aria-expanded='false'
           data-target='navbarBasicExample'
         >
           <span aria-hidden="true"></span>
           <span aria-hidden="true"></span>
           <span aria-hidden="true"></span>
         </a>
       </div>

       <div id='navbarBasicExample' className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
       <div className="navbar-start">
           <Link to="/dashboard" className="navbar-item">
             Home
           </Link>

           <div className="navbar-item has-dropdown is-hoverable">
             <a className="navbar-link">
               More
             </a>

             <div className="navbar-dropdown">
               <a className="navbar-item">
                 About
               </a>
               <a className="navbar-item">
                 Jobs
               </a>
               <a className="navbar-item">
                 Contact
               </a>
               <hr className="navbar-divider"/>
                 <a className="navbar-item">
                   Report an issue
                 </a>

             </div>
           </div>
         </div>
         <div className="navbar-end">
           <div className="navbar-item">
             <div className="buttons">
               <a className="button is-primary">
                 <strong>Sign up</strong>
               </a>
               <Link to="profile" className="button is-light">Profile</Link>
               <Link to="map" className="button is-light">Map</Link>
               {user && <button className="button is-light" onClick={logout}>logout</button>}
             </div>
           </div>
         </div>
       </div>
     </nav>
   <Outlet />
   </div>
  )
}