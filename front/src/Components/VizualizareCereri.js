import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import {Dropdown } from 'primereact/dropdown'


import * as rute from '../api/ruteApi'
import * as apiCalls from '../APICalls'
import useStudItems from '../hooks/useStudItems'


import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import '../css/FormDemo.css'
import ase_icon_main_page from '../media/ase-icon-main-page.jpg'

import { Dialog } from 'primereact/dialog';
function VizualizareCereri() {

    const studItems = useStudItems()
    const [listaInfoStudent, setlistaInfoStudent] = useState([])
    let [listaCereri, setListaCereri] = useState(null)
    const navigate = useNavigate();
    const [x, setX] = useState(0)
    const [variabila, setVariabila]=useState(1)

    const [listaCereriSixMonths, setListaCereriSixMonths] = useState(null)

    const tipCereri = ["Lipsa/Daune asupra obiectelor mobiliare din inventar","Probleme instalatii sanitare","Probleme electricitate"]
  
    let Descriere = null
    let Categorie = tipCereri[0];
    var localStorageItem = JSON.parse(localStorage.getItem("login"))
    const [dialogVizibil, setDialogVizibil] = useState(null);
    const [dialogAddCerere, setDialogAddCerere] = useState(null)
   
    async function getInfoStudent() {
        try {
            let result = await apiCalls.GET.getDatePersonale(rute.getUserById_URL,localStorageItem.id_student, listaInfoStudent)
            if (result) {
                setX(1)
                return () =>  setlistaInfoStudent(result);
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

    async function getDoleante() {
        try {
            let result = await apiCalls.GET.getDoleante(rute.getCereri,localStorageItem.id_student)
            if (result ){
                setX(2)
                setListaCereri(result)
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

    async function getDoleanteSixMonths() {
        try {
            let result = await apiCalls.GET.getDoleanteWithinSixMonths(rute.getCereriSixMonths,localStorageItem.id_student)
            console.log(result)
            setVariabila(2)
            setListaCereriSixMonths(result)
            
        }
        catch(err) {
            console.log(err)
        }
    }


    useEffect( () => {
        getInfoStudent();
        getDoleante()
        getDoleanteSixMonths()
        
    },[])

    async function updateDoleante(idDoleanta) {
        let result = await apiCalls.PUT.updateDoleante(rute.modificareDoleanta,localStorageItem.id_student,idDoleanta,Categorie,Descriere)
        console.log(result)
        if (result)
            return result; 
        else {
            setDialogAddCerere(true)
        }
       
 
    }   
   
    const onRowEditComplete1 = async (e) => {
            
        console.log(e)
        let idDoleanta = e.data._id;
        console.log(idDoleanta)

        // index reprezinta indicele doleantei din vector
        let index = e.index
        console.log(index)
        // preluam starea initiala a listei, CA SA NU FACEM PUSH  
        // pentru doleanta actualizata
        let listaVeche = [...listaCereri]
        if (!listaVeche[index].Data_solutionare) {
            try {
                let result =  await updateDoleante(idDoleanta)

                // listaVeche[index] = result;
                listaVeche[index].Categorie = result.Categorie;
                listaVeche[index].Descriere = result.Descriere;
                
                console.log(listaVeche)

                // mai intai trebuie sa faci un set nesemnificativ
                // pt a se updata tabelul in pagina
                setVariabila(2)
                setListaCereri(listaVeche)
            }
            catch(err) {
                console.log(err)
            }
        }
        else {
            setDialogVizibil(true)
        }
    }
    

    const textEditor = (options) => {
        let index = options.rowIndex
        let listaVeche = [...listaCereri]
        if (!Descriere) {
            Descriere = listaVeche[index].Descriere
        }
        
        return <InputText type="text" value={options.value} onChange={(evt) => {
            options.editorCallback(evt.target.value)
            Descriere = evt.target.value;
            
           
        }} />
    }
    const tipCerereEditor = (options) => {
        return (
            <Dropdown value={options.value} options={tipCereri} onChange={(evt) => {
                options.editorCallback(evt.value)
                Categorie = evt.target.value;
               
            }}
                />
        );
    }

    return(
        <>
        <Menubar model={studItems}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
            <h1>Academia de Studii Economice Bucuresti</h1>
            <h1>Pagina personala a studentului: {localStorageItem.nume} {localStorageItem.prenume} </h1>
            <br></br>
            <h1>Vizualizare cereri </h1>
            
            <br></br>
            <Dialog header="Ups" visible={dialogVizibil} style={{ width: '50vw' }} onHide={() => {setDialogVizibil(false)}} >
                        <p>Aceasta cerere nu mai poate fi modificata!
                        Daca considerati ca s-a produs vreo greseala, va rugam sa trimiteti un email administratorului!</p>
            </Dialog>
            <Dialog header="Ups" visible={dialogAddCerere} style={{ width: '50vw' }} onHide={() => {setDialogAddCerere(false)}} >
                        <p>Toate campurile sunt obligatorii de completat!</p>
            </Dialog>

            <div className="card p-fluid">
            <h5>Cereri</h5> 
                <DataTable value={listaCereri} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete1} responsiveLayout="scroll">       
                <Column field="Categorie" header="Categorie" sortable editor={(options) => tipCerereEditor(options)} style={{ width: '20%' }}></Column>           
                <Column field="Descriere" header="Descriere" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="Data_reclamatie" header="Data reclamatie"  sortable style={{ width: '20%'}}></Column>
                <Column field="Status_cerere" header="Status cerere"></Column>
                <Column field="Data_solutionare" header="Data solutionare" sortable></Column>
                <Column field="Comentarii" header="Comentarii"></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable> 
            </div>   
               
           
          
            </>
    )
}
export default VizualizareCereri