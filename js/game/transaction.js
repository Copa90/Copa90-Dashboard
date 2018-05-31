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
		timer: 3500,
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

var coreEngine_url = "http://66.70.216.149:4000/api/"
var zarinPal_url = "http://66.70.216.149:4010/api/"
var coreURL = 'http://6ghadam.com/'

// var coreEngine_url = "http://127.0.0.1:4000/api/"
// var zarinPal_url = "http://127.0.0.1:4010/api/"
// var coreURL = 'http://6Ghadam.com/'

$(document).ready(function () {

	startLoading()

	function startLoading() {
		$('.page-loader-wrapper').fadeIn()
		$('#rainbow-progress-bar1').fadeIn()
	}
	function doneLoading() {
		$('.page-loader-wrapper').fadeOut()
		$('#rainbow-progress-bar1').fadeOut()
	}

	var price = getUrlVars()["price"]
	var userId = getUrlVars()["userId"]
	var coreAccessToken = getUrlVars()["userCoreAccessToken"]
	var description = JSON.parse(getUrlVars()["description"])
	var refNumber = localStorage.getItem('REFNUM')
	if (!userId || !coreAccessToken || !amount || !refNumber) {
		failedOperation()
		doneLoading()
	}
	else {
		var verificationURLWithAT = wrapAccessToken(coreEngine_url + 'WebServiceSoap/verifyPayment', coreAccessToken)
		var data = {
			Price: price
			RefNum: refNumber
		}
		console.log(JSON.stringify(data))
		var str = 'شماره پکیج: ' + description.packageId
		$.ajax({
			url: verificationURLWithAT,
			dataType: "json",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (verificationResult) {
				console.log(JSON.stringify(verificationResult))
				successfulOperation()
				doneLoading()
				fill_table_transaction((Number(verificationResult.VerifyPaymentResult.PayementedPrice) / 10), str, verificationResult.VerifyPaymentResult.ResultStatus, refNumber)
			},
			error: function (xhr, status, error) {
				doneLoading()
				failedOperation()
				console.log(JSON.stringify(xhr))
				console.error(xhr.responseText)
			}
		})
	}

	// ------------------------------ //
	// 			 		Transaction						//
	// ------------------------------ //
	$(document).on("click", "#transaction_result_button", function (e) {
		e.preventDefault()
		console.log('not prepared yet')
	})
	$(document).on("click", "#transaction_return_button", function (e) {
		e.preventDefault()
		window.location.href = './index.html'
	})

	function fill_table_transaction(price, desc, status, refId) {
		$('#transaction_price').html(price)
		$('#transaction_status').html(status)
		$('#transaction_description').html(desc)
		$('#transaction_refId').html(refId)
		fixUITable()
	}
	function emoty_all_tables() {
		$('#transaction_price').html('خطا در پرداخت: معتبر نیست')
		$('#transaction_status').html('خطا در پرداخت: معتبر نیست')
		$('#transaction_description').html('خطا در پرداخت: معتبر نیست')
		$('#transaction_refId').html('خطا در پرداخت: معتبر نیست')
	}
	function fixUITable() {
		$('table').css({'table-layout': 'fixed;', 'width': '100%;'})
	}

})