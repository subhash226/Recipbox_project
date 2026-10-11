import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
const AuthContext=createContext(null);
export function AuthProvider({children}) {const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("recipebox-auth-user"))}catch{return null}});const [loading,setLoading]=useState(Boolean(localStorage.getItem("recipebox-token")));
 useEffect(()=>{if(!localStorage.getItem("recipebox-token")){setLoading(false);return}api("/auth/me",{auth:true}).then(d=>{setUser(d.user);localStorage.setItem("recipebox-auth-user",JSON.stringify(d.user))}).catch(()=>{localStorage.removeItem("recipebox-token");localStorage.removeItem("recipebox-auth-user");setUser(null)}).finally(()=>setLoading(false))},[]);
 const login=async(credentials)=>{const d=await api("/auth/login",{method:"POST",body:credentials});localStorage.setItem("recipebox-token",d.token);localStorage.setItem("recipebox-auth-user",JSON.stringify(d.user));localStorage.setItem("recipebox-user",d.user.name);setUser(d.user);return d.user};
 const register=async(credentials)=>{const d=await api("/auth/register",{method:"POST",body:credentials});localStorage.setItem("recipebox-token",d.token);localStorage.setItem("recipebox-auth-user",JSON.stringify(d.user));localStorage.setItem("recipebox-user",d.user.name);setUser(d.user);return d.user};
 const logout=()=>{localStorage.removeItem("recipebox-token");localStorage.removeItem("recipebox-auth-user");localStorage.removeItem("recipebox-user");setUser(null)};
 const value=useMemo(()=>({user,loading,login,register,logout}),[user,loading]);return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
