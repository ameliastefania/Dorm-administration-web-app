import User from '../collection/User.js'
import jwt from "jsonwebtoken"
import express from "express"

let router = express.Router();

router.route('/refresh').get(async (req, res) => {
    const cookies = req.cookies; 
    if (!req.cookies.jwt) {
        return res.sendStatus(404)
    }
    const refreshToken = cookies.jwt;
    const userGasit =  await User.findOne({ 
        "RefreshToken": refreshToken })

    console.log(userGasit)
    if (userGasit.Adresa_email === null){
        return res.sendStatus(404)
    }

    const adresaEmail = userGasit.Adresa_email;
    const pwdIntrodusa = userGasit.Parola;
    // const rol = userGasit.Rol;
    // const id_student = userGasit._id
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || ( userGasit.Adresa_email !== decoded.Adresa_email)) {
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });            
                return res.sendStatus(403);
                
            } 
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "Adresa_email" : userGasit.Adresa_email
                   }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            if (userGasit.Rol_student.Facultate) {
                
                let id_student = userGasit._id;
                let rol = "student";
                let descriere_candidat  = userGasit.Rol_student.Candidat_sef.Descriere_personala;
                let esteCandidat = false;
                if (descriere_candidat) {
                    esteCandidat = true;
                }
                let Votat = userGasit.Rol_student.Votat;
                let nume = userGasit.Nume;
                let prenume = userGasit.Prenume;
                res.json({ nume,prenume, adresaEmail, pwdIntrodusa, accessToken, id_student, rol, esteCandidat, Votat}); 
            } else {
                if (userGasit.Rol_admin_camin) {
                    let id_admin_camin = userGasit._id;
                    let nume = userGasit.Nume;
                    let prenume = userGasit.Prenume;
                    let rol = "admin_camin"
                    let camin_administrat = userGasit.Rol_admin_camin.Camin_administrat
                    res.json({ nume, prenume,adresaEmail, pwdIntrodusa, accessToken, id_admin_camin, rol, camin_administrat})
                }
            }
        }
    );
})

export default router;