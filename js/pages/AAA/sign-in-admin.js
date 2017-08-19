var coreEngine_url = "http://185.105.186.68:4000/api/clients/login"

// var coreEngine_url = "http://127.0.0.1:4000/api/clients/login";

$(document).ready(function () {
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

	$("#login_btn").click(function (e) {
		e.preventDefault();
		NProgress.start();
		var data = {
			password: $('#password').val()
		}
		if ($('#username').val().includes('@'))
			data.email = $('#username').val().toLowerCase();
		else
			data.username = $('#username').val().toLowerCase();
		$.ajax({
			url: coreEngine_url,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			type: "POST",
			success: function (coreResult) {
				localStorage.setItem('AdminCompanyName', 'کوپا ۹۰');
				localStorage.setItem('adminEmail', data.email);						
				localStorage.setItem('adminCoreAccessToken', coreResult.id);
				localStorage.setItem('adminId', coreResult.userId);
				NProgress.done();
				window.location.href = '../dashboard/predict.html'
			},
			error: function (xhr, status, error) {
				NProgress.done();
				showNotification('alert-danger', 'مشکلی در ورود شما ایجاد شده است، مجددا تکرار فرمائید', 'top', 'right', 'animated fadeIn', 'animated fadeOut');
			}
		});
	});
});