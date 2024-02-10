const db = require('_helpers/db');
const Brand = db.Brand;
const Deals = db.Deals;
const Category = db.Category
const SubCategory = db.SubCategory
const SubCategorys = db.SubCategorys
const Products = db.Products
const Wishlist = db.Wishlist
const Coupon = db.Coupon
const Cart = db.Cart
const Buy = db.Buy
const Packs = db.Packs
const Virals = db.Virals
const Test = db.Test
const User = db.User;
const Review = db.Review
const fetch = require('node-fetch');
const Language = db.Language
const Decimal = require('decimal.js')
// const {
//     createRedsysAPI,
//     SANDBOX_URLS,
//     // Formatter utils
//     useSingleInputFormatter,
//     useOutputFormatter,
//     usePromiseOutputFormatter,
//     // Input formatters
//     redirectInputFormatter,
//     restIniciaPeticionInputFormatter,
//     restTrataPeticionInputFormatter,
//     // Output formatters
//     restNotificationOutputFormatter,
//     soapNotificationOutputFormatter,
//     restIniciaPeticionOutputFormatter,
//     restTrataPeticionOutputFormatter,
//     TRANSACTION_TYPES,
//     randomTransactionId,
//     isResponseCodeOk,
//     CURRENCIES
// } = require('redsys-easy')

// const {
//     restIniciaPeticion: baseRestIniciaPeticion,
//     restTrataPeticion: baseRestTrataPeticion,
//     createRedirectForm: baseCreateRedirectForm,
//     processRestNotification: baseProcessRestNotification,
//     processSoapNotification: baseProcessSoapNotification
// } = createRedsysAPI({
//     secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
//     urls: SANDBOX_URLS
// });

const RedSys = require('redsys-pos');
const { CURRENCIES, TRANSACTION_TYPES } = RedSys;

const MERCHANT_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // TESTING KEY
const redsys = new RedSys(MERCHANT_KEY);

module.exports = {
    createBrand,
    getAllBrands,
    getBrandById,
    deleteBrand,
    updateBrand,
    createRiview,
    getAllRiviews,
    getRiviewById,
    deleteRiview,
    updateRiview,
    createDeal,
    getAllDeals,
    getDealById,
    deleteDeal,
    createCategory,
    getAllCategory,
    getCategoryById,
    deleteCategory,
    getAllCategorywithData,
    createSubCategory,
    getAllSubCategory,
    getSubCategoryById,
    deleteSubCategory,
    createSubCategory1,
    getAllSubCategory1,
    getSubCategory1ById,
    deleteSubCategory1,
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateDeal,
    updateCategory,
    updateSubCategory,
    updateSubCategory1,
    updateProduct,
    createWishlist,
    getAllWishlist,
    getWishlistById,
    getUserWishlist,
    deleteWishlist,
    createCoupon,
    getAllCoupon,
    getCouponById,
    deleteCoupon,
    updateCoupon,
    createAddCart,
    getAllAddCart,
    getAddCartById,
    deleteAddCart,
    updateAddCart,
    createBuyNow,
    getAllBuyNow,
    getBuyNowById,
    deleteBuyNow,
    updateBuyNow,
    getAllSubCategorywithData,
    getProductBySubId,
    createPack,
    getAllPacks,
    getPackById,
    deletePack,
    updatePack,
    createViral,
    getAllVirals,
    getViralById,
    deleteViral,
    updateViral,
    Payss,
    getProductByBrand
};

const urls = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q='

async function langConv(val, con) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
    var arr = []
    for(var i = 0; i<val.length; i++)
    {
        var dat = val[i];
        for (key in con) {
            console.log(key, dat[key]);
            let fetchRes = fetch(urls+encodeURI(dat[key]),options);
            await fetchRes.then(res => res.json()).then(d => {
                dat[key] = d[0][0][0]
            })
        }
        arr.push(dat);
    }
    return arr
}

async function createBrand(contents) {
    const brand = new Brand(contents);
    await brand.save();
    return { success: true, message: "Brand Added Successfully" };
}

