$(function() {
	$('.location-list li').click(function() {
		let current = $(this).text();
		$.fancybox.close(location);
		$('header .location .location-text').text(current);
	});
    $('.link').click(function(event){
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
});
$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$.fancybox.close( true );
			$.fancybox.open( thanks );
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
	$('body').on('click', '.ctoggle', function(){
		var input = $(this).find('input');
		input.prop("checked", !input.prop("checked"));
		
		calculate()
		
		return false;
	});
	
	$('body').on('click', '.ccheckbox_privacy', function(){
		var input = $(this).find('input');
		input.prop("checked", !input.prop("checked"));
		$('.rform__button').prop('disabled', !input.prop("checked"));

		return false;
	});

	$('body').on('click', '.cselect .cselect__option', function(){
		var cselect = $(this).closest('.cselect');
		var input = cselect.find('input');

		input.val( $(this).data('value') );
		cselect.find('.cselect__value').html( $(this).html() );

		cselect.find('[selected]').attr('selected', false);
		$(this).attr('selected', true);
		
		calculate()
		
	});

	$('body').on('click', '.cselect', function(){
		$(this).toggleClass('cselect_active');
	});

	$('body').on('click', function(e){

		var cselect_active = $(e.target).closest('.cselect_active');
		if ( cselect_active.length == 0 ) {
			$('.cselect_active').removeClass('cselect_active');
		}
		
	});

	var fArea = $('.calculator_page .farea');
			fArea.keydown(function(event) {
					if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
							(event.keyCode == 65 && event.ctrlKey === true) || 
							(event.keyCode >= 35 && event.keyCode <= 39)) {
									 return;
					}
					else {
							if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
									event.preventDefault(); 
							}   
					}
			});
			fArea.keyup(function(){
				var max = $(this).data('max');
				if ( !max ) max = 1000;

					var val = parseInt($(this).val());
					if(val < 0){
							$(this).val(0);
					}
					else if (val > max){
							$(this).val(max);
					}
		calculate()
			})

	var flength = $('.calculator_page .flength');
			flength.keydown(function(event) {
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
							(event.keyCode == 65 && event.ctrlKey === true) || 
							(event.keyCode >= 35 && event.keyCode <= 39)) {
									 return;
					}
					else {
							if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
									event.preventDefault(); 
							}   
					}
			});
			flength.keyup(function(){
		var max = $(this).data('max');
				if ( !max ) max = 20000;
		
					var val = parseInt($(this).val());
					if(val < 0){
							$(this).val(0);
					}
		else if (val > max){
							$(this).val(max);
					}
		
		calculate()
			})
	
	function calculate() {
		var fArea = parseInt($('.calculator_page .farea').val());
		$('rrr').val(fArea);
		fArea = (isNaN(fArea)) ? 0 : fArea;
		var flength = parseInt($('.calculator_page .flength').val());
		flength = (isNaN(flength)) ? 0 : flength;
		
		var type = parseInt($('input[name="fields[type]"]').val());
		
		var grass = 0;
		var sand = 0;
		var soil = 0;
		var firstWork = 0;
		var base = 0;
		var fold = 0;
		var delivery = 0;
		var unload = 0;
		var removal = 0;
		var sum = 0;
		
		if (fArea != 0) {
			var price = 0;
			switch(type) {
				case 1:
					price = 1240;
					break;
				case 2:
					price = 1100;
					break;
				case 3:
					price = 860;
					break;
				case 4:
					price = 600;
					break;
				case 5:
					price = 500;
					break;
			}
			
			grass = (Math.ceil(fArea / 3) - (3 - (fArea % 3)) * 0.25 * ((fArea % 3) != 0)) * price - 0.25 * Math.ceil((fArea - 45) / 45) * (fArea > 45) * price + 0.25 * (fArea > 899) * price;
			
			if ($('input[name="fields[sand]"]').prop("checked")) {
				sand = 800 * Math.ceil(fArea / 10) + 7200 * (fArea < 10);
			}
			
			if ($('input[name="fields[soil]"]').prop("checked")) {
				soil = 24750 + 1650 * Math.ceil((fArea - 100) / 7) * (fArea > 100);
			}
			
			if ($('input[name="fields[firstWork]"]').prop("checked")) {
				firstWork = 5000 + 160 * (fArea - 26) * (fArea > 26);
			}
			
			if ($('input[name="fields[base]"]').prop("checked")) {
				base = 5000 + 80 * (fArea - 33) * (fArea > 33);
			}
			
			if ($('input[name="fields[fold]"]').prop("checked")) {
				fold = 1900 + 90 * (fArea - 20) * (fArea > 20);
			}
			
			if (flength != 0) {
				delivery = 9000 + 13 * (flength - 30) * (flength > 30);
			}
			
			if ($('input[name="fields[unload]"]').prop("checked")) {
				unload = 1000 + 36 * (fArea - 25) * (fArea > 25);
			}
			
			if ($('input[name="fields[removal]"]').prop("checked")) {
				removal = 9400 + 940 * (fArea > 33) + Math.ceil((fArea - 40) / 10) * 235 * (fArea > 40);
			}
			
			sum = grass + sand + soil + firstWork + base + fold + delivery + unload + removal;
		}
		
		var regStr = /(\d)(?=(\d{3})+([^\d]|$))/g;
		$('.rrr1').val(fArea);
		$('.rrr2').val(grass);
		$('.rrr3').val(sand);
		$('.rrr4').val(soil);
		$('.rrr5').val(firstWork);
		$('.rrr6').val(base);
		$('.rrr7').val(fold);
		$('.rrr8').val(delivery);
		$('.rrr9').val(removal);
		$('.rrr10').val(sum);
		$('.calculator_page .result__fArea').html(String(fArea).replace(regStr, '$1 '));
		$('.calculator_page .result__grass').html(String(grass).replace(regStr, '$1 '));
		$('.calculator_page .result__sand').html(String(sand).replace(regStr, '$1 '));
		$('.calculator_page .result__soil').html(String(soil).replace(regStr, '$1 '));
		$('.calculator_page .result__firstWork').html(String(firstWork).replace(regStr, '$1 '));
		$('.calculator_page .result__base').html(String(base).replace(regStr, '$1 '));
		$('.calculator_page .result__fold').html(String(fold).replace(regStr, '$1 '));
		$('.calculator_page .result__delivery').html(String(delivery + unload).replace(regStr, '$1 '));
		$('.calculator_page .result__removal').html(String(removal).replace(regStr, '$1 '));
		$('.calculator_page .result__sum').html(String(sum).replace(regStr, '$1 '));
	}

	
});


