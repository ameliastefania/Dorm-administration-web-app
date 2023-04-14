import User from "../../collection/User.js";
import express from "express"
import { format, parseISO } from 'date-fns'
let router = express.Router();

// ##################################### CANDIDEAZA #################################

router.route('/updateDescriereCandidat/:idStudent').put(async(req,res) => {
    try {   
        let idStudent = req.params.idStudent
        let content = req.body;

        let studentCautat = await User.findOne({
            "_id": idStudent
            
        })       
        if (!studentCautat) {   
            console.log("Nu exista student cu acest id");
            res.sendStatus(404);
        }
        
        if (content) {
            
            if (content.hasOwnProperty("Descriere_personala") && content["Descriere_personala"]) {
                studentCautat.Rol_student.Candidat_sef = content;
                studentCautat.Rol_student.Candidat_sef.Voturi = 0;
                return res.json(studentCautat.save())
            } 
            else {
                console.log("Invalid object!")
                res.sendStatus(403); // forbidden - shoudn't be empty
            }
        } 
        else {
            console.log("Descrierea este un camp obligatoriu de completat!")
            res.sendStatus(204); // no content
        }     
        
    }
    catch(error) {
        console.log(error.message)
        return res.send(500).json( "Internal server error!" );
    }
})
// ############################## UPDATE VECTOR DOLEANTE #########################

async function updateDoleante(content, idStudent, idDoleanta) {

    var studentCautat = await User.findOne({
        "_id": idStudent
        
    })       
    var student = await User.findOne({
        "_id": idStudent,
        "Rol_student.Doleante._id" :idDoleanta
    })    
    try {
        let indice = 0;     
        for (let i=0;i<student.Rol_student.Doleante.length;i++) {
            if (student.Rol_student.Doleante[i]._id.equals(idDoleanta)) {
                indice = i;
            }
        }
        console.log(content)
        student.Rol_student.Doleante[indice].Categorie = content.Categorie;
        student.Rol_student.Doleante[indice].Descriere = content.Descriere;
        student.save();
        
        var continutModificat = {
            "Categorie" : content.Categorie,
            "Descriere": content.Descriere
        }
        return continutModificat;
       
    }
    catch(err) {
        console.log("Internal server error")
        // res.sendStatus(500)
    }
}

router.route('/updateDoleante/:idStudent/:idDoleanta').put(async(req,res) => {
    try {   
        var idS = req.params.idStudent;
        var idD = req.params.idDoleanta;
        var content = req.body;
        
        let studentCautat = await User.findOne({
            "_id": idS
            
        })       
        if (!studentCautat) {   
            console.log("Nu exista student cu acest id!");
            return res.sendStatus(404);
        }
        
        let student = await User.findOne({
            "_id": idS,
            "Rol_student.Doleante._id" :idD
        })    
        
        if (!student) {
            console.log("Nu exista student cu acest id pentru doleanta!")
            return res.sendStatus(404);
        }

        if (!content.hasOwnProperty("Categorie") || !content["Categorie"]) {
            console.log("Tipul cererii este un camp obligatoriu de completat!")
            return res.sendStatus(204);
        } 
        else {
            if (!content.hasOwnProperty("Descriere") || !content["Descriere"]) {
                console.log("O descriere pentru cerere este un camp obligatoriu de completat!")
                return res.sendStatus(204);
            }
        }
            
       
        return res.json(await updateDoleante(req.body, req.params.idStudent, req.params.idDoleanta))
    }
    catch(error) {
        console.log(error.message)
        return res.send(500).json( "Internal server error!" );
    }
})
// ##########################  CREARE DOLEANTA ##################################

async function creareDoleanta(content, idStudent) {
    var studentCautat = await User.findOne({
        "_id": idStudent      
    }) 
    content["Data_reclamatie"] = new Date();
    studentCautat.Rol_student.Doleante.push(content)
    console.log(studentCautat.Rol_student.Doleante)
    return studentCautat.save()  
}

router.route('/creareDoleanta/:idStudent').put(async(req,res) => {
    try {   
        var idS = req.params.idStudent;
        var content = req.body;
        let studentCautat = await User.findOne({
            "_id": idS
        })       
        if (!studentCautat) {   
            console.log("Nu exista student cu acest id");
            return res.sendStatus(404);
        }
        if (!content.hasOwnProperty("Categorie") || !content["Categorie"]) {
            console.log("Tipul cererii este un camp obligatoriu de completat!")
            return res.sendStatus(400);
        } 
        else {
            if (!content.hasOwnProperty("Descriere") || !content["Descriere"]) {
                console.log("O descriere aferenta cererii este un camp obligatoriu de completat!")
                return res.sendStatus(400);
            }
        }
        return res.json(await creareDoleanta(req.body,req.params.idStudent))
    }
    catch(error) {
        console.log(error.message)
        return res.send(500).json( "Internal server error!" );
    }
})
export default router;
// ################################ VOTEAZA ###############

router.route('/voteazaSef/:idStudentVotant/:idStudentCandidat').put(async(req,res) => {
   
    let studentVotant = await User.findOne({
        "_id": req.params.idStudentVotant
        
    })       
    if (!studentVotant) {   
        console.log("Nu exista student cu acest id");
        return res.sendStatus(404);
    }

    let studentCandidat = await User.findOne({
        "_id": req.params.idStudentCandidat
        
    })       
    if (!studentCandidat) {   
        console.log("Nu exista student cu acest id");
        return res.sendStatus(404);
    }

    if (studentVotant.Rol_student.Votat == true) {
        console.log("Acest student a votat deja!")
        return res.sendStatus(403);
    }
    
    if (studentVotant._id.equals(studentCandidat._id)) {
        console.log("Studentul nu se poate vota singur!")
        return res.sendStatus(403);
    }

    if (studentVotant.Rol_student.Camin!=studentCandidat.Rol_student.Camin) {
        console.log("Poti vota un candidat DOAR al caminului de care apartii si tu!")
        return res.sendStatus(403)
    }

    if (!studentCandidat.Rol_student.Candidat_sef.Voturi)
        studentCandidat.Rol_student.Candidat_sef.Voturi = 0;
    
    try {
        studentCandidat.Rol_student.Candidat_sef.Voturi++;
        studentVotant.Rol_student.Votat = true;
        studentVotant.save();
        return studentCandidat.save()
        
    }
    catch(err) {
        console.log("Something went wrong")
        return res.sendStatus(500)
    }
})

router.route('/emptyVotes/:idStudentVotant/:idStudentCandidat').put(async(req,res) => {
   
    let studentVotant = await User.findOne({
        "_id": req.params.idStudentVotant
        
    })       
    if (!studentVotant) {   
        console.log("Nu exista student cu acest id");
        return res.sendStatus(404);
    }
    
    let studentCandidat = await User.findOne({
        "_id": req.params.idStudentCandidat
        
    })       
    if (!studentCandidat) {   
        console.log("Nu exista student cu acest id");
        return res.sendStatus(404);
    }

    try {
        studentCandidat.Rol_student.Candidat_sef.Voturi = 0;
        console.log(studentCandidat)
        studentVotant.Rol_student.Votat = false;
        studentVotant.save();
        return studentCandidat.save()
        
    }
    catch(err) {
        console.log("Something went wrong")
        return res.sendStatus(500)
    }
})