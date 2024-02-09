const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../app/users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/static',
            '/user/login',
            '/cms/cms',
            '/sends',
            '/user/register',
            '/user/settings/all',
            '/user/update/password',
            '/brands/',
            '/deals/',
            '/category/',
            '/virals/',
            '/subcategorywithdata/',
            '/subcategory/',
            '/subcategory1/',
            '/products/',
            '/pack/',
            '/categorywithdata',
            /static/
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};