async function getAllBrands(id) {
    const datas = await Brand.find().select('-hash');
    var data = datas
    if(!id.includes("id"))
    {
        var par = {'name':''}
        const convData = await langConv(await Brand.find().select('-hash'), par)
        const lang = await Language.find({uid: id}).select('-hash');
    if(lang[0].english)
    {
        data = datas
    }
    else if(!lang[0].english)
    {
        data = convData
    }
    else
    {
        data = datas
    }
        return {success: true, data}
    }
    else
    {
        return {success: true, datas}
    }
}

async function getBrandById(id, uid) {
    const brand = await Brand.findById(id).select('-hash').lean();
    if (!brand)
        return { error: true, message: "Brand not found" };
    else
    {
        var par = {'name':''}
        const convData = await langConv([brand], par)
        const datas = brand;
        const lang = await Language.find({uid: uid}).select('-hash');
        var data = datas
        if(lang[0].english)
        {
            data = datas
        }
        else if(!lang[0].english)
        {
            data = convData
        }
        else
        {
            data = datas
        }
        return {success: true, data : data[0]}
    }
}

async function deleteBrand(id) {
    await Brand.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateBrand(data) {
    // console.log(id);
    const brand = await Brand.findById(data.id);
    // validate
    if (brand) {
        // Object.assign(brand, {address: data.add});
        let keys = Object.keys(data.new)
        keys.map(x=>{
            brand[x] =  data.new[x]
        })
        await brand.save();
    }
}

async function createDeal(contents) {
    const deal = new Deals(contents);
    await deal.save();
    return { success: true, message: "Deal Added Successfully" };
}

async function getAllDeals(id) {
    const datas = await Deals.find().select('-hash');
    var data = datas
    if(!id.includes("id"))
    {
        var par = {'name':''}
        const convData = await langConv(await Deals.find().select('-hash'), par)
        const lang = await Language.find({uid: id}).select('-hash');
        
        if(lang[0].english)
        {
            data = datas
        }
        else if(!lang[0].english)
        {
            data = convData
        }
        else
        {
            data = datas
        }
        return {success: true, data}
    }
    else
    {
        return {success: true, data}
    }
}

async function getDealById(id) {
    const deal = await Deals.findById(id).select('-hash').lean();
    if (!deal)
        return { error: true, message: "Deal not found" };
    const stats = await Deals.findOne({ _id: id }).lean();
    return { success: true, deals: { ...deal, ...stats } };
}

async function deleteDeal(id) {
    await Deals.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateDeal(data) {
    // console.log(id);
    const deals = await Deals.findById(data.id);
    // validate
    if (deals) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            deals[x] =  data.new[x]
        })
        await deals.save();
    }
}

async function createCategory(contents) {
    const category = new Category(contents);
    await category.save();
    return { success: true, message: "Category Added Successfully" };
}

async function getAllCategory(id) {
    // return await Category.find().select('-hash');
    const datas = await Category.find().select('-hash');
    var data = datas
    if(!id.includes("id"))
    {
        var par = {'name':'', 'stock': ''}
        const convData = await langConv(await Category.find().select('-hash'), par)
        
        const lang = await Language.find({uid: id}).select('-hash');
        
        if(lang[0].english)
        {
            data = datas
        }
        else if(!lang[0].english)
        {
            data = convData
        }
        else
        {
            data = datas
        }
        return {success: true, data}
    }
    else
    {
        return {success: true, data}
    }
}

async function getAllCategorywithData() {
    const cate = await Category.find().select('-hash');
    // console.log(cate,"CCCCCCCCCCCCCCCCc")
    var data = [];
    for(var i = 0; i<cate.length; i++)
    {
        const category = await Category.findById(cate[i]._id).select('-hash').lean();
        const subcategory = await SubCategory.find({categoryId: cate[i]._id}).select('-hash').lean();
        data.push({
            category: category,
            subcategory: subcategory
        })
    }
    // console.log(data,"AAAAAAAAAAAAAAAa")
    return { success: true, data };
}

async function getAllSubCategorywithData(id) {
    const subcategory = await SubCategory.findById({_id: id.id}).select('-hash').lean();
    const subcategorys = await SubCategorys.find({subCategoryId: id.id}).select('-hash').lean();

    const data = {subcategory: subcategory, subcategorys: subcategorys}

    return { success: true, data };
}

