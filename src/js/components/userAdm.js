import {
	Public,
	moment
} from '../index'

import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'

import '../../style/userAdm.less'

const pub = new Public()
pub.formInit()('inputInit', 'switchInit', 'icheckInit','datepickerInit')

class UserAdm {
	constructor() {

	}
	init() {
		const formInit = () => {

			$('.select2').select2()
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
}
const userAdm = new UserAdm()

userAdm.init()