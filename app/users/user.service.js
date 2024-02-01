const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { sendMail, sendMessages } = require('../utilities');
const {Expo} =  require("expo-server-sdk")
const User = db.User;
const Requests = db.Requests;
const Chat = db.Chat;
const Stats = db.Stats;
const Language = db.Language;
const Address = db.Address;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    activate,
    acceptRequest,
    sendRequest,
    deleteRequest,
    getRequests,
    sendMessage,
    getMessages,
    getAllWithId,
    forgotPassword,
    updateMessage,
    addAddress,
    // sendMails,
    testings,
    language,
    getLanguage,
    createAddress,
    getAllAddress,
    getAddressById,
    deleteAddress,
    updateAddress,
    changePassword,
    editProfile
};

async function sendRequest(id,fid, type){
    const checkRequest = await Requests.findOne({$or: [{uid: id, fid: fid},{uid: fid, fid: id}]});
    console.log(checkRequest)
    if(checkRequest && type == "delete"){
        await Requests.findByIdAndRemove(checkRequest._id);
        return {success: true};
    }

    if(!checkRequest && type == "add"){
        const request = new Requests({
            uid: id,
            fid: fid,
            accepted: true
        });
        await request.save();
        return {success: true};
    }
}

async function deleteRequest(id) {
    await Requests.findByIdAndRemove(id);
}



async function acceptRequest(id) {
    console.log(id);
    const request = await Requests.findById(id);
    // validate
    if (request) {
        Object.assign(request, {
            accepted: true,
            uid: request.uid,
            fid: request.fid
        });
        await request.save();
    }
}

async function addAddress(data) {
    console.log(id);
    const user = await User.findById(data.id);
    // validate
    if (user) {
        Object.assign(user, {address: data.add});
        await user.save();
    }
}

async function getRequests(id){
    const users = await Requests.find({fid: id, accepted: { $ne: true }}).select().lean();
    const loggedInUser = await User.findById(id);
    var usersList = [];
    var user = {};

    for(var i=0; i<users.length; i++){
        user = await User.findById(users[i].uid).lean();
        user.request_id = users[i]._id;
        if(user){
            usersList.push(user);
        }
    }

    return usersList;
}

async function sendMessage(chat){
    const message = new Chat(chat);
    await message.save();
}

async function language(lang){
    const user = await Language.find({uid: lang.uid}).lean();
    if(!user[0])
    {
        const language = new Language(lang);
        await language.save();
        return {success: true, message: "Language added successfull"}; 
    }
    else
    {
        const language = await Language.find({uid: lang.uid});
        const lan = language[0];
        if (lan) {
            let keys = Object.keys(lang)
            keys.map(x=>{
                lan[x] =  lang[x]
            })
            await lan.save();
        }
        return {success: true, message: "Language updated successfull"}; 
    }
}

async function changePassword(userParam) {
    const user = await User.findOne({email : userParam.email});
    if(user)
    {
        if (user && bcrypt.compareSync(userParam.password, user.hash))
        {
            user.hash = bcrypt.hashSync(userParam.newpassword, 10);
            await user.save();
            return {success: true, message: "Password Changed Successfully"};
        }
        else
        {
            return {success: false, message: "Incorrect Password"};
        }
    }
    else
    {
        return {success: false, message: "Incorrect Email"};
    }
}

async function editProfile(data) {
    const user = await User.findById(data.id);

    // const news = typeof data.new=='string' ? JSON.parse(data.new) : data.new

    if(typeof data.new=='string')
    {
        news = JSON.parse(data.new)
    }
    else if(typeof data.new=='object')
    {
        news = data.new
    }
    if (user) {
        let keys = Object.keys(news)
        keys.map(x=>{
            user[x] = news[x]
        })
        await user.save();
        return {success: true, message: "Profile Edited Successfully !!!"};
    }
    else
    {
        return {success: false, message: "Invalid email or password"}
    }
}

async function getLanguage(id){
    const lan = await Language.find({uid: id});
    const language = lan[0];
    return {success: true, language};
}

async function getMessages(id, rec_id){
    const messages = await Chat.find({$or: [{from: id, to: rec_id},{to: id, from: rec_id}]}).sort({createdAt: 1}).lean();
    return {success: true, messages};
}

