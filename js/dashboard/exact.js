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

function fullDateConvertorJalali(myDate) {
	var t = moment(Number(myDate)).format('YYYY/M/D HH:mm').toString()
	moment.loadPersian({usePersianDigits: true})
	var m = moment(t, 'YYYY/M/D HH:mm').format('jYYYY/jM/jD HH:mm').toString()
	moment.loadPersian({usePersianDigits: false})
	var res = m.split(" ")
	return (res[0] + ' - ' + res[1])
}

function successfulOperation() {
	swal("موفق شدید", "عملیات درخواست شده شما با موفقیت انجام شد", "success")
}

function failedOperation() {
	swal("متاسفیم", "مشکلی پیش آمد، لطفا مجددا تلاش کنید", "error")
}

function failedOperationByString(sentence) {
	swal("متاسفیم", sentence, "error")
}

function warningOperation() {
	swal("دقت کنید", "شما باید همه ی فیلد های مربوطه و ضروری را پر کنید", "warning")
}

function ensuranceOperation(callback) {
	swal({
		title: "آیا مطمئن هستید؟",
		text: "پس از انجام دادن این عملیات، دیگر قادر به بازگرداندن آن نیستید",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "بله، انجام بده",
		cancelButtonText: "خیر، دست نگه دار",
		closeOnConfirm: false,
		closeOnCancel: true
	}, function (isConfirm) {
		if (isConfirm) {
			callback(1)
		} else {
			callback(0)
		}
	})
}

var coreEngine_url 	= "http://185.105.186.68:4000/api/"
var zarinPal_url 		= "http://185.105.186.68:4010/api/"
var coreURL 				= 'http://copa90.ir/'

// var coreEngine_url 	= "http://127.0.0.1:4000/api/"
// var zarinPal_url 		= "http://127.0.0.1:4010/api/"
// var coreURL 				= 'http://copa90.ir/'

