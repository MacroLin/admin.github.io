import {Public,moment} from '../index'

import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'

import '../../style/userAdm.less'

const pub = new Public()
pub.formInit()('inputInit','switchInit','icheckInit')

class UserAdm {
	constructor() {

	}
	init() {

		$(() => {

			$('.select2').select2()
			$('#reservation').daterangepicker()
			$('#reservationtime').daterangepicker({
					timePicker: true,
					timePickerIncrement: 30,
					format: 'MM/DD/YYYY h:mm A'
				})
			$('#daterange-btn').daterangepicker({
						ranges: {
							'Today': [moment(), moment()],
							'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
							'Last 7 Days': [moment().subtract(6, 'days'), moment()],
							'Last 30 Days': [moment().subtract(29, 'days'), moment()],
							'This Month': [moment().startOf('month'), moment().endOf('month')],
							'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
						},
						startDate: moment().subtract(29, 'days'),
						endDate: moment()
					},
					(start, end) => {
						$('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
					}
				)

			$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
					checkboxClass: 'icheckbox_minimal-blue',
					radioClass: 'iradio_minimal-blue'
				})
			$('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
					checkboxClass: 'icheckbox_minimal-red',
					radioClass: 'iradio_minimal-red'
				})
			$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
					checkboxClass: 'icheckbox_flat-green',
					radioClass: 'iradio_flat-green'
				})
			$('.my-colorpicker1').colorpicker()
			$('.my-colorpicker2').colorpicker()
			$('.timepicker').timepicker({
				showInputs: false
			})
		})
		$(() => {
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
		})

	}
}
const userAdm = new UserAdm()

userAdm.init()