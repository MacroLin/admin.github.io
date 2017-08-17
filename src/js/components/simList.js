import {Public} from '../index'

import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'

import '../../style/simList.less'
const pub = new Public()
pub.formInit('inputInit', 'switchInit', 'icheckInit','datepickerInit','selectInit')

class SimList{
	init(){
		const tableInit = () => {
			$('#table').DataTable({
				autoWidth: true,
				lengthChange: false,
				info:false
			})
		}
		const formInit = () => {
			$('.select2').select2({
				tags:false
			})
		}
		$(tableInit)
		$(formInit)
	}
	
}
const simList = new SimList()
const run = () => {
	simList.init()
}

run()