$(document).ready(function () {

	$(document).ajaxError(function myErrorHandler(event, x, ajaxOptions, thrownError) {
		doneLoading()
		doneProgressBar()
		if (x.responseJSON)
			if (x.responseJSON.error)
				if (x.responseJSON.error.message.includes('خطا')) 
					return failedOperationByString(x.responseJSON.error.message)
		if (x.status == 401) {
			localStorage.clear()
			return window.location.href = '../AAA/sign-in-admin.html'
		}
		failedOperation()
	})

	var exacts = []
	var leagues = []
	var teams = []
	var players = []
	var choices = []
	var allAns = []

	var newOptions = []
	var updateOptions = []

	var adminId, coreAccessToken
	if (localStorage.getItem('adminId'))
		adminId = localStorage.getItem('adminId')
	else
		return window.location.href = '../AAA/sign-in-admin.html'

	if (localStorage.getItem('adminCoreAccessToken'))
		coreAccessToken = localStorage.getItem('adminCoreAccessToken')
	else
		return window.location.href = '../AAA/sign-in-admin.html'

	tabHandler({ target: { id: 'nav1' } })
	$('.nav-tabs a[id="nav1"]').tab('show')

	initDateTimePicker()
	initTableSchema()

	startLoading()
	getAllInfo(function(err) {
		doneProgressBar()
		doneLoading()
		if (err)
			return window.location.href = '../AAA/sign-in-admin.html'
	})

	// ------------------------------ //
	// 				 Tab Controller					//
	// ------------------------------ //	
	function tabHandler(e) {
		var select = $(e.target).attr('id')
		if (select === 'nav4') {
			if (localStorage.getItem('editableExactId')) {
				var exactId = localStorage.getItem('editableExactId')
				fill_section_update(exactId)
				localStorage.removeItem('editableExactId')
			}
		}
		else if (select === 'nav5') {
			if (localStorage.getItem('choiceExactId')) {
				var exactId = localStorage.getItem('choiceExactId')
				fill_section_choice(exactId)
				localStorage.removeItem('choiceExactId')
			}
		}
		var no = select.replace("nav", "")
		for (var i = 1; i < 10; i++) {
			if (Number(no) >= 6 && i < 6)
				continue
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
	// 		 	 			Utility							//
	// ------------------------------ //
	function initDateTimePicker() {
		autosize($('textarea.auto-growth'))
		$('.datetimepicker').bootstrapMaterialDatePicker({
			format: 'dddd DD MMMM YYYY - HH:mm',
			clearButton: true,
			weekStart: 1
		})
		$('.datepicker').bootstrapMaterialDatePicker({
			format: 'dddd DD MMMM YYYY',
			clearButton: true,
			weekStart: 1,
			time: false
		})
		$('.timepicker').bootstrapMaterialDatePicker({
			format: 'HH:mm',
			clearButton: true,
			date: false
		})
	}
	function initTableSchema() {
		
	}
	function startProgressBar() {
		$('.cardRainbow').fadeIn()
	}
	function doneProgressBar() {
		$('.cardRainbow').fadeOut()
	}
	function startLoading() {
		$('.page-loader-wrapper').fadeIn()
		$('#rainbow-progress-bar1').fadeIn()
	}
	function doneLoading() {
		$('.page-loader-wrapper').fadeOut()
		$('#rainbow-progress-bar1').fadeOut()
	}

	// ------------------------------ //
	// 		 	 	Edit Rows Filler				//
	// ------------------------------ //
	$('#select_update_exact').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		fill_section_update(selected)
	})
	$('#select_new_label').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		if (selected === 'Player')
			fill_answer_selectors(true, players)
		else if (selected === 'Team')
			fill_answer_selectors(true, teams)
		else if (selected === 'League')
			fill_answer_selectors(true, leagues)
	})
	function fill_section_update(exactId) {
		$("#select_update_exact").selectpicker('val', exactId)
		var model
		for (var i = 0; i < exacts.length; i++) {
			if (exacts[i].id === exactId) {
				model = exacts[i]
				var selected = model.label
				if (selected === 'Player')
					fill_answer_selectors(false, players)
				else if (selected === 'Team')
					fill_answer_selectors(false, teams)
				else if (selected === 'League')
					fill_answer_selectors(false, leagues)	
				$("#select_update_league").selectpicker('val', model.leagueId)
				$("#select_update_topic").selectpicker('val', model.topic)
				$("#select_update_answer").selectpicker('val', model.answer)
				$("#select_update_status").selectpicker('val', model.status)
				$("#select_update_beginningTime").val(fullDateConvertor(model.beginningTime))
				$("#select_update_endingTime").val(fullDateConvertor(model.endingTime))
				$("#select_update_name").val(model.name)
				fill_update_answer_table(model.selectors)
				break
			}
		}
	}
	function fill_section_choice(exactId) {
		$("#select_moreInfo_exact").selectpicker('val', exactId)
	}

	// ------------------------------ //
	// 		 	 	Graph Controller				//
	// ------------------------------ //
	function fill_graph(leaguesArray, choicesArray) {
		$('#line_chart').empty()
		function getRandomColor() {
			var letters = '0123456789ABCDEF'
			var color = '#'
			for (var i = 0; i < 6; i++)
				color += letters[Math.floor(Math.random() * 16)]
			return color
		}
		var dataArray = []
		var colorArray = []
		var yLable = []
		var now = (new Date).getTime()
		for (var i = 0; i < leaguesArray.length; i++) {
			colorArray.push(getRandomColor())
			yLable.push(leaguesArray[i].name)
		}
		for (var i = 0; i < 31; i++) {
			var model = {}
			model.ruz = Persian_Number((i).toString()) + ' روز قبل '
			for (var j = 0; j < leaguesArray.length; j++) {
				var counter = 0
				for (var k = 0; k < choicesArray.length; k++) {
					if (choicesArray[k].leagueName === leaguesArray[j].name)
						if ((Number(choicesArray[k].time) <= (now - (i * 24 * 60 * 60 * 1000))) && (Number(choicesArray[k].time) >= (now - ((i + 1) * 24 * 60 * 60 * 1000))))
						counter++
				}
				model[leaguesArray[j].name] = counter
			}
			dataArray.push(model)
		}
		dataArray.reverse()
		Morris.Line({
				element: 'line_chart',
				data: dataArray,
				parseTime: false,
				xkey: 'ruz',
				xLabels: ['Day'],
				smooth: false,
				fillOpacity: 1.0,
				ykeys: yLable,
				labels: yLable,
				lineColors: colorArray,
				lineWidth: 3
		})
	}

	// ------------------------------ //
	// 			  	Selectors							//
	// ------------------------------ //
	function fill_answer_selectors(isNew, answer) {
		var str = '#'
		if (isNew) 
			str += 'select_new_choice'
		else 
			str += 'select_update_choice'
		$(str).find('option').remove()
		for (var i = 0; i < answer.length; i++) {
			var itemToPush = {
				id: answer[i].id,
				name: answer[i].name
			}
			$(str).append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
		}
		if (!isNew) {
			$('#select_update_answer').find('option').remove()
			for (var i = 0; i < answer.length; i++) {
				var itemToPush = {
					id: answer[i].id,
					name: answer[i].name
				}
				$('#select_update_answer').append($('<option>', {
					value: itemToPush.id,
					text: itemToPush.name
				})).selectpicker('refresh')
			}	
		}
	}
	function fill_exact_selectors(exactsArray) {
		$('#select_moreInfo_exact').find('option').remove()
		$('#select_update_exact').find('option').remove()
		for (var i = 0; i < exactsArray.length; i++) {
			var itemToPush = {
				id: exactsArray[i].id,
				name: exactsArray[i].name
			}
			$('#select_moreInfo_exact').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			})).selectpicker('refresh')
			$('#select_update_exact').append($('<option>', {
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

	// ------------------------------ //
	// 					Data Fetch						//
	// ------------------------------ //
	function getAllExacts(callback) {
		var exactURLWithAT = wrapAccessToken(coreEngine_url + 'exacts', coreAccessToken)
		$.ajax({
			url: exactURLWithAT,
			type: "GET",
			success: function (exactResult) {
				exacts = exactResult
				fill_exact_selectors(exacts)
				callback(null, exacts)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
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
				teams = teamResult
				callback(null, teams)
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
				players = playerResult
				callback(null, players)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getAllChoices(callback) {
		var choiceURLWithAT = wrapAccessToken(coreEngine_url + 'choices', coreAccessToken)
		$.ajax({
			url: choiceURLWithAT,
			type: "GET",
			success: function (choiceResult) {
				choices = choiceResult
				callback(null, choices)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getChoicesOfExact(exactId, callback) {
		var choicesOfExactURLWithAT = wrapAccessToken(coreEngine_url + 'choices?filter={"where":{"exactId":"' + exactId + '"}}', coreAccessToken)
		$.ajax({
			url: choicesOfExactURLWithAT,
			type: "GET",
			success: function (choiceResult) {
				callback(null, choiceResult)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getExactWithQueryFilter(queryFilter, callback) {
		var exactURLwithAT = wrapAccessToken(coreEngine_url + 'exacts', coreAccessToken)
		var exactURL = wrapFilter(exactURLwithAT, JSON.stringify(queryFilter))
		$.ajax({
			url: exactURL,
			type: "GET",
			success: function (exactResult) {
				callback(null, exactResult)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getAllInfo(callback) {
		getAllLeagus(function(err, league) {
			if (err)
				return callback(err)
			getAllTeams(function(err, team) {
				if (err)
					return callback(err)
				getAllPlayers(function(err, player) {
					if (err)
						return callback(err)
					getAllExacts(function(err, exact) {
						if (err)
							return callback(err)
						getAllChoices(function(err, choice) {
							if (err)
								return callback(err)
							fill_graph(league, exact)
							$("#adminUsername").html(localStorage.getItem('AdminCompanyName'))
							$("#adminEmail").html(localStorage.getItem('adminEmail'))
							return callback(null, league, team, player, exact, choice)
						})
					})						
				})
			})
		})
	}

	// ------------------------------ //
	// 		 	 	General Buttons					//
	// ------------------------------ //
	$("#signOutButton").click(function (e) {
		e.preventDefault()
		localStorage.clear()
		return window.location.href = '../AAA/sign-in-admin.html'
	})
	$(".popoverHandler").click(function (e) {
		e.preventDefault()
		var idSection = $(this).attr('id')
		var select = ''
		if (idSection === 'popover_handler_1') select = '#select_management_beginningTime'
		else if (idSection === 'popover_handler_2') select = '#select_management_endingTime'
		else if (idSection === 'popover_handler_3') select = '#select_new_beginningTime'
		else if (idSection === 'popover_handler_4') select = '#select_new_endingTime'
		else if (idSection === 'popover_handler_5') select = '#select_update_beginningTime'
		else if (idSection === 'popover_handler_6') select = '#select_update_endingTime'
		var selector = '#' + idSection
		$(selector).popover({
			trigger: 'focus',
			container: 'body',
			placement: 'top',
			content: function() {
				var data = 'زمانی برای تبدیل مشخص نشده است'
				if ($(select).val())
					data = fullDateConvertorJalali(fullTimeConvertor($(select).val()))
				return data
			}
    })
		$(selector).popover("show");
	})
	$("#update_statistics_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		getAllLeagus(function (err, leagueList) {
			if (err) {
				doneProgressBar()
				return failedOperation()
			}
			getAllChoices(function(err, choiceList) {
				doneProgressBar()
				if (err)
					return failedOperation()
				fill_graph(leagueList, choiceList)
			})
		})
	})
	function empty_moreInfo_section() {
		$("#select_moreInfo_exact").selectpicker('val', '')
		$('#tab_logic_moreInfo tbody').empty()
	}
	$("#update_moreInfo_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_moreInfo_section()
		getAllExacts(function(err, result) {
			doneProgressBar()
			if (err)
				return failedOperation()
		})
	})
	$("#empty_moreInfo_section").click(function (e) {
		e.preventDefault()
		empty_moreInfo_section()
	})
	function empty_management_section() {
		$('#tab_logic_management tbody').empty()
		$("#select_management_league").selectpicker('val', '')
		$("#select_management_label").selectpicker('val', '')
		$("#select_management_status").selectpicker('val', '')
		$("#select_management_topic").selectpicker('val', '')
		$("#select_management_beginningTime").val('')
		$("#select_management_endingTime").val('')
	}
	$("#update_management_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_management_section()
		getAllLeagus(function(err, result) {
			if (err) {
				doneProgressBar()
				return failedOperation()
			}
			getAllTeams(function(err, result) {
				if (err) {
					doneProgressBar()
					return failedOperation()
				}
				getAllPlayers(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
				})
			})
		})
	})
	$("#empty_management_section").click(function (e) {
		e.preventDefault()
		empty_management_section()
	})
	function empty_table_new_section() {
		$("#select_new_choice").selectpicker('val', '')
		$("#select_new_first_point").val(10)
		$("#select_new_second_point").val(10)
		$("#select_new_third_point").val(10)
		$('#table_add_mainTable tbody').empty()		
	}
	function empty_new_section() {
		newOptions = []
		empty_table_new_section()
		$("#select_new_league").selectpicker('val', '')
		$("#select_new_topic").selectpicker('val', '')
		$("#select_new_label").selectpicker('val', '')
		$("#select_new_period").selectpicker('val', '')
		$("#select_new_beginningTime").val('')
		$("#select_new_endingTime").val('')
		$("#select_new_name").val('')
	}
	$("#update_new_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_new_section()
		getAllLeagus(function(err, result) {
			if (err) {
				doneProgressBar()
				return failedOperation()
			}
			getAllTeams(function(err, result) {
				if (err) {
					doneProgressBar()
					return failedOperation()
				}
				getAllPlayers(function(err, result) {
					doneProgressBar()
					if (err)
						return failedOperation()
				})
			})
		})
	})
	$("#empty_new_section").click(function (e) {
		e.preventDefault()
		empty_new_section()
	})
	function empty_table_update_section() {
		$("#select_update_choice").selectpicker('val', '')
		$("#select_update_first_point").val(10)
		$("#select_update_second_point").val(10)
		$("#select_update_third_point").val(10)
		$('#table_update_mainTable tbody').empty()
	}
	function empty_update_section() {
		updateOptions = []
		empty_table_update_section()
		$("#select_update_exact").selectpicker('val', '')
		$("#select_update_league").selectpicker('val', '')
		$("#select_update_topic").selectpicker('val', '')
		$("#select_update_answer").selectpicker('val', '')
		$("#select_update_status").selectpicker('val', '')
		$("#select_update_beginningTime").val('')
		$("#select_update_endingTime").val('')
		$("#select_update_name").val('')
	}
	$("#update_update_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_update_section()
		getAllLeagus(function(err, result) {
			if (err) {
				doneProgressBar()
				return failedOperation()
			}
			getAllTeams(function(err, result) {
				if (err) {
					doneProgressBar()
					return failedOperation()
				}
				getAllPlayers(function(err, result) {
					if (err) {
						doneProgressBar()
						return failedOperation()
					}
					getAllExacts(function(err, result) {
						doneProgressBar()
						if (err)
							return failedOperation()								
					})
				})
			})
		})
	})
	$("#empty_update_section").click(function (e) {
		e.preventDefault()
		empty_update_section()
	})

	// ------------------------------ //
	// 		 	 Table Construction				//
	// ------------------------------ //
	function fixUITable() {
		$('table').css({'table-layout': 'fixed;', 'width': '100%;'})
	}
	function fill_new_answer_table(answerArray) {
		$('#table_add_mainTable tbody').empty()
		for (var i = 0; i < answerArray.length; i++) {
			$('#table_add_mainTable').append('<tr id="tamt_addr' + (i) + '"></tr>')
			$('#tamt_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + answerArray[i].choice + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(answerArray[i].point.first.toString()) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(answerArray[i].point.second.toString()) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(answerArray[i].point.third.toString()) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="newAnswerDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)	
		}
		fixUITable()
	}
	$(document).on("click", ".newAnswerDelete", function (e) {
		e.preventDefault()
		var choice = $(this).parent().siblings().eq(0).html()
		for(var i = 0; i < newOptions.length; i++) {
			if (choice === newOptions[i].choice) {
				newOptions.splice(i, 1)
				break
			}	
		}
		fill_new_answer_table(newOptions)
	})
	function fill_update_answer_table(answerArray) {
		$('#table_update_mainTable tbody').empty()
		for (var i = 0; i < answerArray.length; i++) {
			$('#table_update_mainTable').append('<tr id="tumt_addr' + (i) + '"></tr>')
			$('#tumt_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + answerArray[i].choice + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(answerArray[i].point.first.toString()) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(answerArray[i].point.second.toString()) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(answerArray[i].point.third.toString()) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="updateAnswerDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)	
		}
		fixUITable()
	}
	$(document).on("click", ".updateAnswerDelete", function (e) {
		e.preventDefault()
		var choice = $(this).parent().siblings().eq(0).html()
		for(var i = 0; i < updateOptions.length; i++) {
			if (choice === updateOptions[i].choice) {
				updateOptions.splice(i, 1)
				break
			}	
		}
		fill_update_answer_table(updateOptions)
	})
	function fill_management_table(exactsArray) {
		$('#tab_logic_management tbody').empty()
		for (var i = 0; i < exactsArray.length; i++) {
			var topicName
			if (exactsArray[i].topic === 'TopScorer') topicName = 'آقای گل'
			else if (exactsArray[i].topic === 'Champion') topicName = 'قهرمان'
			else if (exactsArray[i].topic === 'RunnerUp') topicName = 'نائب قهرمان'
			else if (exactsArray[i].topic === 'TopAssist') topicName = 'آقای پاس گل'
			else if (exactsArray[i].topic === 'FirstFiredCoach') topicName = 'اولین مربی اخراجی'
			var labelName
			if (exactsArray[i].label === 'Team') labelName = 'تیم'
			else if (exactsArray[i].label === 'League') labelName = 'لیگ'
			else if (exactsArray[i].label === 'Player') labelName = 'بازیکن'
			else if (exactsArray[i].label === 'Other') labelName = 'دیگر'
			var statusName
			if (exactsArray[i].status === 'Created') statusName = 'ایجاد شده'
			else if (exactsArray[i].status === 'Working') statusName = 'در حال کار'
			else if (exactsArray[i].status === 'Closed') statusName = 'بسته شده'
			else if (exactsArray[i].status === 'Finished') statusName = 'قطعی شده'
			var str1 = (exactsArray[i].answer || 'بدون پاسخ')
			var str2 = topicName + '<br>' + statusName + '<br>' + labelName
			var str3 = ''
			for (var j = 0; j < exactsArray[i].selectors.length; j++) {
				if (exactsArray[i].selectors[j]) {
					str3 += '[' + exactsArray[i].selectors[j].choice + ' - ' + Persian_Number(exactsArray[i].selectors[j].point.first.toString()) + ' امتیاز ' + ' - ' + Persian_Number(exactsArray[i].selectors[j].point.second.toString()) + ' امتیاز ' + ' - ' + Persian_Number(exactsArray[i].selectors[j].point.third.toString()) + ' امتیاز ' + ']'
				}
				str3 += '<br>'
			}
			$('#tab_logic_management').append('<tr id="tlmm_addr' + (i) + '"></tr>')
			$('#tlmm_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + exactsArray[i].id + '<br>' + exactsArray[i].leagueId + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + exactsArray[i].name + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertorJalali(exactsArray[i].beginningTime) + '</br>' + fullDateConvertorJalali(exactsArray[i].endingTime) + '</td>' +
				'<td align="center" style="vertical-align: middle; width: 600px; max-width: 600px; word-wrap:break-word;">' + str3 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + str1 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + str2 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="exactInfo m-l-5 m-r-5 btn bg-amber waves-effect"><i class="material-icons">details</i></button>' +
				'<button type="button" class="exactEdit m-l-5 m-r-5 btn bg-blue waves-effect"><i class="material-icons">mode_edit</i></button>' +
				'<button type="button" class="exactDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		fixUITable()
	}
	$(document).on("click", ".exactInfo", function (e) {
		e.preventDefault()
		var exactSection = $(this).parent().siblings().eq(0).html()
		var parts = exactSection.split("<br>")
		var exactId = parts[0]
		localStorage.setItem('choiceExactId', exactId)
		var result = []
		for (var i = 0; i < choices.length; i++) 
			if (choices[i].exactId === exactId)
				result.push(choices[i])
		fill_moreInfo_table(result)
		$('.nav-tabs a[id="nav5"]').tab('show')
	})
	$(document).on("click", ".exactEdit", function (e) {
		e.preventDefault()
		var exactSection = $(this).parent().siblings().eq(0).html()
		var parts = exactSection.split("<br>")
		var exactId = parts[0]
		localStorage.setItem('editableExactId', exactId)
		$('.nav-tabs a[id="nav4"]').tab('show')
	})
	$(document).on("click", ".exactDelete", function (e) {
		e.preventDefault();
		var exactSection = $(this).parent().siblings().eq(0).html()
		var parts = exactSection.split("<br>")
		var exactId = parts[0]
		ensuranceOperation(function(result) {
			if (result) {
				startProgressBar()
				var exactURL = wrapAccessToken(coreEngine_url + 'exacts/' + exactId, coreAccessToken)
				$.ajax({
					url: exactURL,
					type: "DELETE",
					success: function (exactResult) {
						getAllExacts(function(err) {
							doneProgressBar()
							if (err)
								return failedOperation()
							successfulOperation()
							$(e.target).closest('tr').children('td,th').css('background-color','#FCFCC5')
							doneProgressBar()
						})
					}
				})
			}
		})
	})
	function fill_moreInfo_table(choicesArray) {
		$('#tab_logic_moreInfo tbody').empty()
		for (var i = 0; i < choicesArray.length; i++) {
			var statusColor, statusText
			var st1 = 'بدون وضعیت'
			var st2 = 'بدون وضعیت'
			var st3 = 'بدون وضعیت'
			var ch1 = 'انتخاب نشده'
			var ch2 = 'انتخاب نشده'
			var ch3 = 'انتخاب نشده'
			if (choicesArray[i].status === 'Win') {statusColor = 'bg-green'; statusText = 'برنده'}
			else if (choicesArray[i].status === 'Open') {statusColor = 'bg-light-blue'; statusText = 'باز'}
			else if (choicesArray[i].status === 'Lose') {statusColor = 'bg-red'; statusText = 'بازنده'}
			var checkTime = 'بررسی نشده'
			if (Number(choicesArray[i].checkTime) != 0)
				checkTime = fullDateConvertorJalali(choicesArray[i].checkTime)

			if (choicesArray[i].firstOption.choice) {
				ch1 = choicesArray[i].firstOption.choice
				if (choicesArray[i].firstOption.status === 'Win') {st1 = 'برنده'}
				else if (choicesArray[i].firstOption.status === 'Open') {st1 = 'باز'}
				else if (choicesArray[i].firstOption.status === 'Lose') {st1 = 'بازنده'}
			}
			if (choicesArray[i].secondOption.choice) {
				ch2 = choicesArray[i].secondOption.choice
				if (choicesArray[i].secondOption.status === 'Win') {st2 = 'برنده'}
				else if (choicesArray[i].secondOption.status === 'Open') {st2 = 'باز'}
				else if (choicesArray[i].secondOption.status === 'Lose') {st2 = 'بازنده'}
			}
			if (choicesArray[i].thirdOption.choice) {
				ch3 = choicesArray[i].thirdOption.choice
				if (choicesArray[i].thirdOption.status === 'Win') {st3 = 'برنده'}
				else if (choicesArray[i].thirdOption.status === 'Open') {st3 = 'باز'}
				else if (choicesArray[i].thirdOption.status === 'Lose') {st3 = 'بازنده'}
			}

			$('#tab_logic_moreInfo').append('<tr id="tlmi_addr' + (i) + '"></tr>')
			$('#tlmi_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + choicesArray[i].id + '<br>' + choicesArray[i].clientId + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + ch1 + ' ' + Persian_Number((choicesArray[i].firstOption.point || 0).toString()) + ' امتیاز ' + '<br>' + st1 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + ch2 + ' ' + Persian_Number((choicesArray[i].secondOption.point || 0).toString()) + ' امتیاز ' + '<br>' + st2 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + ch3 + ' ' + Persian_Number((choicesArray[i].thirdOption.point || 0).toString()) + ' امتیاز ' + '<br>' + st3 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertorJalali(choicesArray[i].time) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + checkTime + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;"><span class="label font-13 ' + statusColor + '">' + statusText + '</span></td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="choiceInfo m-l-5 m-r-5 btn bg-amber waves-effect"><i class="material-icons">details</i></button>' +
				'<button type="button" class="choiceDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		fixUITable()
	}
	$(document).on("click", ".choiceInfo", function (e) {
		e.preventDefault()
		var choiceSection = $(this).parent().siblings().eq(0).html()
		var parts = choiceSection.split("<br>")
		var clientId = parts[1]
		startProgressBar()
		var clientURL = wrapAccessToken(coreEngine_url + 'clients/' + clientId, coreAccessToken)
		$.ajax({
			url: clientURL,
			type: "GET",
			success: function (clientResult) {
				$('#defaultModal .modal-content').removeAttr('class').addClass('modal-content');
				fill_moreInfo_leagues_table(clientResult.checkpointModel.leagues)
				fill_moreInfo_referrals_table(clientResult.referralModel.clients)
				$("#myInfoID").val(clientResult.id)
				$("#myInfoTime").val(fullDateConvertorJalali(clientResult.time))
				$("#myInfoUsername").val(clientResult.username)
				$("#myInfoEmail").val(clientResult.email)
				$("#myInfoFullName").val(clientResult.fullname)
				$("#myInfoPhoneNumber").val(clientResult.phoneNumber)
				$("#UserAccountInfoChances").val(clientResult.accountInfoModel.chances)
				$("#UserAccountInfoTotalWins").val(clientResult.accountInfoModel.roundWins)
				$("#UserAccountInfoTotalPoints").val(clientResult.accountInfoModel.totalPoints)
				$("#UserAccountInfoEstimates").val(clientResult.accountInfoModel.totalEstimates)
				$("#UserAccountInfoChoices").val((clientResult.accountInfoModel.totalChoices || 0))
				$("#UserAccountInfoLevelTime").val(fullDateConvertorJalali(clientResult.trophyModel.time))
				$("#UserAccountInfoLevel").val(clientResult.trophyModel.level)
				doneProgressBar()
				tabHandler({ target: { id: 'nav6' } })
				$('.nav-tabs a[id="nav6"]').tab('show')
				$('#defaultModal').modal('show')
			}
		})
	})
	$(document).on("click", ".choiceDelete", function (e) {
		e.preventDefault()
		var choiceSection = $(this).parent().siblings().eq(0).html()
		var parts = choiceSection.split("<br>")
		var choiceId = parts[0]
		ensuranceOperation(function(result) {
			if (result) {
				startProgressBar()
				var choiceURL = wrapAccessToken(coreEngine_url + 'choices/' + choiceId, coreAccessToken)
				$.ajax({
					url: choiceURL,
					type: "DELETE",
					success: function (choiceResult) {
						successfulOperation()
						$(e.target).closest('tr').children('td,th').css('background-color','#FCFCC5')
						doneProgressBar()
					}
				})
			}
		})
	})
	function fill_moreInfo_leagues_table(leaguesObject) {
		$('#UserStatsLeagues tbody').empty()
		for (var i = 0; i < leagues.length; i++) {
			var leagueName = leagues[i].name
			var point = ((Number(leaguesObject[leagues[i].id])) || 0)
			$('#UserStatsLeagues').append('<tr id="usl_addr' + (i) + '"></tr>')
			$('#usl_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + leagues[i].id + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + leagueName + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(point.toString()) + '  امتیاز</td>'
			)
		}
		fixUITable()
	}
	function fill_moreInfo_referrals_table(referralsArray) {
		$('#UserStatsReferrals tbody').empty()
		for (var i = 0; i < referralsArray.length; i++) {
			$('#UserStatsReferrals').append('<tr id="usr_addr' + (i) + '"></tr>')
			$('#usr_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + referralsArray[i] + '</td>'
			)
		}
		fixUITable()
	}

	// ------------------------------ //
	// 		 	Main Button Operation			//
	// ------------------------------ //
	$("#button_moreInfo_search").click(function (e) {
		e.preventDefault()
		startProgressBar()
		var exact
		if ($('#select_moreInfo_exact').val())
			exact = $('#select_moreInfo_exact').val()
		else {
			doneProgressBar()
			return warningOperation()
		}
		getChoicesOfExact(exact, function(err, result) {
			doneProgressBar()
			if (err)
				return failedOperation()
			fill_moreInfo_table(result)
		})
	})

	$("#button_management_search").click(function (e) {
		e.preventDefault()
		startProgressBar()
		var leagues = []
		var topics = []
		var statuses = []
		var labels = []
		var beginningTime, endingTime

		if ($('#select_management_league').val())
			leagues = $('#select_management_league').val()
		if ($('#select_management_topic').val())
			topics = $('#select_management_topic').val()
		if ($('#select_management_status').val())
			statuses = $('#select_management_status').val()
		if ($('#select_management_label').val())
			labels = $('#select_management_label').val()

		if ($('#select_management_beginningTime').val()) {
			beginningTime = timeConvertor($('#select_management_beginningTime').val())
			$('#select_management_beginningTime_jalali').val(fullDateConvertor(beginningTime))
		}
		if ($('#select_management_endingTime').val()) {
			endingTime = timeConvertor($('#select_management_endingTime').val())
			$('#select_management_endingTime_jalali').val(fullDateConvertor(endingTime))
		}

		var filter = {}
		if (leagues.length > 0 || labels.length > 0 || statuses.length > 0 || topics.length > 0 || beginningTime || endingTime) {
			filter.where = {}
			filter.where.and = []
			if (leagues.length > 0)
				filter.where.and.push({
					'leagueId': {
						'inq': leagues
					}
				})
			if (topics.length > 0)
				filter.where.and.push({
					'topic': {
						'inq': topics
					}
				})
			if (statuses.length > 0)
				filter.where.and.push({
					'status': {
						'inq': statuses
					}
				})
			if (labels.length > 0)
				filter.where.and.push({
					'label': {
						'inq': labels
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
		}
		getExactWithQueryFilter(filter, function(err, exactResult) {
			doneProgressBar()
			if (err)
				return failedOperation()
			fill_management_table(exactResult)
		})
	})

	$("#button_new_add_option").click(function (e) {
		e.preventDefault()
		var answer, firstPoint, secondPoint, thirdPoint
		
		if ($('#select_new_choice').val())
			answer = $('#select_new_choice').find(":selected").text()
		if ($('#select_new_first_point').val())
			firstPoint = $('#select_new_first_point').val()
		if ($('#select_new_second_point').val())
			secondPoint = $('#select_new_second_point').val()
		if ($('#select_new_third_point').val())
			thirdPoint = $('#select_new_third_point').val()

		if (!answer || !firstPoint || !secondPoint || !thirdPoint) {
			doneProgressBar()
			return warningOperation()
		}
		var model = {
			'choice': answer,
			'point': {
				first: Number(firstPoint),
				second: Number(secondPoint),
				third: Number(thirdPoint)
			}
		}
		newOptions.push(model)
		empty_table_new_section()
		fill_new_answer_table(newOptions)
	})

	$("#button_new_add").click(function (e) {
		e.preventDefault()
		startProgressBar()
		if (!$('#select_new_name').val() || !$('#select_new_league').val() || !$('#select_new_topic').val() || !$('#select_new_label').val() || newOptions.length <= 0) {
			doneProgressBar()
			return warningOperation()
		}
		var data = {
			leagueId: $('#select_new_league').val(),
			topic: $('#select_new_topic').val(),
			label: $('#select_new_label').val(),
			name: $('#select_new_name').val(),
			selectors: newOptions
		}

		if ($('#select_new_beginningTime').val())
			data.beginningTime = fullTimeConvertor($('#select_new_beginningTime').val())
		else 
			data.beginningTime = (new Date).getTime()

		if ($('#select_new_endingTime').val())
			data.endingTime = fullTimeConvertor($('#select_new_endingTime').val())
		else {
			if ($('#select_new_period').val())
				data.endingTime = data.beginningTime + Number($('#select_new_period').val())
			else {
				doneProgressBar()
				return warningOperation()
			}
		}
		console.log(JSON.stringify(data))
		var exactURL = wrapAccessToken(coreEngine_url + 'exacts', coreAccessToken);
		$.ajax({
			url: exactURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (exactResult) {
				getAllExacts(function(err) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
					empty_new_section()
					newOptions = []
				})
			}
		})
	})

	$("#button_update_add_option").click(function (e) {
		e.preventDefault()
		var answer, firstPoint, secondPoint, thirdPoint
		if ($('#select_update_choice').val())
			answer = $('#select_update_choice').find(":selected").text()
		if ($('#select_update_first_point').val())
			firstPoint = $('#select_update_first_point').val()
		if ($('#select_update_second_point').val())
			secondPoint = $('#select_update_second_point').val()
		if ($('#select_update_third_point').val())
			thirdPoint = $('#select_update_third_point').val()

		if (!answer || !firstPoint || !secondPoint || !thirdPoint) {
			doneProgressBar()
			return warningOperation()
		}
		var model = {
			'choice': answer,
			'point': {
				first: Number(firstPoint),
				second: Number(secondPoint),
				third: Number(thirdPoint)
			}
		}
		updateOptions.push(model)
		empty_table_update_section()
		fill_update_answer_table(updateOptions)
	})
	$("#button_update_upgrade").click(function (e) {
		e.preventDefault()
		startProgressBar()
		var exactId
		if ($('#select_update_exact').val())
			exactId = $('#select_update_exact').val()

		if ($('#select_update_name').val() || !exactId || !$('#select_update_league').val() || !$('#select_update_topic').val() || !$('#select_update_answer').val() ||
			!$('#select_update_status').val() || !$('#select_update_beginningTime').val() || !$('#select_update_endingTime').val() ||
			updateOptions.length <= 0
		) {
			doneProgressBar()
			return warningOperation()
		}
		var data = {
			leagueId: $('#select_update_league').val(),
			name: $('#select_update_name').val(),
			topic: $('#select_update_topic').val(),
			answer: $('#select_update_answer').val(),
			status: $('#select_update_status').val(),
			beginningTime: fullTimeConvertor($('#select_update_beginningTime').val()),
			endingTime: fullTimeConvertor($('#select_update_endingTime').val()),
			selectors: updateOptions
		}
		var exactURL = wrapAccessToken(coreEngine_url + 'exacts/' + exactId, coreAccessToken);
		$.ajax({
			url: exactURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "PUT",
			success: function (exactResult) {
				getAllExacts(function(err) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
					empty_update_section()
					updateOptions = []
				})
			}
		})
	})

})