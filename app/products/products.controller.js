const express = require('express');
const router = express.Router();
const productService = require('./products.service');

// routes
router.get('/brands/:id', getAllBrands);
router.get('/brand/:id/:uid', getBrandById);
router.delete('/brand/:id', deleteBrand);
router.post('/brand' ,createBrand);
router.post('/updatebrand' ,updateBrand);
router.get('/review', getAllRiviews);
router.get('/review/:id', getRiviewById);
router.delete('/review/:id', deleteRiview);
router.post('/review' ,createRiview);
router.post('/updatereview' ,updateRiview);
router.get('/deals/:id', getAllDeals);
router.get('/deal/:id', getDealById);
router.delete('/deal/:id', deleteDeal);
router.post('/deal' ,createDeal);
router.post('/updatedeal' ,updateDeal);
router.get('/category/:id', getAllCategory);
router.get('/category/:id', getCategoryById);
router.delete('/category/:id', deleteCategory);
router.post('/category' ,createCategory);
router.get('/categorywithdata' ,getAllCategorywithData);
// router.get('/subcategorywithdata/:id' ,getAllSubCategorywithData);
router.post('/subcategorywithdata' ,getAllSubCategorywithData);
router.post('/updatecategory' ,updateCategory);
router.get('/subcategory', getAllSubCategory);
router.get('/subcategory/:id', getSubCategoryById);
router.delete('/subcategory/:id', deleteSubCategory);
router.post('/subcategory' ,createSubCategory);
router.post('/updatesubcategory' ,updateSubCategory);
router.get('/subcategory1', getAllSubCategory1);
router.get('/subcategory1/:id', getSubCategory1ById);
router.delete('/subcategory1/:id', deleteSubCategory1);
router.post('/subcategory1' ,createSubCategory1);
router.post('/updatesubcategory1' ,updateSubCategory1);
router.get('/products/:id', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/brandproducts', getProductByBrand);
// router.get('/productsbyid/:id/:uid', getProductBySubId);
router.post('/productsbyid', getProductBySubId);
router.delete('/products/:id', deleteProduct);
router.post('/products' ,createProduct);
router.post('/updateproducts' ,updateProduct);
router.get('/wishlist', getAllWishlist);
router.get('/wishlist/:id', getWishlistById);
router.get('/userwishlist/:id', getUserWishlist);
router.delete('/wishlist/:id', deleteWishlist);
router.post('/wishlist' ,createWishlist);
router.get('/coupon', getAllCoupon);
router.get('/coupon/:id', getCouponById);
router.delete('/coupon/:id', deleteCoupon);
router.post('/coupon' ,createCoupon);
router.post('/updatecoupon' ,updateCoupon);
router.get('/addcart', getAllAddCart);
router.get('/addcart/:id', getAddCartById);
router.delete('/addcart/:id', deleteAddCart);
router.post('/addcart' ,createAddCart);
router.post('/updateaddcart' ,updateAddCart);
router.get('/buynows', getAllBuyNow);
router.get('/buynow/:id', getBuyNowById);
router.delete('/buynow/:id', deleteBuyNow);
router.post('/buynow' ,createBuyNow);
router.post('/updatebuynow' ,updateBuyNow);
router.post('/packs', getAllPacks);
router.get('/pack/:id', getPackById);
router.delete('/pack/:id', deletePack);
router.post('/pack' ,createPack);
router.post('/updatepack' ,updatePack);
router.get('/virals/:id', getAllVirals);
router.get('/viral/:id', getViralById);
router.delete('/viral/:id', deleteViral);
router.post('/viral' ,createViral);
router.post('/updateviral' ,updateViral);
router.post('/payss' ,Payss);


module.exports = router;

function createBrand(req, res, next) {
    productService.createBrand(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllBrands(req, res, next) {
    productService.getAllBrands(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getBrandById(req, res, next) {
    productService.getBrandById(req.params.id, req.params.uid)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteBrand(req, res, next) {
    productService.deleteBrand(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateBrand(req, res, next) {
    productService.updateBrand(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createRiview(req, res, next) {
    productService.createRiview(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllRiviews(req, res, next) {
    productService.getAllRiviews(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getRiviewById(req, res, next) {
    productService.getRiviewById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteRiview(req, res, next) {
    productService.deleteRiview(req.params.id)
    .then(products => res.json(products))
        .catch(err => next(err));
}

function updateRiview(req, res, next) {
    productService.updateRiview(req.body)
    .then(products => res.json(products))
        .catch(err => next(err));
}

function createDeal(req, res, next) {
    productService.createDeal(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllDeals(req, res, next) {
    productService.getAllDeals(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getDealById(req, res, next) {
    productService.getDealById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteDeal(req, res, next) {
    productService.deleteDeal(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateDeal(req, res, next) {
    productService.updateDeal(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createCategory(req, res, next) {
    productService.createCategory(req.body)
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getAllCategory(req, res, next) {
    productService.getAllCategory(req.params.id)
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getCategoryById(req, res, next) {
    productService.getCategoryById(req.params.id)
        .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteCategory(req, res, next) {
    productService.deleteCategory(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateCategory(req, res, next) {
    productService.updateCategory(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSubCategory(req, res, next) {
    productService.createSubCategory(req.body)
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getAllCategorywithData(req, res, next) {
    productService.getAllCategorywithData()
    .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
    .catch(err => next(err));
}

function getAllSubCategorywithData(req, res, next) {
    productService.getAllSubCategorywithData(req.body)
    .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
    .catch(err => next(err));
}

function getAllSubCategory(req, res, next) {
    productService.getAllSubCategory()
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getSubCategoryById(req, res, next) {
    productService.getSubCategoryById(req.params.id)
        .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSubCategory(req, res, next) {
    productService.deleteSubCategory(req.params.id)
        .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateSubCategory(req, res, next) {
    productService.updateSubCategory(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSubCategory1(req, res, next) {
    productService.createSubCategory1(req.body)
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getAllSubCategory1(req, res, next) {
    productService.getAllSubCategory1()
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getSubCategory1ById(req, res, next) {
    productService.getSubCategory1ById(req.params.id)
        .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSubCategory1(req, res, next) {
    productService.deleteSubCategory1(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSubCategory1(req, res, next) {
    productService.updateSubCategory1(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createProduct(req, res, next) {
    productService.createProduct(req.body)
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getAllProducts(req, res, next) {
    productService.getAllProducts(req.params.id)
        .then(categoy => res.json(categoy))
        .catch(err => next(err));
}

function getProductById(req, res, next) {
    productService.getProductById(req.params.id)
        .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
        .catch(err => next(err));
}

function getProductByBrand(req, res, next) {
    productService.getProductByBrand(req.body)
        .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
        .catch(err => next(err));
}

function getProductBySubId(req, res, next) {
    productService.getProductBySubId(req.body)
        .then(categoy => categoy ? res.json(categoy) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteProduct(req, res, next) {
    productService.deleteProduct(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProduct(req, res, next) {
    productService.updateProduct(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createWishlist(req, res, next) {
    productService.createWishlist(req.body)
        .then(wishlist => res.json(wishlist))
        .catch(err => next(err));
}

function getAllWishlist(req, res, next) {
    productService.getAllWishlist()
        .then(wishlist => res.json(wishlist))
        .catch(err => next(err));
}

function getWishlistById(req, res, next) {
    productService.getWishlistById(req.params.id)
        .then(wishlist => wishlist ? res.json(wishlist) : res.sendStatus(404))
        .catch(err => next(err));
}

function getUserWishlist(req, res, next) {
    productService.getUserWishlist(req.params.id)
        .then(wishlist => wishlist ? res.json(wishlist) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteWishlist(req, res, next) {
    productService.deleteWishlist(req.params.id)
    .then(wishlist => wishlist ? res.json(wishlist) : res.sendStatus(404))
        .catch(err => next(err));
}

function createCoupon(req, res, next) {
    productService.createCoupon(req.body)
        .then(coupon => res.json(coupon))
        .catch(err => next(err));
}

function getAllCoupon(req, res, next) {
    productService.getAllCoupon()
        .then(coupon => res.json(coupon))
        .catch(err => next(err));
}

function getCouponById(req, res, next) {
    productService.getCouponById(req.params.id)
        .then(coupon => coupon ? res.json(coupon) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteCoupon(req, res, next) {
    productService.deleteCoupon(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateCoupon(req, res, next) {
    productService.updateCoupon(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createAddCart(req, res, next) {
    productService.createAddCart(req.body)
        .then(addcart => res.json(addcart))
        .catch(err => next(err));
}

function getAllAddCart(req, res, next) {
    productService.getAllAddCart()
        .then(addcart => res.json(addcart))
        .catch(err => next(err));
}

function getAddCartById(req, res, next) {
    productService.getAddCartById(req.params.id)
        .then(addcart => addcart ? res.json(addcart) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteAddCart(req, res, next) {
    productService.deleteAddCart(req.params.id)
        .then(buynow => res.json(buynow))
        .catch(err => next(err));
}

function updateAddCart(req, res, next) {
    productService.updateAddCart(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createBuyNow(req, res, next) {
    productService.createBuyNow(req.body)
        .then(buynow => res.json(buynow))
        .catch(err => next(err));
}

function getAllBuyNow(req, res, next) {
    productService.getAllBuyNow()
        .then(buynow => res.json(buynow))
        .catch(err => next(err));
}

function getBuyNowById(req, res, next) {
    productService.getBuyNowById(req.params.id)
        .then(buynow => buynow ? res.json(buynow) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteBuyNow(req, res, next) {
    productService.deleteBuyNow(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateBuyNow(req, res, next) {
    productService.updateBuyNow(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createViral(req, res, next) {
    productService.createViral(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllVirals(req, res, next) {
    productService.getAllVirals(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getViralById(req, res, next) {
    productService.getViralById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteViral(req, res, next) {
    productService.deleteViral(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateViral(req, res, next) {
    productService.updateViral(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createPack(req, res, next) {
    productService.createPack(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllPacks(req, res, next) {
    productService.getAllPacks(req.body)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getPackById(req, res, next) {
    productService.getPackById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deletePack(req, res, next) {
    productService.deletePack(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updatePack(req, res, next) {
    productService.updatePack(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function Payss(req, res, next) {
    productService.Payss(req.body)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}
