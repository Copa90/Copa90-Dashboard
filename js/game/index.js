var hintArray = [
	"با ارسال کد معرفی برای دوستانتان، ۵ پیش بینی رایگان هدیه بگیرید",
	"در گروه مورد علاقه‌ی خود امتیاز کسب کنید و جایزه بگیرید",
	"با دوستان خود چالش پیش‌بینی برگزار کنید و توانایی پیش‌بینی‌تان را به رخ بکشید",
	"جزء بهترین‌های هفته، ماه و فصل باشید و جایزه ببرید",
	"اولین خرید بسته‌ی پیش‌بینی توسط دوست معرفی‌شده‌‌ی شما، ۵ پیش‌بینی رایگان دیگر برایتان دارد",
	"بسته‌‌ی جدید بخرید، بیشتر پیش‌بینی کنید و شانس برنده‌شدن خود را افزایش دهید",
	"بسته‌های ویژه برای حرفه‌ای‌ها! به‌صرفه‌تر پیش‌بینی کنید"
]

var hintNo = getRandomInt(0, hintArray.length)
$('#hint_box_description').html(hintArray[hintNo])

function wrapAccessToken(url, accessToken) {
	if (url.indexOf('?') !== -1)
		return url + '&access_token=' + accessToken
	else
		return url + '?access_token=' + accessToken
}

function wrapFilter(url, filter) {
	if (url.indexOf('?') !== -1)
		return url + '&filter=' + filter
	else
		return url + '?filter=' + filter
}

function timeConvertor(myDate) {
	var parts = myDate.split(" ")
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	return Math.floor((new Date(parseInt(parts[3]), months.indexOf(parts[2]), parseInt(parts[1]))).getTime())
}

function fullTimeConvertor(myDate) {
	var parts = myDate.split(" ")
	var doublePart = parts[5].split(":")
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	return Math.floor((new Date(parseInt(parts[3]), months.indexOf(parts[2]), parseInt(parts[1]), parseInt(doublePart[0]), parseInt(doublePart[1]))).getTime())
}

