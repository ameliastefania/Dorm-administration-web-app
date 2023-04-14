import User from "../../collection/User.js";
import express from "express"
let router = express.Router();
import * as utils from '../../utils/Liste.js'
// ############################## UPDATE VECTOR DOLEANTE #########################

async function updateDoleanteByAdmin(content, idStudent, idDoleanta) {    

    const student = await User.findOne({
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
        // admin should be allowed to modify
        // only these properties
        student.Rol_student.Doleante[indice].Status_cerere = content.Status_cerere;
        student.Rol_student.Doleante[indice].Comentarii = content.Comentarii;
        student.Rol_student.Doleante[indice].Data_solutionare = new Date();
        student.save();
        
        var continutModificat = {
            "Status_cerere" : content.Status_cerere,
            "Comentarii" : content.Comentarii,
            "Data_solutionare" : new Date()
        }
        return continutModificat;
       
    }
    catch(err) {
        console.log("Internal server error")
    }
}

router.route('/updateDoleanteByAdmin/:idAdminLogat/:idStudent/:idDoleanta').put(async(req,res) => {
    try {   
        var idAdm = req.params.idAdminLogat;
        var idS = req.params.idStudent;
        var idD = req.params.idDoleanta;
        var content = req.body;
        var statusCerere_valoriAcceptate = utils.listaStatusCereri;

        var adminLogat =await User.findOne({
            "_id": idAdm
        })       

        if (!adminLogat) {
            console.log("Nu exista admin cu acest id!");
            return res.sendStatus(404);
        }
        
        var studentCautat = await User.findOne({
            "_id": idS
            
        })       
        if (!studentCautat) {   
            console.log("Nu exista student cu acest id!");
            return res.sendStatus(404);
        }
        
        var student = await User.findOne({
            "_id": idS,
            "Rol_student.Doleante._id" :idD
        })    
        
        if (!student) {
            console.log("Nu exista student cu acest id pentru doleanta!")
            return res.sendStatus(404);
        }

        if (!content.hasOwnProperty("Status_cerere") ) {
            console.log("Statusul cererii este un camp obligatoriu de completat!")
            return res.sendStatus(204);
        } else 
            {
                let contor = 0;
                for (let i=0;i<statusCerere_valoriAcceptate.length;i++) {
                    if (content["Status_cerere"] === statusCerere_valoriAcceptate[i]) {
                        contor = 1;
                    }
                }
                if (!contor) {
                    return res.sendStatus(403);
                }
                
            }
            
       
        return res.json(await updateDoleanteByAdmin(req.body, req.params.idStudent, req.params.idDoleanta))
    }
    catch(error) {
        console.log(error.message)
        return res.send(500).json( "Internal server error!" );
    }
})

export default router;