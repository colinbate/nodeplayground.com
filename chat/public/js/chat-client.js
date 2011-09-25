(function () {
	var $ = jQuery;
	
	if (!$.fn.enter) {
		$.fn.enter = function (fn) {
			return this.each(function () {
				var $t = $(this);
				if (typeof fn === 'function') {
					$t.keypress(function (e) {
						if (e.which === 13) {
							fn.apply($t, [e]);
							e.preventDefault();
							return false;
						}
					});
				} else {
					var e = jQuery.Event("keypress", { which: 13 });
					$t.trigger(e);
				}
			});
		};
	}
	
	
	$(function () {
		var initialized = false;
		var $input = $('#text-input');
		var $partList = $('#participants');
		var $messages = $('#messages');
		var participants = [];
		
		var addMsg = function (name, message) {
			$messages.append('<div class="message"><strong>' + name + '</strong>: ' + message + '</div>');
			$messages.scrollTop($messages[0].scrollHeight);
		};
		
		var sysMsg = function (message) {
			$messages.append('<div class="system message">' + message + '</div>');
		};
		
		var addChatter = function (name) {
			$partList.append('<div class="chatter">' + name + '</div>');
		};
		
		var redrawParticipants = function () {
			participants.sort();
			$partList.empty();
			$.each(participants, function (i, name) {
				addChatter(name);
			});
		};
		
		now.receiveMessage = function(name, message){
			addMsg(name, message);
		};
		
		now.newParticipant = function(name) {
			participants.push(name);
			redrawParticipants();
			sysMsg(name + ' has joined the chat');
		};
		
		now.listParticipants = function (users) {
			participants = users;
			redrawParticipants();
		};
		
		now.participantQuit = function (username, users) {
			sysMsg(username + ' has left the chat');
			participants = users;
			redrawParticipants();
		};
		
		var sendMsg = function () {
			var msg = $.trim($input.val());
			if (initialized && msg !== '') {
				now.distributeMessage(msg);
				$input.val('').focus();
			}
		};
		
		$(window).unload(function () {
			//now.leaveChat(now.name);
		});

		//$('#send-button').click(sendMsg);
		$('#text-input').enter(sendMsg);
		
		$('#username').enter(function (e) {
			now.name = $('#username').val();
			now.joinChat(now.name);
			$.modal.close();
			initialized = true;
			$input.focus();
		});
		
		$('#signin').modal({escClose: false});

		//now.name = prompt("What's your name?", "");
	});
}());