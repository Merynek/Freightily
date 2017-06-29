var message_active = false;
function startLoading(text) {
	$(".loadPage").css("display", "block");
}
function endLoading(text) {
	$(".loadPage").css("display", "none");
}
function middle_no_padding(){
	$(".middle").addClass("no-padding");
}
//1->success(green) 2->warning(orange) 3->error(red)
function message(type, message){
    var messageElement = $("#message");

	if(!message_active) {
		message_active = true;
		$('html, body').animate({
			scrollTop: messageElement.offset().top
        }, 300);

		switch (type) {
			case 1:
                messageElement.addClass("success-message");
				break;
			case 2:
                messageElement.addClass("warning-message");
				break;
			case 3:
                messageElement.addClass("error-message");
				break;
		}
        messageElement.text(message);
        messageElement.animate({
			top: "+=40px"
		}, 400, function () {
			setTimeout(function () {
                messageElement.animate({
					top: "-=40px"
				}, function () {
                    messageElement.empty();
                    messageElement.css("top", "auto");
                    messageElement.removeClass();
					message_active = false;
				});
			}, 1500);
		});
	}
}