async function getCategoryById(id) {
    const category = await Category.findById(id).select('-hash').lean();
    if (!category)
        return { error: true, message: "Category not found" };
    const stats = await Category.findOne({ _id: id }).lean();
    return { success: true, category: { ...category, ...stats } };
}

async function deleteCategory(id) {
    await Category.findByIdAndRemove(id);
    return { success: true, message:"Category Successfully Deleted" };
}

async function updateCategory(data) {
    const category = await Category.findById(data.id);
    // validate
    if (category) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            category[x] = data.new[x]
        })
        await category.save();
    }
}

async function createSubCategory(contents) {
    const subcategory = new SubCategory(contents);
    await subcategory.save();
    return { success: true, message: "Sub Category Added Successfully" };
}

async function getAllSubCategory() {
    return await SubCategory.find().select('-hash');
}

async function getSubCategoryById(id) {
    const subcategory = await SubCategory.findById(id).select('-hash').lean();
    if (!subcategory)
        return { error: true, message: "Sub Category not found" };
    const stats = await SubCategory.findOne({ _id: id }).lean();
    return { success: true, subcategory: { ...subcategory, ...stats } };
}

async function deleteSubCategory(id) {
    await SubCategory.findByIdAndRemove(id);
    return { success: true, message:"Category Successfully Deleted" };
}

async function updateSubCategory(data) {
    const subcategory = await SubCategory.findById(data.id);
    // validate
    if (subcategory) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            subcategory[x] =  data.new[x]
        })
        await subcategory.save();
    }
}

async function createSubCategory1(contents) {
    const subcategory1 = new SubCategorys(contents);
    await subcategory1.save();
    return { success: true, message: "Sub Category1 Added Successfully" };
}

async function getAllSubCategory1() {
    return await SubCategorys.find().select('-hash');
}

async function getSubCategory1ById(id) {
    const subcategory1 = await SubCategorys.findById(id).select('-hash').lean();
    if (!subcategory1)
        return { error: true, message: "Category not found" };
    const stats = await SubCategorys.findOne({ _id: id }).lean();
    return { success: true, subcategorys: { ...subcategory1, ...stats } };
}

async function deleteSubCategory1(id) {
    await SubCategorys.findByIdAndRemove(id);
    return { success: true, message:"Sub Category1 Successfully Deleted" };
}

async function updateSubCategory1(data) {
    const subcategory1 = await SubCategorys.findById(data.id);
    // validate
    if (subcategory1) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            subcategory1[x] =  data.new[x]
        })
        await subcategory1.save();
    }
}

async function createProduct(contents) {
    const products = new Products(contents);
    await products.save();
    return { success: true, message: "Product Added Successfully" };
}

async function getAllProducts(id) {
    return await Products.find().select('-hash');
}

async function getProductById(id) {
    const products = await Products.findById(id).select('-hash').lean();
    if (!products)
        return { error: true, message: "Product not found" };
    const stats = await Products.findOne({ _id: id }).lean();
    return { success: true, products: { ...products, ...stats } };
}

async function getProductByBrand(id) {
    const products = await Products.find({brand: id}).select('-hash').lean();
    if (products.length==0)
        return { success: false, message: "Product not found" };
    else
        return { success: true, products };
}

async function getProductBySubId(id, uid) {
    const products = await Products.find({subCategory1Id: id}).select('-hash').lean();
    var arr = [];
    for(var i = 0; i<products.length; i++)
    {
        var wish = await Wishlist.find({uid: uid , productId: products[i]._id })
        var rev = await Review.find({ productId: products[i]._id })
        arr.push({
            _id: products[i]._id,
            name: products[i].name,
            title: products[i].title,
            description: products[i].description,
            quantity: products[i].quantity,
            purchaseprice: products[i].purchaseprice,
            sku: products[i].sku,
            retailprice: products[i].retailprice,
            image: products[i].image,
            createdDate: products[i].createdDate,
            categoryId: products[i].categoryId,
            subCategoryId: products[i].subCategoryId,
            subCategory1Id: products[i].subCategory1Id,
            brand: products[i].brand,
            wish: wish.length!=0 ? true : false,
            wishid: wish.length!=0 ? wish[0]._id : '' 
        })
    }
    return { success: true, arr };
}

