exports.action = function(data, callback){

	let client = setClient(data);
	info("Epeler from:", data.client, "To:", client);
	epel (data, client);
	callback();
}

function epel (data, client) {
	Avatar.askme("quel mot veux tu que j'épelle ?", data.client, 
	{
		'*': 'generic',
		'terminer': 'done'
	}
		,0, function (answer, end) {
		if(!answer) {
		end(client);
		return Avatar.speak("Recommence je n'ai rien entendu", data.client, function(){
		epel(data, client);
		});
	}
		if (answer.indexOf('generic') != -1) {
		end(client);
		answer = answer.split(':')[1];
		answer = answer.replace("le mot","");
		let lettre = Array.from(answer);
		return Avatar.speak(answer + ":s'écrit:" + lettre, data.client, function(){
		end(data.client, true);
		});
    }
	   switch(answer) {
	   case "done":
	   default:
	   Avatar.speak("Terminé", data.client, function(){
	   end(data.client, true);
	   });
   }
		});
	}


function setClient (data) {
	var client = data.client;
	if (data.action.room)
		client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
		client = data.action.setRoom;
	return client;
}
