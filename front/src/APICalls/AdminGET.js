import axios from "../api/axios";
import { format, parseISO } from 'date-fns'
import * as utils from '../utils'
const BASE_URL = 'http://localhost:8000/api';

export async function getStudenti(rutaApi,id_admin) {
    try {
        var path = BASE_URL + rutaApi
        
        const response = await axios.get(`${path}/${id_admin}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data; 
        return result.listaStudenti
    }
    catch(err) {
        console.log(err)
    }
}

export async function getCereri(rutaApi,id_admin) {
    try {
        var path = BASE_URL + rutaApi
        var localStorageItem = JSON.parse(localStorage.getItem("login"))
        const response = await axios.get(`${path}/${id_admin}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data; 
        let listaCereri = []
        let temp;
        try {
            for (let i=0;i<result.listaStudenti.length;i++) {
                if (result.listaStudenti[i].Rol_student.Camin === localStorageItem.camin_administrat) {
                    for (let j=0;j<result.listaStudenti[i].Rol_student.Doleante.length;j++) {
                        temp = result.listaStudenti[i].Rol_student.Doleante[j]
                        temp._idStud = result.listaStudenti[i]._id;
                        temp.Nume = result.listaStudenti[i].Nume;
                        temp.Prenume = result.listaStudenti[i].Prenume;
                        temp.Facultate = result.listaStudenti[i].Rol_student.Facultate;
                        temp.Camera = result.listaStudenti[i].Rol_student.Camera;
                        try {
                            temp.Data_reclamatie =  format(parseISO(result.listaStudenti[i].Rol_student.Doleante[j].Data_reclamatie),'dd/MM/yyyy ') 
                                                + utils.time.formatAMPM(parseISO(result.listaStudenti[i].Rol_student.Doleante[j].Data_reclamatie))
                            temp.Data_solutionare =  format(parseISO(result.listaStudenti[i].Rol_student.Doleante[j].Data_solutionare),'dd/MM/yyyy ') 
                                                + utils.time.formatAMPM(parseISO(result.listaStudenti[i].Rol_student.Doleante[j].Data_solutionare))
                        }
                        catch(err) {
                            console.log(err)
                        }

                        listaCereri.push(temp)
                    }
                }
            }
        }
        catch(err) {
            console.log(err)
        }


        return listaCereri;
    }
    catch(err) {
        console.log(err)
    }
}

export async function filterCereri_Status(rutaApi,id_admin,status_cerere) {
    try {
        var path = BASE_URL + rutaApi
        var localStorageItem = JSON.parse(localStorage.getItem("login"))
        const response = await axios.get(`${path}/${id_admin}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data; 
        let listaCereri = []
        let temp;
        for (let i=0;i<result.listaStudenti.length;i++) {
            if (result.listaStudenti[i].Rol_student.Camin === localStorageItem.camin_administrat) {
                for (let j=0;j<result.listaStudenti[i].Rol_student.Doleante.length;j++) {
                    if (result.listaStudenti[i].Rol_student.Doleante[j].Status_cerere === status_cerere ) {
                        temp = result.listaStudenti[i].Rol_student.Doleante[j]
                        temp._idStud = result.listaStudenti[i]._id;
                        temp.Nume = result.listaStudenti[i].Nume;
                        temp.Prenume = result.listaStudenti[i].Prenume;
                        temp.Facultate = result.listaStudenti[i].Rol_student.Facultate;
                        temp.Camera = result.listaStudenti[i].Rol_student.Camera;
                        listaCereri.push(temp)
                    }
                }
            }
        }
        return listaCereri;
    }
    catch(err) {
        console.log(err)
    }
}
export async function filterCereri_Camera(rutaApi,id_admin,nr_camera) {
    try {
        var path = BASE_URL + rutaApi
        var localStorageItem = JSON.parse(localStorage.getItem("login"))
        const response = await axios.get(`${path}/${id_admin}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data; 
        let listaCereri = []
        let temp;
        for (let i=0;i<result.listaStudenti.length;i++) {
            if (result.listaStudenti[i].Rol_student.Camin === localStorageItem.camin_administrat && result.listaStudenti[i].Rol_student.Camera === nr_camera) {
                for (let j=0;j<result.listaStudenti[i].Rol_student.Doleante.length;j++) { 
                    temp = result.listaStudenti[i].Rol_student.Doleante[j]
                    temp._idStud = result.listaStudenti[i]._id;
                    temp.Nume = result.listaStudenti[i].Nume;
                    temp.Prenume = result.listaStudenti[i].Prenume;
                    temp.Facultate = result.listaStudenti[i].Rol_student.Facultate;
                    temp.Camera = result.listaStudenti[i].Rol_student.Camera;
                    listaCereri.push(temp)
                    
                }
            }
        }
        return listaCereri;
    }
    catch(err) {
        console.log(err)
    }
}

export async function filterCereri_Nume(rutaApi,id_admin,nume_student) {
    try {
        var path = BASE_URL + rutaApi
        var localStorageItem = JSON.parse(localStorage.getItem("login"))
        const response = await axios.get(`${path}/${id_admin}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data; 
        let listaCereri = []
        let temp;
        for (let i=0;i<result.listaStudenti.length;i++) {
            if (result.listaStudenti[i].Rol_student.Camin === localStorageItem.camin_administrat && result.listaStudenti[i].Nume === nume_student) {
                for (let j=0;j<result.listaStudenti[i].Rol_student.Doleante.length;j++) { 
                    temp = result.listaStudenti[i].Rol_student.Doleante[j]
                    temp._idStud = result.listaStudenti[i]._id;
                    temp.Nume = result.listaStudenti[i].Nume;
                    temp.Prenume = result.listaStudenti[i].Prenume;
                    temp.Facultate = result.listaStudenti[i].Rol_student.Facultate;
                    temp.Camera = result.listaStudenti[i].Rol_student.Camera;
                    listaCereri.push(temp)
                    
                }
            }
        }
        return listaCereri;
    }
    catch(err) {
        console.log(err)
    }
}

export async function getCereri_mostRecent_dataReclamatie(rutaApi,id_admin) {
    try {
        var listaCereri = await getCereri(rutaApi,id_admin)
        listaCereri.sort(function(a,b){
             return new Date(b.Data_reclamatie) - new Date(a.Data_reclamatie);
          });

        return listaCereri
    }
    catch(err) {
        console.log(err)
    }
}

export async function getCereri_ascendingOrder_dataReclamateie(rutaApi,id_admin) {
    try {
        var listaCereri = await getCereri(rutaApi,id_admin)
        listaCereri.sort(function(a,b){
             return new Date(a.Data_reclamatie) - new Date(b.Data_reclamatie);
          });

        return listaCereri
    }
    catch(err) {
        console.log(err)
    }
}
export async function getListaStatusCereri(rutaApi,id_admin) {
    try {
        var path = BASE_URL + rutaApi
        
        const response = await axios.get(`${path}/${id_admin}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data; 
        return result.listaStatusCereri
    }
    catch(err) {
        console.log(err)
    }
}

export async function getStudentiCandidati(rutaApi,id_admin) {
    try {
        var listaStudenti  = await getStudenti(rutaApi,id_admin);
        var listaStudentiCandidati = []
        var totalVoturi = 0;
       
        try {

            // nr total voturi
            for (let i=0;i<listaStudenti.length;i++) {
                if (listaStudenti[i].Rol_student.Candidat_sef != null) {
                    if (listaStudenti[i].Rol_student.Candidat_sef.Voturi != null) {
                        console.log(listaStudenti[i].Rol_student.Candidat_sef.Voturi)
                        totalVoturi+=listaStudenti[i].Rol_student.Candidat_sef.Voturi;
                    }
                }
            }
            
            for (let i=0;i<listaStudenti.length;i++) {
                if (listaStudenti[i].Rol_student.Candidat_sef != null) {
                    listaStudenti[i].Rol_student.Candidat_sef.Procentaj_voturi = listaStudenti[i].Rol_student.Candidat_sef.Voturi/totalVoturi * 100;
                    listaStudentiCandidati.push(listaStudenti[i])
                }
            }
        }
        catch(err) {
            console.log(err)
        }
        listaStudentiCandidati.sort(function(a,b){
            return  b.Rol_student.Candidat_sef.Procentaj_voturi - a.Rol_student.Candidat_sef.Procentaj_voturi;
         });

        return listaStudentiCandidati;
    }
    catch(err) {
        console.log(err)
    }
}

export async function getNumeStudenti(rutaApi,id_admin) {
    try {
        var listaStudenti = await getStudenti(rutaApi,id_admin);
        var listaNumeStudenti = [];
        for (let i=0;i<listaStudenti.length;i++) {
            if (listaStudenti[i].Rol_student.Candidat_sef!=null)
                listaNumeStudenti.push(listaStudenti[i].Nume)
        }
        console.log(listaNumeStudenti)
        return listaNumeStudenti;
    }
    catch(err) {
        console.log(err)
    }
}

export async function getNrVoturiPerStudent(rutaApi,id_admin) {
    try {
        var listaStudenti = await getStudenti(rutaApi,id_admin);
        var nrVoturiPerStudent = [];
        for (let i=0;i<listaStudenti.length;i++) {
            if ( listaStudenti[i].Rol_student.Candidat_sef !=null )
                nrVoturiPerStudent.push(listaStudenti[i].Rol_student.Candidat_sef.Voturi)
        }
        console.log(nrVoturiPerStudent)
        return nrVoturiPerStudent;
    }
    catch(err) {
        console.log(err)
    }
}
export async function getSituatieVoturi_ChartPie(rutaApi,id_admin) {
    try {
        var listaStudenti = await getStudenti(rutaApi,id_admin);
        var nrStudentiNevotanti = 0;
        var rezultate = []
        var map1 = new Map();

        map1.set("Studenti care au votat",0);
        
        
        for (let i=0;i<listaStudenti.length;i++) {
            for (var [key,value] of map1) {
                if (listaStudenti[i].Rol_student.Votat ) {
                    value++;
                    map1.set(key,value)
                } 
            }
        } 
        nrStudentiNevotanti = listaStudenti.length - map1.get("Studenti care au votat");
        map1.set("Studenti care nu au votat",nrStudentiNevotanti)
    

        for (var [key, value] of map1) {
            value = value/listaStudenti.length * 100;
            map1.set(key,value);
        }
       
        return map1;
    }
    catch(err) {
        console.log(err)
    }
}

export async function getStudentiGroupedByFac_ChartPie(rutaApi,id_admin) {
    try {
        // nr de studenti din fiecare facultate
        var listaStudenti = await getStudenti(rutaApi,id_admin);
        var map1 = new Map();

        for (let i=0;i<listaStudenti.length;i++) {
            map1.set(listaStudenti[i].Rol_student.Facultate,0)
        }
     
        for (let i=0;i<listaStudenti.length;i++) {
            for (var [key, value] of map1) {
                if (listaStudenti[i].Rol_student.Facultate == key) {   
                    value = value+1;
                    map1.set(key,value)
                }
              }
            
        }
             
        for (var [key, value] of map1) {
            value = value/listaStudenti.length * 100;
            map1.set(key,value);
        }
        // return Array.from(map1.values())
        return map1
    }
    catch(err) {
        console.log(err)
    }
}