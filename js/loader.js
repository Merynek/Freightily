var message_active = false;
function startLoading(text) {
	$(".loadPage").css("display", "block");
}
function endLoading(text) {
	$(".loadPage").css("display", "none");
}
//1->success(green) 2->warning(orange) 3->error(red)
function message(type, message){
	if(!message_active) {
		message_active = true;
		switch (type) {
			case 1:
				$(".message").addClass("success-message");
				break;
			case 2:
				$(".message").addClass("warning-message");
				break;
			case 3:
				$(".message").addClass("error-message");
				break;
		}
		$(".message").text(message);
		$(".message").animate({
			top: "+=40px",
		}, 600, function () {
			setTimeout(function () {
				$(".message").animate({
					top: "-=40px"
				}, function () {
					$(".message").empty();
					message_active = false;
				});

			}, 1500);
		});
	}
}