async function deleteProduct(id) {
    await Products.findByIdAndRemove(id);
    return { success: true, message:"Product Successfully Deleted" };
}

async function updateProduct(data) {
    const product = await Products.findById(data.id);
    // validate
    if (product) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            product[x] =  data.new[x]
        })
        await product.save();
    }
}

async function createWishlist(contents) {
    const wishlist = await Wishlist.find({uid: contents.uid, productId: contents.productId}).select('-hash').lean();
    if(wishlist.length==0)
    {
        const wishlist = new Wishlist(contents);
        await wishlist.save();
        return { success: true, message: "Wishlist Added Successfully" };
    }
    else
    {
        return { success: false, message: "This Product has been Already Added" };
    }
}

async function getAllWishlist() {
    return await Wishlist.find().select('-hash');
}

async function getWishlistById(id) {
    const wishlist = await Wishlist.findById(id).select('-hash').lean();
    if (!wishlist)
        return { error: true, message: "Wishlist not found" };
    const stats = await Wishlist.findOne({ _id: id }).lean();
    return { success: true, wishlist: { ...wishlist, ...stats } };
}

async function getUserWishlist(id) {
    const wishlist = await Wishlist.find({uid: id}).select('-hash').lean();
    var data = [];
    if (!wishlist)
    {
        return { success: false, message: "Wishlist not found" };
    }
    else
    {
        for(var i = 0; i<wishlist.length; i++)
        {
            var pro = await Products.find({_id: wishlist[i].productId}).select('-hash').lean()
            var p = []

            if(pro.length!=0)
            {
                p = pro
            }
            else
            {
                p = await Packs.find({_id: wishlist[i].productId}).select('-hash').lean()
            }

            data.push({
                _id: wishlist[i]._id,
                uid: wishlist[i].uid,
                productId: wishlist[i].productId,
                productDetail: p[0]
            })
        }
    return { success: true, data };
    }
}

async function deleteWishlist(id) {
    await Wishlist.findByIdAndRemove(id);
    return { success: true, message:"Wishlist Successfully Deleted" };
}

async function createCoupon(contents) {
    const coupon = new Coupon(contents);
    await coupon.save();
    return { success: true, message: "Coupon Added Successfully" };
}

async function getAllCoupon() {
    return await Coupon.find().select('-hash');
}

async function getCouponById(id) {
    const coupon = await Coupon.findById(id).select('-hash').lean();
    if (!coupon)
        return { error: true, message: "Coupon not found" };
    const stats = await Coupon.findOne({ _id: id }).lean();
    return { success: true, coupon: { ...coupon, ...stats } };
}

async function deleteCoupon(id) {
    await Coupon.findByIdAndRemove(id);
    return { success: true, message:"Coupon Successfully Deleted" };
}

async function updateCoupon(data) {
    const coupon = await Coupon.findById(data.id);
    // validate
    if (coupon) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            coupon[x] = data.new[x]
        })
        await coupon.save();
    }
}

async function createRiview(contents) {
    const review = new Review(contents);
    await review.save();
    return { success: true, message: "Review Added Successfully" };
}

async function getAllRiviews() {
    return await Review.find().select('-hash');
}

async function getRiviewById(id) {
    const review = await Review.find({productId: id}).select('-hash').lean();
    var data = []
    if (review.length==0)
    {    
        return { success: false, message: "Review not found" };
    }
    else
    {
        for(var i = 0; i < review.length; i++)
        {
            var user_details = await User.find({_id: review[i].uid}).select('-hash').lean();

            data.push({                
                _id: review[i]._id,
                uid: review[i].uid,
                user_details: user_details,
                ratings: review[i].ratings,
                content: review[i].content,
                assets: review[i].assets,
                productId: review[i].productId,
                createdDate: review[i].createdDate,
                __v: review[i].__v
            })
        }
        return { success: true, data };
    }
}

async function deleteRiview(id) {
    await Review.findByIdAndRemove(id);
    return { success: true, message:"Review Successfully Deleted" };
}

async function updateRiview(data) {
    const review = await Review.findById(data.id);
    // validate
    if (review) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            review[x] = data.new[x]
        })
        await review.save();
    }
}

