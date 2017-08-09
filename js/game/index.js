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

function warningOperation() {
	showNotification('bg-orange', 'لطفا همه فیلدهای ضروری را پر کنید', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

var coreEngine_url = "http://127.0.0.1:4000/api/"
var zarinPal_url = "http://127.0.0.1:4020/api/"

$(document).ready(function () {

	startLoading()

	var phoneNumber
	var userClient
	var currentPredict
	var favTeam

	var acceptCount

	var clientModel
	var leaguesArray = []
	var teamsArray = []
	var userChampions = []
	var userChallenges = []
	var packagesArray = []

	var userTeamRanking = []
	var allUsers = []

	var source = getUrlVars()["source"]

	var userId, coreAccessToken

	initUtility()

	function readFromLocalStorage() {
		if (localStorage.getItem('userId'))
			userId = localStorage.getItem('userId')
		if (localStorage.getItem('userCoreAccessToken'))
			coreAccessToken = localStorage.getItem('userCoreAccessToken')
	}

	if (platform.name.includes('Mobile') || source === 'telegram') {
		$('.sharedTitle').hide()
		$('.sharedMobile').hide()

		var height = $(window).height()
		$('.sizeControl').css('max-height', height - 50)
		$('.sizeControl').css('height', height - 50)
		$('.positionControl').removeAttr('style')
		$('.positionControl').css('margin-top', '25px')

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

	if (!userId || !coreAccessToken) {
		change_page_scene('page_aaa')
		doneLoading()
	}
	else {
		getAllInfo(function(err) {
			if (err)
				return change_page_scene('page_aaa')
			getTeamUsers(favTeam, function(err, result) {
				if (err)
					return change_page_scene('page_aaa')
				getAllUsers(function(err) {
					doneLoading()
					if (err)
						return change_page_scene('page_aaa')
					fill_table_totalStatistics(allUsers)
					fill_table_teamStatistics(userTeamRanking)
					change_page_scene('page_main_menu')
				})
			})
		})
	}	

	// ------------------------------ //
	// 		  	Page Controller					//
	// ------------------------------ //
	function change_page_scene(pageName) {
		var pages = ['page_aaa', 'page_main_menu', 'page_main_prediction', 'page_private_league', 'page_challenge', 'page_play_room', 'page_ranking', 'page_profile', 'page_package']
		for (var i = 0; i < pages.length; i++) {
			var str = '#' + pages[i]
			if (pages[i] === pageName)
				$(str).show()
			else
				$(str).hide()
		}
		if (pageName === 'page_aaa') {
			$('#sign-in').show()
			$('#password').hide()
			$('#sign-up').hide()
			$('#phone').hide()
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
	}
	// ------------------------------ //
	// 			  	Selectors							//
	// ------------------------------ //
	function fill_champion_selector(championsArray) {
		$('.champion_selector').find('option').remove()
		for (var i = 0; i < championsArray.length; i++) {
			var itemToPush = {
				id: championsArray[i].id,
				name: championsArray[i].name
			}
			$('.champion_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
	}
	function fill_challenge_selector(challengesArray) {
		$('.challenge_selector').find('option').remove()
		for (var i = 0; i < challengesArray.length; i++) {
			var itemToPush = {
				id: challengesArray[i].id,
				name: challengesArray[i].name
			}
			$('.challenge_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
	}
	function fill_league_selector(leaguesArray) {
		$('.league_selector').find('option').remove()
		for (var i = 0; i < leaguesArray.length; i++) {
			var itemToPush = {
				id: leaguesArray[i].id,
				name: leaguesArray[i].name
			}
			$('.league_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
	}
	function fill_team_selector(teamsArray) {
		$('.team_selector').find('option').remove()
		for (var i = 0; i < teamsArray.length; i++) {
			var itemToPush = {
				id: teamsArray[i].id,
				name: teamsArray[i].name
			}
			$('.team_selector').append($('<option>', {
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
				$("#edit_personal_league_capacity").val(Number(model.capactiy))
				$("#edit_personal_league_chances").val(Number(model.chances))
				break
			}
		}
	}
	function empty_all_fields() {
		$("#edit_personal_challenge_name").val('')
		$("#edit_personal_league_name").val('')
		$("#edit_personal_league_capacity").val(Number('10'))
		$("#edit_personal_league_chances").val(Number('10'))

		$("#create_personal_challenge_name").val('')
		$("#create_personal_challenge_chances").val(Number('10'))
		$("#create_personal_league_name").val('')
		$("#create_personal_league_capacity").val(Number('10'))
		$("#create_personal_league_chances").val(Number('10'))

		$("option:selected").removeAttr("selected")
	}
	// ------------------------------ //
	// 				  	Shared							//
	// ------------------------------ //
	$(document).on("click", ".packagePurchase", function (e) {
		e.preventDefault()
		change_page_scene('page_package')
	})
	$(document).on("click", ".returnMain", function (e) {
		e.preventDefault()
		change_page_scene('page_main_menu')
		empty_all_tables()
		empty_all_fields()
	})
	// ------------------------------ //
	// 							AAA								//
	// ------------------------------ //
	$(document).on("click", "#aaa_send_phone_button", function (e) {
		e.preventDefault()
		phoneNumber = $("#aaa_send_phone_phone_number").val()
		if (!phoneNumber) {
			return warningOperation()
		}		
		console.log(phoneNumber)
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').show()
		$('#phone').hide()
	})
	$(document).on("click", "#aaa_send_code_button", function (e) {
		e.preventDefault()
		var code = $("#aaa_send_code_code").val()
		if (!phoneNumber || !code) {
			return warningOperation()
		}		
		console.log(code)
		startProgressBar()
		var verificationURL = wrapAccessToken(coreEngine_url + 'verifications/verification/' + phoneNumber + '/' + code, coreAccessToken);
		$.ajax({
			url: verificationURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (verificationResult) {
				doneProgressBar()
				successfulOperation()
				$('#sign-in').show()
				$('#password').hide()
				$('#sign-up').hide()
				$('#phone').hide()
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_send_password_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_password_phone_number").val()
		if (!phoneNum) {
			return warningOperation()
		}		
		console.log(phoneNum)
		startProgressBar()
		var passwordURL = wrapAccessToken(coreEngine_url + 'clients/sendPassword/' + phoneNum, coreAccessToken);
		$.ajax({
			url: passwordURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (passwordResult) {
				doneProgressBar()
				successfulOperation()
				$('#sign-in').show()
				$('#password').hide()
				$('#sign-up').hide()
				$('#phone').hide()
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_signup_button", function (e) {
		e.preventDefault()
		if (!$("#aaa_signup_fullname").val() || !$("#aaa_signup_username").val() ||
				!$("#aaa_signup_email").val() || !$("#aaa_signup_password").val() ||
				!$("#aaa_signup_referrer").val() || !phoneNumber || !$("#aaa_signup_select_team").val()
		) {
			return warningOperation()
		}
		var data = {
			fullName: $("#aaa_signup_fullname").val(),
			username: $("#aaa_signup_username").val(),
			email: $("#aaa_signup_email").val(),
			password: $("#aaa_signup_password").val(),
			referrer: $("#aaa_signup_referrer").val(),
			phoneNumber: phoneNumber,
			time: Math.floor((new Date).getTime())
		}
		console.log(JSON.stringify(data))
		startProgressBar()
		var clientsURL = wrapAccessToken(coreEngine_url + 'clients', coreAccessToken);
		$.ajax({
			url: clientsURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (clientResult) {
				var verifyURL = wrapAccessToken(coreEngine_url + 'verifications/sendVerification/' + phoneNumber, coreAccessToken);
				$.ajax({
					url: verifyURL,
					data: JSON.stringify(data),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					type: "POST",
					success: function (verifyResult) {
						var teamURL = wrapAccessToken(coreEngine_url + 'teams/' + clientResult.id + '/selectFavorite/' + $("#aaa_signup_select_team").val(), coreAccessToken);
						$.ajax({
							url: teamURL,
							data: JSON.stringify(data),
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
								$('#sendCode').show()
							},
							error: function (xhr, status, error) {
								doneProgressBar()
								failedOperation()
								console.error(xhr.responseText)
							}
						})
					},
					error: function (xhr, status, error) {
						doneProgressBar()
						failedOperation()
						console.error(xhr.responseText)
					}
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_signin_button", function (e) {
		e.preventDefault()
		var phoneNum = $("#aaa_signin_phone_number").val()
		var pass = $("#aaa_signin_password").val()
		if (!phoneNum || !pass) {
			return warningOperation()
		}
		var data = {
			phoneNumber: phoneNum,
			password: pass
		}
		console.log(JSON.stringify(data))
		startProgressBar()
		var loginURL = wrapAccessToken(coreEngine_url + 'clients/login', coreAccessToken)
		$.ajax({
			url: loginURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (clientResult) {
				getAllInfo(function(err) {
					doneProgressBar()
					if (err)
						return failedOperation()
					else {
						successfulOperation()
						change_page_scene('page_main_menu')
					}
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", ".signinHref", function (e) {
		e.preventDefault()
		$('#sign-in').show()
		$('#password').hide()
		$('#sign-up').hide()
		$('#phone').hide()
	})
	$(document).on("click", ".signupHref", function (e) {
		e.preventDefault()
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').hide()
		$('#phone').show()
		$('#sendPhone').show()
		$('#sendCode').hide()
	})
	$(document).on("click", ".passwordHref", function (e) {
		e.preventDefault()
		$('#sign-in').hide()
		$('#password').show()
		$('#sign-up').hide()
		$('#phone').hide()
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
	// ------------------------------ //
	// 				  Main Preidct					//
	// ------------------------------ //
	$(document).on("click", "#main_predict_accept_button", function (e) {
		e.preventDefault()
		var data = {
			predtictId: currentPredict.id,
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
				getNextObject(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
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
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#main_predict_reject_button", function (e) {
		e.preventDefault()
		startProgressBar()
		getNextObject(function(err, result) {
			doneProgressBar()
			if (err)
				return failedOperation()
		})
	})
	$(document).on("click", "#main_predict_return_menu", function (e) {
		e.preventDefault()
		startProgressBar()
		getAllInfo(function(err) {
			doneProgressBar()
			if (err)
				return failedOperation()
			else {
				change_page_scene('page_main_menu')
				empty_all_tables()
				empty_all_fields()
			}
		})
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
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#edit_personal_league_save_button", function (e) {
		e.preventDefault()
		var leagueId = $("#aaa_signup_select_team").val()
		if (!leagueId || !$("#aaa_signup_select_team").val() || !$("#edit_personal_league_name").val() || !$("#edit_personal_league_capacity").val() || !$("#edit_personal_league_chances").val()) {
			return warningOperation()
		}
		var data = {
			name: $("#edit_personal_league_name").val(),
			capactiy: Number($("#edit_personal_league_capacity").val()),
			reduceChances: Number($("#edit_personal_league_chances").val())
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
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#create_personal_league_create_button", function (e) {
		e.preventDefault()
		if (!userId || !$("#create_personal_league_name").val() || !$("#create_personal_league_capacity").val() || !$("#create_personal_league_chances").val()) {
			return warningOperation()
		}
		var data = {
			creatorId: userId,
			name: $("#create_personal_league_name").val(),
			capactiy: Number($("#create_personal_league_capacity").val()),
			reduceChances: Number($("#create_personal_league_chances").val())
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
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
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
				failedOperation()
				console.error(xhr.responseText)
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
				failedOperation()
				console.error(xhr.responseText)
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
			order: 'points DESC',
			include: 'clients'
		}
		console.log(JSON.stringify(filter))
		startProgressBar()
		var rankingURL = wrapAccessToken(coreEngine_url + 'rankings', coreAccessToken)
		var rankingURLWithFilter = wrapFilter(rankingURL, filter)
		$.ajax({
			url: rankingURLWithFilter,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (rankingResult) {
				empty_all_tables()
				var userArray = []
				for (var i = 0; i < rankingResult.length; i++) {
					userArray.push(rankingResult[i].client)
				}
				for (var i = 0; i < userChampions.length; i++) {
					if (userChampions[i].id === leagueId) {
						fill_table_challenge(userChampions[i], userArray)
					}
				}
				doneProgressBar()
				successfulOperation()
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
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
				failedOperation()
				console.error(xhr.responseText)
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
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
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
			reduceChances: $("#create_personal_challenge_chances").val()
		}
		startProgressBar()
		console.log(JSON.stringify(data))
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges', coreAccessToken);
		$.ajax({
			url: championURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				getAllUsersChallanges(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
				})
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_challenge_exit_button", function (e) {
		e.preventDefault()
		var challengeId = $("#join_personal_league_challenge_selector").val()
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
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_challenge_join_button", function (e) {
		e.preventDefault()
		var challengeId = $("#join_personal_league_code").val()
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
				failedOperation()
				console.error(xhr.responseText)
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
				'championId': challengeId
			},
			order: 'points DESC',
			include: 'clients'
		}
		console.log(JSON.stringify(filter))
		startProgressBar()
		var competitionURL = wrapAccessToken(coreEngine_url + 'competitions', coreAccessToken)
		var competitionURLWithFilter = wrapFilter(competitionURL, filter)
		$.ajax({
			url: competitionURLWithFilter,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (competitionResult) {
				empty_all_tables()
				var userArray = []
				for (var i = 0; i < competitionResult.length; i++) {
					userArray.push(competitionResult[i].client)
				}
				for (var i = 0; i < userChallenges.length; i++) {
					if (userChallenges[i].id === challengeId) {
						fill_table_challenge(userChallenges[i], userArray)
					}
				}
				doneProgressBar()
				successfulOperation()
			},
			error: function (xhr, status, error) {
				doneProgressBar()
				failedOperation()
				console.error(xhr.responseText)
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
	$(document).on("click", "#play_room_league_start_button", function (e) {
		e.preventDefault()
		var leagueId = $("#play_room_league_leagueId").val()
		if (!leagueId) {
			return console.error('required fields error')
		}
		console.log(leagueId)
		startProgressBar()
		getNextObject(function(err, result) {
			doneProgressBar()
			if (err)
				return failedOperation()
			change_page_scene('page_main_prediction')
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
	$(document).on("click", "#ranking_league_statistics_search_button", function (e) {
		e.preventDefault()
		var leagueId = $("#ranking_league_statistics_leagueId").val()
		if (!leagueId || !userId) {
			return warningOperation()
		}
		console.log(leagueId)
		startProgressBar()
		empty_all_tables()
		var leagueArray = []
		function compare(a, b){
			return Number(b[leagueId]) - Number(a[leagueId])
		}
		for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i].checkpointModel.leagues[leagueId]) {
				var model = allUsers[i]
				model[leagueId] = Number(allUsers[i].checkpointModel.leagues[leagueId])
				leagueArray.push(allUsers[i])
			}
		}
		leagueArray.sort(compare)
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
	$(document).on("click", "#profile_trophy_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
	})
	// ------------------------------ //
	// 						Package							//
	// ------------------------------ //
	$(document).on("click", ".package_purchase", function (e) {
		e.preventDefault()
		var packageId = e.target.id
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
					var data = {
						MerchantID: MID,
						Amount: packageResult.price,
						Email: userClient.email,
						Mobile: userClient.phoneNumber,
						CallbackURL: 'http://copa90.ir/transaction.html?source=telegram&userCoreAccessToken=' + coreAccessToken + '&userId=' + userId + '&amount=' + packageResult.price,
						Description: {
							clientId: userId,
							packageId: packageResult.id
						}
					}
					data.CallbackURL = data.CallbackURL + '&description=' + JSON.stringify(data.Description)
					var transactionURL = wrapAccessToken(zarinPal_url + 'PaymentGatewayImplementationServiceBinding/PaymentRequest', coreAccessToken)
					$.ajax({
						url: packageURL,
						dataType: "json",
						data: JSON.stringify(data),
						contentType: "application/json; charset=utf-8",
						type: "POST",
						success: function (transactionResult) {
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
							failedOperation()
							console.error(xhr.responseText)
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
				failedOperation()
				console.error(xhr.responseText)
			}
		})
	})

	// ------------------------------ //
	// 				 Tab Controller					//
	// ------------------------------ //
	function tabHandler(e) {
		var select = $(e.target).attr('id')
		var no = select.replace("nav", "")
		for (var i = 1; i < 14; i++) {
			var str = '#nav' + i + '_tab'
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
		$('.count-to').countTo({
				formatter: function (value, options) {
						return Persian_Number(value.toFixed(0))
				}
		})
		$('.sales-count-to').countTo({
				formatter: function (value, options) {
						return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',')
				}
		})

    var $demoMaskedInput = $('.demo-masked-input');

    $demoMaskedInput.find('.mobile-phone-number').inputmask('0999 999 9999', { placeholder: '09__ ___ ____' });
    $demoMaskedInput.find('.receivedCode').inputmask('9 9 9 9', { placeholder: '_ _ _ _' });
	}

	function startLoading() {
		$('.page-loader-wrapper').fadeIn()
		$('#rainbow-progress-bar1').fadeIn()
	}
	function doneLoading() {
		$('.page-loader-wrapper').fadeOut()
		$('#rainbow-progress-bar1').fadeOut()
	}
	function startProgressBar() {
		$('#rainbow-progress-bar0').fadeIn()
	}
	function doneProgressBar() {
		$('#rainbow-progress-bar0').fadeOut()
	}

	// ------------------------------ //
	// 		 	 Table Construction				//
	// ------------------------------ //
	function fill_table_challenge(challenge, usersArray) {
		$('#statistics_personal_challenge_table>tbody').empty()
		var statusColor
		if (challenge.status === 'Working') statusColor = 'bg-green'
		else if (challenge.status === 'Created') statusColor = 'bg-light-blue'
		else if (challenge.status === 'Finished') statusColor = 'bg-deep-orange'
		for (var i = 0; i < usersArray.length; i++) {
			$('#statistics_personal_challenge_table').append('<tr id="addr' + (i) + '"></tr>')
			$('#addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;" scope="row">' + i + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullName + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].accountInfoModel.totalPoints + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;"><span class="label font-13 ' + statusColor + '">' + challenge.status + '</span></td>'
			)
		}
	}
	function fill_table_champion(champion, usersArray) {
		$('#statistics_personal_league_table>tbody').empty()
		for (var i = 0; i < usersArray.length; i++) {
			$('#statistics_personal_league_table').append('<tr id="addr' + (i) + '"></tr>')
			$('#addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;" scope="row">' + i + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullName + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].accountInfoModel.totalPoints + '</td>'
			)
		}
	}
	function fill_table_totalStatistics(usersArray) {
		$('#ranking_total_statistics_table>tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			if (usersArray[i].id === userId)
				rowNo = i
			$('#ranking_total_statistics_table').append('<tr id="addr' + (i) + '"></tr>')
			$('#addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;" scope="row">' + i + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullName + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].accountInfoModel.totalPoints + '</td>'
			)
		}
		var table = $('#ranking_total_statistics_table')
    var w = $(window);
    var row = table.find('tr')
      .removeClass('active')
      .eq(+rowNo)
      .addClass('active')
    
    if (row.length){
      w.scrollTop(row.offset().top - (w.height()/2))
    }
	}
	function fill_table_teamStatistics(usersArray) {
		$('#ranking_team_statistics_table>tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			if (usersArray[i].id === userId)
				rowNo = i
			$('#ranking_team_statistics_table').append('<tr id="addr' + (i) + '"></tr>')
			$('#addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;" scope="row">' + i + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullName + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].accountInfoModel.totalPoints + '</td>'
			)
		}
		var table = $('#ranking_team_statistics_table')
    var w = $(window);
    var row = table.find('tr')
      .removeClass('active')
      .eq(+rowNo)
      .addClass('active')
    
    if (row.length){
      w.scrollTop(row.offset().top - (w.height()/2))
    }
	}
	function fill_table_leagueStatistics(usersArray) {
		$('#ranking_league_statistics_table>tbody').empty()
		var rowNo = 0
		for (var i = 0; i < usersArray.length; i++) {
			if (usersArray[i].id === userId)
				rowNo = i
			$('#ranking_league_statistics_table').append('<tr id="addr' + (i) + '"></tr>')
			$('#addr' + i).html(
				'<th align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;" scope="row">' + i + '</th>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].username + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].fullName + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + usersArray[i].accountInfoModel.totalPoints + '</td>'
			)
		}
		var table = $('#ranking_league_statistics_table')
    var w = $(window);
    var row = table.find('tr')
      .removeClass('active')
      .eq(+rowNo)
      .addClass('active')
    
    if (row.length){
      w.scrollTop(row.offset().top - (w.height()/2))
    }
	}
	function fill_table_trophies(userLevel) {
		for (var i = userLevel; i < 11; i++) {
			var str = '#trophy_' + i
			$(str).css({"-webkit-filter":'grayscale(100%)', "filter": 'grayscale(100%)'})
		}
	}
	function empty_all_tables() {
		for (var i = 0; i < 11; i++) {
			var str = '#trophy_' + i
			$(str).css({"-webkit-filter":'', "filter": ''})
		}
		$('#ranking_league_statistics_table>tbody').empty()
		$('#ranking_team_statistics_table>tbody').empty()
		$('#ranking_total_statistics_table>tbody').empty()
		$('#statistics_personal_league_table>tbody').empty()
		$('#statistics_personal_challenge_table>tbody').empty()
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
						getAllPackages(function(err, packageResult) {
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
						$('.sharedName').val(userClient.fullName)
						$('.card_total_points').val(userClient.accountInfoModel.totalPoints)
						$('.card_rem_predicts').val(userClient.accountInfoModel.chances)
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
						if (monthCount == 0) {
							$('#month_points').val(monthPoints)
							$('#month_predicts').val(monthCount)
							$('#month_correct_predicts').val(monthWinCount)
							var correct = (monthWinCount / monthCount) * 100
							var rem = 100 - correct
							$('#month_rem').css('width', rem.toString() + '%')
							$('#month_correct').css('width', correct.toString() + '%')
						}
						else {
							$('#progressbar_month').hide()
						}
						if (weekCount == 0) {
							$('#week_points').val(weekPoints)
							$('#week_predicts').val(weekCount)
							$('#week_correct_predicts').val(weekWinCount)
							var correct = (weekWinCount / weekCount) * 100
							var rem = 100 - correct
							$('#week_rem').css('width', rem.toString() + '%')
							$('#week_correct').css('width', correct.toString() + '%')
						}
						else {
							$('#progressBar_week').hide()
						}
						if (totalCount == 0) {
							$('#total_points').val(totalPoints)
							$('#total_predicts').val(totalCount)
							$('#total_correct_predicts').val(totalWinCount)
							var correct = (totalWinCount / totalCount) * 100
							var rem = 100 - correct
							$('#total_rem').css('width', rem.toString() + '%')
							$('#total_correct').css('width', correct.toString() + '%')
						}
						else {
							$('#progressBar_total').hide()
						}
						favTeam = userClient.favTeam.teamId
						callback(null, userClient)
					},
					error: function (xhr, status, error) {
						callback(err)
						console.error(xhr.responseText)
					}
				})
			},
			error: function (xhr, status, error) {
				callback(err)
				console.error(xhr.responseText)
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
				callback(err)
				console.error(xhr.responseText)
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
				callback(err)
				console.error(xhr.responseText)
			}
		})
	}
	function getAllUsersChampions(callback) {
		var userChampionsURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userid + '/champions', coreAccessToken)
		$.ajax({
			url: userChampionsURLWithAT,
			type: "GET",
			success: function (userChampionsResult) {
				userChampions = userChampionsResult
				fill_champion_selector(userChampions)
				callback(null, userChampions)
			},
			error: function (xhr, status, error) {
				callback(err)
				console.error(xhr.responseText)
			}
		})
	}
	function getAllUsersChallanges(callback) {
		var userChallengesURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userid + '/challenges', coreAccessToken)
		$.ajax({
			url: userChallengesURLWithAT,
			type: "GET",
			success: function (userChallengesResult) {
				fill_challenge_selector(userChallenges)
				callback(null, userChallenges)
			},
			error: function (xhr, status, error) {
				callback(err)
				console.error(xhr.responseText)
			}
		})
	}
	function getNextObject(callback) {
		var nextObjectURLWithAT = wrapAccessToken(coreEngine_url + 'clients/' + userid + '/nextObject/' + currentLeague, coreAccessToken)
		$.ajax({
			url: nextObjectURLWithAT,
			type: "GET",
			success: function (nextObjectResult) {
				currentPredict = nextObjectResult
				$('#main_predict_remaining').fadeOut()
				$('#main_predict_point').fadeOut()
				$('#main_predict_explanation').fadeOut()
				var hours = (Math.floor((new Date).getTime()) - currentPredict.endingTime) / (1000 * 60 * 60)
				$('#main_predict_remaining').val(hours)
				$('#main_predict_point').val(currentPredict.point)
				$('#main_predict_explanation').val(currentPredict.explanation)
				$('#main_predict_remaining').fadeIn()
				$('#main_predict_point').fadeIn()
				$('#main_predict_explanation').fadeIn()
				callback(null, currentPredict)
			},
			error: function (xhr, status, error) {
				callback(err)
				console.error(xhr.responseText)
			}
		})
	}
	function getAllPackages(callback) {
		var packageURLWithAT = wrapAccessToken(coreEngine_url + 'packages', coreAccessToken)
		var packageURL = wrapFilter(packageURLWithAT, {'where':{'status': 'Working'}})
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
						specialArray.psuh(packageResult[i])
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
					if (packageInfo.offer === 'Special')
						color = 'bg-orange'
					var str = '<div class="item active">' +
											'<a href="" class="package_purchase" id="' + packageInfo.id + '">' +
												'<div class="col-lg-2 col-md-2 col-sm-1 col-xs-1" style="margin-bottom: 0px;">' +
												'</div>' +
												'<div class="col-lg-8 col-md-8 col-sm-10 col-xs-10" style="margin-bottom: 0px;">' + 
													'<div class="card" style="opacity: 0.93; margin-bottom: 0px;">' +
														'<div class="body ' + color + '" style="height:200px;">' +
															'<div class="row clearfix">' +
																'<h3 class="text-center m-t-0">' + packageInfo.explanation + '</h3>' +
															'</div>' +
															'<br>' +
															'<div class="row clearfix">' +
																'<h4 class="text-center">' + packageInfo.chances + '</h4>' +
																'<h4 class="text-center">' + packageInfo.price + '</h4>' +
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
				if (specialCount != 0)
					$('#special_listbox').children().first().addClass('active')

				for (var i = 0; i < generalArray.length; i++) {
					var appendix = mergeData(generalArray[i])
					$('#general_listbox').append(appendix)
				}
				if (generalCount != 0)
					$('#general_listbox').children().first().addClass('active')

				callback(null, packageResult)
			},
			error: function (xhr, status, error) {
				callback(err)
				console.error(xhr.responseText)
			}
		})
	}

	function getAllUsers(callback) {
		var filter = {
			order: 'accountInfoModel.totalPoints DESC'
		}
		var clientURLWithAT = wrapAccessToken(coreEngine_url + 'clients', coreAccessToken)
		var clientWithFilter = wrapFilter(clientURLWithAT, JSON.stringify(filter))
		$.ajax({
			url: clientWithFilter,
			type: "GET",
			success: function (clientResult) {
				allUsers = clientResult
				callback(null, clientResult)
			},
			error: function (xhr, status, error) {
				callback(err)
				console.error(xhr.responseText)
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
				callback(err)
				console.error(xhr.responseText)
			}
		})		
	}
	
})