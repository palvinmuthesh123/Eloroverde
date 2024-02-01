const db = require('_helpers/db');
const CMS = db.Cmss;
const Support = db.Support;

module.exports = {
    createCMS,
    getAllCMS,
    getCMSById,
    deleteCMS,
    updateCMS,
    createSupport,
    getAllSupport,
    getSupportById,
    deleteSupport,
    updateSupport
};

async function createCMS(contents) {
    const cms = new CMS(contents);
    await cms.save();
    return { success: true, message: "CMS Added Successfully" };
}

async function getAllCMS() {
    return await CMS.find().select('-hash');
}

async function getCMSById(id) {
    const cms = await CMS.findById(id).select('-hash').lean();
    if (!cms)
        return { error: true, message: "CMS not found" };
    const stats = await CMS.findOne({ _id: id }).lean();
    return { success: true, cms: { ...cms, ...stats } };
}

async function deleteCMS(id) {
    await CMS.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateCMS(data) {
    // console.log(id);
    const cms = await CMS.findById(data.id);
    // validate
    if (cms) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            cms[x] =  data.new[x]
        })
        await cms.save();
    }
}

async function updateCMSById(data) {
    // console.log(id);
    const cms = await CMS.findById(data.id);
    
    // validate
    if (cms) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            cms[x] =  data.new[x]
        })
        await cms.save();
    }
}

async function createSupport(contents) {
    const support = new Support(contents);
    await support.save();
    return { success: true, message: "Support Added Successfully" };
}

async function getAllSupport() {
    return await Support.find().select('-hash');
}

async function getSupportById(id) {
    const support = await Support.findById(id).select('-hash').lean();
    if (!support)
        return { error: true, message: "Support not found" };
    const stats = await Support.findOne({ _id: id }).lean();
    return { success: true, support: { ...support, ...stats } };
}

async function deleteSupport(id) {
    await Support.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSupport(data) {
    // console.log(id);
    const support = await Support.findById(data.id);
    // validate
    if (support) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            support[x] =  data.new[x]
        })
        await support.save();
    }
}