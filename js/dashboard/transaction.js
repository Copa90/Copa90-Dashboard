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

// var coreEngine_url 	= "http://66.70.216.149:4000/api/"
// var zarinPal_url 		= "http://66.70.216.149:4010/api/"
// var coreURL 				= 'http://6ghadam.com/'

var coreEngine_url 	= "https://core-6ghadam.herokuapp.com/api/"
var zarinPal_url 		= "https://core-6ghadam.herokuapp.com/api/"
var coreURL 				= 'https://6Ghadam.com/'

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

	var packages = []
	var clients = []
	var leagues = []
	var transactions = []
	
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
		var no = select.replace("nav", "")
		for (var i = 1; i < 7; i++) {
			if (Number(no) >= 3 && i < 3)
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
		$('select').selectpicker({
			dropupAuto: false
		});
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
	// 		 	 	Graph Controller				//
	// ------------------------------ //
	function fill_graph(packagesArray, transactionsArray) {
		if (packagesArray.length == 0)
			return
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
		for (var i = 0; i < packagesArray.length; i++) {
			colorArray.push(getRandomColor())
			yLable.push(packagesArray[i].name)
		}
		for (var i = 0; i < 31; i++) {
			var model = {}
			model.ruz = Persian_Number((i).toString()) + ' روز قبل '
			for (var j = 0; j < packagesArray.length; j++) {
				var counter = 0
				for (var k = 0; k < transactionsArray.length; k++) {
					if (transactionsArray[k].packageId.toString() === packagesArray[j].id.toString())
						if (((Number(transactionsArray[k].time)) <= (now - (i * 24 * 60 * 60 * 1000))) && ((Number(transactionsArray[k].time)) >= (now - ((i + 1) * 24 * 60 * 60 * 1000))))
						counter++
				}
				model[packagesArray[j].name] = counter
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
	function fill_package_selectors(packagesArray) {
		$('#select_management_package_selector').find('option').remove()
		for (var i = 0; i < packagesArray.length; i++) {
			var itemToPush = {
				id: packagesArray[i].id,
				name: packagesArray[i].name
			}
			$('#select_management_package_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}))
		}
		$('#select_management_package_selector').selectpicker('refresh')
	}
	function fill_client_selectors(clientsArray) {
		$('#select_management_client_selector').find('option').remove()
		for (var i = 0; i < clientsArray.length; i++) {
			var itemToPush = {
				id: clientsArray[i].id,
				name: clientsArray[i].fullname
			}
			$('#select_management_client_selector').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}))
		}
		$('#select_management_client_selector').selectpicker('refresh')
	}

	// ------------------------------ //
	// 					Data Fetch						//
	// ------------------------------ //
	function getAllClients(callback) {
		var filter = {
			skip: '6'
		}
		var clientURLWithAT = wrapAccessToken(coreEngine_url + 'clients', coreAccessToken)
		var clientURL = wrapFilter(clientURLWithAT, JSON.stringify(filter))
		$.ajax({
			url: clientURL,
			type: "GET",
			success: function (clientResult) {
				clients = clientResult
				fill_client_selectors(clients)
				callback(null, clients)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getAllPackages(callback) {
		var filter = {

		}
		var packagesURLWithAT = wrapAccessToken(coreEngine_url + 'packages', coreAccessToken)
		var packageURL = wrapFilter(packagesURLWithAT, JSON.stringify(filter))
		$.ajax({
			url: packageURL,
			type: "GET",
			success: function (packageResult) {
				packages = packageResult
				fill_package_selectors(packages)
				callback(null, packages)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getAllTransactions(callback) {
		var filter = {

		}
		var transactionURLWithAT = wrapAccessToken(coreEngine_url + 'transactions', coreAccessToken)
		var transactionURL = wrapFilter(transactionURLWithAT, JSON.stringify(filter))
		$.ajax({
			url: transactionURL,
			type: "GET",
			success: function (transactionResult) {
				transactions = transactionResult
				callback(null, transactions)
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
				callback(null, leagues)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getTransactionWithQueryFilter(queryFilter, callback) {
		var transactionURLwithAT = wrapAccessToken(coreEngine_url + 'transactions', coreAccessToken)
		var transactionURL = wrapFilter(transactionURLwithAT, JSON.stringify(queryFilter))
		$.ajax({
			url: transactionURL,
			type: "GET",
			success: function (transactionResult) {
				callback(null, transactionResult)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	function getAllInfo(callback) {
		getAllPackages(function(err, package) {
			if (err)
				return callback(err)
			getAllClients(function(err, client) {
				if (err)
					return callback(err)
				getAllTransactions(function(err, transaction) {
					if (err)
						return callback(err)
					getAllLeagus(function(err, league) {
						if (err)
							return callback(err)
						fill_graph(packages, transactions)
						$("#adminUsername").html(localStorage.getItem('AdminCompanyName'))
						$("#adminEmail").html(localStorage.getItem('adminEmail'))
						return callback(null, client, package)								
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
		getAllPackages(function (err, packageList) {
			if (err) {
				doneProgressBar()
				return failedOperation()
			}
			getAllTransactions(function(err, transactionList) {
				doneProgressBar()
				if (err)
					return failedOperation()
				fill_graph(packageList, transactionList)
			})
		})
	})
	function empty_management_section() {
		$('#tab_logic_management tbody').empty()
		$("#select_management_package_selector").selectpicker('val', '')
		$("#select_management_client_selector").selectpicker('val', '')
		$("#select_management_min_price").selectpicker(1000)
		$("#select_management_max_price").selectpicker(100000)
		$("#select_management_beginningTime").val('')
		$("#select_management_endingTime").val('')
	}
	$("#update_management_section").click(function (e) {
		e.preventDefault()
		startProgressBar()
		empty_management_section()
		getAllClients(function(err, result) {
			if (err) {
				doneProgressBar()
				return failedOperation()
			}
			getAllPackages(function(err, result) {
				doneProgressBar()
				if (err)
					return failedOperation()
			})
		})
	})
	$("#empty_management_section").click(function (e) {
		e.preventDefault()
		empty_management_section()
	})

	// ------------------------------ //
	// 		 	 Table Construction				//
	// ------------------------------ //
	function fixUITable() {
		$('table').css({'table-layout': 'fixed;', 'width': '100%;'})
	}
	function fill_management_table(transactionsArray) {
		$('#tab_logic_management tbody').empty()
		for (var i = 0; i < transactionsArray.length; i++) {
			var statusName
			if (transactionsArray[i].status === 'Failed') statusName = 'ناموفق'
			else if (transactionsArray[i].status === 'Successful') statusName = 'موفقیت‌آمیز'
			var str1 = 'کد اول: ' + Persian_Number(transactionsArray[i].receiptInfo.Status.toString()) + '<br>' + 'کد دوم: ' + Persian_Number(transactionsArray[i].receiptInfo.VerificationStatus.toString())
			$('#tab_logic_management').append('<tr id="tlmm_addr' + (i) + '"></tr>')
			$('#tlmm_addr' + i).html(
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + transactionsArray[i].id + '<br>' + transactionsArray[i].clientId + '<br>' + transactionsArray[i].packageId + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + fullDateConvertorJalali(Number(transactionsArray[i].time)) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(transactionsArray[i].price.toString()) + ' تومان</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + statusName + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + transactionsArray[i].receiptInfo.id.toString() + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + Persian_Number(transactionsArray[i].receiptInfo.RefID.toString()) + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 5%;">' + str1 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="transactionInfo m-l-5 m-r-5 btn bg-amber waves-effect"><i class="material-icons">details</i></button>' +
				'<button type="button" class="transactionDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		fixUITable()
	}
	$(document).on("click", ".transactionInfo", function (e) {
		e.preventDefault()
		var idSection = $(this).parent().siblings().eq(0).html()
		var parts = idSection.split("<br>")
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
				tabHandler({ target: { id: 'nav3' } })
				$('.nav-tabs a[id="nav3"]').tab('show')
				$('#defaultModal').modal('show')
			}
		})
	})
	$(document).on("click", ".transactionDelete", function (e) {
		e.preventDefault();
		var idSection = $(this).parent().siblings().eq(0).html()
		var parts = idSection.split("<br>")
		var transactionId = parts[0]
		ensuranceOperation(function(result) {
			if (result) {
				startProgressBar()
				var transactionURL = wrapAccessToken(coreEngine_url + 'transactions/' + transactionId, coreAccessToken)
				$.ajax({
					url: transactionURL,
					type: "DELETE",
					success: function (transactionResult) {
						getAllTransactions(function(err) {
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
	$("#button_management_search").click(function (e) {
		e.preventDefault()
		startProgressBar()
		var packages = []
		var clients = []
		var minPrice
		var maxPrice
		var beginningTime, endingTime

		if ($('#select_management_package_selector').val())
			packages = $('#select_management_package_selector').val()
		if ($('#select_management_client_selector').val())
			clients = $('#select_management_client_selector').val()

		if ($('#select_management_min_price').val())
			minPrice = $('#select_management_min_price').val()
		if ($('#select_management_max_price').val())
			maxPrice = $('#select_management_max_price').val()

		if ($('#select_management_beginningTime').val()) {
			beginningTime = timeConvertor($('#select_management_beginningTime').val())
			$('#select_management_beginningTime_jalali').val(fullDateConvertor(beginningTime))
		}
		if ($('#select_management_endingTime').val()) {
			endingTime = timeConvertor($('#select_management_endingTime').val())
			$('#select_management_endingTime_jalali').val(fullDateConvertor(endingTime))
		}

		var filter = {}
		if (packages.length > 0 || clients.length > 0 || minPrice || maxPrice || beginningTime || endingTime) {
			filter.where = {}
			filter.where.and = []
			if (packages.length > 0)
				filter.where.and.push({
					'packageId': {
						'inq': packages
					}
				})
			if (clients.length > 0)
				filter.where.and.push({
					'clientId': {
						'inq': clients
					}
				})
			if (minPrice)
				filter.where.and.push({
					'price': {
						'gte': minPrice
					}
				})
			if (maxPrice)
				filter.where.and.push({
					'price': {
						'lte': maxPrice
					}
				})
			if (beginningTime)
				filter.where.and.push({
					'time': {
						'gte': beginningTime
					}
				})
			if (endingTime)
				filter.where.and.push({
					'time': {
						'lte': endingTime
					}
				})
		}
		getTransactionWithQueryFilter(filter, function(err, transactionResult) {
			doneProgressBar()
			if (err)
				return failedOperation()
			fill_management_table(transactionResult)
		})
	})

})