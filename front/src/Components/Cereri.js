import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import * as rute from '../api/ruteApi.js'
import * as apiCalls from '../APICalls'

import useStudItems from "../hooks/useStudItems.js";
import useLSItem from "../hooks/useLocalStorageItem";

import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import '../css/FormDemo.css'

import ase_icon_main_page from '../media/ase-icon-main-page.jpg'

import {InputTextarea} from 'primereact/inputtextarea'
import {Dialog} from 'primereact/dialog'



function Cereri() {
    const navigate = useNavigate();

    const LSItem = useLSItem();
    const studItems = useStudItems()
   
   
    const tipCereri = ["Lipsa/Daune asupra obiectelor mobiliare din inventar","Probleme instalatii sanitare","Probleme electricitate"]
    let Categorie = tipCereri[0];
    let Descriere=null;

    const [listaInfoStudent, setlistaInfoStudent] = useState([])
    const [dialogVizibil, setDialogVizibil] = useState(false)


    async function submitereCerere() {
        try {
            let result = await apiCalls.PUT.submiteCerere(rute.rutaCreareDoleanta,LSItem.id_student,Categorie,Descriere)
            if (result) {
                return result
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


    return(
        <>
        <Menubar model={studItems}/>
           <br></br>
        
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
           <h1>Academia de Studii Economice Bucuresti</h1>
           <h1>Pagina personala a studentului: {LSItem.nume} {LSItem.prenume} </h1>
           <br></br>
            <h1>Inregistrare cereri </h1>
            <br></br>
            <br></br>
           
            <Dialog header="Info" visible={dialogVizibil} style={{ width: '50vw' }} onHide={() => {setDialogVizibil(false)}} >
                        <p>Cerere inregistrata cu succes!</p>
            </Dialog>
           
            
            <br></br>

            <div className="container">
                <form>
                <div className="row">
                    <div className="col-25">
                    <label for="Tip cerere"><p style={{fontSize:25+'px'}}><b>Tip Cerere</b></p> </label>
                    </div>
                    <div className="col-75">
                    <select name="TipCereri" id="TipCereri" style={{width:500+'px'}} onChange={(evt) => {
                        Categorie = evt.target.value;
                       }}>
                        {
                            tipCereri.map( option => <option key={option}>{option}</option>)
                        }
                    </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                    <label for="Descriere"><p style={{fontSize:25+'px'}}><b>Descriere</b></p></label>
                    </div>
                    <div className="col-75">
                    <InputTextarea rows={3} cols={5}  autoResize onChange={
                (evt) => {
                    Descriere = evt.target.value;
                    console.log(Descriere)
                }} />
                 
                <button style={{float:"center", fontSize:20+'px' ,backgroundColor:"lavenderblush"}} onClick={  () => {
                    let res = submitereCerere();
                    if (res) {
                        setDialogVizibil(true)
                    }
                }
            }><b>Submit</b></button>
                    </div>              
                </div>                
                </form>
                </div>

        </>
    )
}
export default Cereri
