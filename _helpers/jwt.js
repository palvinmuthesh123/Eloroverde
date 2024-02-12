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
            '/products/brands/id',
            '/products/deals/id',
            '/products/category/id',
            '/products/virals/id',
            '/products/subcategorywithdata',
            '/products/subcategory/',
            '/products/subcategory1/',
            '/products/products/id',
            '/products/productsbyid',
            '/products/pack/id',
            '/products/categorywithdata',
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