async function createAddCart(contents) {
    const cart = new Cart(contents);
    await cart.save();
    return { success: true, message: "Product Added to Cart Successfully" };
}

async function getAllAddCart() {
    return await Cart.find().select('-hash');
}

async function getAddCartById(id) {
    const cart = await Cart.find({ uid: id }).select('-hash').lean();
    var data = []
    for(var i = 0; i<cart.length; i++)
    {
        var prod = await Products.find({ _id: cart[i].productId }).select('-hash').lean()
        var prod1 = await Virals.find({ _id: cart[i].productId }).select('-hash').lean()
        var p = []
        if(prod.length!=0)
        {
            p = await Products.find({ _id: cart[i].productId }).select('-hash').lean()
        }
        else if(prod1.length!=0)
        {
            p = await Virals.find({ _id: cart[i].productId }).select('-hash').lean()
        }
        else
        {
            p = await Packs.find({ _id: cart[i].productId }).select('-hash').lean()
        }

        data.push({
            id: cart[i]._id,
            uid: cart[i].uid,
            quantity: cart[i].quantity,
            productId: cart[i].productId,
            price: cart[i].price,
            product_details: p
        })
    }
    if (data.length==0)
        return { success: false, message: "Product from Cart not found" };
    else
        return { success: true, data };
}

async function deleteAddCart(id) {
    const cart = await Cart.findById(id);
    if(cart)
    {
        await Cart.findByIdAndRemove(id);
        return { success: true, message:"Product from Cart Successfully Deleted" };
    }
    else
    {
        return { success: false, message:"Not able to delete" };
    }
    // await Cart.deleteMany({ uid: id }).then(function(){
    //     console.log("Data deleted"); // Success
    //     return { success: true, message:"Product from Cart Successfully Deleted" };
    // }).catch(function(error){
    //     console.log(error); // Failure
    //     return { success: true, message:"Not able to delete" };
    // }); 
}

async function updateAddCart(data) {
    const cart = await Cart.findById(data.id);
    // validate
    if (cart) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            cart[x] = data.new[x]
        })
        await cart.save();
    }
}

async function createBuyNow(contents) {
    const buynow = new Buy(contents);
    await buynow.save();
    return { success: true, message: "Order Placed Successfully" };
}

async function getAllBuyNow() {
    const orders = await Buy.find().select('-hash');
    var order = [];
    // var prod = [];
    if(orders.length!=0)
    {
    for(var i = 0; i<orders.length; i++)
    {
        // for(var j = 0;j<JSON.parse(orders[i].product).length; j++)
        // {
            // var pro = await Products.find({ _id: JSON.parse(orders[i].product)[j].productId }).select('-hash').lean()
            // var p = []
            // if(pro.length!=0)
            // {
            //     p = await Products.find({ _id: JSON.parse(orders[i].product)[j].productId }).select('-hash').lean()
            // }
            // else
            // {
            //     p = await Virals.find({ _id: JSON.parse(orders[i].product)[j].productId }).select('-hash').lean()
            // }
            // prod.push({
            //     price : JSON.parse(orders[i].product)[j].price,
            //     productId : JSON.parse(orders[i].product)[j].productId,
            //     product_details : p[0],
            //     quantity : JSON.parse(orders[i].product)[j].quantity,
            //     status : JSON.parse(orders[i].product)[j].status,
            //     uid: JSON.parse(orders[i].product)[j].uid
            // })
        // }
        order.push({
            status: orders[i].status,
            _id: orders[i]._id,
            uid: orders[i].uid,
            address: orders[i].address,
            coupon: orders[i].coupon,
            products: JSON.parse(orders[i].product),
            user_details: await User.find({ _id: orders[i].uid }).select('-hash').lean(),
            createdDate: orders[i].createdDate,
            __v: orders[i].__v,
            id: orders[i].id
        })
        // prod = [];
    }
        return { success: true, order };
    }
    else
    {
        return { success: false, message: "No Orders" };
    }
}

async function getBuyNowById(id) {
    const buynow = await Buy.find({uid: id}).select('-hash').lean();
    if (buynow.length==0)
        return { success: false, message: "Order not found", buynow };
    else
        return { success: true, buynow };
}

