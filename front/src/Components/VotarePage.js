import {useNavigate} from "react-router-dom";
import React, {useEffect, useState, useRef} from "react";
import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import ase_icon_main_page from '../media/ase-icon-main-page.jpg'

import * as rute from '../api/ruteApi'
import * as apiCalls from '../APICalls'


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Button } from 'primereact/button'

import {ConfirmDialog} from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog';

import useLSItem from "../hooks/useLocalStorageItem";
import useStudItems from '../hooks/useStudItems'
 


function VotarePage() {

    const navigate = useNavigate();
    var localStorageItem = JSON.parse(localStorage.getItem("login"))
    const studItems = useStudItems()
    

    const [listaCandidati, setListaCandidati] = useState(null)
    const [x, setX] = useState(0)
    const [selectedCandidat, setSelectedCandidat] = useState(null)
    const [visible,setVisible] = useState(false)
    const [dialogVizibil, setDialogVizibil] = useState(null);
    const [votInregistrat, setVotInregistrat] = useState(null);
    const LSItem = useLSItem()


    async function getUsers() {
        try {
            let result = await apiCalls.GET.getCandidati(rute.getCandidati, LSItem.id_student)
            if (result) {
                console.log(result)
                setX(1)
                setListaCandidati(result)
            } 
            else {
                navigate("/")
            }
        }
        catch(err) {
            console.log(err)
            navigate("/")
        }
    }

    async function voteaza() {
        try {
           
            let result = await apiCalls.PUT.voteazaSef(rute.voteazaSef,LSItem.id_student,selectedCandidat)
            if (result) {
                setX(3)
                return result;
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
        getUsers();
    },[])

     const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
     const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

     
     function accept() {   
       
        let studentVotat = voteaza();
        if (studentVotat) {
            localStorageItem.Votat = true;
            localStorage.setItem("login",JSON.stringify(localStorageItem))
            setVotInregistrat(true);
        } else {
            console.log("Error")
        }
    
    }

     function reject() {
         console.log("no")
     }
    return(
        <>
         <Menubar model={studItems}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
          
          
            <h1>Academia de Studii Economice Bucuresti</h1>
           
            <h1>Pagina personala a studentului: {LSItem.nume} {LSItem.prenume} </h1>
            
            
            <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Sunteti sigur ca doriti sa votati acest student?"
                        header="Confirmare vot" accept={accept} reject={reject} />
            <Dialog header="Info" visible={dialogVizibil} style={{ width: '50vw' }} onHide={() => {setDialogVizibil(false)}} >
                        <p>Nu mai puteti vota, deoarece ati submis deja un vot!</p>
            </Dialog>
            
            <Dialog header="Info" visible={votInregistrat} style={{ width: '50vw' }} onHide={() => {setVotInregistrat(false)}} >
                        <p>Felicitari, votul dvs a fost inregistrat!</p>
            </Dialog>
        
            <br></br>
            <div className="card">
                    <h5>Candidati</h5>
                    <DataTable value={listaCandidati} selectionMode="single" selection={selectedCandidat}
                     onSelectionChange ={ (e) => {
                        let votat = localStorageItem.Votat;  
                        if (votat === false) {
                            setVisible(true)
                            setSelectedCandidat(e.value._id)
                        
                        } else {
                            if (votat === true) {
                                setDialogVizibil(true)
                            }
                        }
                    }}
                    paginator responsiveLayout="scroll"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        rows={10} rowsPerPageOptions={[5, 20, 50]}
                        paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                        <Column field="Nume" header="Nume"></Column>
                        <Column field="Prenume" header="Prenume"></Column>
                        <Column field="Rol_student.Candidat_sef.Descriere_personala" header="Prezentare"></Column>
                        <Column field="Rol_student.Facultate" header="Facultate"></Column>
                        <Column field="Rol_student.Program_studiu" header="Program studiu"></Column>
                    </DataTable>
                </div>  
            
        </>
    )

}
export default VotarePage