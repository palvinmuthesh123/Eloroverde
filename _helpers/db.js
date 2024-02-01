const config = require('config.json'); //local
// const config = require('config-prod.json'); //prod
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../app/users/user.model'),
    Requests: require('../app/users/requests.model'),
    Chat: require('../app/users/chat.model'),
    Brand: require('../app/products/brand.model'),
    Deals: require('../app/products/deals.model'),
    Category: require('../app/products/category.model'),
    Test: require('../app/products/test.model'),
    SubCategory: require('../app/products/subcategory.model'),
    SubCategorys: require('../app/products/subcategorys.model'),
    Products: require('../app/products/products.model'),
    Wishlist: require('../app/products/wishlist.model'),
    Coupon: require('../app/products/coupon.model'),
    Cmss: require('../app/cms/cms.model'),
    Support: require('../app/cms/support.model'),
    Games: require('../app/games/games.model'),
    Cart: require('../app/products/addcart.model'),
    Buy: require('../app/products/buynow.model'),
    GameWinner: require('../app/games/gamewinner.model'),
    Notification: require('../app/notification/notification.model'),
    Sends: require('../app/sendmail/sends.model'),
    Packs: require('../app/products/packs.model'),
    Virals: require('../app/products/virals.model'),
    Stats: require('../app/home/stats.mode'),
    Language: require('../app/users/language.model'),
    Address: require('../app/users/address.model'),
    Review: require('../app/products/review.model'),
};