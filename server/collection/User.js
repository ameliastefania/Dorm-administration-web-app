import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema( {
    Nume: {
        type:String,
        required:true
    },
    Prenume: {
        type: String,
        required: true
    },
    Adresa_email: {
        type: String,
        required:true,
        validate: {
            validator: function(v) {
                return /.@\w+\.ase\.ro/.test(v)
            },
            message: props => `Adresa introdusa: ${props.value} 
            nu este o adresa de e-mail valida, 
            deoarece nu respecta formatul!`
          },
          unique:true
    },
    Parola: {
        type: String,
        required:true
    },

    Telefon: {
        type: String
    },
    
    Rol_student:  {
        Facultate: {
            type: String 
        },
        Program_studiu:{
            type:String
        },
        An_studiu: {
            type: Number
        },
        Medie_cazare:{  
            type:Number
        },
        Camin: {
            type: String
        },
        Camera: {
            type: Number
        },
        Votat: {
            type: Boolean,
            default:false

        },
        Doleante: [
                    {
                        Categorie: {
                            type: String,
                        },
                        Descriere: {
                            type: String
                        },
                        Data_reclamatie: {
                            type:Date
                        },
                        Status_cerere:{
                            type:String
                        },
                        Data_solutionare:{
                            type:Date     
                        },
                        Comentarii:{
                            type:String,
                        }
    
                    }
                ],
        Candidat_sef:{  
            Descriere_personala: {
                type:String
            },
            Voturi:{
                type:Number
            }
        }

    },                    
        
    Rol_admin_camin:{
        Camin_administrat: {
            type: String,
            unique:true
        }
    },

    RefreshToken :  {
        type: String
    }
   

  
}, {timestamps: true})

const User = mongoose.model("User",userSchema);
export default User;
