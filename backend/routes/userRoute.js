import express from 'express';
import User from '../models/user'
import { getToken, isAuth } from '../util';

const router = express.Router();

router.put("/:id", async (req, res) => {    
    const userId =  req.params.id;
    const user = await User.findById(userId);
    if(user){
        user.name = req.body.name;
        user.email = req.body.email;
     
        const updatedProfile = await user.save();
    if(updatedProfile){
       return res.status(200).send({
        _id: updatedProfile.id,
        name: updatedProfile.name,
        email: updatedProfile.email,
        isAdmin: updatedProfile.isAdmin,
        token: getToken(updatedProfile),
        });
    }
    }
    
    
   return res.status(500).send({ message: "Error occured during an attempt to update profile" })
})

router.post('/signin', async (req,res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        })
    }
    else{
        res.status(401).send({msg: 'Entered Password or E-mail is invalid!'});
    }
})

router.post('/register', async (req,res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    const newUser = await user.save()
    
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        })
    }
    else{
        res.status(401).send({msg: 'User Data is invalid!'});
    }
})

router.get("/createadmin", async (req,res) => {
  try{
    const user = new User({
        name: 'Khushi',
        email: 'naik.khushi5423@gmail.com',
        password: '1234',
        IAMadmin: true
    });

    const newUser = await user.save();
    res.send(newUser);
  }
  catch(error){
      res.send({msg: error.message})
  }
})    

export default router;