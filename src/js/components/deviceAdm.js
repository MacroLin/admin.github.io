import {Public} from '../public'
import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'


import '../../style/deviceAdm.less'
const pub = new Public()

pub.formInit('inputInit','switchInit','icheckInit','selectInit')
class DeviceAdm {
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
					"targets": [0, 14],
					"searchable": false
				}]
			})
		}
		$(tableInit)
	}
}

const deviceAdm = new DeviceAdm()

const run = () => {
	deviceAdm.init()
}

run()