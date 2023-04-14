import User from "../../collection/User.js";
import express from "express"
let router = express.Router();
import * as utils from '../../utils/Liste.js'

// ######################## GET STUDENTI ##################

router.route('/getStudenti/:idAdminLogat').get(async (req,res) => {
    
    if (req.params.idAdminLogat.length === 24) {
        var adminLogat = await User.findOne({
            "_id" : req.params.idAdminLogat
        })
        if (!adminLogat) {
            return res.json({ 'error': 'Nu exista niciun user cu acest id!' });
        }
    }

    const user = await User.find();
    var listaStudenti = [];

    if (user.Adresa_email === null) {
        return res.status(204).json({ 'error': 'Nu exista niciun user in baza de date' });
    }

    for (let i=0;i<user.length;i++) {
        if (user[i].Rol_student.Camin === adminLogat.Rol_admin_camin.Camin_administrat) {
            listaStudenti.push(user[i])
        }
    }

    return res.json({listaStudenti})
})

router.route('/getListaStatusCereri/:idAdminLogat').get(async (req,res) => {
    
    if (req.params.idAdminLogat.length === 24) {
        var adminLogat = await User.findOne({
            "_id" : req.params.idAdminLogat
        })
        if (!adminLogat) {
            return res.sendStatus(404)
        }
    }
    var listaStatusCereri = utils.listaStatusCereri
    return res.json({listaStatusCereri});
})

export default router;

