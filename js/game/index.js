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

var coreEngine_url = "http://127.0.0.1:4000/api/"

$(document).ready(function () {

	doneLoading()
	var phoneNumber
	var userClient
	var currentPredict

	var source = getUrlVars()["source"]

	var userId, coreAccessToken
/*
	if (!source || source === 'web') {
		if (localStorage.getItem('userId'))
			userId = localStorage.getItem('userId')
		else {
			change_page_scene('page_aaa')
			doneLoading()
		}
		if (localStorage.getItem('userCoreAccessToken'))
			coreAccessToken = localStorage.getItem('userCoreAccessToken')
		else {
			change_page_scene('page_aaa')
			doneLoading()
		}
	}
	else if (source === 'telegram') {
		if (getUrlVars()["userId"])
			userId = getUrlVars()["userId"]
		else {
			change_page_scene('page_aaa')
			doneLoading()
		}
		if (getUrlVars()["userCoreAccessToken"])
			coreAccessToken = getUrlVars()["userCoreAccessToken"]
		else {
			change_page_scene('page_aaa')
			doneLoading()
		}

		$('.sharedTitle').hide()
		$('.sharedMobile').hide()
	}
*/
	initUtility()
	
	if (userId && coreAccessToken) {
		// get data
	}

	change_page_scene('page_main_menu')

	// ------------------------------ //
	// 		  	Page Controller					//
	// ------------------------------ //
	function change_page_scene(pageName) {
		var pages = ['page_aaa', 'page_main_menu', 'page_main_prediction', 'page_private_league', 'page_challenge', 'page_play_room', 'page_ranking', 'page_profile', 'page_package', 'page_transaction']
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
	})
	// ------------------------------ //
	// 							AAA								//
	// ------------------------------ //
	$(document).on("click", "#aaa_send_phone_button", function (e) {
		e.preventDefault()
		phoneNumber = $("#aaa_send_phone_phone_number").val()
		if (!phoneNumber) {
			return console.error('required fields error')
		}		
		alert(phoneNumber)
		$('#sign-in').hide()
		$('#password').hide()
		$('#sign-up').show()
		$('#phone').hide()
	})
	$(document).on("click", "#aaa_send_code_button", function (e) {
		e.preventDefault()
		NProgress.start()
		var code = $("#aaa_send_code_code").val()
		if (!phoneNumber || !code) {
			return console.error('required fields error')
		}		
		alert(code)
		var verificationURL = wrapAccessToken(coreEngine_url + 'verifications/verification/' + phoneNumber + '/' + code, coreAccessToken);
		$.ajax({
			url: verificationURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (verificationResult) {
				NProgress.done()
				alert('verification done')
				$('#sign-in').show()
				$('#password').hide()
				$('#sign-up').hide()
				$('#phone').hide()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('verification failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_send_password_button", function (e) {
		e.preventDefault()
		NProgress.start()
		var phoneNum = $("#aaa_password_phone_number").val()
		if (!phoneNum) {
			return console.error('required fields error')
		}		
		alert(phoneNum)
		var passwordURL = wrapAccessToken(coreEngine_url + 'clients/sendPassword/' + phoneNum, coreAccessToken);
		$.ajax({
			url: passwordURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (passwordResult) {
				NProgress.done()
				alert('password done')
				$('#sign-in').show()
				$('#password').hide()
				$('#sign-up').hide()
				$('#phone').hide()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('passsword failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_signup_button", function (e) {
		e.preventDefault()
		if (!$("#aaa_signup_fullname").val() || !$("#aaa_signup_username").val() ||
				!$("#aaa_signup_email").val() || !$("#aaa_signup_password").val() ||
				!$("#aaa_signup_referrer").val() || !phoneNumber || !$("#aaa_signup_select_team").val()
		) {
			return console.error('required fields error')
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
		NProgress.start()
		alert(JSON.stringify(data))
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
								NProgress.done()
								alert('client done')
								userClient = clientResult
								$('#sign-in').hide()
								$('#password').hide()
								$('#sign-up').hide()
								$('#phone').show()
								$('#sendPhone').hide()
								$('#sendCode').show()
							},
							error: function (xhr, status, error) {
								NProgress.done()
								alert('client failed')
								alert(xhr.responseText)
							}
						})
					},
					error: function (xhr, status, error) {
						NProgress.done()
						alert('client failed')
						alert(xhr.responseText)
					}
				})
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('client failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#aaa_signin_button", function (e) {
		e.preventDefault()
		NProgress.start()
		var phoneNum = $("#aaa_signin_phone_number").val()
		var pass = $("#aaa_signin_password").val()
		if (!phoneNum || !pass) {
			return console.error('required fields error')
		}
		var data = {
			phoneNumber: phoneNum,
			password: pass
		}
		var loginURL = wrapAccessToken(coreEngine_url + 'clients/login', coreAccessToken)
		$.ajax({
			url: loginURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (clientResult) {
				NProgress.done()
				alert('login done')
				change_page_scene('page_main_menu')
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('login failed')
				alert(xhr.responseText)
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
		var estimateURL = wrapAccessToken(coreEngine_url + 'estimates', coreAccessToken);
		$.ajax({
			url: estimateURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (estimateResult) {
				NProgress.done()
				alert('estimate done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('client failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#main_predict_reject_button", function (e) {
		e.preventDefault()
		// call for next object
	})
	// ------------------------------ //
	// 			  Personal League					//
	// ------------------------------ //
	$(document).on("click", "#edit_personal_league_delete_button", function (e) {
		e.preventDefault()
		var leagueId = $("#edit_personal_league_leagueId").val()
		if (!leagueId) {
			return console.error('required fields error')
		}
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId, coreAccessToken);
		$.ajax({
			url: championURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "DELETE",
			success: function (championResult) {
				NProgress.done()
				alert('delete champion done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('delete champion failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#edit_personal_league_save_button", function (e) {
		e.preventDefault()
		var leagueId = $("#aaa_signup_select_team").val()
		if (!leagueId || !$("#aaa_signup_select_team").val() || !$("#edit_personal_league_name").val() || !$("#edit_personal_league_capacity").val() || !$("#edit_personal_league_chances").val()) {
			return console.error('required fields error')
		}
		var data = {
			name: $("#edit_personal_league_name").val(),
			capactiy: $("#edit_personal_league_capacity").val(),
			reduceChances: $("#edit_personal_league_chances").val()
		}
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId, coreAccessToken);
		$.ajax({
			url: championURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "PUT",
			success: function (championResult) {
				NProgress.done()
				alert('edit champion done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('edit champion failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#create_personal_league_create_button", function (e) {
		e.preventDefault()
		if (!userId || !$("#create_personal_league_name").val() || !$("#create_personal_league_capacity").val() || !$("#create_personal_league_chances").val()) {
			return console.error('required fields error')
		}
		var data = {
			creatorId: userId,
			name: $("#create_personal_league_name").val(),
			capactiy: $("#create_personal_league_capacity").val(),
			reduceChances: $("#create_personal_league_chances").val()
		}
		var championURL = wrapAccessToken(coreEngine_url + 'champions', coreAccessToken);
		$.ajax({
			url: championURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				NProgress.done()
				alert('create champion done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('create champion failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_league_exit_button", function (e) {
		e.preventDefault()
		var leagueId = $("#join_personal_league_champion_selector").val()
		if (!leagueId || !userId) {
			return console.error('required fields error')
		}
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId + '/leaveChampion/' + userId, coreAccessToken);
		$.ajax({
			url: championURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				NProgress.done()
				alert('leave champion done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('leave champion failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_league_join_button", function (e) {
		e.preventDefault()
		var leagueId = $("#join_personal_league_code").val()
		if (!leagueId || !userId) {
			return console.error('required fields error')
		}
		var championURL = wrapAccessToken(coreEngine_url + 'champions/' + leagueId + '/joinChampion/' + userId, coreAccessToken);
		$.ajax({
			url: championURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				NProgress.done()
				alert('join champion done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('join champion failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#statistics_personal_league_search_button", function (e) {
		e.preventDefault()
		var leagueId = $("#statistics_personal_league_leagueId").val()
		if (!leagueId) {
			return console.error('required fields error')
		}
		var filter = {
			where: {
				'championId': leagueId
			}
		}
		var rankingURL = wrapAccessToken(coreEngine_url + 'rankings', coreAccessToken)
		var rankingURLWithFilter = wrapFilter(rankingURL, filter)
		$.ajax({
			url: rankingURLWithFilter,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (rankingResult) {
				NProgress.done()
				alert('ranking champion done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('ranking champion failed')
				alert(xhr.responseText)
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
			return console.error('required fields error')
		}
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "DELETE",
			success: function (challengeResult) {
				NProgress.done()
				alert('delete challenge done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('delete challenge failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#edit_personal_challenge_save_button", function (e) {
		e.preventDefault()
		var challengeId = $("#edit_personal_challenge_challengeId").val()
		if (!challengeId || !$("#edit_personal_challenge_name").val()) {
			return console.error('required fields error')
		}
		var data = {
			name: $("#edit_personal_challenge_name").val()
		}
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "PUT",
			success: function (challengeResult) {
				NProgress.done()
				alert('edit challenge done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('edit challenge failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#create_personal_challenge_create_button", function (e) {
		e.preventDefault()
		if (!userId || !$("#create_personal_challenge_name").val() || !$("#create_personal_challenge_period").val() || !$("#create_personal_challenge_chances").val()) {
			return console.error('required fields error')
		}
		var data = {
			creatorId: userId,
			name: $("#create_personal_challenge_name").val(),
			period: $("#create_personal_challenge_period").val(),
			reduceChances: $("#create_personal_challenge_chances").val()
		}
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges', coreAccessToken);
		$.ajax({
			url: championURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (championResult) {
				NProgress.done()
				alert('create challenge done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('create challenge failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_challenge_exit_button", function (e) {
		e.preventDefault()
		var challengeId = $("#join_personal_league_challenge_selector").val()
		if (!challengeId || !userId) {
			return console.error('required fields error')
		}
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId + '/leaveChallenge/' + userId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (challengeResult) {
				NProgress.done()
				alert('leave challenge done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('leave challenge failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#join_personal_challenge_join_button", function (e) {
		e.preventDefault()
		var challengeId = $("#join_personal_league_code").val()
		if (!challengeId || !userId) {
			return console.error('required fields error')
		}
		var challengeURL = wrapAccessToken(coreEngine_url + 'challenges/' + challengeId + '/joinChallenge/' + userId, coreAccessToken);
		$.ajax({
			url: challengeURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (challengeResult) {
				NProgress.done()
				alert('join challenge done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('join challenge failed')
				alert(xhr.responseText)
			}
		})
	})
	$(document).on("click", "#statistics_personal_challenge_search_button", function (e) {
		e.preventDefault()
		var challengeId = $("#statistics_personal_challenge_challengeId").val()
		if (!challengeId) {
			return console.error('required fields error')
		}
		var filter = {
			where: {
				'championId': challengeId
			}
		}
		var competitionURL = wrapAccessToken(coreEngine_url + 'competitions', coreAccessToken)
		var competitionURLWithFilter = wrapFilter(competitionURL, filter)
		$.ajax({
			url: competitionURLWithFilter,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (competitionResult) {
				NProgress.done()
				alert('competition champion done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('competition champion failed')
				alert(xhr.responseText)
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
		// call next object
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
			return console.error('required fields error')
		}
		var clientURL = wrapAccessToken(coreEngine_url + 'clients/' + userId, coreAccessToken)
		$.ajax({
			url: clientURL,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			success: function (clientResult) {
				NProgress.done()
				alert('client checkoint done')
				// call for next object
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert('client checkpoint failed')
				alert(xhr.responseText)
			}
		})
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

	})
	// ------------------------------ //
	// 			 		Transaction						//
	// ------------------------------ //
	$(document).on("click", "#transaction_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
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

	function doneLoading() {
		setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 100)
	}

	// ------------------------------ //
	// 		 	 Table Construction				//
	// ------------------------------ //


	// ------------------------------ //
	// 		 	 	Table Controller				//
	// ------------------------------ //


	// ------------------------------ //
	// 		 	 		Data Fetchers					//
	// ------------------------------ //

	
	function fill_section_update(predictId) {
		$("#select_update_predict").selectpicker('val', predictId)
		var model
		for (var i = 0; i < predicts.length; i++) {
			if (predicts[i].id === predictId) {
				model = predicts[i]
				$("#select_update_points").val(Number(model.point))
				$("#select_update_week").val(Number(model.weekNumber))
				$("#select_update_possibility").val(Number(model.possibility))
				$("#select_update_explanation").val(model.explanation)
				$("#select_update_league").selectpicker('val', model.leagueId)
				$("#select_update_occuerence").selectpicker('val', Number(model.occurrence))
				$("#select_update_status").selectpicker('val', model.status)
				$("#select_update_tag").selectpicker('val', model.tags)
				$("#select_update_beginningTime").val(fullDateConvertor(model.beginningTime))
				$("#select_update_endingTime").val(fullDateConvertor(model.endingTime))
				break
			}
		}
	}


	function fill_graph(leaguesArray, estimatesArray) {
		function getRandomColor() {
			var letters = '0123456789ABCDEF'
			var color = '#'
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)]
			}
			return color
		}
		var dataArray = []
		var colorArray = []
		var yLable = []
		for (var i = 0; i < 28; i++) {
			var model = {}
			model.days = '' + i
			for (var j = 0; j < leaguesArray.length; j++) {
				var counter = 0
				yLable.push(leaguesArray[j].name)
				for (var k = 0; k < estimatesArray.length; k++) {
					if (estimatesArray[k].leagueId === leaguesArray[j].id)
						counter++
				}
				model[leaguesArray[j].name] = counter
				dataArray.push(model)
				colorArray.push(getRandomColor())
			}
		}
		Morris.Line({
				element: 'line_chart',
				data: dataArray,
				xkey: 'days',
				ykeys: yLable,
				labels: yLable,
				lineColors: colorArray,
				lineWidth: 3
		})
	}

	function fill_predict_selectors(predictsArray) {
		$('#select_moreInfo_predict').find('option').remove()
		$('#select_update_predict').find('option').remove()
		for (var i = 0; i < predictsArray.length; i++) {
			var itemToPush = {
				id: predictsArray[i].id,
				name: predictsArray[i].explanation
			}
			$('#select_moreInfo_predict').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
			$('#select_update_predict').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
	}

	function fill_league_selectors(leaguesArray) {
		$('#select_management_league').find('option').remove()
		$('#select_update_league').find('option').remove()
		$('#select_new_league').find('option').remove()
		for (var i = 0; i < leaguesArray.length; i++) {
			var itemToPush = {
				id: leaguesArray[i].id,
				name: leaguesArray[i].name
			}
			$('#select_management_league').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
			$('#select_update_league').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
			$('#select_new_league').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')			
		}
	}

	function getAllPredicts(callback) {
		var predictURLWithAT = wrapAccessToken(coreEngine_url + 'predicts', coreAccessToken)
		$.ajax({
			url: predictURLWithAT,
			type: "GET",
			success: function (predictResult) {
				predicts = predictResult
				fill_predict_selectors(predicts)
				callback(null, predicts)
				NProgress.done()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				callback(err)
				alert(xhr.responseText)
			}
		})
	}

	function getAllLeagus(callback) {
		var leagueURLWithAT = wrapAccessToken(coreEngine_url + 'leagues', coreAccessToken)
		$.ajax({
			url: leagueURLWithAT,
			type: "GET",
			success: function (leagueResult) {
				leagues = leagueResult
				fill_league_selectors(leagues)
				callback(null, leagues)
				NProgress.done()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				callback(err)
				alert(xhr.responseText)
			}
		})
	}

	function getAllEstiamtes(callback) {
		var estimateURLWithAT = wrapAccessToken(coreEngine_url + 'estimates', coreAccessToken)
		$.ajax({
			url: estimateURLWithAT,
			type: "GET",
			success: function (estimateResult) {
				estimates = estimateResult
				callback(null, estimates)
				NProgress.done()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				callback(err)
				alert(xhr.responseText)
			}
		})
	}

	function getEstimatesOfPredict(predictId, callback) {
		var estimateOfPredictURLWithAT = wrapAccessToken(coreEngine_url + 'estimates?filter={"where":{"predictId": ' + predictId + '}}', coreAccessToken)
		$.ajax({
			url: estimateOfPredictURLWithAT,
			type: "GET",
			success: function (estimateResult) {
				estimates = estimateResult
				callback(null, estimates)
				NProgress.done()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				callback(err)
				alert(xhr.responseText)
			}
		})
	}

	function getAllInfo() {
		getAllLeagus(function(err, league) {
			if (err) {
				$('.page-loader-wrapper').fadeOut()
				return alert(err)
			}
			getAllPredicts(function(err, predict) {
				if (err) {
					$('.page-loader-wrapper').fadeOut()
					return alert(err)
				}
				getAllEstiamtes(function(err, estimate) {
					if (err) {
						$('.page-loader-wrapper').fadeOut()
						return alert(err)
					}
					fill_graph(league, estimates)
					fill_management_table(predict)
					fill_moreInfo_table(estimate)
					$("#adminUsername").html(localStorage.getItem('AdminCompanyName'))
					$("#adminEmail").html(localStorage.getItem('adminEmail'))
					$('.page-loader-wrapper').fadeOut()
				})
			})
		})
	}

	function fill_management_table(predictsArray) {
		$('#tab_logic_management>tbody').empty()
		for (var i = 0; i < predictsArray.length; i++) {
			var statusColor
			if (predictsArray[i].status === 'Created') statusColor = 'bg-green'
			else if (predictsArray[i].status === 'Working') statusColor = 'bg-light-blue'
			else if (predictsArray[i].status === 'Finished') statusColor = 'bg-deep-orange'
			$('#tab_logic').append('<tr id="addr' + (i) + '"></tr>')
			$('#addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].id + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].leagueId + '</br>' + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertor(predictsArray[i].beginningTime) + '</br>' + fullDateConvertor(transactionArray[i].endingTime) + '</td>' +
				'<td align="center" style="vertical-align: middle; width: 50px; max-width: 100px;">' + predictsArray[i].explanation + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].possibility + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].point + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].weekNumber + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;"><span class="label font-13 ' + statusColor + '">' + predictsArray[i].status + '</span></td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].tags + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].occurrence + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="predictEdit m-l-5 m-r-5 btn bg-green waves-effect"><i class="material-icons">mode_edit</i></button>' +
				'<button type="button" class="predictDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		$('#tab_logic_management').DataTable()
	}

	$(document).on("click", ".predictEdit", function (e) {
		e.preventDefault()
		var predictId = $(this).parent().siblings().eq(0).text()
		localStorage.setItem('editablePredictId', predictId)
		$('.nav-tabs a[id="nav4"]').tab('show')
	})

	$(document).on("click", ".predictDelete", function (e) {
		e.preventDefault();
		var predictId = $(this).parent().siblings().eq(0).text()
		NProgress.start();
		swal({
			title: "آیا مطمئن هستید؟",
			text: "بعد از حذف کردن یک پیش‌بینی، دیگر قادر به بازگرداندن آن نیستید.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "بله، حذف کن!",
			cancelButtonText: "خیر، دست نگه دار!",
			closeOnConfirm: false,
			closeOnCancel: true
		}, function (isConfirm) {
			if (isConfirm) {
				var predictURL = wrapAccessToken(coreEngine_url + 'predicts/' + predictId, coreAccessToken)
				$.ajax({
					url: predictURL,
					type: "DELETE",
					success: function (predictResult) {
						swal("پاک شد!", "پیش‌بینی مورد نظر شما با موفقیت حذف شد.", "success")
						getAllCampaigns()
						NProgress.done()
					},
					error: function (xhr, status, error) {
						NProgress.done()
						swal("متاسفیم!", "مشکلی پیش آمد، لطفا مجددا تلاش کنید.", "error")
						alert(xhr.responseText)
					}
				})
			} else
				NProgress.done()
		})
	})

	function fill_moreInfo_table(estimatesArray) {
		$('#tab_logic_moreInfo>tbody').empty()
		for (var i = 0; i < estimatesArray.length; i++) {
			var statusColor
			if (estimatesArray[i].status === 'Win') statusColor = 'bg-green'
			else if (estimatesArray[i].status === 'Open') statusColor = 'bg-light-blue'
			else if (estimatesArray[i].status === 'Lose') statusColor = 'bg-red'
			$('#tab_logic').append('<tr id="addr' + (i) + '"></tr>')
			$('#addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + estimatesArray[i].id + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + estimatesArray[i].clientId + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertor(estimatesArray[i].time) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertor(estimatesArray[i].checkTime) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;"><span class="label font-13 ' + statusColor + '">' + estimatesArray[i].status + '</span></td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="estimateInfo m-l-5 m-r-5 btn bg-amber waves-effect"><i class="material-icons">details</i></button>' +
				'<button type="button" class="estimateDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		$('#tab_logic_moreInfo').DataTable()
	}

	$(document).on("click", ".estimateInfo", function (e) {
		e.preventDefault()
		var clientId = $(this).parent().siblings().eq(1).text()
		NProgress.start()
		var clientURL = wrapAccessToken(coreEngine_url + 'clients/' + clientId, coreAccessToken)
		$.ajax({
			url: clientURL,
			type: "GET",
			success: function (clientResult) {
				$('#defaultModal .modal-content').removeAttr('class').addClass('modal-content');

				var keys = Object.keys(clientResult.sequencerModel.counter)
				for (var i = 0; i < keys.length; i++) {
					var str =	'<div class="col-md-1">' + '</div>' + '<div class="col-md-3 col-md-offset-1">' + '<p>' + '<b style="font-size:12px;">' + keys[i] + '</b>' + '</p>' +
						'<div class="input-group spinner" data-trigger="spinner">' + '<div class="form-line">' +
						'<input type="text" class="form-control text-center" value="' + clientResult.sequencerModel.counter[keys[i]] + '" data-rule="quantity" required>' +
						'</div>' + '<span class="input-group-addon">' + '<a href="javascript:;" class="spin-up" data-spin="up"><i class="glyphicon glyphicon-chevron-up"></i></a>' +
						'<a href="javascript:;" class="spin-down" data-spin="down"><i class="glyphicon glyphicon-chevron-down"></i></a>' + '</span>' + '</div>' + '</div>'
					$('#sequencer').append(str)
				}

				$("#myInfoID").val(clientResult.id)
				$("#myInfoTime").val(clientResult.time)
				$("#myInfoUsername").val(clientResult.username)
				$("#myInfoEmail").val(clientResult.email)
				$("#myInfoFullName").val(clientResult.fullName)
				$("#myInfoPhoneNumber").val(clientResult.phoneNumber)

				$("#UserAccountInfoChances").attr({
					"value": clientResult.accountInfoModel.chances
				})
				$("#UserAccountInfoTotalWins").attr({
					"value": clientResult.accountInfoModel.roundWins
				})
				$("#UserAccountInfoTotalPoints").attr({
					"value": clientResult.accountInfoModel.totalPoints
				})
				$("#UserAccountInfoEstimates").attr({
					"value": clientResult.accountInfoModel.totalEstimates
				})

				$('.nav-tabs a[id="nav7"]').tab('show')
				$('#defaultModal').modal('show')
				NProgress.done()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert(xhr.responseText)
			}
		})
	})

	$(document).on("click", ".estimateDelete", function (e) {
		e.preventDefault()
		var estimateId = $(this).parent().siblings().eq(0).text()
		NProgress.start()
		swal({
			title: "آیا مطمئن هستید؟",
			text: "بعد از حذف کردن یک تخمین، دیگر قادر به بازگرداندن آن نیستید.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "بله، حذف کن!",
			cancelButtonText: "خیر، دست نگه دار!",
			closeOnConfirm: false,
			closeOnCancel: true
		}, function (isConfirm) {
			if (isConfirm) {
				var estimateURL = wrapAccessToken(coreEngine_url + 'estimates/' + estimateId, coreAccessToken)
				$.ajax({
					url: estimateURL,
					type: "DELETE",
					success: function (estimateResult) {
						swal("پاک شد!", "تخمین مورد نظر شما با موفقیت حذف شد.", "success")
						getAllCampaigns()
						NProgress.done()
					},
					error: function (xhr, status, error) {
						NProgress.done()
						swal("متاسفیم!", "مشکلی پیش آمد، لطفا مجددا تلاش کنید.", "error")
						alert(xhr.responseText)
					}
				})
			} else
				NProgress.done()
		})
	})

	$("#button_moreInfo_search").click(function (e) {
		e.preventDefault()
		NProgress.start()
		var predict
		if ($('#select_moreInfo_predict').val())
			predict = $('#select_moreInfo_predict').val()
		else {
			NProgress.done();
			return swal("اوپس!", "شما باید همه ی فیلد های مربوطه و ضروری را پر کنید!", "warning");
		}

		var estimateURL = wrapAccessToken(coreEngine_url + 'estimates', coreAccessToken)
		var estimateURLWithFilter = wrapFilter(estimateURL, JSON.stringify({'where':{'predictId': predict}}))
		$.ajax({
			url: estimateURLWithFilter,
			type: "GET",
			success: function (estimateResult) {
				fill_moreInfo_table(estimateResult)
				NProgress.done()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert(xhr.responseText)
			}
		})
	})

	$("#button_management_search").click(function (e) {
		e.preventDefault()
		var leagues = []
		var occurrences = []
		var statuses = []
		var tags = []

		var minPossibilty, maxPossibility
		var minWeek, maxWeek
		var minPoint, maxPoint

		var beginningTime, endingTime

		if ($('#select_management_league').val())
			leagues = $('#select_management_league').val()
		if ($('#select_management_occuerence').val())
			occurrences = $('#select_management_occuerence').val()
		if ($('#select_management_status').val())
			statuses = $('#select_management_status').val()
		if ($('#select_management_tag').val())
			tags = $('#select_management_tag').val()

		if ($('#select_management_min_possibility').val())
			minPossibilty = $('#select_management_min_possibility').val()
		if ($('#select_management_max_possibility').val())
			maxPossibility = $('#select_management_max_possibility').val()

		if ($('#select_management_min_week').val())
			minWeek = $('#select_management_min_week').val()
		if ($('#select_management_max_week').val())
			maxWeek = $('#select_management_max_week').val()

		if ($('#select_management_min_point').val())
			minPoint = $('#select_management_min_point').val()
		if ($('#select_management_max_point').val())
			maxPoint = $('#select_management_max_point').val()

		if ($('#select_management_beginningTime').val())
			beginningTime = timeConvertor($('#select_management_beginningTime').val())
		if ($('#select_management_endingTime').val())
			endingTime = timeConvertor($('#select_management_endingTime').val())

		var filter = {}
		if (leagues.length > 0 || occurrences.length > 0 || statuses.length > 0 || tags.length > 0 || beginningTime || endingTime || minPoint || maxPoint || minPossibilty || maxPossibility || minWeek || maxWeek) {
			filter.where = {}
			filter.where.and = []
			if (leagues.length > 0)
				filter.where.and.push({
					'league': {
						'inq': leagues
					}
				})
			if (occurrences.length > 0)
				filter.where.and.push({
					'occurrence': {
						'inq': occurrences
					}
				})
			if (statuses.length > 0)
				filter.where.and.push({
					'status': {
						'inq': statuses
					}
				})
			if (tags.length > 0)
				filter.where.and.push({
					'tags': {
						'inq': tags
					}
				})
			if (beginningTime)
				filter.where.and.push({
					'beginningTime': {
						'gte': beginningTime
					}
				})
			if (endingTime)
				filter.where.and.push({
					'endingTime': {
						'lte': endingTime
					}
				})

			if (minPoint)
				filter.where.and.push({
					'point': {
						'gte': minPoint
					}
				})
			if (maxPoint)
				filter.where.and.push({
					'point': {
						'lte': maxPoint
					}
				})
			if (minWeek)
				filter.where.and.push({
					'weekNumber': {
						'gte': minWeek
					}
				})
			if (maxWeek)
				filter.where.and.push({
					'weekNumber': {
						'lte': maxWeek
					}
				})
			if (minPossibilty)
				filter.where.and.push({
					'possibility': {
						'gte': minPossibilty
					}
				})
			if (maxPossibility)
				filter.where.and.push({
					'possibility': {
						'lte': maxPossibility
					}
				})
		}

		var predictURLwithAT = wrapAccessToken(coreEngine_url + 'predicts', coreAccessToken)
		var predictURL = wrapFilter(predictURLwithAT, JSON.stringify(filter))
		$.ajax({
			url: predictURL,
			type: "GET",
			success: function (predictResult) {
				fill_management_table(predictResult)
				NProgress.done()
			},
			error: function (xhr, status, error) {
				NProgress.done()
				alert(xhr.responseText)
			}
		})

	})

	$("#button_new_add").click(function (e) {
		e.preventDefault()
		NProgress.start()
		if (!$('#select_new_league').val() || !$('#select_new_week').val() || !$('#select_new_possiblity').val() || !$('#select_new_points').val() || !$('#select_new_explanation').val() || !$('#select_new_beginningTime').val() || !$('#select_new_endingTime').val() || !$('#select_new_tag').find('option:selected').text()) {
			NProgress.done()
			return swal("اوپس!", "شما باید همه ی فیلد های مربوطه و ضروری را پر کنید!", "warning");
		}
		var data = {
			leagueId: $('#select_new_league').val(),
			explanation: $('#select_new_explanation').val(),
			tags: $('#select_new_tag').find('option:selected').text(),
			beginningTime: fullTimeConvertor($('#select_new_beginningTime').val()),
			endingTime: fullTimeConvertor($('#select_new_endingTime').val()),
			weekNumber: Number($('#select_new_week').val()),
			possibility: Number($('#select_new_possiblity').val()),
			point: Number($('#select_new_points').val())
		}
		var predictURL = wrapAccessToken(coreEngine_url + 'predicts', coreAccessToken);
		$.ajax({
			url: predictURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (predictResult) {
				getAllInfo()
				NProgress.done()
				swal("خیلی خوب!", "شما توانستید یک پیش‌بینی جدید را موفقیت آمیز بیافزایید.", "success")
			},
			error: function (xhr, status, error) {
				NProgress.done()
				swal("متاسفیم!", "مشکلی پیش آمد، لطفا مجددا تلاش کنید.", "error")
				alert(xhr.responseText)
			}
		})
	})

	$("#button_update_upgrade").click(function (e) {
		e.preventDefault()
		NProgress.start()

		var predictId

		if ($('#select_management_league').val())
			predictId = $('#select_management_league').val()

		if (!predictId || !$('#select_update_league').val() || !$('#select_update_explanation').val() || !$('#select_update_occuerence').val() ||
			!$('#select_update_status').val() || !$('#select_update_tag').find('option:selected').text() || !$('#select_update_beginningTime').val() || !$('#select_update_endingTime').val() ||
			!$('#select_update_week').val() || !$('#select_update_possibility').val() || !$('#select_update_points').val()
		) {
			NProgress.done()
			return swal("اوپس!", "شما باید همه ی فیلد های مربوطه و ضروری را پر کنید!", "warning");
		}
		var data = {
			leagueId: $('#select_update_league').val(),
			explanation: $('#select_update_explanation').val(),
			occurrence: $('#select_update_occuerence').val(),
			status: $('#select_update_status').val(),
			tags: $('#select_update_tag').find('option:selected').text(),
			beginningTime: fullTimeConvertor($('#select_update_beginningTime').val()),
			endingTime: fullTimeConvertor($('#select_update_endingTime').val()),
			weekNumber: Number($('#select_update_week').val()),
			possibility: Number($('#select_update_possibility').val()),
			point: Number($('#select_update_points').val())
		}
		var predictURL = wrapAccessToken(coreEngine_url + 'predicts/' + predictId, coreAccessToken);
		$.ajax({
			url: predictURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "PUT",
			success: function (predictResult) {
				getAllInfo()
				NProgress.done()
				swal("خیلی خوب!", "شما توانستید یک پیش‌بینی جدید را موفقیت آمیز بیافزایید.", "success")
			},
			error: function (xhr, status, error) {
				NProgress.done()
				swal("متاسفیم!", "مشکلی پیش آمد، لطفا مجددا تلاش کنید.", "error")
				alert(xhr.responseText)
			}
		})
	})

})