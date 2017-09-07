var hintArray = [
	"با ارسال کد معرفی برای دوستانتان، ۵ پیش بینی رایگان هدیه بگیرید",
	"در لیگ مورد علاقه‌ی خود امتیاز کسب کنید و جایزه بگیرید",
	"با دوستان خود چالش پیش‌بینی برگزار کنید و توانایی پیش‌بینی‌تان را به رخ بکشید",
	"جزء بهترین‌های هفته، ماه و فصل باشید و جایزه ببرید",
	"اولین خرید بسته‌ی پیش‌بینی توسط دوست معرفی‌شده‌‌ی شما، ۵ پیش‌بینی رایگان دیگر برایتان دارد",
	"بسته‌‌ی جدید بخرید، بیشتر پیش‌بینی کنید و شانس برنده‌شدن خود را افزایش دهید",
	"بسته‌های ویژه برای حرفه‌ای‌ها! به‌صرفه‌تر پیش‌بینی کنید",
	"لیگ‌ شخصی بسازید و با دوستان خود رقابت کنید"
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
	showNotification('bg-orange', 'پیش‌بینی‌ جدیدی برای این لیگ موجود نمی‌باشد', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
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

var coreEngine_url = "http://185.105.186.68:4000/api/"
var zarinPal_url = "http://185.105.186.68:4010/api/"
var coreURL = 'http://copa90.ir/'

// var coreEngine_url = "http://127.0.0.1:4000/api/"
// var zarinPal_url = "http://127.0.0.1:4010/api/"
// var coreURL = 'http://copa90.ir/'

var MID = 'f988546a-817c-11e7-803b-005056a205be'

$(document).ready(function () {

	$(document).ajaxError(function myErrorHandler(event, x, ajaxOptions, thrownError) {
		if (timerID)
			clearInterval(timerID)	
		if (x.status == 401 || x.status == 404) {
			localStorage.clear()
			empty_all_fields()
			empty_all_tables()
			change_page_scene('page_aaa')
			authenticationRequiredOperation()
		}
		doneLoading()
		doneProgressBar()
	})

	startLoading()

	var timerID
	var updateEnable
	var liveEnable

	var phoneNumber
	var userClient
	var currentPredict
	var favTeam

	var pageToggle

	var liveIndex, weekIndex, seasonIndex

	var acceptCount

	var clientModel
	var leaguesArray = []
	var teamsArray = []
	var userChampions = []
	var userChallenges = []
	var packagesArray = []

	var predictsArray = []
	var mocksArray = []
	var weeklyPredict = []
	var livePredict = []
	var seasonPredict = []

	var notifsArray = []

	var timeSort = 3
	var pointSort = 3

	var exactsArray = []
	var exactChoice = {}

	var userTeamRanking = []
	var allUsers = []

	var currentLeague

	var source = getUrlVars()["source"]

	var userId, coreAccessToken

	initUtility()

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

	getLatestNotifs(function(err, notifResult) {
		if (err)
			return change_page_scene('page_aaa')		
	})
	
	getAllPackages(function(err, packageResult) {
		if (err)
			return callback(err)
	})

	getAllUsers(function(err, result) {
		if (err)
			return change_page_scene('page_aaa')
		fill_table_totalStatistics(allUsers)
	})

	if (!userId || !coreAccessToken) {
		getAllTeams(function(err, teamsResult) {
			if (err)
				return console.error(err)
			change_page_scene('page_demo')
			doneProgressBar()
			doneLoading()
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

	// ------------------------------ //
	// 		  	Page Controller					//
	// ------------------------------ //
	function change_page_scene(pageName) {
		var pages = ['page_demo', 'page_aaa', 'page_main_menu', 'page_main_prediction', 'page_private_league', 'page_challenge', 'page_play_room', 'page_ranking', 'page_profile', 'page_package', 'page_award']
		for (var i = 0; i < pages.length; i++) {
			var str = '#' + pages[i]
			if (pages[i] === pageName)
				$(str).show()
			else
				$(str).hide()
		}
		$('.version_controlling').show()
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
		else if (pageName === 'page_demo') {
			$('#demo_window_image').hide()
			$('#demo_start_game_button').hide()
			$('#demo_title').fadeIn()
			setTimeout(function () {
				$('#demo_title').fadeOut(); 
				setTimeout(function () {
					if (source === 'telegram' || platform.name.includes('Mobile') || detectmob()) {
						$('.version_controlling').hide()
						$('.windowDemoImage').hide()
						$('#demo_window_image').fadeIn()
						setTimeout(function () { 
							$('.mobileDemoImage').show()
							$('#demo_mobile_frame').css({'height': (Number($('#demo_mobile_frame').width()) * (2.07)).toString() + 'px'})
							var w = (Number($('#demo_mobile_frame').width()) * (0.83))
							var h = (Number($('#demo_mobile_frame').height()) * (0.64))
							$('#demo_guide_image').css({'width': (w.toString() + 'px'), 'height': (h.toString() + 'px')})
							var position = $('#demo_mobile_frame').position()
							var l = (($(window).width() - w) / 2) + 2
							console.log(position.top)
							var t = ($('#demo_mobile_frame').height() * 0.12) + position.top + ($('#demo_mobile_frame').height() * 0.066) + 3
							$('#demo_guide_image').css({'top': (t.toString() + 'px'),'left': (l.toString() + 'px')})
						}, 350);
					}
					else {
						$('.windowDemoImage').show()
						$('.mobileDemoImage').hide()
						$('#demo_guide_image').hide()
					}
					$('#demo_window_image').fadeIn();
					$('#demo_start_game_button').fadeIn(); 
				}, 400);
			}, 1200);		
		}
		else if (pageName === 'page_play_room') {
			$("#play_room_league_leagueId").selectpicker('val', 'every')
		}
		else if (pageName === 'page_challenge') {
			tabHandler({ target: { id: 'nav5' } })
			$('.nav-tabs a[id="nav5"]').tab('show')
		}
		else if (pageName === 'page_private_league') {
			tabHandler({ target: { id: 'nav1' } })
			$('.nav-tabs a[id="nav1"]').tab('show')
		}
		else if (pageName === 'page_profile') {
			tabHandler({ target: { id: 'nav12' } })
			$('.nav-tabs a[id="nav12"]').tab('show')
		}
		else if (pageName === 'page_ranking') {
			tabHandler({ target: { id: 'nav9' } })
			$('.nav-tabs a[id="nav9"]').tab('show')
		}
		else if (pageName === 'page_award') {
			tabHandler({ target: { id: 'nav19' } })
			$('.nav-tabs a[id="nav19"]').tab('show')
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
			})).selectpicker('refresh')
		}
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
			}).data("subtext", '&nbsp;&nbsp; ' + teamName)).selectpicker('refresh')
			itemToPush = {
				id: i.toString(),
				name: answersArray[i].choice + ' - ' + Persian_Number(answersArray[i].point.second.toString()) + ' امتیاز'
			}
			$('#main_exact_second_answer_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}).data("subtext", '&nbsp;&nbsp; ' + teamName)).selectpicker('refresh')
			itemToPush = {
				id: i.toString(),
				name: answersArray[i].choice + ' - ' + Persian_Number(answersArray[i].point.third.toString()) + ' امتیاز'
			}
			$('#main_exact_third_answer_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}).data("subtext", '&nbsp;&nbsp; ' + teamName)).selectpicker('refresh')
		}
	}
	function fill_champion_selector(championsArray) {
		$('#edit_personal_league_leagueId').find('option').remove()
		$('#join_personal_league_champion_selector').find('option').remove()
		$('#statistics_personal_league_leagueId').find('option').remove()
		for (var i = 0; i < championsArray.length; i++) {
			if (championsArray[i].creatorId === userId) {
				var itemToPush = {
					id: championsArray[i].id,
					name: championsArray[i].name
				}
				$('#edit_personal_league_leagueId').append($('<option>', {
					value: itemToPush.id,
					text: itemToPush.name
				})).selectpicker('refresh')
			}
		}
		for (var i = 0; i < championsArray.length; i++) {
			var itemToPush = {
				id: championsArray[i].id,
				name: championsArray[i].name
			}
			$('#join_personal_league_champion_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
		for (var i = 0; i < championsArray.length; i++) {
			var itemToPush = {
				id: championsArray[i].id,
				name: championsArray[i].name
			}
			$('#statistics_personal_league_leagueId').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
	}
	function fill_challenge_selector(challengesArray) {
		$('#edit_personal_challenge_challengeId').find('option').remove()
		$('#join_personal_challenge_selector').find('option').remove()
		$('#statistics_personal_challenge_challengeId').find('option').remove()
		for (var i = 0; i < challengesArray.length; i++) {
			if (challengesArray[i].creatorId === userId) {
				var itemToPush = {
					id: challengesArray[i].id,
					name: challengesArray[i].name
				}
				$('#edit_personal_challenge_challengeId').append($('<option>', {
					value: itemToPush.id,
					text: itemToPush.name
				})).selectpicker('refresh')
			}
		}
		for (var i = 0; i < challengesArray.length; i++) {
			var itemToPush = {
				id: challengesArray[i].id,
				name: challengesArray[i].name
			}
			$('#join_personal_challenge_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
		for (var i = 0; i < challengesArray.length; i++) {
			var itemToPush = {
				id: challengesArray[i].id,
				name: challengesArray[i].name
			}
			$('#statistics_personal_challenge_challengeId').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
	}
	function fill_league_selector(leaguesArray) {
		$('#play_room_league_leagueId').find('option').remove()
		$('#ranking_league_statistics_leagueId').find('option').remove()
		$('#play_room_league_leagueId').append($('<option>', {
			value: 'every',
			text: 'همه‌ی لیگ‌ها'
		})).selectpicker('refresh')
		for (var i = 0; i < leaguesArray.length; i++) {
			var itemToPush = {
				id: leaguesArray[i].id,
				name: leaguesArray[i].name
			}
			$('#play_room_league_leagueId').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
		for (var i = 0; i < leaguesArray.length; i++) {
			var itemToPush = {
				id: leaguesArray[i].id,
				name: leaguesArray[i].name
			}
			$('#ranking_league_statistics_leagueId').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
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
			})).selectpicker('refresh')
		}
	}
	// ------------------------------ //
	// 		 	 	Edit Rows Filler				//
	// ------------------------------ //
	function fill_edit_challenge(challengeId, challengesArray) {
		$("#edit_personal_challenge_challengeId").selectpicker('val', challengeId)
		var model
		for (var i = 0; i < challengesArray.length; i++) {
			if (challengesArray[i].id === challengeId) {
				model = challengesArray[i]
				$("#edit_personal_challenge_name").val(model.name)
				break
			}
		}
	}
	function fill_edit_champion(championId, championsArray) {
		$("#edit_personal_league_leagueId").selectpicker('val', championId)
		var model
		for (var i = 0; i < championsArray.length; i++) {
			if (championsArray[i].id === championId) {
				model = championsArray[i]
				$("#edit_personal_league_name").val(model.name)
				$("#edit_personal_league_capacity").val(Number(model.capacity))
				$("#edit_personal_league_chances").val(Number(model.reduceChances))
				break
			}
		}
	}
	function empty_all_fields() {
		$("#personal_league_create_clipboard").val('')
		$("#challenge_create_clipboard").val('')
		$("#personal_league_clipboard").val('')
		$("#challenge_clipboard").val('')

		$("#join_personal_challenge_code").val('')
		$("#join_personal_league_join_button").val('')

		$("#edit_personal_challenge_name").val('')
		$("#edit_personal_league_name").val('')
		$("#edit_personal_league_capacity").val(Number('10'))
		$("#edit_personal_league_chances").val(Number('10'))

		$("#create_personal_challenge_name").val('')
		$("#create_personal_challenge_chances").val(Number('10'))
		$("#create_personal_league_name").val('')
		$("#create_personal_league_capacity").val(Number('10'))
		$("#create_personal_league_chances").val(Number('10'))

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
		tabHandler({ target: { id: 'nav14' } })
		$('.nav-tabs a[id="nav14"]').tab('show')
	}
	$(".card_total_points").parent().parent().parent().click(redirect_total_point)
	$(".card_rem_predicts").parent().parent().parent().click(redirect_total_chances)
	$("#main_menu_profile_image").click(redirect_profile_image)
	// ------------------------------ //
	// 							AAA								//
	// ------------------------------ //
	$(document).on("click", "#aaa_send_phone_button", function (e) {
		e.preventDefault()
		phoneNumber = $("#aaa_send_phone_phone_number").val().replace(' ', '').replace(' ', '')
		console.log(phoneNumber)
		if (!phoneNumber || phoneNumber.includes('_')) {
			return warningOperation()
		}		
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').fadeIn()
		$('#phone').hide()
	})
	$(document).on("click", "#aaa_send_code_button", function (e) {
		e.preventDefault()
		var code = $("#aaa_send_code_code").val().replace(' ', '').replace(' ', '').replace(' ', '')
		var phoneNum = $("#aaa_send_code_phone").val().replace(' ', '').replace(' ', '')
		if (!phoneNum || !code || phoneNum.includes('_') || code.includes('_')) {
			return warningOperation()
		}		
		startProgressBar()
		var verificationURL = coreEngine_url + 'verifications/' + phoneNum + '/verify/' + code
		console.log(verificationURL)
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
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_send_password_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_password_phone_number").val().replace(' ', '').replace(' ', '')
		if (!phoneNum || phoneNum.includes('_')) {
			return warningOperation()
		}		
		console.log(phoneNum)
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
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
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
		console.log(JSON.stringify(data))
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
				console.log(verifyURL)
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
								$('#sign-in').hide()
								$('#password').hide()
								$('#sign-up').hide()
								$('#phone').show()
								$('#sendPhone').hide()
								$('#aaa_send_code_phone').val(phoneNumber)
								$('#sendCode').fadeIn()
							},
							error: function (xhr, status, error) {
								doneProgressBar()
								if (xhr.responseJSON)
									if (xhr.responseJSON.error)
										if (xhr.responseJSON.error.message.includes('خطا')) 
											return failedOperationByString(xhr.responseJSON.error.message)
								failedOperation()
								console.log(xhr.responseText)
							}
						})
					},
					error: function (xhr, status, error) {
						doneProgressBar()
						if (xhr.responseJSON)
							if (xhr.responseJSON.error)
								if (xhr.responseJSON.error.message.includes('خطا')) 
									return failedOperationByString(xhr.responseJSON.error.message)
						failedOperation()
						console.log(xhr.responseText)
					}
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_signin_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_signin_phone_number").val().replace(' ', '').replace(' ', '')
		var pass = $("#aaa_signin_password").val()
		if (!phoneNum || !pass || phoneNum.includes('_')) {
			return warningOperation()
		}
		var data = {
			phoneNumber: phoneNum,
			password: pass
		}
		console.log(JSON.stringify(data))
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
					change_page_scene('page_main_menu')
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
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
		$('#sendCode').fadeIn()
	})
	// ------------------------------ //
	// 					Main Menue						//
	// ------------------------------ //
	$(document).on("click", "#main_menu_prediction_button", function (e) {
		e.preventDefault()
		change_page_scene('page_play_room')
	})
	$(document).on("click", "#main_menu_challenge_button", function (e) {
		e.preventDefault()
		change_page_scene('page_challenge')
	})
	$(document).on("click", "#main_menu_champion_button", function (e) {
		e.preventDefault()
		change_page_scene('page_private_league')
	})
	$(document).on("click", "#main_menu_profile_button", function (e) {
		e.preventDefault()
		change_page_scene('page_profile')
	})
	$(document).on("click", "#main_menu_statistics_button", function (e) {
		e.preventDefault()
		change_page_scene('page_ranking')
	})
	$(document).on("click", "#main_menu_awards_button", function (e) {
		e.preventDefault()
		change_page_scene('page_award')
	})
	// ------------------------------ //
	// 				  Main predict					//
	// ------------------------------ //
	$(document).on("click", "#main_predict_accept_button", function (e) {
		e.preventDefault()
		var data = {
			predictId: currentPredict.id,
			clientId: userId,
			time: Math.floor((new Date).getTime())
		}
		console.log(JSON.stringify(data))
		startProgressBar()
		var estimateURL = wrapAccessToken(coreEngine_url + 'estimates', coreAccessToken);
		$.ajax({
			url: estimateURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (estimateResult) {
				acceptCount++
				if ((weekEnable && weekIndex < weeklyPredict.length) || (liveEnable && liveIndex < livePredict.length) || (seasonEnable && seasonIndex < seasonPredict.length)) {
					if (weekEnable && weekIndex < weeklyPredict.length) {
						weekIndex++
						currentPredict = weeklyPredict[weekIndex]
					}
					else if (liveEnable && liveIndex < livePredict.length) {
						liveIndex++
						currentPredict = livePredict[liveIndex]
					}
					else if (seasonEnable && seasonIndex < seasonPredict.length) {
						seasonIndex++
						currentPredict = seasonPredict[seasonIndex]
					}
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
					clearPredict()
					displayPredict()
				}
				else {
					change_page_scene('page_play_room')
					predictOverOperation()
				}
				doneProgressBar()
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#main_predict_reject_button", function (e) {
		e.preventDefault()
		startProgressBar()
		if ((weekEnable && ((weekIndex + 1) < weeklyPredict.length)) || (liveEnable && ((liveIndex + 1) < livePredict.length)) || (seasonEnable && ((seasonIndex + 1) < seasonPredict.length))) {
			if (weekEnable && weekIndex < weeklyPredict.length) {
				weekIndex++
				currentPredict = weeklyPredict[weekIndex]
			}
			else if (liveEnable && liveIndex < livePredict.length) {
				liveIndex++
				currentPredict = livePredict[liveIndex]
			}
			else if (seasonEnable && seasonIndex < seasonPredict.length) {
				seasonIndex++
				currentPredict = seasonPredict[seasonIndex]
			}
			clearPredict()
			displayPredict()
		}
		else {
			change_page_scene('page_play_room')
			predictOverOperation()
		}
		doneProgressBar()
	})
	$(document).on("click", "#main_predict_return_menu", function (e) {
		e.preventDefault()
		startProgressBar()
		if (timerID)
			clearInterval(timerID)
		getAllInfo(function(err) {
			doneProgressBar()
			if (err)
				return failedOperation()
			else {
				empty_all_tables()
				empty_all_fields()
				weekIndex = 0
				liveIndex = 0
				seasonIndex = 0
				change_page_scene('page_play_room')
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
		console.log(JSON.stringify(data))
		startProgressBar()
		$.ajax({
			url: choiceURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: verb,
			success: function (choiceResult) {
				console.log(byEdit)
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
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#main_predict_mocks_anchor", function (e) {
		e.preventDefault()
		empty_all_tables()
		fill_table_mocks(mocksArray)
		$('#mockLiveModal .modal-content').removeAttr('class').addClass('modal-content')
		$('#mockLiveModal').modal('show')		
	})
	// ------------------------------ //
	// 			  Personal League					//
	// ------------------------------ //
	$(document).on("click", "#edit_personal_league_delete_button", function (e) {
		e.preventDefault()
		var leagueId = $("#edit_personal_league_leagueId").val()
		if (!leagueId) {
			return warningOperation()
		}
		console.log(leagueId)
		startProgressBar()
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId, coreAccessToken);
		$.ajax({
			url: championURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "DELETE",
			success: function (championResult) {
				getAllUsersChampions(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#edit_personal_league_save_button", function (e) {
		e.preventDefault()
		var leagueId = $("#edit_personal_league_leagueId").val()
		if (!leagueId || !$("#edit_personal_league_name").val() || !$("#edit_personal_league_capacity").val()) {
			return warningOperation()
		}
		var data = {
			name: $("#edit_personal_league_name").val(),
			capacity: Number($("#edit_personal_league_capacity").val())
		}
		console.log(JSON.stringify(data))
		startProgressBar()
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId, coreAccessToken);
		$.ajax({
			url: championURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "PUT",
			success: function (championResult) {
				getAllUsersChampions(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
					empty_all_fields()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#create_personal_league_create_button", function (e) {
		e.preventDefault()
		if (!userId || !$("#create_personal_league_name").val() || !$("#create_personal_league_capacity").val()) {
			return warningOperation()
		}
		var data = {
			creatorId: userId,
			name: $("#create_personal_league_name").val(),
			capacity: Number($("#create_personal_league_capacity").val())
		}
		console.log(JSON.stringify(data))
		startProgressBar()
		var championURL = wrapAccessToken(coreEngine_url + 'champions', coreAccessToken);
		$.ajax({
			url: championURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				getAllUsersChampions(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					empty_all_fields()
					$("#personal_league_create_clipboard").val(championResult.id)
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_league_exit_button", function (e) {
		e.preventDefault()
		var leagueId = $("#join_personal_league_champion_selector").val()
		if (!leagueId || !userId) {
			return warningOperation()
		}
		console.log(leagueId)
		startProgressBar()
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId + '/leaveChampion/' + userId, coreAccessToken);
		$.ajax({
			url: championURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				getAllUsersChampions(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_league_join_button", function (e) {
		e.preventDefault()
		var leagueId = $("#join_personal_league_code").val()
		if (!leagueId || !userId) {
			return warningOperation()
		}
		console.log(leagueId)
		startProgressBar()
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId + '/joinChampion/' + userId, coreAccessToken);
		$.ajax({
			url: championURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				getAllUsersChampions(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#statistics_personal_league_search_button", function (e) {
		e.preventDefault()
		var leagueId = $("#statistics_personal_league_leagueId").val()
		if (!leagueId) {
			return warningOperation()
		}
		var filter = {
			where: {
				'championId': leagueId
			},
			include: 'clientRel'
		}
		console.log(JSON.stringify(filter))
		startProgressBar()
		var rankingURL = wrapAccessToken(coreEngine_url + 'rankings', coreAccessToken)
		var rankingURLWithFilter = wrapFilter(rankingURL, JSON.stringify(filter))
		$.ajax({
			url: rankingURLWithFilter,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (rankingResult) {
				empty_all_tables()
				var userArray = []
				for (var i = 0; i < rankingResult.length; i++) {
					userArray.push(rankingResult[i].clientRel)
				}
				console.log(userArray)
				for (var i = 0; i < userChampions.length; i++) {
					if (userChampions[i].id === leagueId) {
						function compare(a, b){
							return Number(b.accountInfoModel.totalPoints) - Number(a.accountInfoModel.totalPoints)
						}
						userArray.sort(compare)
						fill_table_champion(userChampions[i], userArray)
					}
				}
				doneProgressBar()
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#statistics_personal_league_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
	})
	// ------------------------------ //
	// 			 Personal Challenge				//
	// ------------------------------ //
	$(document).on("click", "#edit_personal_challenge_delete_button", function (e) {
		e.preventDefault()
		var challengeId = $("#edit_personal_challenge_challengeId").val()
		if (!challengeId) {
			return warningOperation()
		}
		console.log(challengeId)
		startProgressBar()
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "DELETE",
			success: function (challengeResult) {
				getAllUsersChallanges(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#edit_personal_challenge_save_button", function (e) {
		e.preventDefault()
		var challengeId = $("#edit_personal_challenge_challengeId").val()
		if (!challengeId || !$("#edit_personal_challenge_name").val()) {
			return warningOperation()
		}
		var data = {
			name: $("#edit_personal_challenge_name").val()
		}
		console.log(JSON.stringify(data))
		startProgressBar()
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "PUT",
			success: function (challengeResult) {
				getAllUsersChallanges(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
					empty_all_fields()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#create_personal_challenge_create_button", function (e) {
		e.preventDefault()
		if (!userId || !$("#create_personal_challenge_name").val() || !$("#create_personal_challenge_period").val() || !$("#create_personal_challenge_chances").val()) {
			return warningOperation()
		}
		var data = {
			creatorId: userId,
			name: $("#create_personal_challenge_name").val(),
			period: Number($("#create_personal_challenge_period").val()) * 24 * 60 * 60 * 1000,
			reduceChances: Number($("#create_personal_challenge_chances").val())
		}
		startProgressBar()
		console.log(JSON.stringify(data))
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges', coreAccessToken);
		$.ajax({
			url: challengeURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (challengeResult) {
				getAllUsersChallanges(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					empty_all_fields()
					$("#challenge_create_clipboard").val(challengeResult.id)
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
			}
		})
	})
	$(document).on("click", "#join_personal_challenge_exit_button", function (e) {
		e.preventDefault()
		var challengeId = $("#join_personal_challenge_selector").val()
		if (!challengeId || !userId) {
			return warningOperation()
		}
		console.log(challengeId)
		startProgressBar()
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId + '/leaveChallenge/' + userId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (challengeResult) {
				getAllUsersChallanges(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
			}
		})
	})
	$(document).on("click", "#join_personal_challenge_join_button", function (e) {
		e.preventDefault()
		var challengeId = $("#join_personal_challenge_code").val()
		if (!challengeId || !userId) {
			return warningOperation()
		}
		console.log(challengeId)
		startProgressBar()
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId + '/joinChallenge/' + userId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (challengeResult) {
				getAllUsersChallanges(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#statistics_personal_challenge_search_button", function (e) {
		e.preventDefault()
		var challengeId = $("#statistics_personal_challenge_challengeId").val()
		if (!challengeId) {
			return warningOperation()
		}
		var filter = {
			where: {
				'challengeId': challengeId
			},
			include: 'clientRel'
		}
		console.log(JSON.stringify(filter))
		startProgressBar()
		var competitionURL = wrapAccessToken(coreEngine_url + 'competitions', coreAccessToken)
		var competitionURLWithFilter = wrapFilter(competitionURL, JSON.stringify(filter))
		$.ajax({
			url: competitionURLWithFilter,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (competitionResult) {
				empty_all_tables()
				var userArray = []
				for (var i = 0; i < competitionResult.length; i++) {
					var challenges = {}
					challenges[competitionResult[i].challengeId] = competitionResult[i].points
					competitionResult[i].clientRel.challenges = challenges
					userArray.push(competitionResult[i].clientRel)
				}
				console.log(userArray)
				for (var i = 0; i < userChallenges.length; i++) {
					if (userChallenges[i].id === challengeId) {
						function compare(a, b){
							return Number(b.accountInfoModel.totalPoints) - Number(a.accountInfoModel.totalPoints)
						}
						userArray.sort(compare)
						fill_table_challenge(userChallenges[i], userArray)
					}
				}
				doneProgressBar()
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#statistics_personal_challenge_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
	})
	// ------------------------------ //
	// 						Play Room						//
	// ------------------------------ //
	function getDataAndFill(callback) {
		startProgressBar()
		$('#main_predict_accept_button').prop('disabled', true)
		$('#main_predict_reject_button').prop('disabled', true)
		getNextObjectArray(function(err, result, exacts) {
			doneProgressBar()
			if (err)
				return failedOperation()
			$('#main_predict_league_name').html('‌ پیش‌بینی‌های ' + $("#play_room_league_leagueId option:selected").text())
			if (!updateEnable) {
				$('#main_predict_progress_white').css('width', '0%')
				$('#main_predict_progress_fill').css('width', '100%')	
			}
			if (result.length == 0 && exacts.length == 0) {
				$("#nav15").attr({"data-toggle":''})
				$('#nav15').parent().addClass('disabled')
				$("#nav17").attr({"data-toggle":''})
				$('#nav17').parent().addClass('disabled')
				$("#nav18").attr({"data-toggle":''})
				$('#nav18').parent().addClass('disabled')
				weekEnable = false
				liveEnable = true
				seasonEnable = false
				change_page_scene('page_main_prediction')
				$('.nav-tabs a[id="nav16"]').tab('show')
				tabHandler({ target: { id: 'nav16' } })
			}
			else {
				if (updateEnable) {
					livePredict = []
					liveIndex = 0
					for (var k = 0; k < result.length; k++) {
						if (result[k].tag === 'Live')
							livePredict.push(result[k])
					}	
				}
				else {
					weeklyPredict = []
					seasonPredict = []
					livePredict = []
					liveIndex = 0
					seasonIndex = 0
					weekIndex = 0	
					for (var k = 0; k < result.length; k++) {
						if (result[k].tag === 'Week')
							weeklyPredict.push(result[k])
						else if (result[k].tag === 'Live')
							livePredict.push(result[k])
						else if (result[k].tag === 'Season')
							seasonPredict.push(result[k])
					}	
				}
				if (weeklyPredict.length == 0) {
					$("#nav15").attr({"data-toggle":''})
					$('#nav15').parent().addClass('disabled')
				}
				else {
					$("#nav15").attr({"data-toggle":'tab'})
					$('#nav15').parent().removeClass('disabled')
				}
				if (seasonPredict.length == 0) {
					$("#nav17").attr({"data-toggle":''})
					$('#nav17').parent().addClass('disabled')
				}
				else {
					$("#nav17").attr({"data-toggle":'tab'})
					$('#nav17').parent().removeClass('disabled')
				}
				if (exacts.length == 0) {
					$("#nav18").attr({"data-toggle":''})
					$('#nav18').parent().addClass('disabled')
				}
				else {
					$("#nav18").attr({"data-toggle":'tab'})
					$('#nav18').parent().removeClass('disabled')					
				}
				change_page_scene('page_main_prediction')
				if (updateEnable) {
					if (livePredict.length != 0 && liveEnable) {
						weekEnable = false
						liveEnable = true
						seasonEnable = false
						$('.nav-tabs a[id="nav16"]').tab('show')
						tabHandler({ target: { id: 'nav16' } })
					}
					updateEnable = false
					$('#main_predict_accept_button').prop('disabled', false)
					$('#main_predict_reject_button').prop('disabled', false)
				}
				else {
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
								seasonPredict.sort(compareDSC)
							}
							else {
								weeklyPredict.sort(compareASC)
								seasonPredict.sort(compareASC)
							}
							weekIndex = 0
							seasonIndex = 0
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
								seasonPredict.sort(compareDSC)
							}
							else {
								weeklyPredict.sort(compareASC)
								seasonPredict.sort(compareASC)
							}
							weekIndex = 0
							seasonIndex = 0
						}
						if (weekEnable) {
							$('.nav-tabs a[id="nav15"]').tab('show')
							tabHandler({ target: { id: 'nav15' } })
						}
						else if (seasonEnable) {
							$('.nav-tabs a[id="nav17"]').tab('show')
							tabHandler({ target: { id: 'nav17' } })
						}
					}
					else {
						if (weeklyPredict.length == 0) {
							if (livePredict.length != 0 || liveEnable) {
								weekEnable = false
								liveEnable = true
								seasonEnable = false
								$('.nav-tabs a[id="nav16"]').tab('show')
								tabHandler({ target: { id: 'nav16' } })
							}
							else if (seasonPredict.length != 0) {
								weekEnable = false
								liveEnable = false
								seasonEnable = true
								$('.nav-tabs a[id="nav17"]').tab('show')
								tabHandler({ target: { id: 'nav17' } })
							}
							else if (exacts.length != 0) {
								liveEnable = false
								seasonEnable = false
								weekEnable = false
								$('.nav-tabs a[id="nav18"]').tab('show')
								tabHandler({ target: { id: 'nav18' } })
							}
						}
						else {
							weekEnable = true
							liveEnable = false
							seasonEnable = false
							$('.nav-tabs a[id="nav15"]').tab('show')
							tabHandler({ target: { id: 'nav15' } })
						}		
					}
				}
			}
			if (timerID)
				clearInterval(timerID)	
			timerID = setInterval(function() {
				updateLivePredicts()
			}, 60 * 1000); 
		})
	}
	$(document).on("click", "#play_room_league_start_button", function (e) {
		e.preventDefault()
		var leagueId = $("#play_room_league_leagueId").val()
		if (!leagueId) {
			return warningOperation()
		}
		currentLeague = leagueId
		clearExact()
		clearPredict()
		timeSort = 3
		pointSort = 3
		getDataAndFill(function (err, result) {})
	})
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
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#play_room_notif_center_button", function (e) {
		e.preventDefault()
		empty_all_tables()
		fill_table_notifs(notifsArray)
		$('#notifModal .modal-content').removeAttr('class').addClass('modal-content')
		$('#notifModal').modal('show')
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
	$(document).on("click", "#ranking_league_statistics_search_button", function (e) {
		e.preventDefault()
		var leagueId = $("#ranking_league_statistics_leagueId").val()
		if (!leagueId || !userId) {
			return warningOperation()
		}
		console.log(leagueId)
		startProgressBar()
		var leagueArray = []
		function compare(a, b){
			return Number(b[leagueId]) - Number(a[leagueId])
		}
		for (var i = 0; i < allUsers.length; i++) {
			var model = allUsers[i]
			model[leagueId] = Number(allUsers[i].checkpointModel.leagues[leagueId] || '0')
			allUsers[i].checkpointModel.leagues[leagueId] = model[leagueId] || 0
			leagueArray.push(allUsers[i])
		}
		leagueArray.sort(compare)
		preferedLeague = leagueId
		fill_table_leagueStatistics(leagueArray)
		doneProgressBar()
	})
	$(document).on("click", "#ranking_league_statistics_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
	})
	// ------------------------------ //
	// 						Profile							//
	// ------------------------------ //
	$(document).on("click", "#profile_signOut_button", function (e) {
		e.preventDefault()
		userId = ''
		coreAccessToken = ''
		localStorage.clear()
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
				console.log(JSON.stringify(packageResult))
				if (packageResult.status === 'Working') {
					var callbackBaseURI = coreURL + 'transaction.html'
					var data = {
						MerchantID: MID,
						Amount: packageResult.price,
						Email: userClient.email,
						Mobile: userClient.phoneNumber,
						CallbackURL: callbackBaseURI + '?userCoreAccessToken=' + coreAccessToken + '&userId=' + userId + '&amount=' + packageResult.price,
						Description: JSON.stringify({
							clientId: userId,
							packageId: packageResult.id
						})
					}
					data.CallbackURL = data.CallbackURL + '&description=' + JSON.stringify(data.Description)
					console.log(JSON.stringify(data))
					var transactionURL = wrapAccessToken(zarinPal_url + 'PaymentGatewayImplementationServiceBinding/PaymentRequest', coreAccessToken)
					$.ajax({
						url: transactionURL,
						dataType: "json",
						data: JSON.stringify(data),
						contentType: "application/json; charset=utf-8",
						type: "POST",
						success: function (transactionResult) {
							console.log(JSON.stringify(transactionResult))
							doneProgressBar()
							if (transactionResult.Status == 100) {
								window.location.href = 'https://www.zarinpal.com/pg/StartPay/' + transactionResult.Authority
							}
							else {
								failedOperation()
							}
						},
						error: function (xhr, status, error) {
							doneProgressBar()
							if (xhr.responseJSON)
								if (xhr.responseJSON.error)
									if (xhr.responseJSON.error.message.includes('خطا')) 
										return failedOperationByString(xhr.responseJSON.error.message)
							failedOperation()
							console.log(xhr.responseText)
						}
					})
				}
				else {
					doneProgressBar()
					failedOperation()
				}
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				if (xhr.responseJSON)
					if (xhr.responseJSON.error)
						if (xhr.responseJSON.error.message.includes('خطا')) 
							return failedOperationByString(xhr.responseJSON.error.message)
				failedOperation()
				console.log(xhr.responseText)
			}
		})
	})

	// ------------------------------ //
	// 		 CheckBox Controller				//
	// ------------------------------ //
	$('input[type=checkbox]').change(
		function() {
			console.log(this.checked)
			if (timerID)
				clearInterval(timerID)
			if (this.checked) {
				timerID = setInterval(function() {
					updateLivePredicts()
				}, 60 * 1000); 
			}
		}
	)
	function updateLivePredicts() {
		updateEnable = true
		getDataAndFill(function (err, result) {})
	}

	// ------------------------------ //
	// 				 Tab Controller					//
	// ------------------------------ //
	function tabHandler(e) {
		var select = $(e.target).attr('id')
		if (select === 'nav15') {
			clearExact()
			clearPredict()
			$('#main_predict_live_section').hide()
			weekEnable = true
			liveEnable = false
			seasonEnable = false
			if (weeklyPredict.length == 0 || weekIndex >= weeklyPredict.length) {
				return predictOverOperation()
			}
			$('#main_predict_sort_section').show()
			currentPredict = weeklyPredict[weekIndex]
			displayPredict()
		}
		else if (select === 'nav16') {
			clearPredict()
			clearExact()
			weekEnable = false
			liveEnable = true
			seasonEnable = false
			$('#main_predict_live_section').show()
			if (!liveEnable && updateEnable) {
				updateEnable = false
				return;
			}
			$('#main_predict_live_section').show()
			if (livePredict.length == 0 || liveIndex >= livePredict.length) {
				return predictOverOperation()
			}
			currentPredict = livePredict[liveIndex]
			displayPredict()
		}
		else if (select === 'nav17') {
			clearPredict()
			clearExact()
			$('#main_predict_live_section').hide()
			weekEnable = false
			liveEnable = false
			seasonEnable = true
			if (seasonPredict.length == 0 || seasonIndex >= seasonPredict.length) {
				return predictOverOperation()
			}
			$('#main_predict_sort_section').show()
			currentPredict = seasonPredict[seasonIndex]
			displayPredict()
		}
		else if (select === 'nav18') {
			clearPredict()
			clearExact()
			$('#main_predict_live_section').hide()
			weekEnable = false
			liveEnable = false
			seasonEnable = false
			if (exactsArray.length == 0) {
				return predictOverOperation()
			}
			showExact()
			fill_exact_selector(exactsArray)
		}
		var no = select.replace("nav", "")
		for (var i = 1; i < 21; i++) {
			var str = '#nav' + i + '_tab'
			if (i == 16 || i == 17 || i == 15 || i == 18)
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

    $demoMaskedInput.find('.mobile-phone-number').inputmask('0999 999 9999', { placeholder: '0___ ___ ____' });
		$demoMaskedInput.find('.receivedCode').inputmask('9 9 9 9', { placeholder: '_ _ _ _' });

		$('[data-toggle="tooltip"]').tooltip({
			container: 'body',
			delay: {show : 500, hide : 0}
		})
	}

	$('#join_personal_league_champion_selector').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		$('#personal_league_clipboard').val(selected)
	})

	$('#join_personal_challenge_selector').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		$('#challenge_clipboard').val(selected)
	})

	$('#edit_personal_league_leagueId').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		fill_edit_champion(selected, userChampions)
	})

	$('#edit_personal_challenge_challengeId').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		fill_edit_challenge(selected, userChallenges)
	})

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
	function fill_table_notifs(notifsArray) {
		$('#play_room_notif_table tbody').empty()
		for (var i = 0; i < notifsArray.length; i++) {
			$('#play_room_notif_table').append('<tr id="prnt_addr' + (i) + '"></tr>')
			$('#prnt_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + notifsArray[i].statement + '</td>'			
			)
		}
		fixUITable()		
	}
	function fill_table_mocks(mocksArray) {
		$('#main_prediction_live_mocks tbody').empty()
		for (var i = 0; i < mocksArray.length; i++) {
			$('#main_prediction_live_mocks').append('<tr id="mplm_addr' + (i) + '"></tr>')
			$('#mplm_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + mocksArray[i].explanation + '</td>'			
			)
		}
		fixUITable()		
	}
	function fill_table_estimates(estimatesArray) {
		$('#play_room_estimates tbody').empty()
		var width = $('#play_room_estimates tbody').width() - 200
		for (var i = 0; i < estimatesArray.length; i++) {
			var statusColor
			if (estimatesArray[i].status === 'Win') statusColor = 'col-teal'
			else if (estimatesArray[i].status === 'Open') statusColor = 'col-indigo'
			else if (estimatesArray[i].status === 'Lose') statusColor = 'col-red'	
			$('#play_room_estimates').append('<tr id="pre_addr' + (i) + '"></tr>')
			
			$('#pre_addr' + i).html(
				'<td class="font-bold mobileCell ' + statusColor + '" align="center" style="vertical-align: middle; width: 75px;">' + (estimatesArray[i].leagueName || 'ناموجود') + '</td>' +				
				'<td class="' + statusColor + '" align="center" style="vertical-align: middle; width: ' + width + 'px; word-wrap:break-word;">' + (estimatesArray[i].explanation || 'ناموجود') + '</td>' +
				'<td class="font-bold ' + statusColor + '" align="center" style="vertical-align: middle; width: 50px;">' + Persian_Number((estimatesArray[i].point || 0).toString()) + '</td>'
			)
		}
		fixUITable()
	}
	function fill_table_challenge(challenge, usersArray) {
		$('#statistics_personal_challenge_table tbody').empty()
		var statusColor
		if (challenge.status === 'Working') statusColor = 'bg-green'
		else if (challenge.status === 'Created') statusColor = 'bg-light-blue'
		else if (challenge.status === 'Finished') statusColor = 'bg-deep-orange'
		var str = ''
		if (source !== 'telegram' && !platform.name.includes('Mobile') && !detectmob())
			str = '<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;"><span class="label font-13 ' + statusColor + '">' + challenge.status + '</span></td>'
		for (var i = 0; i < usersArray.length; i++) {
			$('#statistics_personal_challenge_table').append('<tr id="spct_addr' + (i) + '"></tr>')
			$('#spct_addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 2%;" scope="row">' + Persian_Number((i + 1).toString()) + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td class="mobileCell" align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullname + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number((usersArray[i].challenges[challenge.id]).toString()) + ' امتیاز </td>' +
				str
			)
		}
		fixUITable()
	}
	function fill_table_champion(champion, usersArray) {
		$('#statistics_personal_league_table tbody').empty()
		for (var i = 0; i < usersArray.length; i++) {
			$('#statistics_personal_league_table').append('<tr id="splt_addr' + (i) + '"></tr>')
			$('#splt_addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 2%;" scope="row">' + Persian_Number((i + 1).toString()) + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td class="mobileCell" align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullname + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(usersArray[i].accountInfoModel.totalPoints.toString()) + ' امتیاز </td>'
			)
		}
		fixUITable()
	}
	function fill_table_totalStatistics(usersArray) {
		$('#ranking_total_statistics_table tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			$('#ranking_total_statistics_table').append('<tr id="rtst_addr' + (i) + '"></tr>')
			$('#rtst_addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 2%;" scope="row">' + Persian_Number((i + 1).toString()) + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td class="mobileCell" align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullname + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(usersArray[i].accountInfoModel.totalPoints.toString()) + ' امتیاز </td>'
			)
			if (usersArray[i].id === userId) {
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
			$('#ranking_team_statistics_team_name').html(' جدول رنده‌بندی تیم ' + n)
			break
		}
		$('#ranking_team_statistics_table tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			$('#ranking_team_statistics_table').append('<tr id="rtst2_addr' + (i) + '"></tr>')
			$('#rtst2_addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 2%;" scope="row">' + Persian_Number((i + 1).toString()) + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td class="mobileCell" align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullname + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(usersArray[i].accountInfoModel.totalPoints.toString()) + ' امتیاز </td>'
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
	function fill_table_leagueStatistics(usersArray) {
		$('#ranking_league_statistics_table tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			var p = usersArray[i].checkpointModel.leagues[preferedLeague]
			$('#ranking_league_statistics_table').append('<tr id="rl2st_addr' + (i) + '"></tr>')
			
			$('#rl2st_addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 2%;" scope="row">' + Persian_Number((i + 1).toString()) + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td class="mobileCell" align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullname + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(p.toString()) + ' امتیاز </td>'
			)
			if (usersArray[i].id === userId) {
				$('#rl2st_addr' + i.toString()).closest('tr').children('td,th').css('background-color','#C5FCD1')
				rowNo = i
			}
		}
		var s = $("#ranking_league_statistics_table tbody > tr:nth-child(" + rowNo + ")").position();
		if (s)
			$("#ranking_league_statistics_table").parent().parent().parent().scrollTop( s.top );
		fixUITable()
	}
	function fixUITable() {
		$('table').css({'table-layout': 'fixed;', 'width': '100%;'})
		if (platform.name.includes('Mobile') || source === 'telegram' || $(window).width() <= 400 || detectmob()) {
			$('.mobileCell').hide()
		}
	}
	function fill_table_trophies(userLevel) {
		for (var i = Number(userLevel) + 1; i < 11; i++) {
			var str = '#trophy_' + i
			$(str).css({"-webkit-filter":'grayscale(100%)', "filter": 'grayscale(100%)'})
		}
		$('table').css({'table-layout': 'fixed;', 'width': '100%;'})
	}
	function empty_all_tables() {
		$('#statistics_personal_league_table tbody').empty()
		$('#statistics_personal_challenge_table tbody').empty()
		$('#play_room_estimates tbody').empty()
		$('#main_prediction_live_mocks tbody').empty()
		$('#play_room_notif_table tbody').empty()
	}
	function clearExact() {
		$('#main_predict_sort_section').hide()
		$('#main_exact_selector').selectpicker('val', '')
		$('#main_exact_div_body').hide()
		$('#main_exact_select_section').hide()
		$('#main_predict_live_section').hide()
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
			str = Persian_Number(hours.toString()) + ' ساعت '
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
			}
		}
		var choiceWithAT = wrapAccessToken(coreEngine_url + 'choices', coreAccessToken)
		var choiceURL = wrapFilter(choiceWithAT, JSON.stringify(filter))
		$.ajax({
			url: choiceURL,
			type: "GET",
			success: function (choiceResult) {
				console.log(choiceResult)
				$('#main_exact_remaining').html(str)
				$('#main_exact_topic').html(currentExact.name)
				$('#main_exact_div_body').show()
				$('#main_exact_select_section').show()
				fill_exact_answer_selector(currentExact, currentExact.selectors)
				$('#main_exact_first_answer_selector').prop('disabled', false)
				$('#main_exact_second_answer_selector').prop('disabled', false)
				$('#main_exact_third_answer_selector').prop('disabled', false)
				exactChoice = undefined
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
				console.log(xhr.responseText)
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
			str = Persian_Number(hours.toString()) + ' ساعت '
		else 
			str = Persian_Number(Math.floor(hours / 24).toString()) + ' روز'
		if (Math.floor(hours % 24) != 0)
			str += ' و ' + Persian_Number(Math.floor(hours % 24).toString()) + ' ساعت '
		console.log(hours)
		$('#main_predict_remaining').html(str)
		$('#main_predict_point').html(Persian_Number(currentPredict.point.toString()) + ' امتیاز ')
		$('#main_predict_explanation').html(currentPredict.explanation)
		$('#main_predict_div_body').show()
		$('#main_predict_accept_button').prop('disabled', false)
		$('#main_predict_reject_button').prop('disabled', false)
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
						getAllUsersChallanges(function(err, challengeResult) {
							if (err)
								return callback(err)
							getAllUsersChampions(function(err, championResult) {
								if (err)
									return callback(err)
								return callback(null)
							})
						})
					})
				}
				else {
					return callback(null)
				}
			})
		})
	}
	function getUserInfo(callback) {
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
						$(".card_total_points").attr({
							"data-to": userClient.accountInfoModel.totalPoints.toString()
						})
						$(".card_rem_predicts").attr({
							"data-to": userClient.accountInfoModel.chances.toString()
						})
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
								to: userClient.accountInfoModel.chances,
								formatter: function (value, options) {
										return Persian_Number(value.toFixed(0))
								}
						})
						fill_table_trophies(userClient.trophyModel.level)
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
						$('#user_data_profile_image').attr('src', coreEngine_url + (userClient.profilePath || ('containers/' + userClient.id + '/download/profile.png')))
						$('#user_data_phone_number').val(Persian_Number(userClient.phoneNumber.toString()))
						$('#user_data_name').val(userClient.username)
						$('#user_data_code').val(userClient.id)
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
						console.log(xhr.responseText)
					}
				})
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function getAllLeagues(callback) {
		var leagueURLWithAT = wrapAccessToken(coreEngine_url + 'leagues', coreAccessToken)
		$.ajax({
			url: leagueURLWithAT,
			type: "GET",
			success: function (leagueResult) {
				leaguesArray = leagueResult
				fill_league_selector(leagueResult)
				callback(null, leaguesArray)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
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
				console.log(xhr.responseText)
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
				console.log(xhr.responseText)
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
				console.log(xhr.responseText)
			}
		})
	}
	function getAllUsersChampions(callback) {
		var userChampionsURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userId + '/champions', coreAccessToken)
		$.ajax({
			url: userChampionsURLWithAT,
			type: "GET",
			success: function (userChampionsResult) {
				userChampions = userChampionsResult
				fill_champion_selector(userChampions)
				callback(null, userChampions)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function getAllUsersChallanges(callback) {
		var userChallengesURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userId + '/challenges', coreAccessToken)
		$.ajax({
			url: userChallengesURLWithAT,
			type: "GET",
			success: function (userChallengesResult) {
				userChallenges = userChallengesResult
				fill_challenge_selector(userChallenges)
				callback(null, userChallenges)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
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
					}
				}
				if (currentLeague !== 'every')
					filter.where.and.push({'leagueId': currentLeague})
				var exactURLWithAT = wrapAccessToken(coreEngine_url + 'exacts', coreAccessToken)
				var exactURL = wrapFilter(exactURLWithAT, JSON.stringify(filter))
				$.ajax({
					url: exactURL,
					type: "GET",
					success: function (exactResult) {
						console.log(nextObjectResult)
						console.log(exactResult)
						mocksArray = []
						predictsArray = []
						for (var k = 0; k < nextObjectResult.length; k++) {
							if (nextObjectResult[k].tag === 'Mock')
								mocksArray.push(nextObjectResult[k])
							else 
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
						console.log(xhr.responseText)
					}
				})
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function getAllPackages(callback) {
		var packageURLWithAT = wrapAccessToken(coreEngine_url + 'packages', coreAccessToken)
		var packageURL = wrapFilter(packageURLWithAT, JSON.stringify({'where':{'status': 'Working'}}))
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
					if (packageInfo.offer === 'Special') {
						spec1 =  	'<h6 class="text-center font-bold" style="text-align: center;"> بسته </h6>' +
										 	'<h6 class="text-center" style="text-align: center;"> ویژه </h6>'
						var hour = Math.round((Math.floor(packageInfo.endingTime - (new Date).getTime())) / (1000 * 60 * 60))
						spec2 =	 	'<h6 class="text-center font-bold" style="text-align: center;"> باقی‌مانده </h6>' +
											'<h6 class="text-center" style="text-align: center;"> ' + Persian_Number(hour.toString()) + ' ساعت</h6>'
						color = 'bg-orange'
						height = '250px'
					}
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
																'<h4 class="text-center">' + Persian_Number(packageInfo.chances.toString()) + ' پیش‌بینی</h4>' +
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
				console.log(xhr.responseText)
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
				console.log(allUsers)
				callback(null, allUsers)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getTeamUsers(teamId, callback) {
		var filter = {
			order: 'accountInfoModel.totalPoints DESC'
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
				console.log(xhr.responseText)
			}
		})		
	}

	function getLatestNotifs(callback) {
		var filter = {
			limit: '10'
		}
		var notifURLWithAT = wrapAccessToken(coreEngine_url + 'notifications', coreAccessToken)
		var notifWithFilter = wrapFilter(notifURLWithAT, JSON.stringify(filter))
		$.ajax({
			url: notifWithFilter,
			type: "GET",
			success: function (notifResult) {
				notifResult.reverse()
				notifsArray = notifResult
				callback(null, notifResult)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})		
	}

	$(document).on("click", "#learning_section_button", function (e) {
		e.preventDefault()
		$('#learningBox .modal-content').removeAttr('class').addClass('modal-content')
		$('#learningBox').modal('show')
	})

})