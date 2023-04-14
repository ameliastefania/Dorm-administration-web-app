import React, {useEffect, useState} from "react";
import * as rute from '../../api/ruteApi'
import * as apiCalls from '../../APICalls'

import useLSItem from "../../hooks/useLocalStorageItem";

import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import useItems from '../../hooks/useItems.js'


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import ase_icon_main_page from '../../media/ase-icon-main-page.jpg'
import { useNavigate } from "react-router-dom";


function Administrator() {
    const items = useItems()
    const LSItem = useLSItem()
  

    const [infoAdmin, setInfoAdmin] = useState([])
    const [x, setX] = useState(0)

    const navigate = useNavigate();

    async function getInfoAdmin() {
        try {
            let result = await apiCalls.GET.getDatePersonale(rute.getUserById_URL,LSItem.id_admin_camin, infoAdmin)
            if (result) {
                setInfoAdmin(result)
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
        getInfoAdmin();
    },[])

    return(
        <div>
           <Menubar model={items}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
          
          
            <h1>Academia de Studii Economice Bucuresti</h1>
           
            <h1>Pagina personala a administratorului: {LSItem.nume} {LSItem.prenume} </h1>
            
            <br></br>
            <div>
                <div className="card">
                    <DataTable value={infoAdmin} header="Date personale" size="small" showGridlines responsiveLayout="scroll">
                        <Column field="Nume" header="Nume"></Column>
                        <Column field="Prenume" header="Prenume"></Column>
                        <Column field="Adresa_email" header="Adresa email"></Column>
                        <Column field="Telefon" header="Telefon"></Column>
                    </DataTable>
                </div>

            <br></br>
            <br></br>

            </div>
     
        <br></br>
        <br></br>
                
        </div>
    )

}

export default Administrator