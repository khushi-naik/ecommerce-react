import jsonwebtoken from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
    return jsonwebtoken.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '24h',
    })
};

const isAuth = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jsonwebtoken.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if(err){
                return res.status(401).send({msg: 'Invalid Token'});
            }
            req.user = decode;
            next();
            return;
        })

    } 
    else{
        return res.status(401).send({msg: 'Token not supplied'});
    }
    
}

const isAdmin = (req, res, next) => {
    console.log(req.user);
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg: 'Admin token is not valid'});
}

export { getToken, isAuth, isAdmin };