async function deleteBuyNow(id) {
    await Buy.findByIdAndRemove(id);
    return { success: true, message:"Order Successfully Deleted" };
}

async function updateBuyNow(data) {
    const buynow = await Buy.findById(data.id);
    // validate
    if (buynow) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            buynow[x] = data.new[x]
        })
        await buynow.save();
    }
}

async function createPack(contents) {
    const packs = new Packs(contents);
    await packs.save();
    return { success: true, message: "Packs Added Successfully" };
}

async function getAllPacks(uid) {
    // return await Packs.find().select('-hash');
    const datas = await Packs.find().select('-hash');
    var arr = [];
        for(var i = 0; i<datas.length; i++)
        {
        var wish = await Wishlist.find({uid: uid , productId: datas[i]._id })
        arr.push({
            _id: datas[i]._id,
            name: datas[i].name,
            image: datas[i].image,
            totalproduct: datas[i].totalproduct,
            stock: datas[i].stock,
            brand_name: datas[i].brand_name,
            desc: datas[i].desc,
            prize: datas[i].prize,
            wish: wish.length!=0 ? true : false,
            wishid: wish.length!=0 ? wish[0]._id : '',
            createdDate: datas[i].createdDate
        })
        }
        // datas = arr
        return { success: true, arr };
}

async function getPackById(id) {
    const packs = await Packs.findById(id).select('-hash').lean();
    if (!packs)
        return { error: true, message: "Packs not found" };
    const stats = await Packs.findOne({ _id: id }).lean();
    return { success: true, packs: { ...packs, ...stats } };
}

