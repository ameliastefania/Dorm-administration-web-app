
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLSItem from "../hooks/useLocalStorageItem";

const RequireAuth = ( {allowedRoles }) => {

    const localStorageItem = useLSItem()
    let accessToken = null;
    let rol = null; 
    
    if (localStorageItem) {
         accessToken = localStorageItem.accessToken
         rol = localStorageItem.rol
    } 
    const location = useLocation();

    return (
         accessToken ? 
            rol === allowedRoles ? <Outlet /> 
            :  <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/" state={{ from: location }} replace />  
    );
}
export default RequireAuth;
 