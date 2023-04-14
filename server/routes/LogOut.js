import User from '../collection/User.js'
import express from "express"
let router=  express.Router();

 router.route('/logOut').get( async (req, res) => {
    // On client, also delete the accessToken
   
    const cookies = req.cookies;
  
    if (!req.cookies.jwt)  {
        console.log('Cookie-ul nu exista')
        return res.sendStatus(404)
    }
   
    const refreshToken =  cookies.jwt;

    const userGasit =  await User.findOne({ 
        "RefreshToken": refreshToken })

    if (!userGasit) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        console.log("Cookie-ul nu este valid")
        return res.sendStatus(403)
    }

    // Delete refreshToken in db
    userGasit.RefreshToken = '';
    const result = await userGasit.save(); 

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    
    res.json({"message": "Log out successfully"})

});

export default router;