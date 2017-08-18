import {
	Public,
	moment
} from '../public'

import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'

import '../../style/userAdm.less'

const pub = new Public()
pub.formInit('inputInit', 'switchInit', 'icheckInit', 'datepickerInit', 'selectInit')

class UserAdm {
	constructor() {

	}
	init() {
		const formInit = () => {


			$('#reservation').daterangepicker()
			$('#reservationtime').daterangepicker({
				timePicker: true,
				timePickerIncrement: 30,
				format: 'MM/DD/YYYY h:mm A'
			})


			$('.my-colorpicker1').colorpicker()
			$('.my-colorpicker2').colorpicker()
			$('.timepicker').timepicker({
				showInputs: false
			})
		}
		const tableInit = () => {
			$('#table.table').DataTable({
				'paging': true,
				'lengthChange': false,
				'searching': true,
				'ordering': false,
				'info': false,
				'autoWidth': true,
				"columnDefs": [{
					"orderable": false,
				}]
			})
		}


		$(formInit)
		$(tableInit)

	}
	checkedDelete() {
		const checkboxs = $('table input[type=checkbox]')
		const deleteBtn = $('.delete-checked')
		const handleDelete = (ev) => {
			pub.alert('success')
			const target =  $(ev.target)
			const checkedArr = []
			checkboxs.each((i, d) => {
				if ($(d).prop('checked')) {
					checkedArr.push(i)
				}
			})
			if (checkedArr.length > 0) {
				$.ajax({
						url: '/checkedDelete',
						type: 'GET',
						dataType: 'json',
						data: {
							"checkedArr": checkedArr
						},
					})
					.done(function() {
						console.log("success");
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					})
			}
		}
		deleteBtn.click(handleDelete)
	}
	checkState() {
		const checkBtn = $('.btn-check')
		const handleCheck = (ev) => {

		}
		checkBtn.click(handleCheck)
	}


}
const userAdm = new UserAdm()

const run = () => {
	userAdm.init()
	userAdm.checkedDelete()
	userAdm.checkState()
}


run()