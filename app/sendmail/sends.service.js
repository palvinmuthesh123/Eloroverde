const db = require('_helpers/db');
const { sendMessages } = require('../utilities');

const Sends = db.Sends

module.exports = {
    Sendings,
    getAllSendings,
    getSendingById,
    deleteSending,
    updateSending
};

async function Sendings(usero) {
    const sends = new Sends(usero);
    sendMessages(usero.email, usero.title);
    await sends.save();
    return {success: true, sends};
}

async function getAllSendings() {
    return await Sends.find().select('-hash');
}

async function getSendingById(data) {
    const sends = await Sends.find({email: data.email}).select('-hash').lean();
    if (sends.length==0)
    {
        return { success: false, message: "No new mzessages" };
    }
    else
    {
        return { success: true, sends };
    }
}

async function deleteSending(id) {
    await Sends.findByIdAndRemove(id);
    return { success: true, message:"Sends Successfully Deleted" };
}

async function updateSending(data) {
    const sends = await Sends.findById(data.id);
    // validate
    if (sends) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            sends[x] = data.new[x]
        })
        await sends.save();
    }
}