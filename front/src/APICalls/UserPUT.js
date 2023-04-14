import axios from "../api/axios";
const BASE_URL = 'http://localhost:8000/api';

export async function submiteCerere(rutaApi,id_student,Categorie,Descriere) {
        
    try {
        var cale =`${BASE_URL}${rutaApi}/${id_student}`
        console.log(cale)
        const response = await axios.put(cale,
            JSON.stringify({ Categorie, Descriere }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data;
        if (result) {
            console.log(result)
            return result;
        }           

    }
    catch(err) {
        console.log(err)
       
    }
}

export async function updateDoleante(rutaApi,id_student,id_doleanta,Categorie,Descriere) {
    try {
        var cale =`${BASE_URL}${rutaApi}/${id_student}/${id_doleanta}`
        console.log(cale)
        const response = await axios.put(cale,
            JSON.stringify({ Categorie, Descriere }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data;
        console.log(result)
        return result;
    }
    catch(err) {
        console.log(err)
       
    }
}

export async function candideaza(rutaApi, id_student,Descriere_personala) {
    try {
        var cale =`${BASE_URL}${rutaApi}/${id_student}`
        console.log(cale)
        const response = await axios.put(cale,
            JSON.stringify({ Descriere_personala }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data;
        if (result) {
            console.log(result) 
        }
        return result;
        
     
    }
    catch(err) {
        console.log(err)
    }
}

export async function voteazaSef(rutaApi,id_studentVotant,id_studentCandidat) {
    try {
        var cale =`${BASE_URL}${rutaApi}/${id_studentVotant}/${id_studentCandidat}`
        console.log(cale)
        const response = await axios.put(cale,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data;
        console.log(result)
        return result;
    }
    catch(err) {
        console.log(err)
       
    }
}