function dateConvertor(myDate) {
	var d = new Date(Number(myDate))
	var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	return ('' + weekday[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear())
}

function fullDateConvertor(myDate) {
	var d = new Date(Number(myDate))
	var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	return ('' + weekday[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' - ' + d.getHours() + ':' + d.getMinutes())
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function sendWarningSwal(callback) {
		swal({
			title: "آیا مطمئن هستید؟",
			text: "بعد از انجام این عملیات، دیگر قادر به بازگرداندن آن نخواهید بود",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "بله، انجام بده",
			cancelButtonText: "دست نگه دار",
			closeOnConfirm: false,
			closeOnCancel: true
		}, function (isConfirm) {
			callback(isConfirm)
		})
}

function showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
	if (colorName === null || colorName === '') {
		colorName = 'bg-black';
	}
	if (text === null || text === '') {
		text = 'Turning standard Bootstrap alerts';
	}
	if (animateEnter === null || animateEnter === '') {
		animateEnter = 'animated fadeInDown';
	}
	if (animateExit === null || animateExit === '') {
		animateExit = 'animated fadeOutUp';
	}
	var allowDismiss = true;

	$.notify({
		message: text
	}, {
		type: colorName,
		allow_dismiss: allowDismiss,
		newest_on_top: true,
		timer: 1000,
		placement: {
			from: placementFrom,
			align: placementAlign
		},
		animate: {
			enter: animateEnter,
			exit: animateExit
		},
		template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
			'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
			'<span data-notify="icon"></span> ' +
			'<span data-notify="title">{1}</span> ' +
			'<span data-notify="message">{2}</span>' +
			'<div class="progress" data-notify="progressbar">' +
			'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
			'</div>' +
			'<a href="{3}" target="{4}" data-notify="url"></a>' +
			'</div>'
	});
}

function successfulOperation() {
	showNotification('bg-cyan', 'عملیات شما با موفقیت انجام شد', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function successfulOperationByString(sentence) {
	showNotification('bg-green', sentence, 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function failedOperation() {
	showNotification('bg-deep-orange', 'عملیات شما با شکست مواجه شد', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function failedOperationByString(sentence) {
	showNotification('bg-deep-orange', sentence, 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function warningOperation() {
	showNotification('bg-orange', 'لطفا همه فیلدهای ضروری را پر کنید', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function predictOverOperation() {
	showNotification('bg-orange', 'پیش‌بینی‌ جدیدی برای این گروه موجود نمی‌باشد', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function authenticationRequiredOperation() {
	showNotification('bg-deep-orange', 'عذرخواهی میکنیم! نیاز است که مجددا وارد شوید', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

// var coreEngine_url = "http://66.70.216.149:4000/api/"
// var zarinPal_url = "http://66.70.216.149:4010/api/"
// var coreURL = 'http://6ghadam.com/6ghadam/'

var coreEngine_url = "https://core-6ghadam.herokuapp.com/api/"
var zarinPal_url = "https://core-6ghadam.herokuapp.com/api/"
var coreURL = 'https://6Ghadam.com/'

$(document).ready(function () {

	$(document).ajaxError(function myErrorHandler(event, x, ajaxOptions, thrownError) {
		doneLoading()
		doneProgressBar()
		if (x.responseJSON)
		if (x.responseJSON.error)
			if (x.responseJSON.error.message.includes('خطا')) 
				return failedOperationByString(x.responseJSON.error.message)
		failedOperation()
	})

	startLoading()

	var firstTour

	var phoneNumber
	var userClient
	var currentPredict
	var currentSamplePredict
	var favTeam

	var weekIndex
	var sampleIndex
	var afterSignUp

	var acceptCount = 0
	var sampleAward = 0

	var clientModel
	var leaguesArray = []
	var teamsArray = []
	var packagesArray = []

	var predictsArray = []
	var weeklyPredict = []
	var samplePredict = []
	var acceptedSamplePredicts = []

	var timeSort = 3
	var pointSort = 3

	var exactsArray = []
	var exactChoice = {}

	var userTeamRanking = []
	var allUsers = []

	var currentLeague

	var source = getUrlVars()["source"]
	var ref = getUrlVars()["ref"]
	if (ref)
		$("#aaa_signup_referrer").val(ref)

	var userId, coreAccessToken

	initTour()
	initUtility()

	function resetAll() {
		firstTour = null
		phoneNumber = null
		userClient = null
		currentPredict = null
		currentSamplePredict = null
		favTeam = null
		afterSignUp = false
		weekIndex = 0
		sampleIndex = 0
		acceptCount = 0
		sampleAward = 0
		clientModel = null
		leaguesArray = []
		teamsArray = []
		packagesArray = []
		predictsArray = []
		weeklyPredict = []
		samplePredict = []
		acceptedSamplePredicts = []
		timeSort = 3
		pointSort = 3
		exactsArray = []
		exactChoice = {}
		userTeamRanking = []
		allUsers = []
		currentLeague = null
		userId = null
		coreAccessToken = null
		localStorage.clear()
	}

	function readFromLocalStorage() {
		if (localStorage.getItem('userId'))
			userId = localStorage.getItem('userId')
		if (localStorage.getItem('userCoreAccessToken'))
			coreAccessToken = localStorage.getItem('userCoreAccessToken')
	}

	if (platform.name.includes('Mobile') || source === 'telegram' || detectmob()) {
		$('.sharedTitle').hide()
		$('.sharedMobile').hide()

		var height = $(window).height()
		$('.sizeControl').css('max-height', height - 50)
		$('.sizeControl').css('height', height - 50)
		$('.positionControl').removeAttr('style')
		$('.positionControl').css('margin-top', '25px')

		prepareMobileEnv()

		if (source === 'telegram') {
			if (getUrlVars()["userId"])
				userId = getUrlVars()["userId"]
			if (getUrlVars()["userCoreAccessToken"])
				coreAccessToken = getUrlVars()["userCoreAccessToken"]
		}
		else {
			readFromLocalStorage()
		}
	}
	else {
		readFromLocalStorage()
	}

	getAllCoaches(function(err, coachResult) {
		if (err)
			return change_page_scene('page_aaa')
		getAllPlayers(function(err, playerResult) {
			if (err)
				return change_page_scene('page_aaa')				
		})
	})

	getAllPackages(function(err, packageResult) {
		if (err)
			return change_page_scene('page_aaa')		
	})

	if (!userId || !coreAccessToken) {
		getAllTeams(function(err, teamsResult) {
			if (err)
				return console.error(err)
			getSampleDataAndFill(function(err, result) {
				if (err)
					return change_page_scene('page_aaa')
				change_page_scene('page_introduction')
				doneProgressBar()
				doneLoading()						
			})
		})
	}
	else {
		getAllInfo(function(err) {
			if (err)
				return change_page_scene('page_aaa')			
			getTeamUsers(favTeam, function(err, result) {
				if (err)
					return change_page_scene('page_aaa')
				doneLoading()
				doneProgressBar()
				fill_table_teamStatistics(userTeamRanking)
				change_page_scene('page_main_menu')
			})
		})
	}	
	if (userId) {
		getAllUsers(function(err, result) {
			if (err)
				return change_page_scene('page_aaa')
			fill_table_totalStatistics(result)
		})
	}

	// ------------------------------ //
	// 		  	Page Controller					//
	// ------------------------------ //
	function change_page_scene(pageName) {
		var pages = ['page_aaa', 'page_main_menu', 'page_main_prediction', 'page_ranking', 'page_profile', 'page_package', 'page_introduction']
		for (var i = 0; i < pages.length; i++) {
			var str = '#' + pages[i]
			if (pages[i] === pageName)
				$(str).show()
			else
				$(str).hide()
		}
		if (source === 'telegram' || platform.name.includes('Mobile') || detectmob()) {
			$('#learning_section_parent').removeClass('m-l-45 m-b-30').addClass('m-l-20 m-b-15')
			if (pageName === 'page_aaa' || pageName === 'page_main_menu')
				$('#learning_section_button').fadeIn()
			else 
				$('#learning_section_button').hide()
		}
		if (pageName === 'page_aaa') {
			$('#sign-in').fadeIn()
			$('#password').hide()
			$('#sign-up').hide()
			$('#phone').hide()
		}
		else if (pageName === 'page_profile') {
			tabHandler({ target: { id: 'nav6' } })
			$('.nav-tabs a[id="nav6"]').tab('show')
		}
		else if (pageName === 'page_ranking') {
			tabHandler({ target: { id: 'nav3' } })
			$('.nav-tabs a[id="nav3"]').tab('show')
		}
		else if (pageName === 'page_main_prediction') {
			startFirstTour()
		}
	}
	// ------------------------------ //
	// 			  	Selectors							//
	// ------------------------------ //
	function fill_exact_selector(exactsArray) {
		$('#main_exact_selector').find('option').remove()
		for (var i = 0; i < exactsArray.length; i++) {
			var itemToPush = {
				id: exactsArray[i].id,
				name: exactsArray[i].name
			}
			$('#main_exact_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}))
		}
		$('#main_exact_selector').selectpicker('refresh')
	}
	function fill_exact_answer_selector(exactObject, answersArray) {
		var itemToPush = {}
		if (exactObject.label === 'Team') iteratArray = teamsArray
		else if (exactObject.label === 'League') iteratArray = leaguesArray
		else if (exactObject.label === 'Player') iteratArray = playersArray
		else if (exactObject.label === 'Coach') iteratArray = coachesArray
		$('#main_exact_first_answer_selector').find('option').remove()
		$('#main_exact_second_answer_selector').find('option').remove()
		$('#main_exact_third_answer_selector').find('option').remove()
		for (var i = 0; i < answersArray.length; i++) {
			var teamName = ''
			for (var k = 0; k < iteratArray.length; k++) {
				if (iteratArray[k].name.toString() === answersArray[i].choice.toString()) {
					if (iteratArray[k].team) {
						teamName = iteratArray[k].team
						break
					}
				}
			}
			itemToPush = {
				id: i.toString(),
				name: answersArray[i].choice + ' - ' + Persian_Number(answersArray[i].point.first.toString()) + ' امتیاز'
			}
			$('#main_exact_first_answer_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}).data("subtext", '&nbsp;&nbsp; ' + teamName))
			itemToPush = {
				id: i.toString(),
				name: answersArray[i].choice + ' - ' + Persian_Number(answersArray[i].point.second.toString()) + ' امتیاز'
			}
			$('#main_exact_second_answer_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}).data("subtext", '&nbsp;&nbsp; ' + teamName))
			itemToPush = {
				id: i.toString(),
				name: answersArray[i].choice + ' - ' + Persian_Number(answersArray[i].point.third.toString()) + ' امتیاز'
			}
			$('#main_exact_third_answer_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}).data("subtext", '&nbsp;&nbsp; ' + teamName))
		}
		$('#main_exact_first_answer_selector').selectpicker('refresh')
		$('#main_exact_second_answer_selector').selectpicker('refresh')
		$('#main_exact_third_answer_selector').selectpicker('refresh')
	}
	function fill_team_selector(teamsArray) {
		$('#aaa_signup_select_team').find('option').remove()
		for (var i = 0; i < teamsArray.length; i++) {
			var itemToPush = {
				id: teamsArray[i].id,
				name: teamsArray[i].name
			}
			$('#aaa_signup_select_team').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}))
		}
		$('#aaa_signup_select_team').selectpicker('refresh')
	}
	// ------------------------------ //
	// 		 	 	Edit Rows Filler				//
	// ------------------------------ //
	function empty_all_fields() {
		$('select').selectpicker('deselectAll')
		$('select').selectpicker('val', '')
		$('select').selectpicker('refresh')
	}
	// ------------------------------ //
	// 				  	Shared							//
	// ------------------------------ //
	$(document).on("click", ".packagePurchase", function (e) {
		e.preventDefault()
		change_page_scene('page_package')
	})
	$(document).on("click", "#demo_start_game_button", function (e) {
		e.preventDefault()
		change_page_scene('page_aaa')
	})
	$(document).on("click", ".returnMain", function (e) {
		e.preventDefault()
		startProgressBar()
		getUserInfo(function(err, result) {
			doneProgressBar()
			if (err)
				return change_page_scene('page_aaa')
			change_page_scene('page_main_menu')
			empty_all_tables()
			empty_all_fields()
		})
	})
	function redirect_total_point() {
		change_page_scene('page_profile')
	}
	function redirect_total_chances() {
		change_page_scene('page_package')
	}
	function redirect_profile_image() {
		change_page_scene('page_profile')
		tabHandler({ target: { id: 'nav6' } })
		$('.nav-tabs a[id="nav6"]').tab('show')
	}
	$(".card_total_points").parent().parent().parent().click(redirect_total_point)
	$(".card_rem_predicts").parent().parent().parent().click(redirect_total_chances)
	$("#main_menu_profile_image").click(redirect_profile_image)
	// ------------------------------ //
	// 							AAA								//
	// ------------------------------ //
	$(document).on("click", "#aaa_send_phone_button", function (e) {
		e.preventDefault()
		phoneNumber = $("#aaa_send_phone_phone_number").val()
		if (!phoneNumber || phoneNumber.includes('_')) {
			return warningOperation()
		}
		var str = 'از شماره ' + Persian_Number(phoneNumber.toString()) + ' برای ورود و ارسال کد اعتبار سنجی به شما استفاده می‌شود'
		swal({
			title: "آیا از شماره وارد شده مطمئن هستید؟",
			text: str,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "ادامه",
			cancelButtonText: "تغییر",
			closeOnConfirm: true,
			closeOnCancel: true
		}, function (isConfirm) {
			if (isConfirm) {
				$('#sign-in').hide()
				$('#password').hide()
				$('#sign-up').fadeIn()
				$('#phone').hide()		
			}
			else {
				phoneNum = ''
				$("#aaa_send_phone_phone_number").val('')
			}
		})
	})
	$(document).on("click", "#aaa_send_code_button", function (e) {
		e.preventDefault()
		var code = $("#aaa_send_code_code").val()
		var phoneNum = $("#aaa_send_code_phone").val()
		if (!phoneNum || !code || phoneNum.includes('_') || code.includes('_')) {
			return warningOperation()
		}		
		startProgressBar()
		var verificationURL = coreEngine_url + 'verifications/' + phoneNum + '/verify/' + code
		$.ajax({
			url: verificationURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (verificationResult) {
				doneProgressBar()
				successfulOperation()
				$('#sign-in').fadeIn()
				$('#password').hide()
				$('#sign-up').hide()
				$('#phone').hide()
			}
		})
	})
	$(document).on("click", "#aaa_send_password_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_password_phone_number").val()
		if (!phoneNum || phoneNum.includes('_')) {
			return warningOperation()
		}		
		startProgressBar()
		var passwordURL = coreEngine_url + 'clients/' + phoneNum + '/sendPassword'
		$.ajax({
			url: passwordURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (passwordResult) {
				doneProgressBar()
				successfulOperation()
				$('#sign-in').fadeIn()
				$('#password').hide()
				$('#sign-up').hide()
				$('#phone').hide()
			}
		})
	})
	$(document).on("click", "#aaa_signup_button", function (e) {
		e.preventDefault()
		var re = '^[a-z0-9_]{3,15}$'
		if (!$("#aaa_signup_fullname").val() || !$("#aaa_signup_username").val() ||
				!$("#aaa_signup_email").val() || !$("#aaa_signup_password").val() ||
				!phoneNumber || !$("#aaa_signup_select_team").val()
		) {
			return warningOperation()
		}
		var patt = new RegExp(re)
		var uname = $("#aaa_signup_username").val().toLowerCase()
		if (!patt.test(uname)) {
			return failedOperationByString('خطا! نام کاربری باید فقط شامل حروف و اعداد انگلیسی باشد')
		}
		var data = {
			fullname: $("#aaa_signup_fullname").val(),
			username: uname,
			email: $("#aaa_signup_email").val(),
			password: $("#aaa_signup_password").val(),
			phoneNumber: phoneNumber,
			time: Math.floor((new Date).getTime())
		}
		if ($("#aaa_signup_referrer").val())
			data.referrer = $("#aaa_signup_referrer").val()
		startProgressBar()
		var clientsURL = coreEngine_url + 'clients'
		$.ajax({
			url: clientsURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (clientResult) {
				var verifyURL = coreEngine_url + 'verifications/' + phoneNumber + '/sendVerification/'
				$.ajax({
					url: verifyURL,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					type: "POST",
					success: function (verifyResult) {
						var teamURL = coreEngine_url + 'teams/' + clientResult.id + '/selectFavorite/' + $("#aaa_signup_select_team").val()
						$.ajax({
							url: teamURL,
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							type: "POST",
							success: function (teamResult) {
								doneProgressBar()
								successfulOperation()
								afterSignUp = true
								$('#sign-in').hide()
								$('#password').hide()
								$('#sign-up').hide()
								$('#phone').show()
								$('#sendPhone').hide()
								$('#aaa_send_code_phone').val(phoneNumber)
								$('#sendCode').fadeIn()
							}
						})
					}
				})
			}
		})
	})
	$(document).on("click", "#aaa_signin_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_signin_phone_number").val()
		var pass = $("#aaa_signin_password").val()
		if (!phoneNum || !pass || phoneNum.includes('_')) {
			return warningOperation()
		}
		var data = {
			phoneNumber: phoneNum,
			password: pass
		}
		startProgressBar()
		var loginURL = coreEngine_url + 'clients/login'
		$.ajax({
			url: loginURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (clientResult) {
				coreAccessToken = clientResult.id
				userId = clientResult.userId
				getAllInfo(function(err) {
					if (err)
						return failedOperation()
					getTeamUsers(favTeam, function(err, result) {
						doneProgressBar()
						if (err)
							return failedOperation()
						fill_table_teamStatistics(userTeamRanking)
						if (source !== 'telegram') {
							localStorage.setItem('userCoreAccessToken', coreAccessToken)
							localStorage.setItem('userId', userId)
						}
					})
					getAllUsers(function(err, result) {
						if (err)
							return change_page_scene('page_aaa')
						fill_table_totalStatistics(result)
					})
					if (afterSignUp) {
						sendAllIntroductionPredicts(acceptedSamplePredicts, function(err, result) {
							if (err)
								return failedOperationByString(err.message)
							afterSignUp = false
							change_page_scene('page_main_menu')
						})	
					}
					else {
						change_page_scene('page_main_menu')
					}
				})
			}
		})
	})
	$(document).on("click", "#aaa_change_number_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_change_number_phone").val()
		var email = $("#aaa_change_number_email").val()
		var pass = $("#aaa_change_number_password").val()
		if (!phoneNum || !pass || !email || phoneNum.includes('_')) {
			return warningOperation()
		}
		var data = {
			email: email,
			password: pass,
			phoneNumber: phoneNum
		}
		var str = 'از شماره ' + Persian_Number(phoneNum.toString()) + ' برای ورود و ارسال کد اعتبار سنجی به شما استفاده می‌شود'
		swal({
			title: "آیا از شماره وارد شده مطمئن هستید؟",
			text: str,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "ادامه",
			cancelButtonText: "تغییر",
			closeOnConfirm: true,
			closeOnCancel: true
		}, function (isConfirm) {
			if (isConfirm) {
				startProgressBar()
				var clientURL = wrapAccessToken(coreEngine_url + 'clients/changePhone', coreAccessToken);
				$.ajax({
					url: clientURL,
					data: JSON.stringify(data),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					type: "PUT",
					success: function (changePhoneResult) {
						var verifyURL = coreEngine_url + 'verifications/' + phoneNum + '/sendVerification'
						$.ajax({
							url: verifyURL,
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							type: "POST",
							success: function (verifyResult) {
								if (verifyResult === 'already verified')
									failedOperationByString('خطا! شما در حال حاضر احراز هویت کرده‌اید')
								$('#sign-in').hide()
								$('#password').hide()
								$('#sign-up').hide()
								$('#phone').show()
								$('#sendPhone').hide()
								$('#changePhone').hide()
								$('#aaa_send_code_phone').val(phoneNum)
								$('#sendCode').fadeIn()
								doneProgressBar()
								successfulOperation()		
							}
						})				
					}
				})
			}
			else {
				phoneNum = ''
				$("#aaa_change_number_phone").val('')
			}
		})
	})
	$(document).on("click", "#aaa_resend_code_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_send_code_phone").val()
		if (!phoneNum || phoneNum.includes('_')) {
			return warningOperation()
		}
		var verifyURL = coreEngine_url + 'verifications/' + phoneNum + '/resendVerification'
		startProgressBar()
		$.ajax({
			url: verifyURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (verifyResult) {
				if (verifyResult === 'already verified')
					failedOperationByString('خطا! شما در حال حاضر احراز هویت کرده‌اید')
				else
					successfulOperation()
				doneProgressBar()
				$('#sign-in').hide()
				$('#password').hide()
				$('#sign-up').hide()
				$('#phone').show()
				$('#sendPhone').hide()
				$('#changePhone').hide()
				$('#aaa_send_code_phone').val(phoneNum)
				$('#sendCode').fadeIn()
			}
		})
	})
	$(document).on("click", "#introduction_signIn", function (e) {
		e.preventDefault()
		change_page_scene('page_aaa')
	})
	$(document).on("click", "#introduction_signUp", function (e) {
		e.preventDefault()
		change_page_scene('page_aaa')
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').hide()
		$('#phone').fadeIn()
		$('#changePhone').hide()
		$('#sendPhone').fadeIn()
		$('#sendCode').hide()
	})
	$(document).on("click", ".changeNumberHref", function (e) {
		e.preventDefault()
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').hide()
		$('#phone').fadeIn()
		$('#sendPhone').hide()
		$('#changePhone').fadeIn()
		$('#sendCode').hide()
	})
	$(document).on("click", ".signinHref", function (e) {
		e.preventDefault()
		$('#sign-in').fadeIn()
		$('#password').hide()
		$('#sign-up').hide()
		$('#phone').hide()
	})
	$(document).on("click", ".signupHref", function (e) {
		e.preventDefault()
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').hide()
		$('#phone').fadeIn()
		$('#changePhone').hide()
		$('#sendPhone').fadeIn()
		$('#sendCode').hide()
	})
	$(document).on("click", ".passwordHref", function (e) {
		e.preventDefault()
		$('#sign-in').hide()
		$('#password').fadeIn()
		$('#sign-up').hide()
		$('#phone').hide()
	})
	$(document).on("click", ".sendCodeHref", function (e) {
		e.preventDefault()
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').hide()
		$('#phone').fadeIn()
		$('#sendPhone').hide()
		$('#changePhone').hide()
		$('#sendCode').fadeIn()
	})
	// ------------------------------ //
	// 					Main Menue						//
	// ------------------------------ //
	$(document).on("click", "#main_menu_prediction_button", function (e) {
		e.preventDefault()
		currentLeague = 'every'
		clearExact()
		clearPredict()
		timeSort = 3
		pointSort = 3
		getDataAndFill(function (err, result) {})
	})
	$(document).on("click", "#main_menu_profile_button", function (e) {
		e.preventDefault()
		change_page_scene('page_profile')
	})
	$(document).on("click", "#main_menu_statistics_button", function (e) {
		e.preventDefault()
		change_page_scene('page_ranking')
	})
	// ------------------------------ //
	// 				  Main predict					//
	// ------------------------------ //
	function sendAllIntroductionPredicts(predictsList, callback) {
		if (acceptedSamplePredicts.length == 0)
			return callback(null, null)
		var counter = 0
		for (var i = 0; i < acceptedSamplePredicts.length; i++) {
			var data = acceptedSamplePredicts[i]
			data.clientId = userId
			var estimateURL = wrapAccessToken(coreEngine_url + 'estimates', coreAccessToken);
			$.ajax({
				url: estimateURL,
				data: JSON.stringify(data),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				type: "POST",
				success: function (estimateResult) {
					counter++
					if (counter == acceptedSamplePredicts.length)
						callback(null, true)
				},
				error: function (xhr, status, error) {
					counter++
				}
			})
		}
	}
	$(document).on("click", "#main_predict_accept_button", function (e) {
		e.preventDefault()
		var data = {
			predictId: currentPredict.id,
			clientId: userId,
			time: Math.floor((new Date).getTime())
		}
		startProgressBar()
		var estimateURL = wrapAccessToken(coreEngine_url + 'estimates', coreAccessToken);
		$.ajax({
			url: estimateURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (estimateResult) {
				function fill_progress_bar() {
					var total = userClient.accountInfoModel.chances
					var fill = ((total - acceptCount) / total) * 100
					var white = 100 - fill
					$('#main_predict_progress_white').css('width', white.toString() + '%')
					$('#main_predict_progress_fill').css('width', fill.toString() + '%')
					if (fill >= 75)
						$("#main_predict_progress_fill").removeClass("bg-orange bg-yellow bg-deep-orange").addClass("bg-green")
					else if (fill >= 50)
						$("#main_predict_progress_fill").removeClass("bg-orange bg-green bg-deep-orange").addClass("bg-yellow")
					else if (fill >= 25)
						$("#main_predict_progress_fill").removeClass("bg-green bg-yellow bg-deep-orange").addClass("bg-orange")
					else 
						$("#main_predict_progress_fill").removeClass("bg-orange bg-yellow bg-green").addClass("bg-deep-orange")
				}
				fill_progress_bar()
				acceptCount++
				clearPredict()
				if (weekEnable) {
					var model = weeklyPredict[weekIndex]
					model.accepted = true
					weeklyPredict[weekIndex] = model
					if (weekIndex + 1 < weeklyPredict.length)
						weekIndex++
					else
						weekIndex = 0
					currentPredict = weeklyPredict[weekIndex]	
					displayPredict()
				}
				else {
					change_page_scene('page_main_menu')
					predictOverOperation()			
				}
				doneProgressBar()
			}
		})
	})
	$(document).on("click", "#introduction_predict_accept_button", function (e) {
		e.preventDefault()
		var data = {
			predictId: currentSamplePredict.id,
			time: Math.floor((new Date).getTime())
		}
		startProgressBar()
		sampleAward += Number(currentSamplePredict.point)
		acceptedSamplePredicts.push(data)
		clearSample()
		var model = samplePredict[sampleIndex]
		model.accepted = true
		samplePredict[sampleIndex] = model
		if (sampleIndex + 1 < samplePredict.length)
			sampleIndex++
		else
			sampleIndex = 0
		currentSamplePredict = samplePredict[sampleIndex]	
		doneProgressBar()
		displaySample()
	})
	$(document).on("click", "#main_predict_next_button", function (e) {
		e.preventDefault()
		startProgressBar()
		clearPredict()
		if (weekEnable) {
			if (weekIndex + 1 < weeklyPredict.length)
				weekIndex++
			else
				weekIndex = 0
			currentPredict = weeklyPredict[weekIndex]	
			displayPredict()		
		}
		else {
			change_page_scene('page_main_menu')
			predictOverOperation()			
		}
		doneProgressBar()
	})
	$(document).on("click", "#main_predict_prev_button", function (e) {
		e.preventDefault()
		startProgressBar()
		clearPredict()
		if (weekEnable) {
			if (weekIndex - 1 >= 0)
				weekIndex--
			else
				weekIndex = (weeklyPredict.length - 1)
			currentPredict = weeklyPredict[weekIndex]	
			displayPredict()		
		}
		else {
			change_page_scene('page_main_menu')
			predictOverOperation()			
		}
		doneProgressBar()
	})
	$(document).on("click", "#introduction_predict_next_button", function (e) {
		e.preventDefault()
		startProgressBar()
		clearSample()
		if (sampleIndex + 1 < samplePredict.length)
			sampleIndex++
		else
			sampleIndex = 0
		currentSamplePredict = samplePredict[sampleIndex]	
		displaySample()		
		doneProgressBar()
	})
	$(document).on("click", "#introduction_predict_prev_button", function (e) {
		e.preventDefault()
		startProgressBar()
		clearSample()
		if (sampleIndex - 1 >= 0)
			sampleIndex--
		else
			sampleIndex = (samplePredict.length - 1)
		currentSamplePredict = samplePredict[sampleIndex]	
		displaySample()
		doneProgressBar()
	})
	$(document).on("click", "#main_predict_return_menu", function (e) {
		e.preventDefault()
		startProgressBar()
		getAllInfo(function(err) {
			doneProgressBar()
			if (err)
				return failedOperation()
			else {
				empty_all_tables()
				empty_all_fields()
				weekIndex = 0
				change_page_scene('page_main_menu')
			}
		})
	})
	$(document).on("click", "#main_exact_accept_button", function (e) {
		e.preventDefault()
		var verb, choiceURL
		if (!currentExact || !userId || (!$('#main_exact_first_answer_selector').find('option:selected').text() && !$('#main_exact_second_answer_selector').find('option:selected').text() && !$('#main_exact_third_answer_selector').find('option:selected').text())) {
			return warningOperation()
		}
		var ans1, ans2, ans3
		for (var i = 0; i < currentExact.selectors.length; i++) {
			if (i.toString() === $('#main_exact_first_answer_selector').find('option:selected').val())
				ans1 = currentExact.selectors[i].choice
			if (i.toString() === $('#main_exact_second_answer_selector').find('option:selected').val())
				ans2 = currentExact.selectors[i].choice
			if (i.toString() === $('#main_exact_third_answer_selector').find('option:selected').val())
				ans3 = currentExact.selectors[i].choice
		}

		var byEdit = 0
		if (!$('#main_exact_first_answer_selector').prop('disabled') && $('#main_exact_first_answer_selector').val())
			byEdit++
		if (!$('#main_exact_second_answer_selector').prop('disabled') && $('#main_exact_second_answer_selector').val())
			byEdit++
		if ($('#main_exact_third_answer_selector').prop('disabled') && $('#main_exact_third_answer_selector').val())
			byEdit++

		if (byEdit == 0)
			return failedOperationByString('خطا! شما انتخاب جدیدی برای این‌ پیش‌بینی قطعی وارد نکرده‌اید')

		acceptCount += byEdit

		var data = {
			clientId: userId,
			exactId: currentExact.id,
			firstOption: {
				choice: ans1
			},
			secondOption: {
				choice: ans2
			},
			thirdOption: {
				choice: ans3
			},
			time: Math.floor((new Date).getTime())
		}
		if (!exactChoice) {
			choiceURL = wrapAccessToken(coreEngine_url + 'choices', coreAccessToken);
			verb = 'POST'
		}
		else {
			data.id = exactChoice.id
			choiceURL = wrapAccessToken(coreEngine_url + 'choices/' + exactChoice.id, coreAccessToken);
			verb = 'PUT'
		}
		startProgressBar()
		$.ajax({
			url: choiceURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: verb,
			success: function (choiceResult) {
				clearExact()
				showExact()
				var total = userClient.accountInfoModel.chances
				var fill = ((total - acceptCount) / total) * 100
				var white = 100 - fill
				$('#main_predict_progress_white').css('width', white.toString() + '%')
				$('#main_predict_progress_fill').css('width', fill.toString() + '%')
				if (fill >= 75)
					$("#main_predict_progress_fill").removeClass("bg-orange bg-yellow bg-deep-orange").addClass("bg-green")
				else if (fill >= 50)
					$("#main_predict_progress_fill").removeClass("bg-orange bg-green bg-deep-orange").addClass("bg-yellow")
				else if (fill >= 25)
					$("#main_predict_progress_fill").removeClass("bg-green bg-yellow bg-deep-orange").addClass("bg-orange")
				else 
					$("#main_predict_progress_fill").removeClass("bg-orange bg-yellow bg-green").addClass("bg-deep-orange")
				doneProgressBar()
				successfulOperation()
			}
		})
	})
	// ------------------------------ //
	// 						Play Room						//
	// ------------------------------ //
	function getSampleDataAndFill(callback) {
		startProgressBar()
		getSampleObjectArray(function(err, result) {
			doneProgressBar()
			if (err) {
				resetAll()
				failedOperation()
				return callback(err)
			}
			if (result.length == 0)
				return change_page_scene('page_aaa')
			samplePredict = []
			sampleIndex = 0
			for (var k = 0; k < result.length; k++) {
				if (result[k].tag === 'Week')
					samplePredict.push(result[k])
			}	
			currentSamplePredict = samplePredict[0]
			clearSample()
			displaySample()
			return callback(null, samplePredict)
		})
	}
	function getDataAndFill(callback) {
		startProgressBar()
		$('#main_predict_accept_button').prop('disabled', true)
		$('#main_predict_prev_button').prop('disabled', true)
		$('#main_predict_next_button').prop('disabled', true)
		getNextObjectArray(function(err, result, exacts) {
			doneProgressBar()
			if (err)
				return failedOperation()
			$('#main_predict_progress_white').css('width', '0%')
			$('#main_predict_progress_fill').css('width', '100%')
			if (result.length == 0 && exacts.length == 0) {
				weekEnable = false
				change_page_scene('page_main_menu')
				predictOverOperation()
			}
			else {
				weeklyPredict = []
				weekIndex = 0	
				for (var k = 0; k < result.length; k++) {
					if (result[k].tag === 'Week')
						weeklyPredict.push(result[k])
				}	
				if (weeklyPredict.length == 0) {
					$("#nav1").attr({"data-toggle":''})
					$('#nav1').parent().addClass('disabled')
				}
				else {
					$("#nav1").attr({"data-toggle":'tab'})
					$('#nav1').parent().removeClass('disabled')
				}
				if (exacts.length == 0) {
					$("#nav2").attr({"data-toggle":''})
					$('#nav2').parent().addClass('disabled')
				}
				else {
					$("#nav2").attr({"data-toggle":'tab'})
					$('#nav2').parent().removeClass('disabled')					
				}
				change_page_scene('page_main_prediction')
				if (timeSort != 3 || pointSort != 3) {
					if (timeSort != 3) {
						function compareASC(a, b){
							var d1 = Number(a.endingTime) - (new Date).getTime()
							var d2 = Number(b.endingTime) - (new Date).getTime()
							return Number(d2 - d1)
						}
						function compareDSC(a, b){
							var d1 = Number(a.endingTime) - (new Date).getTime()
							var d2 = Number(b.endingTime) - (new Date).getTime()
							return Number(d1 - d2)
						}
						if (timeSort == 0) {
							weeklyPredict.sort(compareDSC)
						}
						else {
							weeklyPredict.sort(compareASC)
						}
						weekIndex = 0
					}
					else if (pointSort != 3) {
						function compareASC(a, b){
							return Number(b.point) - Number(a.point)
						}
						function compareDSC(a, b){
							return Number(a.point) - Number(b.point)
						}
						if (pointSort == 0) {
							weeklyPredict.sort(compareDSC)
						}
						else {
							weeklyPredict.sort(compareASC)
						}
						weekIndex = 0
					}
					if (weekEnable) {
						$('.nav-tabs a[id="nav1"]').tab('show')
						tabHandler({ target: { id: 'nav1' } })
					}
				}
				else {
					if (weeklyPredict.length == 0) {
						if (exacts.length != 0) {
							weekEnable = false
							$('.nav-tabs a[id="nav2"]').tab('show')
							tabHandler({ target: { id: 'nav2' } })
						}
					}
					else {
						weekEnable = true
						$('.nav-tabs a[id="nav1"]').tab('show')
						tabHandler({ target: { id: 'nav1' } })
					}		
				}
			}
		})
	}
	$(document).on("click", "#main_predict_estimates_button", function (e) {
		e.preventDefault()
		startProgressBar()
		var estimateURL = wrapAccessToken(coreEngine_url + 'clients/' + userId + '/estimates', coreAccessToken)
		$.ajax({
			url: estimateURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (estimateResult) {
				empty_all_tables()
				fill_table_estimates(estimateResult.reverse())
				$('#defaultModal .modal-content').removeAttr('class').addClass('modal-content')
				$('#defaultModal').modal('show')		
				doneProgressBar()
			}
		})
	})
	// ------------------------------ //
	// 			Ranking Statistics				//
	// ------------------------------ //
	$(document).on("click", "#ranking_total_statistics_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
	})
	$(document).on("click", "#ranking_team_statistics_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
	})
	// ------------------------------ //
	// 						Profile							//
	// ------------------------------ //
	$(document).on("click", "#profile_signOut_button", function (e) {
		e.preventDefault()
		resetAll()
		change_page_scene('page_aaa')
	})
	// ------------------------------ //
	// 						Package							//
	// ------------------------------ //
	$(document).on("click", ".package_purchase", function (e) {
		e.preventDefault()
    var packageId = $(this).attr('id');
		if (!packageId) {
			return warningOperation()
		}
		startProgressBar()
		var packageURL = wrapAccessToken(coreEngine_url + 'packages/' + packageId, coreAccessToken)
		$.ajax({
			url: packageURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (packageResult) {
				if (packageResult.status === 'Working') {
					var callbackBaseURI = coreURL + 'transaction.aspx'
					var data = {
						Price: (Number(packageResult.price)),
						Email: userClient.email,
						Paymenter: userClient.fullname,
						Mobile: userClient.phoneNumber,
						ReturnPath: callbackBaseURI + '?price=' + (Number(packageResult.price)).toString(),
						Description: JSON.stringify({
							clientId: userId,
							packageId: packageResult.id
						})
					}
					var transactionURL = wrapAccessToken(coreEngine_url + 'WebServiceSoap/RequestPayment', coreAccessToken)
					$.ajax({
						url: transactionURL,
						dataType: "json",
						data: JSON.stringify(data),
						contentType: "application/json; charset=utf-8",
						type: "POST",
						success: function (transactionResult) {
							doneProgressBar()
							if (transactionResult.RequestPaymentResult.ResultStatus === 'Succeed') {
								localStorage.setItem('RESNUM', transactionResult.RefNumber)
								window.location.href = transactionResult.RequestPaymentResult.PaymentPath
							}
							else {
								failedOperation()
							}
						}
					})
				}
				else {
					doneProgressBar()
					failedOperation()
				}
			}
		})
	})

	// ------------------------------ //
	// 				 Tab Controller					//
	// ------------------------------ //
	function tabHandler(e) {
		var select = $(e.target).attr('id')
		if (select === 'nav1') {
			clearExact()
			clearPredict()
			weekEnable = true
			if (weeklyPredict.length == 0 || weekIndex >= weeklyPredict.length) {
				return predictOverOperation()
			}
			$('#main_predict_sort_section').show()
			currentPredict = weeklyPredict[weekIndex]
			displayPredict()
		}
		else if (select === 'nav2') {
			clearPredict()
			clearExact()
			weekEnable = false
			if (exactsArray.length == 0) {
				return predictOverOperation()
			}
			showExact()
			fill_exact_selector(exactsArray)
			var m = ''
			if (exactsArray.length) {
				$("#main_exact_selector").selectpicker('val', exactsArray[0].id).selectpicker('refresh')
				m = exactsArray[0].id
			}
			if (m !== '') {
				for (var i = 0; i < exactsArray.length; i++) {
					if (exactsArray[i].id === m) {
						currentExact = exactsArray[i]
						clearExact()
						showExact()
						displayExact(function(result){})
						break
					}
				}	
			}
		}
		var no = select.replace("nav", "")
		for (var i = 1; i < 9; i++) {
			var str = '#nav' + i + '_tab'
			if (i == 1 || i == 2)
				continue
			if (i == Number(no))
				$(str).fadeIn()
			else 
				$(str).hide()
		}
	}

	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		tabHandler(e)
	})	

	// ------------------------------ //
	// 				 Plugin Utility					//
	// ------------------------------ //
	function initTour() {	
		function getTourElement(tour){
			return tour._options.steps[tour._current].element
		}
		var template = "<div class='popover tour'>" +
    "<div class='arrow'></div>" + 
		"<div dir='rtl' style='line-height:200%;' class='popover-content'></div>" + 
    "<div class='popover-navigation'>" + 
        "<button class='btn btn-default' style='border:1px solid #DBDBDB;' data-role='next'>بعدی</button>" + 
        "<button class='btn btn-default' style='border:1px solid #DBDBDB;' data-role='prev'>قبلی</button>" + 
    "</div>" +
		"</div>"
		var endTemplate = "<div class='popover tour'>" +
    "<div class='arrow'></div>" + 
		"<div dir='rtl' style='line-height:200%;' class='popover-content'></div>" + 
    "<div class='popover-navigation'>" + 
        "<button class='btn btn-default' style='border:1px solid #DBDBDB;' data-role='next'>بعدی</button>" + 
				"<button class='btn btn-default' style='border:1px solid #DBDBDB;' data-role='prev'>قبلی</button>" + 
				"<button class='btn btn-default' style='border:1px solid #DBDBDB;' data-role='end'>بستن</button>" +
		"</div>" +
		"</div>"
		firstTour = new Tour({
			name: "stour",
			container: "body",
			smartPlacement: true,
			keyboard: true,
			storage: false,
			debug: false,
			backdrop: true,
			backdropContainer: 'body',
			backdropPadding: '3px',
			orphan: true,
			duration: false,
			delay: false,
			basePath: "",
			template: template,
			onEnd: function (tour) {
				localStorage.setItem('tour_end', true)
				$(".not-active").removeClass("not-active")
			},
			onShown: function(tour) {
				var stepElement = getTourElement(tour);
				$('.tour-backdrop').css({'width': $(window).width() + 'px', 'height': $(window).height() + 'px'})
        $(stepElement).after($('.tour-step-background'))
				$(stepElement).after($('.tour-backdrop'))
    	},
			steps: [
			{
				element: "#main_predict_nav_bar",
				placement: "bottom",
				template: endTemplate,
				content: "اصل بازی از اینجا شروع میشه! جایی که پیش‌بینی‌های مختلفی رو میبینی و اونارو یا تایید یا رد می‌کنی.",
				onShown: function(tour) {
					tour.redraw()
					var stepElement = getTourElement(tour);
					$(stepElement).addClass('not-active')
				}
			},
			{
				element: "#nav1",
				placement: "bottom",
				content: "پیش‌بینی مسابقه‌ای برای بازی‌های جام‌جهانی ۲۰۱۸ هست که توی روز‌های آتی برگزار میشه.",
				onShown: function(tour) {
					var stepElement = getTourElement(tour);
					$(stepElement).addClass('not-active')
				}
			},
			{
				element: "#main_predict_control",
				placement: "bottom",
				content: "هر پیش‌بینی رو می‌تونی تایید کنی، یا ازش رد بشی و شانست رو نگه داری."
			},
			{
				element: "#main_predict_time_box",
				placement: "top",
				content: "اینجا مدت‌زمانی که فرصت داری تا پیش‌بینی رو تایید کنی،‌ مشخص شده."
			},
			{
				element: "#main_predict_point_box",
				placement: "top",
				content: "اگه یه پیش‌بینی رو تایید کردی و اون اتفاق رخ داد، امتیازی که اینجا نوشته رو می‌گیری."
			},
			{
				element: "#main_predict_progress",
				placement: "top",
				content: "به ازای هر بار تأییدِ پیش‌بینی، یک فرصت ازت کم میشه. اگه فرصت‌هات تموم شد از طریق دکمه خرید بسته اونو افزایش بده."
			},
			{
				element: "#main_predict_estimates_button",
				placement: "top",
				content: "پیش‌بینی‌هایی که تایید کردی اینجا نشون داده میشن. درست یا غلط بودن پیش‌بینی‌ با رنگ سبز و قرمز مشخص میشه.",
				onNext: function(tour) {
					$('.nav-tabs a[id="nav2"]').tab('show')
					tabHandler({ target: { id: 'nav2' } })
					tour.redraw()
				}
			},
			{
				element: "#nav2",
				placement: "bottom",
				content: "اینجا باید قهرمان و آقای‌ گل و اینجور چیزا رو به صورت دقیق پیش‌بینی کنی!",
				onShown: function(tour) {
					var stepElement = getTourElement(tour);
					$(stepElement).addClass('not-active')
					tour.redraw()
				},
				onShow: function(tour) {
					tour.redraw()
				}
			},
			{
				element: "#main_exact_box",
				placement: "top",
				content: "اول باید انتخاب کنی که بین قهرمان یا آقای گل و غیره کدوم رو میخوای پیش‌بینی کنی."
			},
			{
				element: "#main_exact_div_body",
				placement: "top",
				content: "برای هر نوع پیش‌بینی، می‌تونی یک تا سه اولویت انتخاب کنی. انتخاب هر اولویت، یک فرصت پیش‌بینی کم می‌کنه.",
				backdrop: true,
				onShown: function(tour) {
					var stepElement = getTourElement(tour);
					$(stepElement).addClass('not-active')
				}
			},
			{
				element: "#main_exact_first_answer_box",
				placement: "top",
				content: "امتیازها اینجوریه که مثلا اگه اسپانیا به عنوان اولویت اولت قهرمان بشه امتیاز بیشتری میگیری نسبت به وقتی که اسپانیا اولویت دوم یا سومت بوده."
			},
			{
				element: "#main_exact_accept_button",
				placement: "top",
				template: endTemplate,
				content: "بعد از تایید، پیش‌بینی‌های قطعی دیگه قابل تغییر نیستن."
			}
		]})

		firstTour.init()
	}
	function startFirstTour() {
		if (!localStorage.getItem('tour_end') && firstTour)
			firstTour.start(true)
	}

	function initUtility() {
    var clipboard = new Clipboard('.btn');
    clipboard.on('success', function(e) {
      console.log(e);
    })
    clipboard.on('error', function(e) {
      console.log(e);
		})
			
		$('.btn').css({"padding-left":'0px', "padding-right": '0px'})
		var $demoMaskedInput = $('.demo-masked-input');

    $demoMaskedInput.find('.mobile-phone-number').inputmask('99999999999', { placeholder: '___________' });
		$demoMaskedInput.find('.receivedCode').inputmask('9999', { placeholder: '____' });

		$('[data-toggle="tooltip"]').tooltip({
			container: 'body',
			delay: {show : 500, hide : 0}
		})

		$('.carousel').carousel({
			interval: false
		}); 

		$('select').selectpicker({
			dropupAuto: false
		});
	}

	$('#main_exact_selector').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		for (var i = 0; i < exactsArray.length; i++) {
			if (exactsArray[i].id === selected) {
				currentExact = exactsArray[i]
				clearExact()
				showExact()
				displayExact(function(result){})
				break
			}
		}
	})

	$('#main_predict_sort_selector').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option:selected').val()
		if (selected === 'SortByTime') {
			pointSort = 3 
			if (timeSort == 0 || timeSort == 3) {
				timeSort = 0
				getDataAndFill(function(err, result) {
					if (!err) 
						timeSort = 1
				})
			}
			else {
				getDataAndFill(function(err, result) {
					if (!err) 
						timeSort = 0
				})
			}
		}
		else if (selected === 'SortByPoint') {
			timeSort = 3
			if (pointSort == 0 || pointSort == 3) {
				pointSort = 0
				getDataAndFill(function(err, result) {
					if (!err) 
						pointSort = 1
				})
			}
			else {
				getDataAndFill(function(err, result) {
					if (!err) 
						pointSort = 0
				})
			}
		}
	})

	function startLoading() {
		$('.page-loader-wrapper').fadeIn()
		$('#rainbow-progress-bar1').fadeIn()
	}
	function doneLoading() {
		$('.page-loader-wrapper').fadeOut()
		$('#rainbow-progress-bar1').fadeOut()
	}
	function startProgressBar() {
		$('.cardRainbow').fadeIn()
	}
	function doneProgressBar() {
		$('.cardRainbow').fadeOut()
	}

	function prepareMobileEnv() {
		for (var i = 1; i < 15; i++) {
			var str = '#nav' + i
			$(str).addClass('p-l-0').addClass('p-r-0')
		}
		$('.btn').removeClass('btn-lg').addClass('btn-md')
	}

	// ------------------------------ //
	// 		 	 Table Construction				//
	// ------------------------------ //
	function fill_table_estimates(estimatesArray) {
		$('#main_prediction_estimates_table tbody').empty()
		var width = $('#main_prediction_estimates_table tbody').width() - 250
		if (estimatesArray.length == 0) {
			var model = {
				explanation: 'هنوز پیش‌بینی‌ای رو تایید نکردی.'
			}
			estimatesArray.push(model)
		}
		for (var i = 0; i < estimatesArray.length; i++) {
			var statusColor
			if (estimatesArray[i].status === 'Win') statusColor = 'col-teal'
			else if (estimatesArray[i].status === 'Open') statusColor = 'col-indigo'
			else if (estimatesArray[i].status === 'Lose') statusColor = 'col-red'	
			$('#main_prediction_estimates_table').append('<tr id="pre_addr' + (i) + '"></tr>')
			var dis = ''
			if (!estimatesArray.length == 0)
				dis = 'hidden'
			$('#pre_addr' + i).html(
				'<td class="' + statusColor + '" align="center" style="vertical-align: middle; width: ' + width + 'px; word-wrap:break-word;">' + (estimatesArray[i].explanation || 'ناموجود') + '</td>' +
				'<td ' + dis + ' class="font-bold ' + statusColor + '" align="center" style="vertical-align: middle; width: 50px;">' + Persian_Number((estimatesArray[i].point || 0).toString()) + '</td>'
			)
		}
		fixUITable()
		$('#main_prediction_estimates_table').css({'word-break': 'break-word;'})
	}
	function fill_table_totalStatistics(usersArray) {
		$('#ranking_total_statistics_table tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			$('#ranking_total_statistics_table').append('<tr id="rtst_addr' + (i) + '"></tr>')
			$('#rtst_addr' + i).html(
				'<th align="center" style="vertical-align: middle;" scope="row">' + Persian_Number((i + 1).toString()) + '</th>' +
				'<td align="center" style="vertical-align: middle;">' + usersArray[i].username + '</td>' +
				'<td class="mobileCell" align="center" style="vertical-align: middle;">' + usersArray[i].fullname + '</td>' +
				'<td align="center" style="vertical-align: middle;">' + Persian_Number(usersArray[i].accountInfoModel.totalPoints.toString()) + '</td>'
			)
			if (usersArray[i].id.toString() === userId.toString()) {
				$('#rtst_addr' + i.toString()).closest('tr').children('td,th').css('background-color','#C5FCD1')
				rowNo = i
			}
		}
		var s = $("#ranking_total_statistics_table tbody > tr:nth-child(" + rowNo + ")").position();
		if (s)
			$("#ranking_total_statistics_table").parent().parent().parent().scrollTop( s.top );
		fixUITable()
	}

	function fill_table_teamStatistics(usersArray) {
		for (var i = 0; i < teamsArray.length; i++)
		if (teamsArray[i].id === favTeam) {
			var n = teamsArray[i].name
			$('#ranking_team_statistics_team_name').html(' جدول رده‌بندی تیم ' + n)
			break
		}
		$('#ranking_team_statistics_table tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			$('#ranking_team_statistics_table').append('<tr id="rtst2_addr' + (i) + '"></tr>')
			$('#rtst2_addr' + i).html(
				'<th align="center" style="vertical-align: middle;" scope="row">' + Persian_Number((i + 1).toString()) + '</th>' +
				'<td align="center" style="vertical-align: middle;">' + usersArray[i].username + '</td>' +
				'<td class="mobileCell" align="center" style="vertical-align: middle;">' + usersArray[i].fullname + '</td>' +
				'<td align="center" style="vertical-align: middle;">' + Persian_Number(usersArray[i].accountInfoModel.totalPoints.toString()) + '</td>'
			)
			if (usersArray[i].id.toString() === userId.toString()) {
				$('#rtst2_addr' + i.toString()).closest('tr').children('td,th').css('background-color','#C5FCD1')
				rowNo = i
			}
		}
		var s = $("#ranking_team_statistics_table tbody > tr:nth-child(" + rowNo + ")").position();
		if (s)
			$("#ranking_team_statistics_table").parent().parent().parent().scrollTop( s.top );
		fixUITable()
	}
	function fixUITable() {
		if (platform.name.includes('Mobile') || source === 'telegram' || $(window).width() <= 400 || detectmob()) {
			$('.mobileCell').hide()
			$('td').css({"font-size":'90%'})
			$('.row-id').css({"width":'20%'})
			$('.row-username').css({"width":'55%'})
			$('.row-point').css({"width":'25%'})
		}
	}
	function fill_table_trophies(userLevel) {
		for (var i = Number(userLevel); i < 11; i++) {
			var str = '#trophy_' + i
			$(str).css({"-webkit-filter":'grayscale(100%)', "filter": 'grayscale(100%)'})
		}
		fixUITable()
	}
	function empty_all_tables() {
		$('#main_prediction_estimates_table tbody').empty()
	}
	function clearExact() {
		$('#main_predict_sort_section').hide()
		$('#main_exact_div_body').hide()
		$('#main_exact_select_section').hide()
	}
	function showExact() {
		$('#main_exact_select_section').show()
	}
	function displayExact(callback) {
		startProgressBar()
		var hours = (((Number(currentExact.endingTime) - (new Date).getTime())) / (1000 * 60 * 60))
		var str = ''
		if (hours < 1)
			str = Persian_Number(Math.floor(((Number(currentExact.endingTime) - (new Date).getTime()) / (1000 * 60))).toString()) + ' دقیقه '
		else if (hours <= 24 && hours >= 1)
			str = Persian_Number(Math.floor(hours).toString()) + ' ساعت '
		else 
			str = Persian_Number(Math.floor(hours / 24).toString()) + ' روز'
		if (Math.floor(hours % 24) != 0)
			str += ' و ' + Persian_Number(Math.floor(hours % 24).toString()) + ' ساعت '
		var filter = {
			'where': {
				'and': [
					{'exactId': currentExact.id},
					{'clientId': userId}
				]
			},
			limit: 50000
		}
		var choiceWithAT = wrapAccessToken(coreEngine_url + 'choices', coreAccessToken)
		var choiceURL = wrapFilter(choiceWithAT, JSON.stringify(filter))
		$.ajax({
			url: choiceURL,
			type: "GET",
			success: function (choiceResult) {
				$('#main_exact_remaining').html(str)
				$('#main_exact_topic').html(currentExact.name)
				$('#main_exact_div_body').show()
				$('#main_exact_select_section').show()
				$('#main_exact_first_answer_selector').prop('disabled', false)
				$('#main_exact_second_answer_selector').prop('disabled', false)
				$('#main_exact_third_answer_selector').prop('disabled', false)
				fill_exact_answer_selector(currentExact, currentExact.selectors)
				exactChoice = undefined
				$('#main_exact_first_answer_selector').selectpicker('refresh')
				$('#main_exact_second_answer_selector').selectpicker('refresh')
				$('#main_exact_third_answer_selector').selectpicker('refresh')
				doneProgressBar()

				if (choiceResult.length == 0)
					return

				exactChoice = choiceResult[0]

				for (var i = 0; i < currentExact.selectors.length; i++) {
					if (currentExact.selectors[i].choice === exactChoice.firstOption.choice)
						$('#main_exact_first_answer_selector').selectpicker('val', i.toString())
					if (currentExact.selectors[i].choice === exactChoice.secondOption.choice)
						$('#main_exact_second_answer_selector').selectpicker('val', i.toString())
					if (currentExact.selectors[i].choice === exactChoice.thirdOption.choice)
						$('#main_exact_third_answer_selector').selectpicker('val', i.toString())
				}		

				for (var i = 0; i < currentExact.selectors.length; i++) {
					if (currentExact.selectors[i].choice === exactChoice.firstOption.choice) 
						$('#main_exact_first_answer_selector').prop('disabled', true)
					if (currentExact.selectors[i].choice === exactChoice.secondOption.choice)
						$('#main_exact_second_answer_selector').prop('disabled', true)
					if (currentExact.selectors[i].choice === exactChoice.thirdOption.choice)
						$('#main_exact_third_answer_selector').prop('disabled', true)
				}

				$('#main_exact_first_answer_selector').selectpicker('refresh')
				$('#main_exact_second_answer_selector').selectpicker('refresh')
				$('#main_exact_third_answer_selector').selectpicker('refresh')

				callback(1)
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				callback(0)
			}
		})
	}
	function clearPredict() {
		$('#main_predict_div_body').hide()
	}
	function displayPredict() {
		var hours = (Number(currentPredict.endingTime) - (new Date).getTime()) / (1000 * 60 * 60)
		var str = ''
		if (hours < 1)
			str = Persian_Number(Math.floor((Number(currentPredict.endingTime) - (new Date).getTime()) / (1000 * 60)).toString()) + ' دقیقه '
		else if (hours <= 24 && hours >= 1)
			str = Persian_Number(Math.floor(hours).toString()) + ' ساعت '
		else {
			str = Persian_Number(Math.floor(hours / 24).toString()) + ' روز'
			if (Math.floor(hours % 24) != 0)
				str += ' و ' + Persian_Number(Math.floor(hours % 24).toString()) + ' ساعت '	
		}
		$('#main_predict_remaining').html(str)
		$('#main_predict_point').html(Persian_Number(currentPredict.point.toString()) + ' امتیاز ')
		$('#main_predict_explanation').html(currentPredict.explanation)
		$('#main_predict_div_body').show()
		$('#main_predict_prev_button').prop('disabled', false)
		$('#main_predict_next_button').prop('disabled', false)
		var remText = Persian_Number((weekIndex + 1).toString()) + '  از  ' + Persian_Number((weeklyPredict.length - 1).toString())
		$('#main_predict_stat').html(remText)
		if (currentPredict.accepted)
			$('#main_predict_accept_button').prop('disabled', true)
		else
			$('#main_predict_accept_button').prop('disabled', false)
		if (weekEnable) {
			if (weekIndex == 0)
				$('#main_predict_prev_button').prop('disabled', true)
			if (weekIndex + 1 == weeklyPredict.length)
				$('#main_predict_next_button').prop('disabled', true)
		}
	}
	function clearSample() {
		$('#introduction_div_body').hide()
	}
	function displaySample() {
		var hours = (Number(currentSamplePredict.endingTime) - (new Date).getTime()) / (1000 * 60 * 60)
		var str = ''
		if (hours < 1)
			str = Persian_Number(Math.floor((Number(currentSamplePredict.endingTime) - (new Date).getTime()) / (1000 * 60)).toString()) + ' دقیقه '
		else if (hours <= 24 && hours >= 1)
			str = Persian_Number(Math.floor(hours).toString()) + ' ساعت '
		else {
			str = Persian_Number(Math.floor(hours / 24).toString()) + ' روز'
			if (Math.floor(hours % 24) != 0)
				str += ' و ' + Persian_Number(Math.floor(hours % 24).toString()) + ' ساعت '	
		}
		$('#introduction_predict_remaining').html(str)
		$('#introduction_predict_point').html(Persian_Number(currentSamplePredict.point.toString()) + ' امتیاز ')
		$('#introduction_predict_explanation').html(currentSamplePredict.explanation)
		$('#introduction_div_body').show()
		$('#introduction_predict_prev_button').prop('disabled', false)
		$('#introduction_predict_next_button').prop('disabled', false)
		if (currentSamplePredict.accepted)
			$('#introduction_predict_accept_button').prop('disabled', true)
		else
			$('#introduction_predict_accept_button').prop('disabled', false)
		if (sampleIndex == 0)
			$('#introduction_predict_prev_button').prop('disabled', true)
		if (sampleIndex + 1 == samplePredict.length)
			$('#introduction_predict_next_button').prop('disabled', true)
		if (sampleAward != 0)
			var awardStr = 'تا الان  ' + Persian_Number(sampleAward.toString()) + ' امتیاز احتمال داره ببری.'
		$('#introduction_winning_award').html(awardStr)
	}
	// ------------------------------ //
	// 		 	 		Data Fetchers					//
	// ------------------------------ //
	function getAllInfo(callback) {
		getAllLeagues(function(err, leaguesResult) {
			if (err)
				return callback(err)
			getAllTeams(function(err, teamsResult) {
				if (err)
					return callback(err)
				if (userId && coreAccessToken) {
					getUserInfo(function(err, userInfo) {
						if (err)
							return callback(err)
						return callback(null)
					})
				}
				else {
					return callback(null)
				}
			})
		})
	}
	function getUserInfo(callback) {
		askDailyAward(function(err, result) {
			if (result)
				if (result.current) {
					var awardStr = 'شما امروز  ' + Persian_Number(result.award.toString()) + '  پیش‌بینی هدیه گرفتید، بریم سراغ بازی' 
					successfulOperationByString(awardStr)
				}
			var clientURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userId, coreAccessToken)
			$.ajax({
				url: clientURLWithAT,
				type: "GET",
				success: function (clientResult) {
					var estimateURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userId + '/estimates', coreAccessToken)
					$.ajax({
						url: estimateURLWithAT,
						type: "GET",
						success: function (estimateResult) {
							userClient = clientResult
							acceptCount = 0
							$('.sharedName').html(userClient.fullname)
							$('.count-to').countTo({
									refreshInterval: 500,
									formatter: function (value, options) {
											return Persian_Number(value.toFixed(0))
									}
							})
							$('.card_total_points').countTo({
									to: userClient.accountInfoModel.totalPoints,
									formatter: function (value, options) {
											return Persian_Number(value.toFixed(0))
									}
							})
							$('.card_rem_predicts').countTo({
									to: (userClient.accountInfoModel.chances - acceptedSamplePredicts.length),
									formatter: function (value, options) {
											return Persian_Number(value.toFixed(0))
									}
							})
							fill_table_trophies(Number(userClient.trophyModel.level))
							var totalWinCount = 0, totalLoseCount = 0, totalCount = 0, totalPoints = 0
							var weekWinCount = 0, weekLoseCount = 0, weekCount = 0, weekPoints = 0
							var monthWinCount = 0, monthLoseCount = 0, monthCount = 0, monthPoints = 0
							var now = Math.floor((new Date).getTime())
							var weekDeadline = now - (8 * 24 * 60 * 60 * 1000)
							var monthDeadline = now - (31 * 24 * 60 * 60 * 1000)
							for (var i = 0; i < estimateResult.length; i++) {
								var checkTime = Number(estimateResult[i].checkTime)
								if (checkTime <= now && checkTime >= weekDeadline) {
									if (estimateResult[i].status === 'Win') {
										weekWinCount++
										weekPoints += estimateResult[i].point
									}
									else if (estimateResult[i].status === 'Lose')
										weekLoseCount++
									if (estimateResult[i].status !== 'Open')
										weekCount++
								}
								if (checkTime <= now && checkTime >= monthDeadline) {
									if (estimateResult[i].status === 'Win') {
										monthWinCount++
										monthPoints += estimateResult[i].point
									}
									else if (estimateResult[i].status === 'Lose')
										monthLoseCount++
									if (estimateResult[i].status !== 'Open')
										monthCount++
								}
								if (estimateResult[i].status === 'Win') {
									totalWinCount++
									totalPoints += estimateResult[i].point
								}
								else if (estimateResult[i].status === 'Lose')
									totalLoseCount++
								if (estimateResult[i].status !== 'Open')
									totalCount++
							}
							$('#month_points').html(Persian_Number(monthPoints.toString()))
							$('#month_predicts').html(Persian_Number(monthCount.toString()))
							$('#month_correct_predicts').html(Persian_Number(monthWinCount.toString()))
							if (monthCount != 0) {
								var correct = (monthWinCount / monthCount) * 100
								var rem = 100 - correct
								$('#month_rem').css('width', rem.toString() + '%')
								$('#month_correct').css('width', correct.toString() + '%')
							}
							else {
								$('#progressbar_month').hide()
							}
							$('#week_points').html(Persian_Number(weekPoints.toString()))
							$('#week_predicts').html(Persian_Number(weekCount.toString()))
							$('#week_correct_predicts').html(Persian_Number(weekWinCount.toString()))
							if (weekCount != 0) {
								var correct = (weekWinCount / weekCount) * 100
								var rem = 100 - correct
								$('#week_rem').css('width', rem.toString() + '%')
								$('#week_correct').css('width', correct.toString() + '%')
							}
							else {
								$('#progressBar_week').hide()
							}
							$('#total_points').html(Persian_Number(totalPoints.toString()))
							$('#total_predicts').html(Persian_Number(totalCount.toString()))
							$('#total_correct_predicts').html(Persian_Number(totalWinCount.toString()))
							if (totalCount != 0) {
								var correct = (totalWinCount / totalCount) * 100
								var rem = 100 - correct
								$('#total_rem').css('width', rem.toString() + '%')
								$('#total_correct').css('width', correct.toString() + '%')
							}
							else {
								$('#progressBar_total').hide()
							}
							favTeam = userClient.teamId
							// $('#user_data_profile_image').attr('src', coreEngine_url + (userClient.profilePath || ('containers/' + userClient.id + '/download/profile.png')))
							$('#user_data_phone_number').val(Persian_Number(userClient.phoneNumber.toString()))
							$('#user_data_name').val(userClient.username)
							$('#user_data_code').val('http://6Ghadam.com/index.html?ref=' + userClient.id)
							$('#user_data_email').val(userClient.email)
							var t = moment(Number(userClient.time)).format('YYYY/M/D HH:mm').toString()
							moment.loadPersian({usePersianDigits: true})
							var m = moment(t, 'YYYY/M/D HH:mm').format('jYYYY/jM/jD HH:mm').toString()
							moment.loadPersian({usePersianDigits: false})
							var res = m.split(" ")
							$('#user_data_date').val(res[1] + '   تاریخ   ' + res[0] + '   ساعت   ')
							callback(null, userClient)
						},
						error: function (xhr, status, error) {
							callback(error)
						}
					})
				},
				error: function (xhr, status, error) {
					callback(error)
				}
			})
		})
	}
	function getAllLeagues(callback) {
		var leagueURLWithAT = wrapAccessToken(coreEngine_url + 'leagues', coreAccessToken)
		$.ajax({
			url: leagueURLWithAT,
			type: "GET",
			success: function (leagueResult) {
				leaguesArray = leagueResult
				callback(null, leaguesArray)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}
	function getAllTeams(callback) {
		var teamURLWithAT = wrapAccessToken(coreEngine_url + 'teams', coreAccessToken)
		$.ajax({
			url: teamURLWithAT,
			type: "GET",
			success: function (teamResult) {
				teamsArray = teamResult
				fill_team_selector(teamResult)
				callback(null, teamsArray)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}
	function getAllPlayers(callback) {
		var playerURLWithAT = wrapAccessToken(coreEngine_url + 'players', coreAccessToken)
		$.ajax({
			url: playerURLWithAT,
			type: "GET",
			success: function (playerResult) {
				playersArray = playerResult
				callback(null, playerResult)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}
	function getAllCoaches(callback) {
		var coachURLWithAT = wrapAccessToken(coreEngine_url + 'coaches', coreAccessToken)
		$.ajax({
			url: coachURLWithAT,
			type: "GET",
			success: function (coachResult) {
				coachesArray = coachResult
				callback(null, coachResult)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}
	function getNextObjectArray(callback) {
		var nextObjectURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userId + '/nextObject/' + currentLeague, coreAccessToken)
		$.ajax({
			url: nextObjectURLWithAT,
			type: "GET",
			success: function (nextObjectResult) {
				var filter = {
					'where': {
						'and': [
							{'status': "Working"}
						]
					},
					limit: 50000
				}
				if (currentLeague !== 'every')
					filter.where.and.push({'leagueId': currentLeague})
				var exactURLWithAT = wrapAccessToken(coreEngine_url + 'exacts', coreAccessToken)
				var exactURL = wrapFilter(exactURLWithAT, JSON.stringify(filter))
				$.ajax({
					url: exactURL,
					type: "GET",
					success: function (exactResult) {
						predictsArray = []
						for (var k = 0; k < nextObjectResult.length; k++) {
								predictsArray.push(nextObjectResult[k])
						}
						function compare(a, b){
							return Number(a.point.first) - Number(b.point.first)
						}
						for (var k = 0; k < exactResult.length; k++) {
							var m = exactResult[k]
							m.selectors.sort(compare)
						}
						exactsArray = exactResult
						callback(null, predictsArray, exactsArray)
					},
					error: function (xhr, status, error) {
						callback(error)
					}
				})
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}
	function getSampleObjectArray(callback) {
		var sampleObjectURLWithAT = wrapAccessToken(coreEngine_url + 'predicts/samplePredicts', coreAccessToken)
		$.ajax({
			url: sampleObjectURLWithAT,
			type: "GET",
			success: function (sampleObjectResult) {
				var estimatesURLWithAT = wrapAccessToken(coreEngine_url + 'estimates/count', coreAccessToken)
				$.ajax({
					url: estimatesURLWithAT,
					type: "GET",
					success: function (estimatesResult) {
						var usersURLWithAT = wrapAccessToken(coreEngine_url + 'clients/count', coreAccessToken)
						$.ajax({
							url: usersURLWithAT,
							type: "GET",
							success: function (clientsResult) {
								var numberOfClients = Number(clientsResult.count) - 2
								var clientsStr = Persian_Number(numberOfClients.toString()) + '  نفر + شما'
								$('#intoruction_totalUsers_count').html(clientsStr)
								var estimatesStr = Persian_Number(estimatesResult.count.toString()) + '  پیش‌بینی'
								$('#introduction_totalEstimates_count').html(estimatesStr)
								var winners = 0
								var award = 0
								var rankingRemainig = 0
								var awardsPicture = '../../images/awards/'
								if (numberOfClients <= 500) {
									winners = 10
									award = 200000 + (numberOfClients * 2000)
									rankingRemainig = (500 - numberOfClients) + 1
									awardsPicture += 'Awards1.png'
								}
								else if (numberOfClients >= 501 && numberOfClients <= 600) {
									winners = 11
									award = 1200000 + ((numberOfClients - 500) * 2250)
									rankingRemainig = (600 - numberOfClients) + 1
									awardsPicture += 'Awards2.png'
								}
								else if (numberOfClients >= 601 && numberOfClients <= 700) {
									winners = 12
									award = 1425000 + ((numberOfClients - 600) * 2500)
									rankingRemainig = (700 - numberOfClients) + 1
									awardsPicture += 'Awards3.png'
								}
								else if (numberOfClients >= 701 && numberOfClients <= 800) {
									winners = 13
									award = 1675000 + ((numberOfClients - 700) * 3000)
									rankingRemainig = (800 - numberOfClients) + 1
									awardsPicture += 'Awards4.png'
								}
								else if (numberOfClients >= 801 && numberOfClients <= 900) {
									winners = 14
									award = 1975000 + ((numberOfClients - 800) * 3500)
									rankingRemainig = (900 - numberOfClients) + 1
									awardsPicture += 'Awards5.png'
								}
								else if (numberOfClients >= 901) {
									winners = 15
									award = 2325000 + ((numberOfClients - 900) * 4000)
									rankingRemainig = (1000 - numberOfClients) + 1
									awardsPicture += 'Awards6.png'
								}
								var winnerStr = Persian_Number(winners.toString()) + '  نفر'
								var awardStr = Persian_Number(award.toString()) + '  هزار تومان'
								var rankingCurrentUsers = Persian_Number(numberOfClients.toString()) + '  کاربر در ۶قدم هستند.'
								var rankingRemainingUsers = Persian_Number(rankingRemainig.toString()) + '  کاربر تا افزایش جایزه'
								// $('#introduction_totalBudget_count').html(awardStr)
								// $('#introduction_totalWinners_count').html(winnerStr)
								$('#ranking_awards_players_in').html(rankingCurrentUsers)
								$('#ranking_awards_players_remaining').html(rankingRemainingUsers)
								$('#ranking_awards_picture').attr('src', awardsPicture)
								predictsArray = []
								for (var k = 0; k < sampleObjectResult.length; k++)
									predictsArray.push(sampleObjectResult[k])
								callback(null, predictsArray)
							},
							error: function (xhr, status, error) {
								callback(error)
							}
						})		
					},
					error: function (xhr, status, error) {
						callback(error)
					}
				})		
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}
	function getAllPackages(callback) {
		var packageURLWithAT = wrapAccessToken(coreEngine_url + 'packages', coreAccessToken)
		var packageURL = wrapFilter(packageURLWithAT, JSON.stringify({'where':{'status': 'Working'}, limit: 50000}))
		$.ajax({
			url: packageURL,
			type: "GET",
			success: function (packageResult) {
				packagesArray = packageResult
				var specialCount = 0, generalCount = 0
				var specialArray = [], generalArray = []
				for (var i = 0; i < packageResult.length; i++) {
					if (packageResult[i].offer === 'Special') {
						specialCount++
						specialArray.push(packageResult[i])
					}
					else if (packageResult[i].offer === 'General') {
						generalCount++
						generalArray.push(packageResult[i])
					}
				}
				if (generalCount == 0) 
					$('#general_package').hide()
				if (specialCount == 0)
					$('#special_package').hide()

				function mergeData(packageInfo) {
					var color = ''
					var spec1 = ''
					var spec2 = ''
					var height = '200px'
					if (packageInfo.offer === 'Special')
						color = 'bg-orange'
					var str = '<div class="item">' +
											'<a href="" class="package_purchase" id="' + packageInfo.id + '">' +
												'<div class="col-lg-2 col-md-2 col-sm-1 col-xs-1" style="margin-bottom: 0px;">' +
												'</div>' +
												'<div class="col-lg-8 col-md-8 col-sm-10 col-xs-10" style="margin-bottom: 0px;">' + 
													'<div class="card" style="opacity: 0.93; margin-bottom: 0px;">' +
														'<div class="body ' + color + '" style="height:' + height + ';">' +
															'<h3 class="text-center m-t-0">' + packageInfo.name + '</h3>' +
															'<div class="row clearfix">' +
																'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
																	spec1 +
																'</div>' +
																'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
																	'<h5 class="text-center m-t-20" style="line-height: 200%;" hidden>' + packageInfo.explanation + '</h5>' +
																'</div>' +
																'<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
																	spec2 +
																'</div>' +
															'</div>' +
															'<div class="row clearfix">' +
																'<h4 class="text-center"> خرید &nbsp;' + Persian_Number(packageInfo.chances.toString()) + ' فرصت پیش‌بینی&nbsp;&nbsp;</h4>' +
																'<h4 class="text-center">' + Persian_Number((packageInfo.price / 1000).toString()) + ' هزار تومان</h4>' +
															'</div>' +
														'</div>' +
													'</div>' +
												'</div>' +
											'</a>' + 
										'</div>'
					return str
				}

				for (var i = 0; i < specialArray.length; i++) {
					var appendix = mergeData(specialArray[i])
					$('#special_listbox').append(appendix)
				}
				if (specialCount != 0) {
					$('#special_listbox').parent().addClass('carousel').addClass('slide')
					$('#special_listbox').children().first().addClass('active')
				}

				for (var i = 0; i < generalArray.length; i++) {
					var appendix = mergeData(generalArray[i])
					$('#general_listbox').append(appendix)
				}
				if (generalCount != 0) {
					$('#general_listbox').parent().addClass('carousel').addClass('slide')
					$('#general_listbox').children().first().addClass('active')
				}

				callback(null, packageResult)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}

	function getAllUsers(callback) {
		var clientURLWithAT = wrapAccessToken(coreEngine_url + 'clients/statistics', coreAccessToken)
		$.ajax({
			url: clientURLWithAT,
			type: "GET",
			success: function (clientResult) {
				allUsers = clientResult
				function compare(a, b){
					return Number(b.accountInfoModel.totalPoints) - Number(a.accountInfoModel.totalPoints)
				}
				allUsers.sort(compare)
				callback(null, allUsers)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})
	}

	function getTeamUsers(teamId, callback) {
		var filter = {
			order: 'accountInfoModel.totalPoints DESC',
			limit: 50000
		}
		var clientURLWithAT = wrapAccessToken(coreEngine_url + 'teams/' + teamId + '/clients', coreAccessToken)
		var clientWithFilter = wrapFilter(clientURLWithAT, JSON.stringify(filter))
		$.ajax({
			url: clientWithFilter,
			type: "GET",
			success: function (clientResult) {
				userTeamRanking = clientResult
				callback(null, clientResult)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})		
	}

	function askDailyAward(callback) {
		var clientURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userId + '/askDailyAward', coreAccessToken)
		$.ajax({
			url: clientURLWithAT,
			type: "GET",
			success: function (clientResult) {
				callback(null, clientResult)
			},
			error: function (xhr, status, error) {
				callback(error)
			}
		})		
	}

	$(document).on("click", "#learning_section_button", function (e) {
		e.preventDefault()
		$('#learningBox .modal-content').removeAttr('class').addClass('modal-content')
		$('#learningBox').modal('show')
	})

})