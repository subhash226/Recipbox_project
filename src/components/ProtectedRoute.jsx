import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function ProtectedRoute({children}) {const {user,loading}=useAuth();const location=useLocation();if(loading)return <section className="page-section"><div className="empty-state">Checking your session…</div></section>;return user?children:<Navigate to="/login" replace state={{from:location.pathname}}/>;}
