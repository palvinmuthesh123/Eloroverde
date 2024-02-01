const db = require('_helpers/db');
const Chat = db.Chat;
const {Expo} =  require("expo-server-sdk")
const {admin} = require("../../firebase-config")

module.exports = io => socket => {
    console.log("Made socket connection", socket.id, );
    socket.on("message", async(msg) => {
        // const expo = new Expo({ accessToken: "22ycIMONJKwQjKst7SYMliHTR9gpTftL1IWfFmff" });
		// const chunks = expo.chunkPushNotifications([{ to: msg.toid, data: {message: msg.message}, title: msg.fromname+" Sent You a Message", body:msg.message, badge:1 }]);
		// console.log(chunks)
		// const tickets = [];
		// for (const chunk of chunks) {
		// 	try {
		// 		const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
		// 		console.log(ticketChunk)
		// 		tickets.push(...ticketChunk);
		// 	} catch (error) {
		// 		console.error(error);
		// 	}
		// }
		// let response = "";
		// for (const ticket of tickets) {
		// 	if (ticket.status === "error") {
		// 		if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
		// 			response = "DeviceNotRegistered";
		// 		}
		// 	}
		// 	if (ticket.status === "ok") {
		// 		response = ticket.id;
		// 	}
		// }
		const options = {
			priority: "high",
			// timeToLive: 60 * 60 * 24
		  };
		  msg[id] = msg[from];
		  msg[idto] = msg[to];
		  const messages = {
			data: msg
		  }
		  admin.messaging().sendToDevice("fOH6RUUVSmGSHDZQpJtdGY:APA91bGn2NJ7aIgyPRpPvtOp4FGw5QwNH-BWFLRmvX9dGoD0wplezZN9nW3YdTQPJMa1JUXYXqyk1hhHDFAveoDJ1xFfdmTiC5Q0TwWnxIP8IoTl4WvNH99f8e3RTLdbJL_3nSQGMW4B", messages, options)
			.then( response => {
				console.log(response,"RRRRRRRRRRRRRRRR");
			})
			.catch( error => {
				console.log(error);
		  });
			// fetch('https://fcm.googleapis.com/fcm/send', {
			// method: 'POST',
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	Authorization: `key=AAAAps_nnj0:APA91bGMOkBSrJ9I0IkUcaVgCySfNQXhW-Dh2MWK83sER3-A70hoysegXUa42wRI52N_h-o1fVSHWfU2l1RSZWjP6r7g7y7WY8CG1LNKzc0ZAFXBWIHYx5yXkMaKSH2QkJhfsyPbRqO_`,
			// },
			// body: JSON.stringify({
			// 	to: '<NATIVE-DEVICE-PUSH-TOKEN>',
			// 	priority: 'normal',
			// 	data: {
			// 	experienceId: '@yourExpoUsername/yourProjectSlug',
			// 	scopeKey: '@yourExpoUsername/yourProjectSlug',
			// 	title: "📧 You've got mail",
			// 	message: 'Hello world! 🌐',
			// 	},
			// }),
			// });
        console.log(msg);
        io.emit("message", msg);
        const message = new Chat(msg);
        await message.save();
    });

    socket.on("disconnect", () => {
        io.emit("user disconnected", socket.userId);
    });
}