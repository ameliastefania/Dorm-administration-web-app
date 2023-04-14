import User from "../../collection/User.js";
import express from "express"
let router = express.Router();

// #################################### DELETE USER DUPA ID #############################33

router.route('/deleteUser/:idUser').delete(async (req,res) => {

    var idU = req.params.idUser;
    const deletedUser = await User.findOne({
        "_id" : idU
    })

    if (!deletedUser) {    
        console.log("Nu exista studentul cu acest id!")
        return res.sendStatus(404);
    }
        
    deletedUser.deleteOne({ 
        "_id": idU 
    });

    return res.json({"message":"Utilizatorul cu acest id a fost sters definitiv din baza de date"});   
})
export default router