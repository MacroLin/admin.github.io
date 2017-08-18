import 'jquery'
import 'jquery-ui'
import 'jquery-knob'
import 'jquery-sparkline'
import 'bootstrap'
import 'icheck'
import 'datatables'
import 'datatables.net-bs'
import 'select2'
import 'bootstrap-add-clear'
import 'bootstrap-datepicker'
import 'bootstrap-daterangepicker'
import 'eonasdan-bootstrap-datetimepicker'
import 'bootstrap-colorpicker'
import 'bootstrap-timepicker'
import 'jquery-slimscroll'
import 'fastclick'
import 'bootstrap-switch'
import '../depend/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'
import '../depend/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'

import Inputmask from 'inputmask'
import moment from 'moment'


import '../depend/adminlte/js/adminlte.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'icheck/skins/flat/blue.css'
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css'
import 'select2/dist/css/select2.min.css'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
import '../depend/bower_components/font-awesome/css/font-awesome.min.css'
import '../depend/bower_components/Ionicons/css/ionicons.min.css'
import '../depend/adminlte/css/AdminLTE.css'
import '../depend/adminlte/css/skins/_all-skins.min.css'


import '../style/public.less'
$.fn.modal.Constructor.prototype.enforceFocus = () => {}


class Public {
	constructor() {

	}
	formInit(...rest) {
		const actions = {
			fileUploadInit: () => {
				const fileUpload = $('.file-upload')
				const percentInput = $('.percent')

				const fileHandlChange = (ev) => {
					const target = $(ev.target)
					const filename = target.val().replace(/[A-Z](.)\\(fakepath)\\/g, '')
					const targetPrev = target.prev('span')
					targetPrev.text(filename)
				}
				const percentHandleChange = (ev) => {
					const target = $(ev.target)
					const value = target.val()
					if (/^[0-9]+(.[0-9]{0,10})?$/.test(value)) {
						target.val(Number(value).toFixed(2) + '%')
					} else {
						target.val('0')
					}

				}
				percentInput.change(percentHandleChange)
				fileUpload.change(fileHandlChange)
			},
			switchInit: () => {
				$(".isDisabled").bootstrapSwitch()
			},
			icheckInit: () => {

				$('.icheck').iCheck({
					checkboxClass: 'icheckbox_flat-blue',
					radioClass: 'iradio_flat-blue'
				})

				$(".checkbox-toggle").click(() => {
					var clicks = $('.checkbox-toggle').data('clicks');
					if (clicks) {
						//Uncheck all checkboxes
						$(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
						$(".fa", '.checkbox-toggle').removeClass("fa-check-square-o").addClass('fa-square-o');
					} else {
						//Check all checkboxes
						$(".mailbox-messages input[type='checkbox']").iCheck("check");
						$(".fa", '.checkbox-toggle').removeClass("fa-square-o").addClass('fa-check-square-o');
					}
					$('.checkbox-toggle').data("clicks", !clicks);
				})

			},
			datepickerInit: () => {
				$('.datepicker').datetimepicker()

			},
			inputInit: () => {
				$("input[type=text]").addClear({
					symbolClass: "fa fa-times-circle"
				})
				const im = new Inputmask({
					'clearMaskOnLostFocus': true
				})
				im.mask($('[data-mask]'))


			},
			selectInit:() => {
				$('.select2').select2()
			}
		}
		if ([...rest].length) {
			for (let i = 0; i < [...rest].length; i++) {
				if ([...rest][i] in actions) {
					actions[[...rest][i]]()
				}
			}
		}
	}
	alert(...rest){
		const actions = {
			success:() => {
				$('.alert-success').text(123).alert()
				console.log()
			}
		}
		if ([...rest].length) {
			for (let i = 0; i < [...rest].length; i++) {
				if ([...rest][i] in actions) {
					actions[[...rest][i]]()
				}
			}
		}
	}
}


export {
	Public,
	moment,
}