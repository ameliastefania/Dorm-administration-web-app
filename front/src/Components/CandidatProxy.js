import { useLocation, Navigate, Outlet } from "react-router-dom";



const CandidatProxy = () => {
    
    var localStorageItem = JSON.parse(localStorage.getItem("login"))
    const location = useLocation();

    return (
        localStorageItem.esteCandidat 
            ? <Navigate to="/already-candidate" state={{ from: location }} replace />
            : <Outlet />
               
    );
}

export default CandidatProxy;