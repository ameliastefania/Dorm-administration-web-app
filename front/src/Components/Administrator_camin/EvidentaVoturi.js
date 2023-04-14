import React, {useEffect, useState} from "react";
import * as rute from '../../api/ruteApi'
import * as apiCalls from '../../APICalls'

import { Menubar } from 'primereact/menubar';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import useItems from '../../hooks/useItems.js'
import useLSItem from "../../hooks/useLocalStorageItem";


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';

import ase_icon_main_page from '../../media/ase-icon-main-page.jpg'
import { useNavigate } from "react-router-dom";

function EvidentaVoturi() {
    const items = useItems()
    const LSItem = useLSItem()

    const [listaStudentiCandidati, setListaStudentiCandidati] = useState(null)
    const [listaNumeStudenti, setListaNumeStudenti] = useState(null)
    const [nrVoturiPerStudent, setNrVoturiPerStudent] = useState(null)
    const [x, setX] = useState(0)

    const navigate = useNavigate();

    async function getListaStudentiCandidati() {
        try {
            let result = await apiCalls.AdminGET.getStudentiCandidati(rute.getStudenti,LSItem.id_admin_camin)
            if (result) {
                console.log(result)
                setListaStudentiCandidati(result)
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

    async function getNumeStudentiCandidati() {
        try {
            let result = await apiCalls.AdminGET.getNumeStudenti(rute.getStudenti,LSItem.id_admin_camin)
            if (result) {
                console.log(result)
                setListaNumeStudenti(result)
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

    async function getNrVoturiPerStudent() {
        try {
            let result = await apiCalls.AdminGET.getNrVoturiPerStudent(rute.getStudenti,LSItem.id_admin_camin)
            if (result) {
                console.log(result)
                setNrVoturiPerStudent(result)
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
        getListaStudentiCandidati();
        getNumeStudentiCandidati();
        getNrVoturiPerStudent();
    },[])
    
 
    const [basicData, setBasicData] = useState({
        labels: listaNumeStudenti,
        datasets: [
            {
                label: 'Nr voturi',
                backgroundColor: '#42A5F5',
                data: nrVoturiPerStudent
            }
        ]
    });
    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    function incarcaDate(){
        setBasicData({
            labels: listaNumeStudenti,
            datasets: [
                {
                    label: 'Nr voturi',
                    backgroundColor: '#42A5F5',
                    data: nrVoturiPerStudent
                }
            ]
        })
    }
    return(
        <>
         <Menubar model={items}/>
           <br></br>
           <img src={ase_icon_main_page} class="rounded float-right" alt="Img"></img>
           <br></br>
          
          
            <h1>Academia de Studii Economice Bucuresti</h1>
           
            <h1>Pagina personala a administratorului: {LSItem.nume} {LSItem.prenume} </h1>
            
            <br></br>
            <br></br>
            <div>
                <div className="card">
                    <DataTable value={listaStudentiCandidati} header="Studenti candidati" size="small" showGridlines responsiveLayout="scroll">
                        <Column field="Nume" header="Nume"></Column>
                        <Column field="Prenume" header="Prenume"></Column>
                        <Column field="Rol_student.Candidat_sef.Descriere_personala" header="Descriere_personala"></Column>
                        <Column field="Rol_student.Candidat_sef.Procentaj_voturi" header="Procentaj_voturi(% din total voturi)"></Column>
                        <Column field="Rol_student.Facultate" header="Facultate"></Column>
                        <Column field="Rol_student.Program_studiu" header="Program_studiu"></Column>
                        <Column field="Rol_student.An_studiu" header="An_studiu"></Column>
                        <Column field="Rol_student.Medie_cazare" header="Medie_cazare"></Column>
                    </DataTable>
                </div>

            <br></br>
            <br></br>
             <button onClick={ () => {
                incarcaDate()
                setX(4)
            }}><b>Incarca date</b></button>
            <br></br>
            <br></br>
            
            <div className="card">
                <h5>Grafic cu bare reprezentand evolutia voturilor pentru studentii candidati</h5>
                <Chart type="bar" id="barChart"data={basicData} options={basicOptions} />
            </div> 
     

            </div>

            
     
        <br></br>
        <br></br>
        </>
    )
}
export default EvidentaVoturi