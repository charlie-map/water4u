$("#signup").hide();
$("#dropout").hide();
$("#back").hide();
$("#back2").hide();

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