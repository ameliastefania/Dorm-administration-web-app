import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
// import '../css/LogIn.css'
import {Button} from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'


import "/node_modules/primeflex/primeflex.css"
import * as utils from '../utils'
import * as apiCalls from '../APICalls'
import * as rute from '../api/ruteApi.js'

import { Image } from 'primereact/image';
import ase_icon_login from '../media/ase_icon_login.jpg'

import { Panel } from 'primereact/panel';


function useForceUpdate(){
    const [value, setValue] = useState(0); 
    return () => setValue(value => value + 1); 
}
function LogIn() {
     
    const [adresaEmail, setAdresaEmail] = useState(null); 
    const [parola, setParola] = useState(null);

    let [count,setCount] = useState(0);

    const navigate = useNavigate();

    const [x,setX] = useState(0);
    
    return   ( 
        
        <div>
            <Panel header="Pagina personala student camin" className="mypanel">
           
          
            <div className="flex align-items-center justify-content-center">
                <Image src={ase_icon_login}  alt="Image Text" style={{height:330+'px'}}/>
            </div>
            
            <br></br>
   
            <div className="flex align-items-center justify-content-center">
                <div className="grid p-fluid">
                    <div className="col-12 md:col-4">      
                        <div className="p-inputgroup" style={{width: 500+'px' }}>
                            <span className="p-inputgroup-addon" style={{width: 200+'px'}}>
                                <i className="pi pi-user" > Adresa email</i>
                            </span>
                            <InputText placeholder="Username" onChange={(evt) => {
                                setAdresaEmail(evt.target.value); }} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex align-items-center justify-content-center">
                <div className="grid p-fluid">
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup" style={{width: 500+'px'}}>
                            <span className="p-inputgroup-addon" style={{width: 200+'px'}}>Parola</span>
                            <InputText type={"password"} placeholder="Parola" onChange={(evt) => {
                                setParola(evt.target.value);
                            }}/>
                        </div>
                    </div>
                </div>
            </div>

            

            <div className="flex align-items-center justify-content-center">
                <Button style={{backgroundColor:"gray", width:200+'px'}} onClick={async () => {
                    let divText = utils.generateElemHTML.creareDivDateInvalide();
                    let paragraf = utils.generateElemHTML.creareParagrafDateInvalide()   
                    var result = await apiCalls.connOptions.handleSubmit(rute.LOGIN_URL,adresaEmail,parola) 
                    
                    if (!result) { 
                        setCount(++count)  
                        
                        if (count===1) {
                            divText.append(paragraf)
                        }
                     
                    } else {
                        if (paragraf) {
                            try {
                                let divDeSters = document.getElementById("idDivDateInvalide")
                                let paragrafDeSters = document.getElementById("idPInvalidInfo")

                                divDeSters.remove()
                                paragrafDeSters.remove()
                                
                            }
                            catch(err) {
                    
                            }

                            let rolUser = JSON.parse(localStorage.getItem("login")).rol
  
                             if (rolUser === "admin_camin") {
                                navigate("/admin_camin-main-page")    
                            }  else {
                               
                                if (rolUser === "student") {
                                    navigate("/student-main-page")
                                }
                            } 
                           
                        }
                    } 
                     
                }}>
                    <p className="text-lg w-10" style={{padding:0+'px', margin:0+'px', textAlign:"center"}}>Conectare</p>
                </Button>
            </div>
                
        </Panel>

        </div>
    )
}
export default LogIn;