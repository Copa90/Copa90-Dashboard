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
	showNotification('bg-cyan', 'عملیات درخواست شده شما با موفقیت انجام شد', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function failedOperation() {
	showNotification('bg-deep-orange', 'مشکلی پیش آمد، لطفا مجددا تلاش کنید', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function failedOperationByString(sentence) {
	showNotification('bg-deep-orange', sentence, 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function warningOperation() {
	showNotification('bg-orange', 'شما باید همه ی فیلد های مربوطه و ضروری را پر کنید', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
}

function authenticationRequiredOperation() {
	showNotification('bg-deep-orange', 'عذرخواهی میکنیم! نیاز است که مجددا وارد شوید', 'top', 'center', 'animated fadeIn', 'animated fadeOut')
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
		closeOnConfirm: true,
		closeOnCancel: true
	}, function (isConfirm) {
		if (isConfirm) {
			callback(1)
		} else {
			callback(0)
		}
	})
}

function countryCodeToLeagueId(code) {
	if 			(code == "GB") 		return '5992c2021098a97b42e3bf5b'
	else if (code == "IT") 		return '5992c1f71098a97b42e3bf5a'
	else if (code == "FR") 		return '5992c20b1098a97b42e3bf5c'
	else if (code == "ES") 		return '5992c2141098a97b42e3bf5d'
	else if (code == "DE") 		return '5992c21a1098a97b42e3bf5e'
	else if (code == "IR") 		return '5992c2351098a97b42e3bf5f'
	else if (code == "CLE") 	return '5992c23e1098a97b42e3bf60'
	else if (code == "ELE") 	return '5992c2461098a97b42e3bf61'
	else if (code == "NAT") 	return '59afb306012e5b0e7a1c3295'
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

	var predicts = []
	var estimates = []
	var leagues = []

	var dataFileObject

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
	initDropzone()

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
			if (localStorage.getItem('editablePredictId')) {
				var predictId = localStorage.getItem('editablePredictId')
				fill_section_update(predictId)
				localStorage.removeItem('editablePredictId')
			}
		}
		else if (select === 'nav6') {
			if (localStorage.getItem('estimatePredictId')) {
				var predictId = localStorage.getItem('estimatePredictId')
				fill_section_estimate(predictId)
				localStorage.removeItem('estimatePredictId')
			}
		}
		var no = select.replace("nav", "")
		for (var i = 1; i < 11; i++) {
			if (Number(no) >= 7 && i < 7)
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
	function initDropzone() {
    Dropzone.options.dp1 = {
			paramName: "file",
			addRemoveLinks: true,
			maxFiles:1,
			maxFilesize: 1,
			acceptedFiles: ".xlsx",
			accept: function(file, done) {
				startProgressBar()
				var reader = new FileReader()
				reader.addEventListener("loadend", function(event) {
					var data = event.target.result;
					var jsonData = convertXLSXtoJSON(data)
					console.log(jsonData)
					dataFileObject = jsonData	
					doneProgressBar()
				})
				reader.onerror = function(ex){
					console.log(ex)
					doneProgressBar()
				}	
				reader.readAsBinaryString(file)
			},
			init: function() {
				this.on("maxfilesexceeded", function(file) {
					this.removeAllFiles()
					this.addFile(file)
				})
				this.on('addedfile', function(file) {
					if (this.files.length > 1) {
						this.removeFile(this.files[0])
					}
				})
				this.listeners[0].element.removeEventListener('drop', this.listeners[0].events.drop)
				this.listeners[0].element.removeEventListener('dragstart', this.listeners[0].events.dragstart)
				this.listeners[0].element.removeEventListener('dragenter', this.listeners[0].events.dragenter)
				this.listeners[0].element.removeEventListener('dragover', this.listeners[0].events.dragover)
				this.listeners[0].element.removeEventListener('dragleave', this.listeners[0].events.dragleave)
				this.listeners[0].element.removeEventListener('dragend', this.listeners[0].events.dragend)
			}   
		}
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
	$('#select_update_predict').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selected = $(this).find('option').eq(clickedIndex).val()
		fill_section_update(selected)
	})
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
				$("#select_update_tag").selectpicker('val', model.tag)
				$("#select_update_beginningTime").val(fullDateConvertor(model.beginningTime))
				$("#select_update_endingTime").val(fullDateConvertor(model.endingTime))
				break
			}
		}
	}
	function fill_section_estimate(predictId) {
		$("#select_moreInfo_predict").selectpicker('val', predictId)
	}

	// ------------------------------ //
	// 		 	 	Graph Controller				//
	// ------------------------------ //
	function fill_graph(leaguesArray, estimatesArray) {
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
				for (var k = 0; k < estimatesArray.length; k++) {
					if (estimatesArray[k].leagueName === leaguesArray[j].name)
						if ((Number(estimatesArray[k].time) <= (now - (i * 24 * 60 * 60 * 1000))) && (Number(estimatesArray[k].time) >= (now - ((i + 1) * 24 * 60 * 60 * 1000))))
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

	// ------------------------------ //
	// 					Data Fetch						//
	// ------------------------------ //
	function getAllPredicts(callback) {
		var predictURLWithAT = wrapAccessToken(coreEngine_url + 'predicts', coreAccessToken)
		$.ajax({
			url: predictURLWithAT,
			type: "GET",
			success: function (predictResult) {
				predicts = predictResult
				fill_predict_selectors(predicts)
				callback(null, predicts)
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

	function getAllEstiamtes(callback) {
		var estimateURLWithAT = wrapAccessToken(coreEngine_url + 'estimates', coreAccessToken)
		$.ajax({
			url: estimateURLWithAT,
			type: "GET",
			success: function (estimateResult) {
				estimates = estimateResult
				callback(null, estimates)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getEstimatesOfPredict(predictId, callback) {
		var estimateOfPredictURLWithAT = wrapAccessToken(coreEngine_url + 'estimates?filter={"where":{"predictId":"' + predictId + '"}}', coreAccessToken)
		$.ajax({
			url: estimateOfPredictURLWithAT,
			type: "GET",
			success: function (estimateResult) {
				estimates = estimateResult
				callback(null, estimates)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getPredictsWithQueryFilter(queryFilter, callback) {
		var predictURLwithAT = wrapAccessToken(coreEngine_url + 'predicts', coreAccessToken)
		var predictURL = wrapFilter(predictURLwithAT, JSON.stringify(queryFilter))
		$.ajax({
			url: predictURL,
			type: "GET",
			success: function (predictResult) {
				callback(null, predictResult)
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
			getAllPredicts(function(err, predict) {
				if (err)
					return callback(err)
				getAllEstiamtes(function(err, estimate) {
					if (err)
						return callback(err)
					fill_graph(league, estimates)
					$("#adminUsername").html(localStorage.getItem('AdminCompanyName'))
					$("#adminEmail").html(localStorage.getItem('adminEmail'))
					return callback(null, league, predict, estimate)
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
			getAllEstiamtes(function(err, estimateList) {
				doneProgressBar()
				if (err)
					return failedOperation()
				fill_graph(leagueList, estimateList)
			})
		})
	})
	function empty_moreInfo_section() {
		$("#select_moreInfo_predict").selectpicker('val', '')
		$('#tab_logic_moreInfo tbody').empty()
	}
	$("#update_moreInfo_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_moreInfo_section()
		getAllPredicts(function(err, result) {
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
		$("#select_management_occuerence").selectpicker('val', '')
		$("#select_management_status").selectpicker('val', '')
		$("#select_management_tag").selectpicker('val', '')
		$("#select_management_min_possibility").val(1)
		$("#select_management_max_possibility").val(999)
		$("#select_management_min_week").val(1)
		$("#select_management_max_week").val(999)
		$("#select_management_min_point").val(1)
		$("#select_management_max_point").val(999)
		$("#select_management_beginningTime").val('')
		$("#select_management_endingTime").val('')
		$("#select_management_beginningTime_jalali").val('')
		$("#select_management_endingTime_jalali").val('')
	}
	$("#update_management_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_management_section()
		getAllLeagus(function(err, result) {
			doneProgressBar()
			if (err)
				return failedOperation()
		})
	})
	$("#empty_management_section").click(function (e) {
		e.preventDefault()
		empty_management_section()
	})
	function empty_new_section() {
		$("#select_new_league").selectpicker('val', '')
		$("#select_new_explanation").val('')
		$("#select_new_tag").selectpicker('val', 'Live')
		$("#select_new_period").selectpicker('val', '')
		$("#select_new_beginningTime").val('')
		$("#select_new_endingTime").val('')
		$("#select_new_week").val(10)
		$("#select_new_possiblity").val(10)
		$("#select_new_points").val(10)
	}
	function clear_new_section() {
		$("#select_new_explanation").val('')
		$("#select_new_period").selectpicker('val', '')
		$("#select_new_beginningTime").val('')
		$("#select_new_possiblity").val(10)
		$("#select_new_points").val(10)		
	}
	$("#update_new_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_new_section()
		getAllLeagus(function(err, result) {
			doneProgressBar()
			if (err)
				return failedOperation()
		})
	})
	$("#empty_new_section").click(function (e) {
		e.preventDefault()
		empty_new_section()
	})
	function empty_update_section() {
		$("#select_update_predict").selectpicker('val', '')
		$("#select_update_points").val(10)
		$("#select_update_week").val(10)
		$("#select_update_possibility").val(10)
		$("#select_update_explanation").val('')
		$("#select_update_league").selectpicker('val', '')
		$("#select_update_occuerence").selectpicker('val', '')
		$("#select_update_status").selectpicker('val', '')
		$("#select_update_tag").selectpicker('val', '')
		$("#select_update_beginningTime").val('')
		$("#select_update_endingTime").val('')
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
			getAllPredicts(function(err, result) {
				doneProgressBar()
				if (err)
					return failedOperation()
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
	function fill_management_table(predictsArray) {
		$('#tab_logic_management tbody').empty()
		for (var i = 0; i < predictsArray.length; i++) {
			var tagName
			var disableText = ''
			if (predictsArray[i].tag === 'Live') tagName = 'زنده'
			else if (predictsArray[i].tag === 'Season') tagName = 'فصلی'
			else if (predictsArray[i].tag === 'Week') tagName = 'هفتگی'
			else if (predictsArray[i].tag === 'Mock') {tagName = 'پوشش زنده'; disableText = 'disabled'}
			var occurrenceName
			if (predictsArray[i].occurrence == 0) {occurrenceName = 'باز';}
			else if (predictsArray[i].occurrence == 1) {occurrenceName = 'برد'; disableText = 'disabled'}
			else if (predictsArray[i].occurrence == 2) {occurrenceName = 'باخت'; disableText = 'disabled'}
			var statusName
			if (predictsArray[i].status === 'Created') {statusName = 'ایجاد شده'; disableText = 'disabled'}
			else if (predictsArray[i].status === 'Working') statusName = 'در حال کار'
			else if (predictsArray[i].status === 'Closed') statusName = 'بسته شده'
			else if (predictsArray[i].status === 'Finished') {statusName = 'قطعی شده'; disableText = 'disabled'}
			var str1 = ' احتمال: ' + Persian_Number(predictsArray[i].possibility.toString()) + '<br>' + ' امتیاز: ' + Persian_Number(predictsArray[i].point.toString()) + '<br>' + ' هفته: ' + Persian_Number(predictsArray[i].weekNumber.toString())
			var str2 = tagName + '<br>' + statusName + '<br>' + occurrenceName
			$('#tab_logic_management').append('<tr id="tlmm_addr' + (i) + '"></tr>')
			$('#tlmm_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + predictsArray[i].id + '<br>' + predictsArray[i].leagueId + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertorJalali(predictsArray[i].beginningTime) + '</br>' + fullDateConvertorJalali(predictsArray[i].endingTime) + '</td>' +
				'<td align="center" style="vertical-align: middle; width: 300px; max-width: 300px; word-wrap:break-word;">' + predictsArray[i].explanation + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + str1 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + str2 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button ' + disableText + ' style="padding-right: 0px;padding-left: 0px;padding-top: 0px;padding-bottom: 0px;" type="button" class="predictWin m-l-5 m-r-5 btn bg-green btn btn-circle waves-effect waves-circle waves-float"">برد</button>' +
				'<button ' + disableText + ' style="padding-right: 0px;padding-left: 0px;padding-top: 0px;padding-bottom: 0px;" type="button" class="predictLose m-l-5 m-r-5 bg-deep-orange btn btn-circle waves-effect waves-circle waves-float">باخت</button>' +
				'</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="predictInfo m-l-5 m-r-5 btn bg-amber waves-effect"><i class="material-icons">details</i></button>' +
				'<button type="button" class="predictEdit m-l-5 m-r-5 btn bg-blue waves-effect"><i class="material-icons">mode_edit</i></button>' +
				'<button type="button" class="predictDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		fixUITable()
	}
	function finalizePredict(predictId, occurrence, callback) {
		ensuranceOperation(function(result) {
			if (result) {
				startProgressBar()
				var predictURL = wrapAccessToken(coreEngine_url + 'predicts/finalizePredict/' + predictId + '?occurrence=' + occurrence, coreAccessToken);
				$.ajax({
					url: predictURL,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					type: "POST",
					success: function (predictResult) {
						successfulOperation()
						doneProgressBar()
						callback(1)
					}
				})
			}
			else
				callback(0)
		})
	}
	$(document).on("click", ".predictWin", function (e) {
		e.preventDefault()
		var firstKey = this
		var secondKey = $(this).siblings().eq(0)
		var predictSection = $(this).parent().siblings().eq(0).html()
		var parts = predictSection.split("<br>")
		var predictId = parts[0]
		finalizePredict(predictId, 1, function(result) {
			if (result) {
				$(firstKey).prop('disabled', true)
				$(secondKey).prop('disabled', true)
				$(e.target).closest('tr').children('td,th').css('background-color','#C5FCD1')
			}
		})
	})
	$(document).on("click", ".predictLose", function (e) {
		e.preventDefault()
		var firstKey = this
		var secondKey = $(this).siblings().eq(0)
		var predictSection = $(this).parent().siblings().eq(0).html()
		var parts = predictSection.split("<br>")
		var predictId = parts[0]
		finalizePredict(predictId, 2, function(result) {
			$(firstKey).prop('disabled', true)
			$(secondKey).prop('disabled', true)				
			$(e.target).closest('tr').children('td,th').css('background-color','#FACFD2')			
		})
	})
	$(document).on("click", ".predictInfo", function (e) {
		e.preventDefault()
		var predictSection = $(this).parent().siblings().eq(0).html()
		var parts = predictSection.split("<br>")
		var predictId = parts[0]
		localStorage.setItem('estimatePredictId', predictId)
		var result = []
		for (var i = 0; i < estimates.length; i++) 
			if (estimates[i].predictId === predictId)
				result.push(estimates[i])
		fill_moreInfo_table(result)
		$('.nav-tabs a[id="nav6"]').tab('show')
	})
	$(document).on("click", ".predictEdit", function (e) {
		e.preventDefault()
		var predictSection = $(this).parent().siblings().eq(0).html()
		var parts = predictSection.split("<br>")
		var predictId = parts[0]
		localStorage.setItem('editablePredictId', predictId)
		$('.nav-tabs a[id="nav4"]').tab('show')
	})
	$(document).on("click", ".predictDelete", function (e) {
		e.preventDefault();
		var predictSection = $(this).parent().siblings().eq(0).html()
		var parts = predictSection.split("<br>")
		var predictId = parts[0]
		ensuranceOperation(function(result) {
			if (result) {
				startProgressBar()
				var predictURL = wrapAccessToken(coreEngine_url + 'predicts/' + predictId, coreAccessToken)
				$.ajax({
					url: predictURL,
					type: "DELETE",
					success: function (predictResult) {
						getAllPredicts(function(err) {
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
	function fill_moreInfo_table(estimatesArray) {
		$('#tab_logic_moreInfo tbody').empty()
		for (var i = 0; i < estimatesArray.length; i++) {
			var statusColor, statusText
			if (estimatesArray[i].status === 'Win') {statusColor = 'bg-green'; statusText = 'برنده'}
			else if (estimatesArray[i].status === 'Open') {statusColor = 'bg-light-blue'; statusText = 'باز'}
			else if (estimatesArray[i].status === 'Lose') {statusColor = 'bg-red'; statusText = 'بازنده'}
			var checkTime = 'بررسی نشده'
			if (Number(estimatesArray[i].checkTime) != 0)
				checkTime = fullDateConvertorJalali(estimatesArray[i].checkTime)
			$('#tab_logic_moreInfo').append('<tr id="tlmi_addr' + (i) + '"></tr>')
			$('#tlmi_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + estimatesArray[i].id + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + estimatesArray[i].clientId + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertorJalali(estimatesArray[i].time) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + checkTime + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;"><span class="label font-13 ' + statusColor + '">' + statusText + '</span></td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="estimateInfo m-l-5 m-r-5 btn bg-amber waves-effect"><i class="material-icons">details</i></button>' +
				'<button type="button" class="estimateDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		fixUITable()
	}
	$(document).on("click", ".estimateInfo", function (e) {
		e.preventDefault()
		var clientId = $(this).parent().siblings().eq(1).text()
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
				if (clientResult.accountInfoModel.lastLogin)
					$("#UserAccountInfoLastLogin").val(fullDateConvertorJalali(clientResult.accountInfoModel.lastLogin))
				else
					$("#UserAccountInfoLastLogin").val('ثبت نشده')
				$("#UserAccountInfoChances").val(clientResult.accountInfoModel.chances)
				$("#UserAccountInfoTotalWins").val(clientResult.accountInfoModel.roundWins)
				$("#UserAccountInfoTotalPoints").val(clientResult.accountInfoModel.totalPoints)
				$("#UserAccountInfoEstimates").val(clientResult.accountInfoModel.totalEstimates)
				$("#UserAccountInfoChoices").val((clientResult.accountInfoModel.totalChoices || 0))
				$("#UserAccountInfoLevelTime").val(fullDateConvertorJalali(clientResult.trophyModel.time))
				$("#UserAccountInfoLevel").val(clientResult.trophyModel.level)
				doneProgressBar()
				tabHandler({ target: { id: 'nav7' } })
				$('.nav-tabs a[id="nav7"]').tab('show')
				$('#defaultModal').modal('show')
			}
		})
	})
	$(document).on("click", ".estimateDelete", function (e) {
		e.preventDefault()
		var estimateId = $(this).parent().siblings().eq(0).text()
		ensuranceOperation(function(result) {
			if (result) {
				startProgressBar()
				var estimateURL = wrapAccessToken(coreEngine_url + 'estimates/' + estimateId, coreAccessToken)
				$.ajax({
					url: estimateURL,
					type: "DELETE",
					success: function (estimateResult) {
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
		var predict
		if ($('#select_moreInfo_predict').val())
			predict = $('#select_moreInfo_predict').val()
		else {
			doneProgressBar()
			return warningOperation()
		}
		getEstimatesOfPredict(predict, function(err, result) {
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

		if ($('#select_management_beginningTime').val()) {
			beginningTime = timeConvertor($('#select_management_beginningTime').val())
			$('#select_management_beginningTime_jalali').val(fullDateConvertor(beginningTime))
		}
		if ($('#select_management_endingTime').val()) {
			endingTime = timeConvertor($('#select_management_endingTime').val())
			$('#select_management_endingTime_jalali').val(fullDateConvertor(endingTime))
		}

		var filter = {}
		if (leagues.length > 0 || occurrences.length > 0 || statuses.length > 0 || tags.length > 0 || beginningTime || endingTime || minPoint || maxPoint || minPossibilty || maxPossibility || minWeek || maxWeek) {
			filter.where = {}
			filter.where.and = []
			if (leagues.length > 0)
				filter.where.and.push({
					'leagueId': {
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
					'tag': {
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
		getPredictsWithQueryFilter(filter, function(err, predictResult) {
			doneProgressBar()
			if (err)
				return failedOperation()
			fill_management_table(predictResult)
		})
	})

	$("#button_new_add").click(function (e) {
		e.preventDefault()
		startProgressBar()
		if (!$('#select_new_league').val() || !$('#select_new_week').val() || !$('#select_new_possiblity').val() || !$('#select_new_points').val() || !$('#select_new_explanation').val() || !$('#select_new_tag').val()) {
			doneProgressBar()
			return warningOperation()
		}
		var data = {
			leagueId: $('#select_new_league').val(),
			explanation: $('#select_new_explanation').val(),
			tag: $('#select_new_tag').val(),
			weekNumber: Number($('#select_new_week').val()),
			possibility: Number($('#select_new_possiblity').val()),
			point: Number($('#select_new_points').val())
		}
		if (data.tag === 'Live') {
			if (!$('#select_new_period').val()) {
				doneProgressBar()
				return warningOperation()
			}
			else {
				data.beginningTime = (new Date).getTime()
				data.endingTime = data.beginningTime + Number($('#select_new_period').val())
			}
		}
		else {
			if ($('#select_new_beginningTime').val()) 
				data.beginningTime = fullTimeConvertor($('#select_new_beginningTime').val())
			else 
				data.beginningTime = (new Date).getTime()

			if (!$('#select_new_endingTime').val()) {
				doneProgressBar()
				return warningOperation()
			}
			else {
				data.endingTime = fullTimeConvertor($('#select_new_endingTime').val())
			}
		}
		if (data.tag === 'Mock') {
			data.weekNumber = 1
			data.possibility = 1
			data.point = 1
		}
		console.log(JSON.stringify(data))
		var predictURL = wrapAccessToken(coreEngine_url + 'predicts', coreAccessToken);
		$.ajax({
			url: predictURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (predictResult) {
				getAllPredicts(function(err) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
					clear_new_section()
				})
			}
		})
	})

	$("#button_update_upgrade").click(function (e) {
		e.preventDefault()
		startProgressBar()
		var predictId
		if ($('#select_update_predict').val())
			predictId = $('#select_update_predict').val()
		if (!predictId || !$('#select_update_league').val() || !$('#select_update_explanation').val() || !$('#select_update_occuerence').val() ||
			!$('#select_update_status').val() || !$('#select_update_tag').val() || !$('#select_update_beginningTime').val() || !$('#select_update_endingTime').val() ||
			!$('#select_update_week').val() || !$('#select_update_possibility').val() || !$('#select_update_points').val()
		) {
			doneProgressBar()
			return warningOperation()
		}
		var data = {
			leagueId: $('#select_update_league').val(),
			explanation: $('#select_update_explanation').val(),
			occurrence: $('#select_update_occuerence').val(),
			status: $('#select_update_status').val(),
			tag: $('#select_update_tag').val(),
			beginningTime: fullTimeConvertor($('#select_update_beginningTime').val()),
			endingTime: fullTimeConvertor($('#select_update_endingTime').val()),
			weekNumber: Number($('#select_update_week').val()),
			possibility: Number($('#select_update_possibility').val()),
			point: Number($('#select_update_points').val())
		}
		if (data.tag === 'Mock') {
			data.weekNumber = 1
			data.possibility = 1
			data.point = 1
			data.occurrence = 0			
		}

		var predictURL = wrapAccessToken(coreEngine_url + 'predicts/' + predictId, coreAccessToken);
		$.ajax({
			url: predictURL,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "PUT",
			success: function (predictResult) {
				getAllPredicts(function(err) {
					doneProgressBar()
					if (err)
						return failedOperation()
					successfulOperation()
					empty_update_section()
				})
			}
		})
	})

	$("#new_predict_collection_send").click(function (e) {
		e.preventDefault()
		startProgressBar()
		if (!dataFileObject) {
			doneProgressBar()
			return warningOperation()
		}
		var dataArray = []
		var currentTime = (new Date).getTime()
		for (var i = 0; i < dataFileObject.length; i++) {
			var model = dataFileObject[i]
			if (!model["League Country Code"] || !model["Point"] || !model["Possiblity"] || !model["Week"] || !model["Explanation"] || !model["EndingTime"] || !model["Tags"]) {
				doneProgressBar()
				dataFileObject = null
				return failedOperationByString('[Stop Uploading] Error in Model: ' + JSON.stringify(model))
			}
			if (model["BeginningTime"])
				currentTime = (Number(model["BeginningTime"]) * 1000)
			data = {
				"explanation": model["Explanation"],
				"weekNumber": Number(model["Week"]),
				"possibility": Number(model["Possiblity"]),
				"point": Number(model["Point"]),
				"beginningTime": currentTime,
				"endingTime": (Number(model["EndingTime"]) * 1000),
				"status": "Created",
				"tag": model["Tags"],
				"occurrence": 0,
				"leagueId": countryCodeToLeagueId(model["League Country Code"])
			}
			dataArray.push(data)
		}
		var predictURL = wrapAccessToken(coreEngine_url + 'predicts', coreAccessToken);
		$.ajax({
			url: predictURL,
			data: JSON.stringify(dataArray),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (predictResult) {
				getAllPredicts(function(err) {
					doneProgressBar()
					dataFileObject = null					
					if (err)
						return failedOperation()
					successfulOperation()
				})
			}
		})
	})

	function convertXLSXtoJSON(data) {
		var workbook = XLSX.read(data, {type : 'binary'})
		var array = []
		workbook.SheetNames.forEach(function(sheetName){
			var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
			for (var i = 0; i < XL_row_object.length; i++)
				array.push(XL_row_object[i])
		})
		return array
	}

})