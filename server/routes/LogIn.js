import User from "../collection/User.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();
import bcrypt from "bcrypt";
import express from "express"
let router = express.Router();

router.route('/login').post(async (req, res) => {
    try{    
        let adresaEmail = req.body.adresaEmail;
        let pwdIntrodusa = req.body.parola;
      
        if (!adresaEmail || !pwdIntrodusa) 
            return res.status(400);

        
        const userGasit = await User.findOne( {
            "Adresa_email" : adresaEmail 
        })
        if (!userGasit) {
            return res.sendStatus(404);
        }
    
       let match=false;
    
        if (await bcrypt.compare(pwdIntrodusa,userGasit.Parola))
            match = true;
  
        if (match) {   
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                         "Adresa_email" : userGasit.Adresa_email
                    }         
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );    
            const refreshToken = jwt.sign(
                { 
                    "Adresa_email": userGasit.Adresa_email 
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Saving refreshToken with current user
            userGasit.RefreshToken = refreshToken;
            await userGasit.save();  
            res.cookie('jwt', refreshToken, {  sameSite: 'None',  httpOnly:true, secure:true,
            domain:'', maxAge: 24 * 60 * 1000 }); 

            if (userGasit.Rol_student.Facultate) {
                
                let id_student = userGasit._id;
                let rol = "student";
                let descriere_candidat  = userGasit.Rol_student.Candidat_sef.Descriere_personala;
                let esteCandidat = false;
                if (descriere_candidat) {
                    esteCandidat = true;
                }
                let nume = userGasit.Nume;
                let prenume = userGasit.Prenume;
                let Votat = userGasit.Rol_student.Votat;
                res.json({ nume, prenume,adresaEmail, pwdIntrodusa, accessToken, id_student, rol, esteCandidat, Votat}); 
                //res.json({ nume, prenume,adresaEmail, accessToken, id_student, rol, esteCandidat, Votat}); 
            } else {
                if (userGasit.Rol_admin_camin) {
                    let id_admin_camin = userGasit._id;
                    let nume = userGasit.Nume;
                    let prenume = userGasit.Prenume;
                    let rol = "admin_camin"
                    let camin_administrat = userGasit.Rol_admin_camin.Camin_administrat
                    res.json({ nume,prenume,adresaEmail, pwdIntrodusa, accessToken, id_admin_camin, rol, camin_administrat})
                    //res.json({ nume,prenume,adresaEmail, accessToken, id_admin_camin, rol, camin_administrat})
                }
            }
           
        }
        else {
            console.log("Credentiale incorecte!");
            res.sendStatus(404)
            
        }
    }
    catch(err) {
        console.log(err);
        console.log("Internal server error!")
        return res.sendStatus(500);
    }
})
export default router;