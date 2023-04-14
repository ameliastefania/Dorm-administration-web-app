import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";


import * as rute from '../api/ruteApi'
import * as apiCalls from '../APICalls'

import useStudItems from "../hooks/useStudItems";
import useLSItem from "../hooks/useLocalStorageItem";

import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import ase_icon_main_page from '../media/ase-icon-main-page.jpg'
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';

function CandidatSefCamin() {

    const navigate = useNavigate();
   
    const studItems = useStudItems()
    const LSItem = useLSItem();

    let Descriere_personala = null;
    const [visibleCandidat, setVisibleCandidat] = useState(false)

    async function candideaza() {
        try {
            let result = await apiCalls.PUT.candideaza(rute.creareDescriere,LSItem.id_student,Descriere_personala)

            if (result) {
                setVisibleCandidat(true)
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
            
            <Dialog header="Info" visible={visibleCandidat} onHide={() => {
                setVisibleCandidat(false)
                
                let localStorage_login = JSON.parse(localStorage.getItem("login"));
                localStorage_login.esteCandidat = true;
                localStorage.setItem("login",JSON.stringify(localStorage_login))


            }} style={{ width: '50vw' }}>
                <p>Felicitari, ati devenit candidat! Mult succes!</p>
            </Dialog>

            <hr></hr>
            <br></br>
            <h2>Doresti sa candidezi pentru sefia la camin? Aplica aici!</h2>
            <br></br>
            <h3>Transmite tuturor colegilor de ce iti doresti acest rol!</h3>
            <br></br>
            <div className="content-section implementation">
                <div className="card">
                    <InputTextarea rows={3} cols={5}  autoResize onChange={
                (evt) => {
                    Descriere_personala = evt.target.value;
                    console.log(Descriere_personala)
                }} />
                </div>
            </div>

         
            <br></br>
            <button className="butonClasa" style={{backgroundColor:"lightblue", fontSize:20+'px', 
                boxShadow:"0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
                
                }} onClick={ () => {
                    candideaza();
 
            }
            
            }><b>Candideaza</b></button>
            
            
            
        </>
    )

}
export default CandidatSefCamin