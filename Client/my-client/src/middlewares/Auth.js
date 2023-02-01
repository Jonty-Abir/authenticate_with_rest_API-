import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AuthorizeUser({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to={"/"} replace={true}></Navigate>;
  return children;
}

export function ProtectRoute({ children }) {
  const state = useSelector((state) => state.userDetailsSclice.userName);
  if (!state) return <Navigate to={"/"} replace={true}></Navigate>;
  return children;
}
