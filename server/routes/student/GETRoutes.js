import User from "../../collection/User.js";
import express from "express"
let router = express.Router();

// ###################################  GET CANDIDATI #######################################
router.route('/getCandidati/:idStudentLogat').get(async (req,res) => {
    if (req.params.idStudentLogat.length === 24) {
        var studentLogat = await User.findOne({
            "_id" : req.params.idStudentLogat
        })
        if (!studentLogat) {
            return res.json({ 'error': 'Nu exista niciun user cu acest id!' });
        }
    }

    const user = await User.find();
    if (user.Adresa_email === null) {
        return res.status(204).json({ 'error': 'Nu exista niciun user in baza de date' });
    }

    let listaCandidati = []
    for (let i=0;i<user.length;i++) {
        if (!user[i].Rol_student) {
            console.log("Userul nu e student!")
        }
        else {
                if (user[i]._id.equals(studentLogat._id)) {
                    console.log("Nu se poate vota singur")
                   
                } else {
                    if (user[i].Rol_student.Camin === studentLogat.Rol_student.Camin && user[i].Rol_student.Candidat_sef.Descriere_personala !== undefined ) {
                        listaCandidati.push(user[i])
                    } 
                }   
            }
        }
    return res.json({listaCandidati})
})

// ###################################  GET ALL USERS #######################################
router.route('/getUsers').get(async (req,res) => {
    const user = await User.find();
    if (user.Adresa_email === null) {
        return res.status(204).json({ 'error': 'Nu exista niciun user in baza de date' });
    }
    return res.json(user);
})

// ######################################## GET USER BY ID ####################################
router.route('/getUserById/:idUser').get(async (req,res) => {
    console.log("back getuser")
    
    try {   
        
        const user = await User.findOne({
            "_id" : req.params.idUser
        })
        if (user) {
            return res.json(user);     
        }
        else {
            
            return res.json({ 'error': 'Nu exista niciun user cu acest id!' });
        }
    }
    catch(err) {
        console.log(err)
    }
    

})

// ######################################## GET DOLEANTE ############################3
router.route('/getDoleante/:idUser').get(async (req,res) => {
    console.log("back getDoleante")
    if (req.params.idUser.length === 24) {
        const user = await User.findOne({
            "_id" : req.params.idUser
        })
        if (user) {
            return res.json(user.Rol_student.Doleante);     
        }
        else {
            return res.json({ 'error': 'Nu exista niciun user cu acest id!' });
        }
    } 
    else {
        return res.json({ 'error': 'Formatul id-ului nu este respectat!' });
    }

})

// ################################# GET DOLEANTE 6 months ####################3
async function getDoleanteSortate(idStudent) {
    let studentCautat = await User.findOne({
        "_id": idStudent
    })
    if (!studentCautat) {   
        console.log("Nu exista student cu acest id");
        return;
    }
    let doleante = studentCautat.Rol_student.Doleante;
    let listaCereriNoi = []
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        console.log(sixMonthsAgo)
       
        for (let i=0;i<doleante.length;i++) {
            if(+sixMonthsAgo < +doleante[i].Data_reclamatie) {
                listaCereriNoi.push(doleante[i])
            } 
        }
        // console.log(listaCereriNoi)
        // return listaCereriNoi
        studentCautat.Rol_student.Doleante = listaCereriNoi;
        return studentCautat.Rol_student.Doleante
    }
    catch(err) {
        console.log("Eroare")
    }
}
router.route('/getDoleanteSortate/:idStudent').get(async(req,res) => {
    try {   
        return res.json(await getDoleanteSortate(req.params.idStudent))
    }
    catch(error) {
        console.log(error.message)
        return res.send(500).json( "Internal server error!" );
    }
})
export default router;