var thanksYo = {};
// 1. get the
thanksYo.apiKey = 'MDphYzlmMTE4Yy0zNjI2LTExZTUtOGI1My0xZmQ1MzBjOGNmYzQ6RHZ4UGZGVzhRa0lrOEFhUnhiY3FSSWgzY0RkUFFCQnk0YXRC';
var filteredItems = "";

thanksYo.choices = {

	"3": {
		text:"That's cold, yo. The booze you choose should be worth more than your friendship." ,
		min: 0,
		max: 500,
		bottleRotationClass: 'price01bottle'
	},
	"2": {
		text: "You really can't afford it but yo, credit card bill ain't due for another month!",
		min: 501,
		max: 1500,
		bottleRotationClass: 'price02bottle'
	},
	"1": {
		text:"You're feelin' generous cause yo, it's payday!" ,
		min: 1501,
		max: 2500,
		bottleRotationClass: 'price03bottle'
	},
	"4": {
		text: "You're a straight G so we're ballin' out, YO!",
		min: 2501,
		max: 10000,
		bottleRotationClass: 'price04bottle'
	},
};



thanksYo.filter = function(itemArray, min, max) {
	// filter results

	function priceFilter(item) {
		return (item.price_in_cents >= min && item.price_in_cents <= max && item.image_url != null);
	}
	return itemArray.filter(priceFilter);

};

thanksYo.showText = function(text){
	console.log(text);
	$('p.choice-text').text(text);
	$('.hidden-choice-container').fadeIn();
};

thanksYo.getBooze = function(min, max) {
	console.log(min, max);
	$.ajax({
		url: 'http://lcboapi.com/products',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			per_page: 100,
		},
		success: function(data) {
			filteredItems = thanksYo.filter(data.result, min, max);
			thanksYo.showBooze(filteredItems[0]);
			console.log(filteredItems);

		}
	});
};


thanksYo.showBooze = function(booze) {
	console.log(booze);
	$('h2.title').text(booze.name);
	$('img.beer').attr('src', booze.image_url);
	$('p.price').text("$" + (booze.price_in_cents) / 100 );
	$('p.package').text(booze.package);
	$('.result-display-container').fadeIn(400);
	// console.log(booze.image_url);

	//show the booze
};

thanksYo.shuffle = function() {
	var randomNumber = Math.floor(Math.random() * filteredItems.length);
	// generate random number based on filtered items array
	thanksYo.showBooze(filteredItems[randomNumber]);
};


thanksYo.init = function() {
	$('svg path.choice').on('click', function() {
		$('path.choice').each(function() { //clear all selected
			$(this).attr('class', 'choice');
		});

		var choice = thanksYo.choices[$(this).data('choice')];
		$(this).attr('class', 'selected choice');
		$('#bottle').removeClass().addClass(choice.bottleRotationClass);

		thanksYo.showText(choice.text);

	});

	$('button.choose').on('click', function() {
		var choice = thanksYo.choices[$('.selected').data('choice')];
		thanksYo.getBooze(choice.min, choice.max);
		$('.hidden-result-container').before(filteredItems.alcohol_content);
		$('path.selected').attr('class', 'choice');
	});

	$('button.shuffle').on('click', function() {
		thanksYo.shuffle();
	});

	$('button.change').on('click', function() {

		window.location.reload(true);
	});
	// $('.guage-wrapper a').on('click', );
};

$(function() {
	thanksYo.init();
});
