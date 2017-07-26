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

var coreEngine_url = "http://127.0.0.1:4000/api/"

$(document).ready(function () {
	var predicts = []
	var estimates = []
	var leagues = []

	var adminId, coreAccessToken
	if (localStorage.getItem('adminId'))
		adminId = localStorage.getItem('adminId')
	else
		return window.location.href = '../AAA/sign-in-admin.html'

	if (localStorage.getItem('adminCoreAccessToken'))
		coreAccessToken = localStorage.getItem('adminCoreAccessToken')
	else
		return window.location.href = '../AAA/sign-in-admin.html'

	function tabHandler(e) {
		if ($(e.target).attr('id') === 'nav1') {
			$("#PredictStatisticsTab").show()
			$("#PredictManagementTab").hide()
			$("#PredictNewTab").hide()
			$("#PredictUpdateTab").hide()
			$("#PredictCollecyionTab").hide()
			$("#PredictExtraInfoTab").hide()
		}
		else if ($(e.target).attr('id') === 'nav2') {
			$("#PredictStatisticsTab").hide()
			$("#PredictManagementTab").show()
			$("#PredictNewTab").hide()
			$("#PredictUpdateTab").hide()
			$("#PredictCollecyionTab").hide()
			$("#PredictExtraInfoTab").hide()
		}
		else if ($(e.target).attr('id') === 'nav3') {
			$("#PredictStatisticsTab").hide()
			$("#PredictManagementTab").hide()
			$("#PredictNewTab").show()
			$("#PredictUpdateTab").hide()
			$("#PredictCollecyionTab").hide()
			$("#PredictExtraInfoTab").hide()
		}
		else if ($(e.target).attr('id') === 'nav4') {
			if (localStorage.getItem('editablePredictId')) {
				var predictId = localStorage.getItem('editablePredictId')
				fill_section_update(predictId)
				localStorage.removeItem('editablePredictId')
			}
			$("#PredictStatisticsTab").hide()
			$("#PredictManagementTab").hide()
			$("#PredictNewTab").hide()
			$("#PredictUpdateTab").show()
			$("#PredictCollecyionTab").hide()
			$("#PredictExtraInfoTab").hide()
		}
		else if ($(e.target).attr('id') === 'nav5') {
			$("#PredictStatisticsTab").hide()
			$("#PredictManagementTab").hide()
			$("#PredictNewTab").hide()
			$("#PredictUpdateTab").hide()
			$("#PredictCollecyionTab").show()
			$("#PredictExtraInfoTab").hide()
		}
		else if ($(e.target).attr('id') === 'nav6') {
			$("#PredictStatisticsTab").hide()
			$("#PredictManagementTab").hide()
			$("#PredictNewTab").hide()
			$("#PredictUpdateTab").hide()
			$("#PredictCollecyionTab").hide()
			$("#PredictExtraInfoTab").show()
		}
		else if ($(e.target).attr('id') === 'nav7') {
			$("#generalInfo").show()
			$("#accountInfo").hide()
			$("#sequencerInfo").hide()
		}
		else if ($(e.target).attr('id') === 'nav8') {
			$("#generalInfo").hide()
			$("#accountInfo").show()
			$("#sequencerInfo").hide()
		}
		else if ($(e.target).attr('id') === 'nav9') {
			$("#generalInfo").hide()
			$("#accountInfo").hide()
			$("#sequencerInfo").show()
		}
	}

	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		tabHandler(e)
	})

	$("#PredictStatisticsTab").show()
	$("#PredictManagementTab").hide()
	$("#PredictNewTab").hide()
	$("#PredictUpdateTab").hide()
	$("#PredictCollecyionTab").hide()
	$("#PredictExtraInfoTab").hide()
	
	initDateTimePicker()
	initJQueryTable()
	getAllInfo()

	function initDateTimePicker() {
		//Textare auto growth
		autosize($('textarea.auto-growth'))
		//Datetimepicker plugin
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

    Dropzone.options.dp1 = {
        paramName: "file",
        maxFilesize: 1
		}
    Dropzone.options.dp2 = {
        paramName: "file",
        maxFilesize: 1
		}
	}

	function initJQueryTable() {
		//Exportable table
		$('.js-exportable').DataTable({
			dom: 'Bfrtip',
			buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			]
		})

		$('.js-basic-example').DataTable(
			{"searching": false,
				"ordering": false,
				"pageLength": 4,
				"iDisplayLength": 4,
				"lengthChange": false
			}
		)
	}

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

	$("#signOutButton").click(function (e) {
		e.preventDefault()
		localStorage.clear()
		return window.location.href = '../AAA/sign-in-admin.html'
	})

	$("#update_statistics_section").click(function (e) {
		e.preventDefault()
		getAllInfo()
	})
	$("#update_moreInfo_section").click(function (e) {
		e.preventDefault()
		getAllPredicts()
	})
	$("#update_management_section").click(function (e) {
		e.preventDefault()
		getAllLeagus()
		getAllPredicts()
	})
	$("#update_new_section").click(function (e) {
		e.preventDefault()
		getAllLeagus()
	})
	$("#update_update_section").click(function (e) {
		e.preventDefault()
		getAllLeagus()
		getAllPredicts()		
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

	function ExcelToJSON(file, cb) {
		this.parseExcel = function(file) {
			var reader = new FileReader()
			reader.onload = function(e) {
				var data = e.target.result()
				var workbook = XLSX.read(data, {type : 'binary'})
				var array = []
				workbook.SheetNames.forEach(function(sheetName){
					var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
					var json_object = JSON.stringify(XL_row_object)
					array.push(json_object)
				})
				return cb(null, array)
			}

			reader.onerror = function(ex){
				console.log(ex)
				return cb(ex, null)
			}

			reader.readAsBinaryString(file)
		}
	}

	fileManager()

	function fileManager() {
		function handleDragOver(evt) {
			evt.stopPropagation()
			evt.preventDefault()
			evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		}

		// Setup the dnd listeners.
		var dropZone1 = document.getElementById('new_predict_collection_send');
		dropZone1.addEventListener('dragover', handleDragOver, false);

		var dropZone2 = document.getElementById('edit_predict_collection');
		dropZone2.addEventListener('dragover', handleDragOver, false);
	}

	$("#edit_predict_collection_send").click(function (e) {
		e.preventDefault()
		function handleFileSelect(evt) {
			evt.stopPropagation()
			evt.preventDefault()
			var files = evt.dataTransfer.files; // FileList object.
			var file = files[0]
			ExcelToJSON(file, function(err, result) {
				if (err)
					return console.error(err)
				//
			})
		}
		handleFileSelect()
	})

	$("#new_predict_collection_send").click(function (e) {
		e.preventDefault()
		function handleFileSelect(evt) {
			evt.stopPropagation()
			evt.preventDefault()
			var files = evt.dataTransfer.files; // FileList object.
			var file = files[0]
			ExcelToJSON(file, function(err, result) {
				if (err)
					return console.error(err)
				//
			})
		}
		handleFileSelect()
	})

	$("#get_predict_collection").click(function (e) {
		e.preventDefault()
		// write an XLSX file            
		var xlsxWriter = new SimpleExcel.Writer.XLSX();
		var xlsxSheet = new SimpleExcel.Sheet();
		var Cell = SimpleExcel.Cell;
		xlsxSheet.setRecord([
				[new Cell('ID', 'TEXT'), new Cell('Nama', 'TEXT'), new Cell('Kode Wilayah', 'TEXT')],
				[new Cell(1, 'NUMBER'), new Cell('Kab. Bogor', 'TEXT'), new Cell(1, 'NUMBER')],
				[new Cell(2, 'NUMBER'), new Cell('Kab. Cianjur', 'TEXT'), new Cell(1, 'NUMBER')],
				[new Cell(3, 'NUMBER'), new Cell('Kab. Sukabumi', 'TEXT'), new Cell(1, 'NUMBER')],
				[new Cell(4, 'NUMBER'), new Cell('Kab. Tasikmalaya', 'TEXT'), new Cell(2, 'NUMBER')]
		]);
		xlsxWriter.insertSheet(xlsxSheet);
		// export when button clicked
		document.getElementById('get_predict_collection').addEventListener('click', function () {            
				xlsxWriter.saveFile(); // pop! ("Save As" dialog appears)
		});
	})

})