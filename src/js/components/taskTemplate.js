import {Public} from '../index'

import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'
import '../../style/taskTemplate.less'

const pub = new Public()

pub.formInit('inputInit','switchInit','datepickerInit','fileUploadInit','icheckInit','selectInit')

class TaskTemplate {
	constructor() {

	}
	init() {
		const tableInit = () => {
			$('#table').DataTable({
				'paging': true,
				'lengthChange': false,
				'searching': true,
				'ordering': false,
				'info': false,
				'autoWidth': true,
				"columnDefs": [{
					"orderable": false,
					"targets": [0, 7]
				}]
			})
		}
		$(tableInit)

	}
}
const taskTemplate = new TaskTemplate()

const run = () => {
	taskTemplate.init()
}

run()