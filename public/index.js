$("#signup").hide();
$("#dropout").hide();
$("#back").hide();
$("#back2").hide();

const info = document.querySelector(".alert-info");

function process(event) {
	event.preventDefault();
	console.log(phoneInput);
	let number = phoneInput.value;
	console.log(number)
	number = number.replace(/[^0-9]/g, "");
	const phoneNumber = phoneInput.getNumber();
	let country_code = phoneNumber.splice(phoneNumber.length - number.length, phoneNumber.length);
	let signup_values = $('#signup :input');
	$.post(window.location.href + "signup-user", {
		"name": signup_values[0].value,
		"country_code": country_code,
		"phone": phoneNumber,
		"per_day": signup_values[2].value
	});
}

$("#hydrate").click(() => {
	$("#signup").show();
	$("#dehydrate").hide();
	$("#hydrate").hide();
	$("#back").show();
});

$("#dehydrate").click(() => {
	$("#dropout").show();
	$("#hydrate").hide();
	$("#dehydrate").hide();
	$("#back2").show();
});

$("#back").click(() => {
	$("#hydrate").show();
	$("#dehydrate").show();
	$("#signup").hide();
	$("#back").hide();
});

$("#back2").click(() => {
	$("#hydrate").show();
	$("#dehydrate").show();
	$("#dropout").hide();
	$("#back2").hide();
})