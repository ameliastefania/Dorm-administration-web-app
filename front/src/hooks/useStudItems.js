import {useNavigate} from "react-router-dom";

import * as rute from '../api/ruteApi'
import * as apiCalls from '../APICalls'

const useStudItems  = () => {

   const navigate = useNavigate();

   const items = [
    {
        label:'Home',
        icon:'pi pi-fw pi-home',
        command: () => {
            navigate("/student-main-page")
        }
       
     },
    {
       label:'Cereri doleante',
       icon:'pi pi-fw pi-book',
       items:[
          {
             label:'Adauga',  
             icon:'pi pi-fw pi-plus',
             command:() => {
                navigate("/student-cereri-page")
             }
             
          },
          {
             label:'Modifica',
             icon:'pi pi-fw pi-pencil',
             command: (event) => {
                 navigate("/student-vizualizare-cereri")
                
            }
          }, 
       ]
    },
    {
       label:'Voteaza sef camin',
       icon:'pi pi-fw pi-calendar',
       command: () => {
            navigate("/student-voteaza")
       }          
    },
    {
       label:'Candideaza rol sef camin',
       icon:'pi pi-fw pi-user',
       command: () => {
            navigate("/student-candideaza")
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

 export default useStudItems;