jQuery(window).on('load', function(){
    var $ = jQuery;
	function text() {}
	var modal_view_success = 0;
	var modal_dialog_login = 0;
	var modal_dialog_users = 0;
	var modal_add_success = 0;
	var modal_dialog_options = 0;

//$(function () {
	
	var input_id,formData, _input,save_method ;
	var lang = $('#lang').val();
		
	var dialog_top = 110;
	
	var vid = $(".dialog_success video").get(0); 
	/*
	$('.datepicker').datepicker({
		autoClose: true
	});
	$('.datepicker').data('datepicker');
	*/
	
	$('header').sticky({topSpacing:0});
	$('header').css('width', document.body.clientWidth);
	$('header').on('sticky-end', function() { $('header').css('width', document.body.clientWidth); });
	
	$(".fancybox").fancybox();
	
	var grid = $('.grid');
	
	grid.masonry({
	  // options
	  itemSelector: '.grid-item',
	  columnWidth: 200,
	  gutter: 20,
	  fitWidth: true
	});
		
	grid.infinitescroll({
		  loading: {
			finished: undefined,
			finishedMsg: "",
			img: '/assets/preloader.gif',
			msg: null,
			msgText: "",
			selector: '.loader',
			speed: 'fast',
			start: undefined
		  },
		loadingImg  : 'http://www.infinite-scroll.com/loading.gif',
		// Pagination element that will be hidden
		navSelector: '#pagination',
		// Next page link
		nextSelector: '#pagination p a',
		// Selector of items to retrieve
		itemSelector: '.grid-item',
		// Loading message
		loadingText: ''
	},
	// Function called once the elements are retrieved
	function(new_elts) {
		
		var elts = $(new_elts).css('opacity', 0);
		$('#loading2').html(elts.clone());
		
	$('#loading2').imagesLoaded().done( function() {
		grid.masonry('appended', elts, true);
		console.log('done imgs');
		$('#loading2').html('');		
		 elts.animate({opacity: 1});		
	});
	
/**	
	grid.masonry({
	  // options
	  itemSelector: '.grid-item',
	  columnWidth: 200,
	  gutter: 15,
	  fitWidth: true
	});
		*/
	//	console.log(elts);
	// console.log($('#loading2 .grid-item'));
	});
	
	/*
	$(".grid-item .photo_main ").hover(function() {
		
	});
	*/

	
	$("#text_success, #text_success_admin").keyup(function() {
		$('.symbols_left span').text(500-this.value.length);
	});
	$("#text_success_eng, #text_success_admin_eng").keyup(function() {
		$('.symbols_left_eng span').text(500-this.value.length);
	});
	
	$('.add_eng').on('click touch', function(event) {
	  var show = $(this).attr('data');
	  if (show == 0) {
		  $(this).attr('data','1');
		  $(this).text('- Убрать описание на английском языке');
		   $('.eng').slideDown(300);
	  }  else {
		  $(this).attr('data','0');
		  $(this).text('+ Добавить описание на английском языке');
		   $('.eng').slideUp(300);
	  }
	  return false;
	});	
	
	/* Dialog  */
	
	$("header .profile").click(function () {

		$('.dialog_profile').fadeIn(300);
	});	
	
	/* profile*/
	$(document).on('click touch', function(event) {
	  if (!$(event.target).parents().addBack().is('header .profile')) {
		$('.dialog_profile').fadeOut(300);
	  }
	});	
	$('.dialog_profile').on('click touch', function(event) {
	  event.stopPropagation();
	});	
	
	/* dialog_success*/
	$(document).on('click touch', function(event) {
	  if (!$(event.target).parents().addBack().is('.dialog')) {
		//$('.dialog').fadeOut(300);
	  }
	});	
/*
	$('#dialog_success, .datepicker--cell').on('click touch', function(event) {
	  event.stopPropagation();
	});	
*/
	/*search*/
	$("#search_submit").click(function () {
		 $('form[name=search]').submit();	
		 return false;
	});
	
	$('form[name=search]').submit(function(event) {
			if ($('.search_header').val()) return;
			event.preventDefault();
		});
				
	/*add success*/
	$(".add_success_button, .admin_add_success").click(function () {
		if ($(this).hasClass('is_logged')) {
			//$('.dialog_add_success').css('top', $(window).scrollTop() +110+'px');
			if (!modal_add_success) {
				modal_add_success = $('[data-remodal-id=modal_add_success]').remodal();
			}
			modal_add_success.open();
			$('.dialog_add_success').fadeIn(300);
			$('.popup').hide();
			/*$('.overlay').fadeIn(500);*/
			$.get('/success/clear');
		}
		return false;
	});	
	
	$('.search_not_found img').click(function () {
		$('.search_not_found ').fadeOut(function() {
			window.location = '/'+lang;
		});		
	});
	$(".button_date").click(function () {
		$(".datepicker-here").trigger('focus');
		return false;
	});	
	
	$(document).on('closed', '.remodal', function () {
		// окно закрыто
		$('.dialog').fadeOut(300);
		$('.dialog_login').fadeOut(300);
		$('.dialog_add_success').fadeOut(300);
		$(".dialog_login input").val('');
		$("#login_error").text('');
		$(".dialog_reg input").val('');
		$(".dialog_reg .reg_error").hide('');
		$(".dialog_reg input").css('border','none');
		if ($(".dialog_success video").length) $(".dialog_success video").get(0).pause();
		//$('.overlay').fadeOut(500);
	});
	
	$(document).on('click', '.dialog_success video', function () {
		$(".dialog_success video").get(0).pause();
	});
		
	$("#ok_activate").bind("click", function(event) {		
		$('.dialog_activate').hide();
		$('header .login').trigger('click');
		return false;
	});
	
	$(".overlay, #shadow").bind("click", function(event) {
	  $('.dialog').fadeOut(300);
	  $(".dialog_login").fadeOut(300);
	  $('.overlay').fadeOut(500);
	  $('.dialog_activate').fadeOut(500);
	});

	 $('#open').click(function(){
        $('body').width($('body').width());
        $('#shadow').css('display', 'block');
        $('header').css('padding-right', '17px');
		
    })
	$('#shadow').click(function(){
		$('header').css('padding-right', '0px');
		$('body, #shadow').removeAttr('style');
		//$(".dialog_login").css({'margin-left':'18px'})
		$(".dialog_login").fadeOut(300);
    })
	
	
	/*login */
	$("header .login, .add_success_button.not_logged").click(function () {		
	$('header').css('position','absolute'); 
		if (!modal_dialog_login) {
			modal_dialog_login = $('[data-remodal-id=modal_dialog_login]').remodal();
		}
		modal_dialog_login.open();
		$(".dialog_login").fadeIn(300);
		$("#form_login input[name=username]").focus();
		$(".dialog").fadeOut(300);
		return false;
	});
		
		$("#form_login").submit(function( event ) {
			$("#login_submit").trigger('click');
			return false;
		});
		
		$("#login_submit").click(function () {		
			var username=$("#form_login input[name=username]").val();
			var password=$("#form_login input[name=password]").val();
			if (!username || !password) $('#login_error').fadeIn(300).text("Пожалуйста, заполните все необходимые поля").show(0);
			$.ajax({
		   type: "POST",
		   url: "/admin/login",
			data: "username="+username+"&password="+password,
		   success: function(data){    
			if (JSON.parse(data).error == 1) {
				$('#login_error').html("").hide(0);
				$('#login_error').fadeIn(300).text("Неправильный логин или пароль").show(0);
			} else if(JSON.parse(data).error == 2) {
				$('#login_error').html("").hide(0);
				$('#login_error').fadeIn(300).text("Введите логин и пароль").show(0);
			} else if (JSON.parse(data).login == 1) {
				if (JSON.parse(data).admin) window.location="/admin"; else 
					window.location="/"+lang;
			}
		   },
		   beforeSend:function()
		   {
		   }
		  });
			return false;
		});
		
		
		
	/* SUCCESS FORM */
	
	$(document).on("click",".success .title, .photo_main", function () {		
		//$('.popup').hide();
		var src = $(this).parent().find('.photo_main img').attr('src');
		var imgs = $(this).parent().find('.photos .photo');
		var video = $(this).parent().find('.photos video');	
		
		var is_similar = 0, i =1;
		if ($(this).parent().parent().parent().hasClass('load_similar')) is_similar = 1;
			if (is_similar) 
				{
					$(".dialog_success video").get(0).pause();
					dialog_top = parseInt($('.dialog_success').css('top'))-115;
					//console.log(dialog_top);
					//setTimeout(function() {$('.remodal-wrapper').animate({scrollTop: dialog_top}, 1000)}, 1000);
					//$('.remodal-wrapper').animate({scrollTop: dialog_top}, 1000);
				} else {
					/*dialog_top = $(window).scrollTop() +110;
					$('.dialog_success').css('top', dialog_top+ 'px');*/
				}
		$.ajax({
		   type: "POST",
		   url: '/'+lang+"/success/show",
			data: "id="+$(this).parent().attr('id'),
		   success: function(data){  
				if (!modal_view_success) {
					modal_view_success = $('[data-remodal-id=modal_view_success]').remodal();
				}
				modal_view_success.open();				
				$('.dialog_success, .similar_success').fadeIn(300);				
				$('.dialog_success, .similar_success').css({'height':$('.dialog_success').css('heigth')});				
				$('.dialog_success .title').text(JSON.parse(data)[0].title);
				$('.dialog_success .text').text(JSON.parse(data)[0].text);			
				$('.dialog_success .viewed').text(JSON.parse(data)[0].viewed);			
				$('.dialog_success .date').text(JSON.parse(data)[0].date_author);			
				$('.dialog_success .photo_main .leanback-player-video').remove();		
				$('.dialog_success .photo_main').html('<img src='+src+'>');		
				//$('.dialog_success .photo_main').css('background-image','url('+src+')');		
				$('.dialog_success .author').css("background-image","url('/assets/uploads/profile_photos/"+JSON.parse(data)[0].author+".jpg')");
				$('.dialog_success .author_name').html('<a href=/user/'+JSON.parse(data)[0].author+'>'+JSON.parse(data)[0].user.name+'</a>');			
				$('.dialog_success .company').text(JSON.parse(data)[0].user.company);			
				$('.dialog_success .photos').html('');
				$('.dialog_success .photos').append('<img src=/assets/images/photo_icon.png>');	
				if (!imgs.length && !video.length) $('.dialog_success .photos').hide(); else $('.dialog_success .photos').show();
				imgs.each(function() {
					$('.dialog_success .photos').append($(this).clone());		
					i++;
				});
				for(i;i<4;i++) {
					$('.dialog_success .photos').append('<div class="empty_icon"></div>');	
				}
				$('.dialog_success .photos').append('<img src=/assets/images/video_icon.png>');	
				$('.dialog_success .photos').append('<a class="fancybox_video" href="'+video.first().attr('src')+'"><video  src="'+video.first().attr('src')+'" height=60></a>');		
				$('.similar_success').hide();
				setTimeout(function() {
					$('.similar_success').css('top',$('.dialog_success').height()+parseInt($('.dialog_success').css('top'))+110+'px')
					$('.similar_success').show();
				}, 500);
				//$('.similar_success').css('height','700px');
				$('.similar_success .load_similar').load('/news/similar');
				
				yaCounter39124205.hit('http://crimeanrecords.ru/'+JSON.parse(data)[0].id, {title: JSON.parse(data)[0].title, referer: 'http://crimeanrecords.ru'});
				gaTrack('http://crimeanrecords.ru/'+JSON.parse(data)[0].id, JSON.parse(data)[0].title);
				/*
				$(".dialog_success .fancybox_video").fancybox({
					fitToView: false, // to show videos in their own size
					content: '<span></span>', // create temp content
					scrolling: 'no', // don't show scrolling bars in fancybox
					arrows: false,
					afterLoad: function () {
					  //this.content = "<embed src='/assets/jwplayer.swf?file=" + this.href + "&autostart=true&amp;wmode=opaque' type='application/x-shockwave-flash' width='400' height='300'></embed>"; 
					  this.content = "<div class='leanback-player-video' ><video width='720' height='480' controls autoplay><source src='"+this.href +"' type='video/mp4' > </video></div>"
					}
				});
				*/
					$(document).on("click",".dialog_success .fancybox_video", function () {		
						$('.dialog_success .photo_main').html("<div class='leanback-player-video' ><video  autoplay width='520' controls><source src='"+this.href +"' type='video/mp4'/> </video></div>");	
						return false;
					});

		  }
	});
	  return false;
	});
	
	
	$(document).on("click",".dialog_success .photos .photo", function () {
		var temp_src = '';
		var bg = $(this).css('background-image');
        bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
		$('.dialog_success .photo_main').html('<img width=520 src="'+bg+'">');
				//temp_src = $('.dialog_success .photo_main').css('background-image');
		//$('.dialog_success .photo_main').css('background-image',$(this).css('background-image'));
		//$('.dialog_success .photo_main').attr('src',$(this).attr('src'));
		//$(this).attr('src', temp_src);
		$('.similar_success').css('top',$('.dialog_success').height()+parseInt($('.dialog_success').css('top'))+110+'px');
	});
			
	/* Upload success photos */
	
	$(".item input[type=file]").click(function () {
		input_id = "#"+$(this).attr('id')+"-hidd";	
		_input = $(this).prop('jFiler');	
	});
	
	$("#file-input-1, #file-input-2, #file-input-3, #file-input-4, #file-input-5").each(function (index, value) {
			var ext = '';	
			if (index != 4) ext = ["jpg", "png", "gif"]; else ext =['mp4','webm'];
			$(this).filer({
			limit: 1,
			extensions: ext,
			showThumbs: !0,
			templates: {
				box: '<div class="box"></div>',
				item: '<div class="img-item"><div class="remove">&times;</div><div class="img">{{fi-image}}</div></div>',
				itemAppendToEnd: !1,
				removeConfirmation: !0,
				_selectors: {
					list: ".box",
					item: ".img-item",
					remove: ".remove"
				}
			},
			uploadFile: {
				//url: "/third_party/php-uploader/examples/upload.php",
				url: "/success/ajax_upload",
				data: null,
				type: 'POST',
				enctype: 'multipart/form-data',
				beforeSend: function () {
					var re = /(?:\.([^.]+))?$/;
					var ext = re.exec(_input.current_file.file.name)[1];
					console.log(_input);
					console.log(ext);
				},
				success: function (data, el) {	
					$(input_id).val(data);		
					var dataj = JSON.parse(data);
					if (dataj.metas[0].type[0] == 'video') {				
						var src = dataj.metas[0].dir;
						$(input_id).parent().find('.jFiler-item-thumb-image').html('<video src="'+src+'">');
					}
				},
				error: function (el) {
					console.log(el);
					$(input_id).val("");
					var parent = el.find(".jFiler-jProgressBar").parent();
					el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
						$("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
					});
				},
				statusCode: null,
				onProgress: function () {
					$("#file_submit").html("Фотографии загружаются...");
					$("#file_submit").attr("disabled", "disabled");
				},
				onComplete: function () {
					$("#file_submit").html("Отправить");
					$("#file_submit").removeAttr("disabled");
				}
			},
			files: null,
			dragDrop: {
				dragEnter: null,
				dragLeave: null,
				drop: null
			},
			onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {
				console.log(file.name);
				$.get('/success/clear/'+file.name);
				//$.post('/success/ajax_upload', {file: file});
				$(input_id).val("");
			}
		});
	});
	
	
	$("#profile-input").filer({
        limit: 100,
        showThumbs: !0,
		        templates: {
            box: '<div class="box"></div>',
            item: '<div class="img-item"><div class="remove">&times;</div><div class="img">{{fi-image}}</div></div>',
            itemAppendToEnd: !1,
            removeConfirmation: !0,
            _selectors: {
                list: ".box",
                item: ".img-item",
                remove: ".remove"
            }
        },
		uploadFile: {
            //url: "/third_party/php-uploader/examples/upload.php",
            url: "/success/ajax_upload_profile",
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            beforeSend: function () {
				var re = /(?:\.([^.]+))?$/;
				var ext = re.exec(_input.current_file.file.name)[1];
				//console.log(_input);
				//console.log(ext);
            },
            success: function (data, el) {
                $(input_id).val(data);	
				var d = new Date();
				var profile_src = '/assets/uploads/profile_photos/'+JSON.parse(data).id+'.jpg';
				$('.profile_photo').css("background-image",'url('+profile_src+'?'+d.getTime()+')');
				console.log(data);				
            },
            error: function (el) {
				console.log(el);
                $(input_id).val("");
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: function () {
        },
        files: null,
        dragDrop: {
            dragEnter: null,
            dragLeave: null,
            drop: null
        },
        onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {
        }
		}
    });
	
	$(".upload_profile_photo").click(function () {		
		$('#profile-input').trigger('click');
		return false;
	});	
	$(".add_success_footer a").click(function () {		
		save_method = 'add'
		save_success();
		return false;
	});

function save_success()
{
    var url;
		
    if(save_method == 'add') {
        url = "success/ajax_add";
    } else {
        url = "success/ajax_update";
    }
	
	$(".dialog_add_success input[name=title], input[name=tags], select[name=category], input[name=date_author], textarea[name=text]").each(function(index,value) {
		console.log(index);
		console.log($(this));
		console.log($(this).val());
		if ($(this).val() == '') $(this).addClass('unvalid'); else  $(this).removeClass('unvalid');
	});	
	
	if ($('#text_success').val().length < 200) {
			alert('Описание успеха должно быть не менее 200 символов');
			return false;
		}

	
	if (
	$("input[name=title]").val() == '' || 
	$("textarea[name=text]").val() == '' || 
	$("input[name=date]").val() == '' || 
	$("select[name=category]").val() == ''	|| 
	!$('.jFiler-item-thumb-image img').attr('src')
	)
	{
		alert("Заполните все поля");
		return false;
	}

    $.ajax({
        url : url,
        type: "POST",
        data: $('#form_success').serialize(),
        dataType: "text",
		enctype: 'multipart/form-data',
        success: function(data)
        {
			alert('Спасибо за размещение Успеха! После модерации он будет опубликован.');
			window.location.href = '/'+lang;		
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
			alert(errorThrown);			
        }
    });
}

/*check_rules*/
	$(".check_rules").click(function (e) {
		$(this).toggle();
		$("input[name=check_rules]").val('');
		e.stopPropagation();
	});
	$(".check_rules_box").click(function () {
		$("input[name=check_rules]").val(1);      
		if ($(".check_rules").css('display') == 'none') $(".check_rules").show();
	});
	
	/*registration dialog*/
	$("#login_reg").click(function () {
		$(".dialog_login").fadeOut(500);
		modal_dialog_login.close();
		//$('#dialog_users').css('top', $(window).scrollTop());
		if (!modal_dialog_users) {
			modal_dialog_users = $('[data-remodal-id=modal_dialog_users]').remodal();
		}
		modal_dialog_users.open();
		$("#dialog_users").fadeIn(500);
		return false;
	});
	
	/*registration*/	
	$(".validate_reg .reg_footer a").click(function () {
		var validate = true;
		$(".validate_reg input").each(function(i, value) {
			if ($(this).val() == '') {
				$(this).next().show();
				$(this).css("border","1px solid red");
				validate = false;
			}	else {
				$(this).next().hide();
				$(this).css("border","none");
			}
		});
		
		if ($('.dialog_reg input[name=password]').val() != $('.dialog_reg input[name=password2]').val()) {
			if (lang == 'ru') 
			alert('Введенные пароли не совпадают!');
			else
			alert('The entered passwords do not match');			
			validate = false;
		}
		
		if (!($('input[name=email]').val())) {
			validate = false;
		} else {	
			if (!validateEmail($('input[name=email]').val())) {
				if (lang == 'ru') 
				alert('Неправильный формат Email!');
				else
				alert(' Email wrong format');
				validate = false;
			}			
		}
		
		if ($('input[name=check_rules]').val() < 1) {
			if (lang == 'ru') 
			alert('Необходимо подтвердить Ваше согласие с правилами портала Успешный Крым');
			else 
			alert('You must confirm your acceptance of the rules of the Crimean Records portal');
		}
		
		if (validate) {
			$.ajax({
			url : "/admin/login/registration",
			type: "POST",
			data: $('#form').serialize(),
			dataType: "JSON",
			success: function(data)
			{	
			console.log(data);
			if (data.error.login) {
				if (lang == 'ru') 
				alert('Этот логин уже занят, пожалуйста введите другой!');
				else 
				alert('This login is already in use, please enter another one! ');
				return false;
			}	
			if (data.error.email) {
				if (lang == 'ru') 
				alert('Этот Email уже занят, пожалуйста введите другой!');
				else 
				alert('This Email is already in use, please enter another one! ');
				return false;
			}	
				modal_dialog_users.close();
				$("#dialog_users").fadeOut(300, function () {
					alert('Спасибо за регистрацию. Для активации профиля перейдите по ссылке в письме');
					window.location.href = "/"+lang;
				});
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				console.log(jqXHR, textStatus, errorThrown);
			}
			});
		}
		return false;
	});

	/*profile*/	
	$("#open_profile").click(function () {
		$(".dialog_profile").hide();				
		
		if (!modal_dialog_options) {
		modal_dialog_options = $('[data-remodal-id=modal_dialog_options]').remodal();
		}
		modal_dialog_options.open();
		
		//$('body').css('overflow-y','hidden');		
		$('.dialog_profile_options').css('top', $(window).scrollTop() +110+'px');		
		$(".dialog_profile_options").fadeIn(300);
		//$('.overlay').fadeIn(500);
		return false;
	});
	
	$(".dialog_profile_options .reg_footer a").click(function () {
			$.ajax({
			url : "/user/ajax_update_profile",
			type: "POST",
			data: $('.form_profile').serialize(),
			dataType: "JSON",
			success: function(data)
			{
				$(".dialog_profile_options").fadeOut(300, function() {
					if (lang == 'ru')
					alert('Ваш профиль обновлен');	
					else
					alert('Your profile updated');						
					window.location.href = "/"+lang;
				});
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
			}
			});
		return false;
	});
	
});

/* Calculates scrollbar width in pixels */
function scrollbar_width() {
    if( jQuery('body').height() > jQuery(window).height()) {
         
        /* Modified from: http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php */
        var calculation_content = jQuery('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        jQuery('body').append( calculation_content );
        var width_one = jQuery('div', calculation_content).innerWidth();
        calculation_content.css('overflow-y', 'scroll');
        var width_two = jQuery('div', calculation_content).innerWidth();
        jQuery(calculation_content).remove();
        return ( width_one - width_two );
    }
    return 0;
}

function gaTrack(path, title) {
  ga('set', { page: path, title: title });
  ga('send', 'pageview');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


