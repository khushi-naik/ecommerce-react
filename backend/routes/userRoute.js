import express from 'express';
import User from '../models/user'

const router = express.Router();

router.post('/signin', async (req,res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(signinUser){
        res.send({
            id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            IAMadmin: signinUser.IAMadmin,
            token: getToken(user)
        })

    }
    else{
        res.status(401).send({msg: 'Entered Password or E-mail is invalid!'});
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