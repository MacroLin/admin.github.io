import {Public} from '../index'

import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'

import '../../style/simList.less'
const pub = new Public()
pub.formInit('inputInit', 'switchInit', 'icheckInit','datepickerInit')

class SimList{
	init(){
		const tableInit = () => {
			$('#table').DataTable({
				'autoWidth': true
			})
		}
		$(tableInit)
	}
	
}

const run = () => {
	SimList.init()
}

run()