import {useNavigate} from "react-router-dom";

import * as rute from '../api/ruteApi'
import * as apiCalls from '../APICalls'

const useItems  = () => {

   const navigate = useNavigate();

   const items = [
    {
        label:'Home',
        icon:'pi pi-fw pi-home',
        command: () => {
            navigate("/admin_camin-main-page")
        }
       
     },
     {
        label:'Vizualizare studenti',
        icon:'pi pi-users',
        command: () => {
            navigate("/admin_camin-vizualizare-studenti")
        }
       
     },
     {
        label:'Vizualizare cereri studenti',
        icon:'pi pi-envelope',
        command: () => {
            navigate("/admin_camin-vizualizare-cereri-studenti")
        }
       
     },
     {
        label:'Evidenta voturi',
        icon:'pi pi-chart-bar',
        command: () => {
            navigate("/admin_camin-evidenta-voturi")
        }
       
     },
     ,
     {
        label:'Statistici generale',
        icon:'pi pi-chart-pie',
        command: () => {
            navigate("/admin_camin-statistici-generale")
        }
       
     },
    {
       label:'Deconectare',
       icon:'pi pi-fw pi-power-off',
       command: async () => {               
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
       }
    }
   ];

   return items;

}

 export default useItems;