async function deletePack(id) {
    await Packs.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updatePack(data) {
    // console.log(id);
    const packs = await Packs.findById(data.id);
    // validate
    if (packs) {
        // Object.assign(packs, {address: data.add});
        let keys = Object.keys(data.new)
        keys.map(x=>{
            packs[x] =  data.new[x]
        })
        await packs.save();
    }
}

async function createViral(contents) {
    const virals = new Virals(contents);
    await virals.save();
    return { success: true, message: "Virals Added Successfully" };
}

async function getAllVirals(id) {
    if(!id.includes("id"))
    {
        var par = {'product_name':'', 'stock': ''}
        const convData = await langConv(await Virals.find().select('-hash'), par)
        const datas = await Virals.find().select('-hash');
        const lang = await Language.find({uid: id}).select('-hash');
        var data = datas
        if(lang[0].english)
        {
            var arr = [];
            for(var i = 0; i<datas.length; i++)
            {
            var wish = await Wishlist.find({uid: id , productId: datas[i]._id })
            arr.push({
                product_name: datas[i].product_name,
                image: datas[i].image,
                views: datas[i].views,
                stock: datas[i].stock,
                sku: datas[i].sku, 
                purchase_price: datas[i].purchase_price, 
                retail_price: datas[i].retail_price, 
                category: datas[i].category, 
                quantity: datas[i].quantity, 
                details: datas[i].details, 
                colors: datas[i].colors, 
                item_left: datas[i].item_left,
                wish: wish.length!=0 ? true : false,
                wishid: wish.length!=0 ? wish[0]._id : '', 
                createdDate: datas[i].createdDate
            })
            }
            data = arr
        }
        else if(!lang[0].english)
        {
            var arr = [];
            for(var i = 0; i<datas.length; i++)
            {
            var wish = await Wishlist.find({uid: id , productId: convData[i]._id })
            arr.push({
                product_name: convData[i].product_name,
                image: convData[i].image,
                views: convData[i].views,
                stock: convData[i].stock,
                sku: convData[i].sku, 
                purchase_price: convData[i].purchase_price, 
                retail_price: convData[i].retail_price, 
                category: convData[i].category, 
                quantity: convData[i].quantity, 
                details: convData[i].details, 
                colors: convData[i].colors, 
                item_left: convData[i].item_left,
                wish: wish.length!=0 ? true : false,
                wishid: wish.length!=0 ? wish[0]._id : '', 
                createdDate: convData[i].createdDate
            })
            }
            data = arr
        }
        else
        {
            // data = datas
            var arr = [];
            for(var i = 0; i<datas.length; i++)
            {
            var wish = await Wishlist.find({uid: id , productId: datas[i]._id })
            arr.push({
                product_name: datas[i].product_name,
                image: datas[i].image,
                views: datas[i].views,
                stock: datas[i].stock,
                sku: datas[i].sku, 
                purchase_price: datas[i].purchase_price, 
                retail_price: datas[i].retail_price, 
                category: datas[i].category, 
                quantity: datas[i].quantity, 
                details: datas[i].details, 
                colors: datas[i].colors, 
                item_left: datas[i].item_left,
                wish: wish.length!=0 ? true : false,
                wishid: wish.length!=0 ? wish[0]._id : '', 
                createdDate: datas[i].createdDate
            })
            }
            data = arr
        }
        return {success: true, data}
    }
    else
    {
        const datas = await Virals.find().select('-hash');
        var arr = datas
        return {success: true, arr}
    }
}

async function getViralById(id) {
    const virals = await Virals.findById(id).select('-hash').lean();
    if (!virals)
        return { error: true, message: "Virals not found" };
    const stats = await Virals.findOne({ _id: id }).lean();
    return { success: true, virals: { ...virals, ...stats } };
}

async function deleteViral(id) {
    await Virals.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateViral(data) {
    // console.log(id);
    const virals = await Virals.findById(data.id);
    // validate
    if (virals) {
        // Object.assign(virals, {address: data.add});
        let keys = Object.keys(data.new)
        keys.map(x=>{
            virals[x] =  data.new[x]
        })
        await virals.save();
    }
}

async function Payss(data) {
    // var obj = {
    //     amount: '100', // cents (in euro)
    //     orderReference: Date.now().toString(),
    //     merchantName: "INTEGRATION TEST SHOP",
    //     merchantCode: '240100131',
    //     currency: CURRENCIES.EUR,
    //     transactionType: TRANSACTION_TYPES.AUTHORIZATION, // '0'
    //     terminal: '1',
    //     merchantURL: 'http://www.my-shop.com/',
    //     successURL: 'http://localhost:8080/success',
    //     errorURL: 'http://localhost:8080/error'
    // }
    
        var obj = {
        amount: data.amount, // cents
        orderReference: parseInt(Math.random() * 10000000000).toString(),
        merchantName: "INTEGRATION TEST SHOP",
        merchantCode: "327234688",
        currency: RedSys.CURRENCIES.EUR,
        transactionType: RedSys.TRANSACTION_TYPES.AUTHORIZATION,
        terminal: "1",
        merchantURL: "http://www.my-shop.com/",
        successURL: "http://localhost:8080/success",
        errorURL: "http://localhost:8080/error"
        };

    const result = redsys.makePaymentParameters(obj);
    // // console.log(result);
    // var res = `<form name="from" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST">
    //                 <input type="hidden" name="Ds_SignatureVersion" value="${result.Ds_SignatureVersion}" />
    //                 <input type="hidden" name="Ds_MerchantParameters" value=${result.Ds_MerchantParameters} />
    //                 <input type="hidden" name="Ds_Signature" value=${result.Ds_Signature} />
    //             </form>`
    // const merchantParams = 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIxMDAiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjE1MDg0MjgzNjAiLCJEU19NRVJDSEFOVF9NRVJDSEFOVE5BTUUiOiJJTlRFR1JBVElPTiBURVNUIFNIT1AiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiIzMjcyMzQ2ODgiLCJEU19NRVJDSEFOVF9DVVJSRU5DWSI6Ijk3OCIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9NRVJDSEFOVFVSTCI6Imh0dHA6Ly93d3cubXktc2hvcC5jb20vIiwiRFNfTUVSQ0hBTlRfVVJMT0siOiJodHRwOi8vbG9jYWxob3N0OjgwODAvc3VjY2VzcyIsIkRTX01FUkNIQU5UX1VSTEtPIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2Vycm9yIn0='
    // const signature = 'FebYtynNmPyRnHiUfVqCmahQjVO7DntVz8Si6e7jgig='

    // const resul = redsys.checkResponseParameters(merchantParams, signature);

    // console.log(Date.now().toString(), "CCCCCCCCCCCCCCCCCCC")

    return { success: true, result: result }
}