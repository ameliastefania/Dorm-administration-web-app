import axios from "../api/axios";
import { format, parseISO } from 'date-fns'
import * as utils from '../utils'
const BASE_URL = 'http://localhost:8000/api';


export async function getAllUsers(rutaApi) {
    try {
        var path = BASE_URL + rutaApi
        const response = await axios.get(path,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data;         
        return result;
     
    }
    catch(err) {
        console.log(err)
    }
}

export async function getDatePersonale(rutaApi,id_student, listaInfoStudent) {
    try {
        var path = BASE_URL + rutaApi
        const response = await axios.get(`${path}/${id_student}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data; 
        listaInfoStudent.pop()
        listaInfoStudent.push(result)    
        console.log(listaInfoStudent)           
        return listaInfoStudent;
     
    }
    catch(err) {
        console.log(err)
    }
}

export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
export async function getDoleante(rutaApi,id_student) {
    try {
        var path = BASE_URL + rutaApi
        const response = await axios.get(`${path}/${id_student}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        let result = await response?.data;
        console.log(result)   
        try {
            for (let i=0;i<result.length;i++) {
                if (result[i].Data_reclamatie) {
                    result[i].Data_reclamatie = format(parseISO(result[i].Data_reclamatie),'dd/MM/yyyy ') + utils.time.formatAMPM(parseISO(result[i].Data_reclamatie))
                }
            }
        }
        catch(err) {
            console.log(err)
        }
        
        try {
            for (let i=0;i<result.length;i++) {
                if (result[i].Data_ultima_modificare) {
                    result[i].Data_ultima_modificare = format(parseISO(result[i].Data_ultima_modificare),'dd/MM/yyyy ') + utils.time.formatAMPM(parseISO(result[i].Data_ultima_modificare))
                }
            }
        } 
        catch(err) {
            console.log(err)
        }
        return result;
     
    }
    catch(err) {
        console.log(err)
    }
}

export async function getDoleanteWithinSixMonths(rutaApi,id_student) {
    try {
        var path = BASE_URL + rutaApi
        const response = await axios.get(`${path}/${id_student}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data;
        console.log(result)
        for (let i=0;i<result.length;i++) {
            result[i].Data_reclamatie = format(parseISO(result[i].Data_reclamatie),'dd/MM/yyyy hh:mm')
        }
        return result;
     
    }
    catch(err) {
        console.log(err)
    }
}

export async function getCandidati(rutaApi,id_studentLogat) {
    try {
        var path = BASE_URL + rutaApi
        const response = await axios.get(`${path}/${id_studentLogat}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
       
        let result = await response?.data;         
        return result.listaCandidati;
     
    }
    catch(err) {
        console.log(err)
    }
}