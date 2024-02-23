exports.action = function(data, callback){

	let client = setClient(data);
	info("Epeler from:", data.client, "To:", client);
	epel (data, client, callback);
}

function epel (data, client) {
	
	let wordPhrase = data.action.rawSentence.toLowerCase().replace(/épelle|épeler|le|prénom|mot|verbe/gi, "").trim();
	if(!wordPhrase) {
		Avatar.speak(`Je n'ai pas compris ce que tu veux épeler`, data.client, () => {
			Avatar.Speech.end(data.client);
		});
	return;
	}
	let mot = Array.from(wordPhrase);
    Avatar.speak(`${wordPhrase} s'écrit: ${mot}`, data.client, () => {
	Avatar.Speech.end(data.client);
	});

	}

function setClient (data) {
	let client = data.client;
	if (data.action.room)
		client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
		client = data.action.setRoom;
	return client;
}
