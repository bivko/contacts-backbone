var input = $('.searchField');
input.keypress(function(event){			
	if(event.which != 8){
		var word = input.val().toLowerCase() + String.fromCharCode(event.which).toLowerCase();
		searchContactToogle(word);
	}else{
		var word = input.val().slice(0,-1).toLowerCase();
		searchContactToogle(word);
	}
});

$('body').on('change', '.groupSelect', groupContactsSort);


function searchContactToogle(word){
	$('.addressList .item').each(function(){
		var elem = $(this);
		var name = elem.find('span').text().toLowerCase();
		name.indexOf(word) != -1 ? elem.show() : elem.hide();
	});
};

function groupContactsSort(){
	var currentGroup = $('.groupSelect').find('option:selected').text();
	if (currentGroup === 'All Contacts'){
		$('.addressList .item').show();	
	}else{
		$('.addressList .item').each(function(){
			var elem = $(this);
			var group = elem.find('.aside-contacts-link').data('group');
			currentGroup === group ? elem.show() : elem.hide();
		});
	}
}