import React, {useEffect, useState} from "react";
import * as rute from '../../api/ruteApi'
import * as apiCalls from '../../APICalls'
import useItems from '../../hooks/useItems.js'
import useLSItem from "../../hooks/useLocalStorageItem";

import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import ase_icon_main_page from '../../media/ase-icon-main-page.jpg'
import { useNavigate } from "react-router-dom";

function VizualizareStudenti() {

    const items = useItems()
    const LSItem = useLSItem()
    const navigate = useNavigate()
    const [listaStudenti, setListaStudenti] = useState(null)
    var localStorageItem = JSON.parse(localStorage.getItem("login"))
    const [x, setX] = useState(0)

    async function getListaStudenti() {
        try {
            let result = await apiCalls.AdminGET.getStudenti(rute.getStudenti,LSItem.id_admin_camin)
            if (result) {
                setListaStudenti(result)
                setX(1)
            } else {
                await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
                navigate("/")
            }
          

        }
        catch(err) {
            console.log(err)
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
        }
    }


    useEffect( () => {
        getListaStudenti();
    },[])

    return(
        <>
         <Menubar model={items}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
          
          
            <h1>Academia de Studii Economice Bucuresti</h1>
            <h1>Pagina personala a administratorului: {localStorageItem.nume} {localStorageItem.prenume} </h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <div className="card">
                    <DataTable value={listaStudenti} header="Studenti" size="small" showGridlines responsiveLayout="scroll">
                        <Column field="Nume" header="Nume" sortable ></Column>
                        <Column field="Prenume" header="Prenume"></Column>
                        <Column field="Adresa_email" header="Adresa email"></Column>
                        <Column field="Telefon" header="Telefon"></Column>
                        <Column field="Rol_student.Facultate" header="Facultate" sortable></Column>
                        <Column field="Rol_student.Program_studiu" header="Program_studiu"></Column>
                        <Column field="Rol_student.An_studiu" header="An_studiu" sortable></Column>
                        <Column field="Rol_student.Medie_cazare" header="Medie_cazare" sortable></Column>
                        <Column field="Rol_student.Camin" header="Camin"></Column>
                        <Column field="Rol_student.Camera" header="Camera" sortable></Column>
                    </DataTable>
                </div>

            <br></br>
            <br></br>

            </div>
     
        <br></br>
        <br></br>


        </>
    )

}
export default VizualizareStudenti