async function updateMessage(data){
    const messages = await Chat.find({$or: [{from: data.from, to: data.to},{to: data.from, from: data.to}]}).sort({createdAt: 1}).lean();

    for(var i = 0; i<messages.length;i++){
        if(messages[i].message.includes("true","latitude","longitude"))
        {
            console.log(messages[i]._id);
            Chat.findByIdAndRemove(messages[i]._id, function (err, docs) {
                if (err){
                    console.log(JSON.stringify(err))
                }
                else{
                    console.log("Removed Chat : ", JSON.stringify(docs));
                    const message = new Chat(data);
                    message.save();
                }
            });
        }
    }

    const expo = new Expo({ accessToken: "22ycIMONJKwQjKst7SYMliHTR9gpTftL1IWfFmff" });
		const chunks = expo.chunkPushNotifications([{ to: data.toid, data: {message: data.message}, title: data.fromname+" "+data.status+" Your Challenge", body:msg.message, badge:1 }]);
		console.log(chunks)
		const tickets = [];
		for (const chunk of chunks) {
			try {
				const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				console.log(ticketChunk)
				tickets.push(...ticketChunk);
			} catch (error) {
				console.error(error);
			}
		}
		let response = "";
		for (const ticket of tickets) {
			if (ticket.status === "error") {
				if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
					response = "DeviceNotRegistered";
				}
			}
			if (ticket.status === "ok") {
				response = ticket.id;
			}
		}

    return {success: true};
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token, success: true
        };
    }
    else
    {
        return {success: false, message: 'Invalid Email or Password'};
    }
}

async function getAll() {
    const user = await User.find().select('-hash');
    if(user.length!=0)
    {
        return {success: true, data: user}
    }
    else
    {
        return {success: false, data: []}
    }
}

async function getAllWithId(id) {
    var users = await User.find({ _id: { $ne: id } }).select('-hash').lean();
    var loggedInUser = await User.findById(id).select('-hash');
    var distance = 0;
    var userList = [];
    var checkRequest;

    for(var i=0; i<users.length; i++){
        checkRequest = await Requests.findOne({$or: [{uid: users[i]._id, fid: id},{uid: id, fid: users[i]._id}]});

        if(!checkRequest){
            userList.push(users[i]);
        }        
    }

    return userList;
}

async function getById(id) {
    const user = await User.findById(id).select('-hash').lean();
    if(!user) return {error: true, message: "User not found"};
    
    const stats = await Stats.findOne({userId: id}).lean();
    return {success: true, user: {...user,...stats}};
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);
    if (userParam.password) 
        user.hash = bcrypt.hashSync(userParam.password, 10);
    const savedUser = await user.save();
    await (new Stats({userId: savedUser._id})).save();

    return {success: true, message: "User sign up successfull"};
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function forgotPassword(usero) {
    const user = await User.findOne({email: usero.email});
    var userParam = {};

    userParam.password = Math.floor(100000 + Math.random() * 900000).toString();

    if (!user) throw 'User not found';
    else {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
    Object.assign(user, userParam);
    sendMail(usero.email, userParam.password);
    await user.save();
    }
}

// async function sendMails(usero) {
//     sendMessages(usero.email, userParam.code);
// }

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function activate(id, userParam) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    user.active = !user.active;

    await user.save();
}

async function testings() {
    console.log("Logggg");
}

async function createAddress(contents) {
    const address = new Address(contents);
    await address.save();
    return { success: true, message: "Address Added Successfully" };
}

async function getAllAddress(id) {
    const datas = await Address.find({uid: id}).select('-hash');
    return {success: true, datas}
}

async function getAddressById(id, uid) {
    const address = await Address.findById(id).select('-hash').lean();
    return {success: true, data : address[0]}
}

async function deleteAddress(id, uid) {
    const Add = await Address.find({uid: uid}).select('-hash');
    if(Add.length>=2)
    {
        await Address.findByIdAndRemove(id);
        return { success: true, message:"Successfully Deleted" };
    }
    else
    {
        return { success: true, message:"Atleast one Address should remain" };
    }
}

async function updateAddress(data) {

    const address = await Address.findById(data.id);

    if (address) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            address[x] =  data.new[x]
        })
        await address.save();
        return {success: true, message: "Address Updated Successfully"}
    }
    else
    {
        return {success: false, message: "Address Not Found"}
    }
}