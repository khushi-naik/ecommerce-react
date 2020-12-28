import jsonwebtoken from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
    return jsonwebtoken.sign(user, config.JWT_SECRET, {
        expiresIn: '24h'
    })
}

export { getToken };