import axios from "../api/axios";
const BASE_URL = 'http://localhost:8000/api';

export async function handleSubmit(rutaAPI, adresaEmail,parola) {
    try {     
       var path = BASE_URL + rutaAPI
       const response = await axios.post(path,
           JSON.stringify({ adresaEmail, parola }),
           {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
           }
       );
       console.log(JSON.stringify(response?.data));
      
       if (response?.data.adresaEmail && response?.data.pwdIntrodusa) {
           localStorage.setItem("login", JSON.stringify(response?.data))   
       }
       return response?.data;
    }
    catch(err) {
        console.log(err)
    }   
}
export async function logOut(rutaAPI) {   
    try {
        console.log("LOG OUT")
        var path = BASE_URL + rutaAPI
        const response = await axios.get(path,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        localStorage.clear();
     }
   
     catch(err) {
         console.log(err)
    }
}

