(function () {
	var $ = jQuery;
	
	$(function () {
		now.receiveMessage = function(name, message){
			$("#messages").append("<br>" + name + ": " + message);
		}

		$("#send-button").click(function(){
			now.distributeMessage($("#text-input").val());
			$("#text-input").val("");
		});

		now.name = prompt("What's your name?", "");
	})
}());