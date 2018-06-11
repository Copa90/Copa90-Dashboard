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

function wrapWhere(url, filter) {
	if (url.indexOf('?') !== -1)
		return url + '&where=' + filter
	else
		return url + '?where=' + filter
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

// var coreEngine_url 	= "http://66.70.216.149:4000/api/"
// var zarinPal_url 		= "http://66.70.216.149:4010/api/"
// var coreURL 				= 'http://6Ghadam.com/'

var coreEngine_url 	= "https://core-6ghadam.herokuapp.com/api/"
var zarinPal_url 		= "https://core-6ghadam.herokuapp.com/api/"
var coreURL 				= 'https://6Ghadam.com'

$(document).ready(function () {

	var now = (new Date).getTime()
	var lastWeek = now - (7 * 24 * 60 * 60 * 100)
	var lastMonth = now - (30 * 24 * 60 * 60 * 100)

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

	var leagues = []
	var teams = []
	var clients = []
	var packages = []

	var transactions = []
	var choices = []
	var estimates = []
	
	var adminId, coreAccessToken
	if (localStorage.getItem('adminId'))
		adminId = localStorage.getItem('adminId')
	else
		return window.location.href = '../AAA/sign-in-admin.html'

	if (localStorage.getItem('adminCoreAccessToken'))
		coreAccessToken = localStorage.getItem('adminCoreAccessToken')
	else
		return window.location.href = '../AAA/sign-in-admin.html'

	startLoading()
	getAllInfo(function(err) {
		doneProgressBar()
		doneLoading()
		if (err)
			return window.location.href = '../AAA/sign-in-admin.html'
	})

	// ------------------------------ //
	// 		 	 			Utility							//
	// ------------------------------ //
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
	// fix
	function fill_graph_estimate(estimatesArray) {
		$('#bar_chart_estimate').empty()
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
		for (var i = 0; i < estimatesArray.length; i++) {
			colorArray.push(getRandomColor())
			var leagueName = ''
			for (var j = 0; j < leagues.length; j++)
				if (leagues[i].id.toString() === estimatesArray[i].leagueId.toString())
					leagueName = leagues[i].name
			yLable.push(leagueName)
			var model = {}
			model[leagueName] = estimatesArray[i].count
			model.league = leagueName
			dataArray.push(model)
		}
		console.log(dataArray)
		Morris.Bar({
			element: 'bar_chart_estimate',
			data: dataArray,
			parseTime: false,
			xkey: 'league',
			ykeys: yLable,
			labels: yLable,
			barColors: colorArray
		})
	}

	console.log('----')

	getAllLeagues(function(err, league) {
		if (err)
			return console.error(err)
		getAllEstimatesOfLeagues(leagues, function(err, estimate) {
			if (err)
				return console.error(err)
			fill_graph_estimate(estimates)
		})
	})

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
				callback(null, packages)
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
				leagues = leagueResult
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

	function getAllTransactionsOfPackages(packagesArray, callback) {
		var counter = 0
		for (var i = 0; i < packagesArray.length; i++) {
			var node = packagesArray[i]
			var urlWithAT = wrapAccessToken(coreEngine_url + 'packages/' + node.id.toString() + '/transactions/count', coreAccessToken)
			$.ajax({
				url: urlWithAT,
				type: "GET",
				success: function (result) {
					counter++
					var model = {
						packageId : node.id.toString(),
						count: Number(result.count)
					}
					transactions.push(model)
					if (counter == packagesArray.length) {
						callback(null, transactions)						
					}
				},
				error: function (xhr, status, error) {
					callback(error)
					console.log(xhr.responseText)
				}
			})				
		}
	}

	function getAllEstimatesOfLeagues(leaguesArray, callback) {
		var counter = 0
		for (var i = 0; i < leaguesArray.length; i++) {
			var node = leaguesArray[i]
			var urlWithAT = wrapAccessToken(coreEngine_url + 'leagues/' + node.id.toString() + '/estimates/count', coreAccessToken)
			$.ajax({
				url: urlWithAT,
				type: "GET",
				success: function (result) {
					counter++
					var model = {
						leagueId : node.id.toString(),
						count: Number(result.count)
					}
					estimates.push(model)
					if (counter == leaguesArray.length) {
						callback(null, estimates)						
					}
				},
				error: function (xhr, status, error) {
					callback(error)
					console.log(xhr.responseText)
				}
			})				
		}
	}

	function getAllChoicesOfLeagues(leaguesArray, callback) {
		var counter = 0
		for (var i = 0; i < leaguesArray.length; i++) {
			var node = leaguesArray[i]
			var urlWithAT = wrapAccessToken(coreEngine_url + 'leagues/' + node.id.toString() + '/choices/count', coreAccessToken)
			$.ajax({
				url: urlWithAT,
				type: "GET",
				success: function (result) {
					counter++
					var model = {
						leagueId : node.id.toString(),
						count: Number(result.count)
					}
					choices.push(model)
					if (counter == leaguesArray.length) {
						callback(null, choices)						
					}
				},
				error: function (xhr, status, error) {
					callback(error)
					console.log(xhr.responseText)
				}
			})				
		}
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
	// 			  Statistics Graph				//
	// ------------------------------ //
	function get_estimates_data(callback) {

	}
	function get_choice_data(callback) {
		
	}
	function get_transaction_data(callback) {
		
	}
	function get_income_data(callback) {
		
	}
	function get_team_data(callback) {
		
	}

	// ------------------------------ //
	// 				 Widget Line 1					//
	// ------------------------------ //
	function duplicate_get_all_package_purchase_count(callback) {

	}
	function use_get_sum_clients_points(callback) {

	}
	function duplicate_get_all_purchase_count(callback) {

	}
	function duplicate_get_sum_purchase_income(callback) {
		
	}

	// ------------------------------ //
	// 				 Widget Line 2					//
	// ------------------------------ //
	function duplicate_get_all_estimate_count(callback) {

	}
	function duplicate_get_all_choice_count(callback) {
		
	}
	function use_get_all_win_count(callback) {

	}
	function get_all_champions_count(callback) {
		var filter = {
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'champions/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	// ------------------------------ //
	// 		 Packages & Transactions		//
	// ------------------------------ //
	function get_week_package_purchase_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastWeek}},
				{time: {'lte': now}},
				{status: 'Successful'}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'transactions/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_week_purchase_income(callback) {
		var filter = {
			and: [
				{time: {'gte': lastWeek}},
				{time: {'lte': now}},
				{status: 'Successful'}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'transactions', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_month_package_purchase_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastMonth}},
				{time: {'lte': now}},
				{status: 'Successful'}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'transactions/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_month_purchase_income(callback) {
		var filter = {
			and: [
				{time: {'gte': lastMonth}},
				{time: {'lte': now}},
				{status: 'Successful'}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'transactions', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_total_package_purchase_count(callback) {
		var filter = {
			and: [
				{status: 'Successful'}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'transactions/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_total_purchase_income(callback) {
		var filter = {
			and: [
				{status: 'Successful'}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'transactions', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}

	// ------------------------------ //
	// 			Estimates & Choices				//
	// ------------------------------ //
	function get_week_estimate_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastWeek}},
				{time: {'lte': now}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'estimates/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_week_choice_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastWeek}},
				{time: {'lte': now}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'choices/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_month_estimate_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastMonth}},
				{time: {'lte': now}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'estimates/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_month_choice_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastMonth}},
				{time: {'lte': now}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'choices/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_total_estimate_count(callback) {
		var filter = {
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'choices/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_total_choice_count(callback) {
		var filter = {
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'choices/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})		
	}

	// ------------------------------ //
	// 				Clients & Logins				//
	// ------------------------------ //
	function get_week_register_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastWeek}},
				{time: {'lte': now}},
				{'phoneNumber': {'neq': '09120001122'}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'clients/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_week_login_count(callback) {
		var filter = {
			and: [
				{'accountInfoModel.lastLogin': {'gte': lastWeek}},
				{'accountInfoModel.lastLogin': {'lte': now}},
				{'phoneNumber': {'neq': '09120001122'}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'clients/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})		
	}
	function get_month_register_count(callback) {
		var filter = {
			and: [
				{time: {'gte': lastMonth}},
				{time: {'lte': now}},
				{'phoneNumber': {'neq': '09120001122'}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'clients/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_month_login_count(callback) {
		var filter = {
			and: [
				{'accountInfoModel.lastLogin': {'gte': lastMonth}},
				{'accountInfoModel.lastLogin': {'lte': now}},
				{'phoneNumber': {'neq': '09120001122'}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'clients/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})		
	}
	function get_total_register_count(callback) {
		var filter = {
			'phoneNumber': {'neq': '09120001122'}
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'clients/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
		})
	}
	function get_total_login_count(callback) {
		var filter = {
			and: [
				{'accountInfoModel.lastLogin': {'neq': '0'}},
				{'phoneNumber': {'neq': '09120001122'}}
			]
		}
		var URLWithAT = wrapAccessToken(coreEngine_url + 'clients/count', coreAccessToken)
		var aURL = wrapWhere(URLWithAT, JSON.stringify(filter))
		$.ajax({
			url: aURL,
			type: "GET",
			success: function (result) {
				// set
				callback(null, result)
			},
			error: function (xhr, status, error) {
				callback(error)
				console.log(xhr.responseText)
			}
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

})