import axios from "../api/axios";
import { format, parseISO } from 'date-fns'
import * as utils from '../utils'
const BASE_URL = 'http://localhost:8000/api';

export async function updateDoleanteByAdmin(rutaApi,idAdminLogat, id_student,id_doleanta,Status_cerere,Comentarii) {
    try {
        var cale =`${BASE_URL}${rutaApi}/${idAdminLogat}/${id_student}/${id_doleanta}`
        const response = await axios.put(cale,
            JSON.stringify({ Status_cerere,Comentarii }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        let result = await response?.data;
        console.log(result)
        for (let i=0;i<result.length;i++) {
            try {
                result[i].Data_reclamatie =  format(parseISO(result[i].Data_reclamatie),'dd/MM/yyyy ') 
                                        + utils.time.formatAMPM(parseISO(result[i].Data_reclamatie))
                result[i].Data_solutionare =  format(parseISO(result[i].Data_solutionare),'dd/MM/yyyy ') 
                                        + utils.time.formatAMPM(parseISO(result[i].Data_solutionare))    
            }
            catch(err) {
            
            }
        }
        return result;
    }
    catch(err) {
        console.log(err)
       
    }
}
