import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as rute from '../api/ruteApi'
import * as apiCalls from '../APICalls'

import useStudItems from '../hooks/useStudItems'
import useLSItem from "../hooks/useLocalStorageItem";


import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Image } from 'primereact/image';
import ase_icon_main_page from '../media/ase-icon-main-page.jpg'


function Student() {

    const navigate = useNavigate();
    const [listaInfoStudent, setlistaInfoStudent] = useState([])
    const [x, setX] = useState(0)
    
    const studItems = useStudItems()
    let LSItem = useLSItem();

    async function getInfoStudent() {
        try {
            let result = await apiCalls.GET.getDatePersonale(rute.getUserById_URL,LSItem.id_student, listaInfoStudent)
            if (result) {
                setlistaInfoStudent(result)
                setX(1)
            } else {
                await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
                navigate("/")
            }
          

        }
        catch(err) {
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
        }
    }


    useEffect( () => {
        getInfoStudent();
    },[])

    return(
        <div>
           <Menubar model={studItems}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
          
          
            <h1>Academia de Studii Economice Bucuresti</h1>
           
            <h1>Pagina personala a studentului: {LSItem.nume} {LSItem.prenume} </h1>
        
            <br></br>
            <div>
            { console.log(listaInfoStudent)}
             <div className="card">
                <DataTable value={listaInfoStudent} header="Date personale" size="small" showGridlines responsiveLayout="scroll">
                    <Column field="Nume" header="Nume"></Column>
                    <Column field="Prenume" header="Prenume"></Column>
                    <Column field="Adresa_email" header="Adresa email"></Column>
                    <Column field="Telefon" header="Telefon"></Column>
                </DataTable>
            </div>

            <br></br>
            <br></br>

            <div className="card">
                <DataTable value={listaInfoStudent} header="Date scolarizare" size="small" showGridlines responsiveLayout="scroll">
                    <Column field="Rol_student.Facultate" header="Facultate"></Column>
                    <Column field="Rol_student.Program_studiu" header="Program studiu"></Column>
                    <Column field="Rol_student.An_studiu" header="An studiu"></Column>
                    <Column field="Rol_student.Medie_cazare" header="Medie cazare"></Column>
                    <Column field="Rol_student.Camin" header="Camin"></Column>
                    <Column field="Rol_student.Camera" header="Camera"></Column>
                </DataTable>
        </div> 
        </div>
     

        <br></br>
        <br></br>
                
        </div>
    )

}

export default Student