import User from "../../collection/User.js";
import express from "express"
let router = express.Router();
import bcrypt from "bcrypt";
// #################################### CREATE USER (ORICE TIP) ##########################################
router.route('/createUser').post(async (req,res) => {
    if (!req?.body?.Nume || !req?.body?.Prenume 
        || !req?.body?.Adresa_email || !req?.body?.Parola ) {
        console.log('Campurile pentru nume,prenume,rol,adresa email si parola sunt obligatorii!')
        return res.sendStatus(400);
    }
    const userEmail = await User.findOne({
        "Adresa_email" : req.body.Adresa_email
    })   
    if (userEmail) {
        console.log("Acest utilizator exista deja!")
        return res.sendStatus(403)
    }    
    try {  
        const hashedPwd = await bcrypt.hash(req.body.Parola, 10);    
        if (req.body.Rol_student) {
                const studentCreat = await User.create({
                        "Nume": req.body.Nume,
                        "Prenume" : req.body.Prenume,
                        "Adresa_email": req.body.Adresa_email,
                        "Parola" : hashedPwd,
                        "Telefon": req.body.Telefon,
                        "Rol_student.Facultate":req.body.Rol_student.Facultate,
                        "Rol_student.Program_studiu":req.body.Rol_student.Program_studiu,
                        "Rol_student.An_studiu": req.body.Rol_student.An_studiu,
                        "Rol_student.Medie_cazare": req.body.Rol_student.Medie_cazare,
                        "Rol_student.Camin": req.body.Rol_student.Camin,
                        "Rol_student.Camera": req.body.Rol_student.Camera,
                        "Rol_student.Votat": req.body.Rol_student.Votat
                    })
                    return res.sendStatus(201).json(studentCreat);
            } 
        else {
            if (req.body.Rol_admin_camin) {
                const adminCreat = await User.create({
                    "Nume": req.body.Nume,
                    "Prenume" : req.body.Prenume,
                    "Adresa_email": req.body.Adresa_email,
                    "Parola" : hashedPwd,         
                    "Telefon": req.body.Telefon,
                    "Rol_student": null,
                    "Rol_admin_camin.Camin_administrat":req.body.Rol_admin_camin.Camin_administrat
                   
                }); 
               return res.sendStatus(201).json(adminCreat);
            }
         
       }
    }
    catch(err) {
        console.log(err)
    }
})

export default router;