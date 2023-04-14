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
import { PanelMenu } from 'primereact/panelmenu'
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';



import ase_icon_main_page from '../../media/ase-icon-main-page.jpg'
import { useNavigate } from "react-router-dom";

function VizualizareCereriStud() {
    const items = useItems()
    const LSItem = useLSItem();
    const [listaCereri, setListaCereri] = useState(null)
    const [listaCereriInitiala, setListaCereriInitiala] = useState(null)
    const [listaFilterCereri_Status, setListaFilterCereri_Status] = useState(null)
    var localStorageItem = JSON.parse(localStorage.getItem("login"))
    const [x, setX] = useState(0)
    var optiuniFilter = ["Nume","Camera"]
    const [tipStatusCereri, setTipStatusCereri] = useState(null)
    const [optiuneFilter, setOptiuneFilter] = useState("Nume")
    const [Status_cerere, setStatusCerere] = useState("In asteptare")
    const [dialogVizibil, setDialogVizibil] = useState(null);
    
    var Comentarii = null;
    var inputUser = null;

    var status_pending = "In asteptare"

    const navigate = useNavigate();

    async function getListaCereri() {
        try {
            let result = await apiCalls.AdminGET.getCereri(rute.getStudenti,LSItem.id_admin_camin) 
                if (result) {
                setListaCereri(result)
                setListaCereriInitiala(result)
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

    async function getListaStatusCereri() {
        try {
            let result = await apiCalls.AdminGET.getListaStatusCereri(rute.getListaStatusCereri,LSItem.id_admin_camin) 
            if (result) {
                setTipStatusCereri(result)
                setX(1)
            } else {
                await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
                navigate("/")
            }
        }
        catch(err) {
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
            console.log(err)
        }
    }

    async function filterCereri_Status(status) {
        try {
            let result = await apiCalls.AdminGET.filterCereri_Status(rute.getStudenti,LSItem.id_admin_camin,status)
            if (result) {
                setListaCereri(result)
                console.log(result)
                setX(2)
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

    async function filterCereri_Camera(nr_camera) {
        try {
            let result = await apiCalls.AdminGET.filterCereri_Camera(rute.getStudenti,LSItem.id_admin_camin,nr_camera)
            if (result) {
                setListaCereri(result)
                console.log(result)
                setX(2)
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


    async function filterCereri_Nume(nume_student) {
        try {
            let result = await apiCalls.AdminGET.filterCereri_Nume(rute.getStudenti,LSItem.id_admin_camin,nume_student)
            if (result) {
                setListaCereri(result)
                console.log(result)
                setX(2)
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

    async function getMostRecent_dataReclamatie() {
        try {
            let result = await apiCalls.AdminGET.getCereri_mostRecent_dataReclamatie(rute.getStudenti,LSItem.id_admin_camin) 
            if (result) {
                setListaCereri(result)
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

    async function getAscendingOrder_dataReclamatie() {
        try {
            let result = await apiCalls.AdminGET.getCereri_ascendingOrder_dataReclamateie(rute.getStudenti,LSItem.id_admin_camin) 
            if (result) {
                setListaCereri(result)
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

    async function updateDoleante(idStudent, idDoleanta) {
        let result = await apiCalls.AdminPUT.updateDoleanteByAdmin(rute.updateDoleanteByAdmin,LSItem.id_admin_camin,
            idStudent,idDoleanta,Status_cerere,Comentarii)
        if (result) {
            return result;
        } else {
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
        }

       
 
    } 

    useEffect( () => {
        getListaStatusCereri()
        getListaCereri();
    },[])

     const optiuniFiltrareMeniu = [
        {
            label: 'Status cerere',
            items: [
                {
                    label: 'Solutionate', 
                    command: async () => {
                        filterCereri_Status("Solutionata")
                    }
                },
                {
                    label: 'Nesolutionate', 
                    command: async () => {
                        filterCereri_Status("Nesolutionata")
                    }
                },
            ]
        },
        {
            label: 'Data reclamatie',
            items: [
                {
                    label: 'Cele mai recente',
                    command: async() => {
                        getMostRecent_dataReclamatie();
                    }
                },
                {
                    label: 'Cele mai vechi',
                    command: async() => {
                        getAscendingOrder_dataReclamatie();
                    }
                }
            ]
        }
    ];

    const onRowEditComplete1 = async (e) => {
        console.log(e)
        let idStudent = e.data._idStud;
        let idDoleanta = e.data._id;
        let index = e.index
        let listaVeche = [...listaCereri]
        try {
            if (!listaVeche[index].Data_solutionare) {
                let result =  await updateDoleante(idStudent,idDoleanta)

                // listaVeche[index] = result;
                listaVeche[index].Status_cerere = result.Status_cerere;   
                listaVeche[index].Comentarii = result.Comentarii;  
                listaVeche[index].Data_solutionare = result.Data_solutionare;    
                console.log(listaVeche)
                setX(2)
                setListaCereri(listaVeche)
            } else {
                setDialogVizibil(true)
            }
        }
        catch(err) {
            console.log(err)
            await apiCalls.connOptions.logOut(rute.LOGOUT_URL)
            navigate("/")
        }

    }

    const tipStatusEditor =  (options) => {
        
        return (
            <Dropdown value={options.value} options={tipStatusCereri} onChange={(evt) => {
                console.log(tipStatusCereri)
                options.editorCallback(evt.value)
                setStatusCerere(evt.target.value); 
            }}
                />
        );
    }
    const textEditor = (options) => {
        let index = options.rowIndex
        let listaVeche = [...listaCereri]
        if (!Comentarii) {
            Comentarii = listaVeche[index].Comentarii
        }
        return <InputText type="text" value={options.value} onChange={(evt) => {
            options.editorCallback(evt.target.value)
            Comentarii = evt.target.value;
        }} />
    }
    return (
        <>
            <Menubar model={items}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
          
          
            <h1>Academia de Studii Economice Bucuresti</h1>
            <h1>Pagina personala a administratorului: {LSItem.nume} {LSItem.prenume} </h1>
            <br></br>
            <h2>Filtrare cereri</h2>     

            <div className="container" style={{marginLeft:0+'px', display:"block", boxSizing:"border-box"}} >
            <PanelMenu model={optiuniFiltrareMeniu} style={{ width: '22rem' }} />
            <h2>Filtrare dupa campuri</h2>
                 <div className="row" style={{ marginLeft:"auto",margin:10+'px'}}>
                    <div className="col-xs" >
                    <select name="optiuniFilter" style={{width:300+'px'}} onChange={(evt) => {
                        setOptiuneFilter(evt.target.value);
                        console.log(optiuneFilter)  }}>
                        {
                            optiuniFilter.map( option => <option key={option}>{option}</option>)
                        }
                    </select>
                     </div>
                 </div>   
                <div className="row" style={{ marginLeft:"auto",margin:10+'px'}}>
                     <div className="col-xs" >
                     <input style={{width:300+'px'}} type="text" onChange={(evt) => {
                            inputUser = evt.target.value;
                            console.log(inputUser)
                     }}/>
                     </div>         
                </div>    
                        
                <div className="row" style={{ marginLeft:"auto",margin:10+'px'}}>
                     <div className="col-xs" >
                     <button style={{display:"inline", margin:10+'px'}} onClick={ async () => {
                        switch(optiuneFilter) {
                            case 'Nume' : {
                               filterCereri_Nume(inputUser);
                               break;
                            }
                            case 'Camera' : {
                                filterCereri_Camera(parseInt(inputUser))
                                break;
                            }
    
                        }
                     }}>Apply</button>
                     
                     </div>   
                     <div className="col-xs" >
                     <button style={{display:"inline", margin:10+'px'}} onClick={ () => {
                            setListaCereri(listaCereriInitiala)
                     }}>Clear filters</button>
                     </div>   
                           
                </div>       
                </div>

            <br></br>
            <br></br>
            <Dialog header="Ups" visible={dialogVizibil} style={{ width: '50vw' }} onHide={() => {setDialogVizibil(false)}} >
                        <p>Ati modificat deja aceasta cerere!Trimiteti un email administratorului de sistem daca a fost comisa o greseala!</p>
            </Dialog>
        
            <div>
                <div className="card">
                    <DataTable value={listaCereri} header="Cereri" editMode="row" size="small" onRowEditComplete={onRowEditComplete1} 
                    showGridlines responsiveLayout="scroll">
                        <Column field="Nume" header="Nume" sortable></Column>
                        <Column field="Prenume" header="Prenume" sortable></Column>
                        <Column field="Camera" header="Camera"></Column>
                        <Column field="Categorie" header="Categorie"></Column>
                        <Column field="Descriere" header="Descriere"></Column>
                        <Column field="Data_reclamatie" header="Data_reclamatie" sortable></Column>
                        <Column field="Status_cerere" header="Status_cerere" editor={(options) => tipStatusEditor(options)} style={{ width: '20%' }}></Column>
                        <Column field="Data_solutionare" header="Data_solutionare" sortable></Column>
                        <Column field="Comentarii" header="Comentarii" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
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
export default VizualizareCereriStud