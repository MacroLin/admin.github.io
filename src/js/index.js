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

import '../depend/bower_components/font-awesome/css/font-awesome.min.css'
import '../depend/bower_components/Ionicons/css/ionicons.min.css'
import '../depend/adminlte/css/AdminLTE.css'
import '../depend/adminlte/css/skins/_all-skins.min.css'


import '../style/index.less'
class Public {
	constructor() {

	}
	formInit() {
		return (...rest) => {
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
				switchInit:()=>{
					$(".isDisabled").bootstrapSwitch()
				},
				icheckInit: () => {
					//Enable iCheck plugin for checkboxes
					//iCheck for checkbox and radio inputs
					$('input[type="checkbox"]').iCheck({
						checkboxClass: 'icheckbox_flat-blue',
						radioClass: 'iradio_flat-blue'
					});
					//Enable check and uncheck all functionality
					$(".checkbox-toggle").click(() => {
						var clicks = $(this).data('clicks');
						if (clicks) {
							//Uncheck all checkboxes
							$(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
							$(".fa", '.checkbox-toggle').removeClass("fa-check-square-o").addClass('fa-square-o');
						} else {
							//Check all checkboxes
							$(".mailbox-messages input[type='checkbox']").iCheck("check");
							$(".fa", '.checkbox-toggle').removeClass("fa-square-o").addClass('fa-check-square-o');
						}
						$(this).data("clicks", !clicks);
					});
					
				},
				datepickerInit:()=>{
					$('.datepicker').datetimepicker({
						autoclose: true
					})

				},
				inputInit:()=>{
					$("input[type=text]").addClear({
						symbolClass: "fa fa-times-circle"
					})
					const im = new Inputmask({'clearMaskOnLostFocus': true})
					im.mask($('[data-mask]'))
				}
			}
			if ([...rest].length){
				for(let i =0;i<[...rest].length;i++){
					if([...rest][i] in actions){
						actions[[...rest][i]]()
					}
				}
			}
		}
	}
}

class Index {
	constructor() {
		this.state = {
			count: 2,
			activeIndexs: [],
			iframeHeight: 0
		}
	}
	init() {

		$(() => {
			let iframe = $('.iframe')
			const header = $('.main-header')
			const footer = $('.main-footer')
			const nav = $('.nav.menu')

			let navHeight = nav.height()
			let headerHeight = header.height()
			let footerHeight = footer.height() || parseInt(footer.css('padding'))
			let disHeight = navHeight + headerHeight + footerHeight + 65
			let windowHeight = window.innerHeight


			iframe.css('height', windowHeight - disHeight)
			window.addEventListener('resize', () => {
				let iframe = $('.iframe')
				navHeight = nav.height()
				headerHeight = header.height()
				footerHeight = footer.height() || parseInt(footer.css('padding'))
				windowHeight = window.innerHeight
				const windowWidth = window.innerWidth
				disHeight = navHeight + headerHeight + footerHeight + 65
				iframe.css('height', windowHeight - disHeight)
				this.state.iframeHeight = windowHeight - disHeight
			}, false)
			this.state.iframeHeight = windowHeight - disHeight
		})

	}
	tabFn() {
		const openBtns = $('.treeview-menu a')
		const openBtn = $('.permissions a')
		const navTabsList = $('.nav-tabs .nav-tabs.menu')
		const navContent = $('.nav-tabs .tab-content')

		const tabInit = () => {
			const navTabs = navTabsList.find('li')
			const navPanes = navContent.find('.tab-pane')
			navTabs.removeClass('active')
			navPanes.removeClass('active')
		}
		const closeTab = (ev) => {
			ev.stopPropagation()
			const {
				activeIndexs
			} = this.state
			const target = $(ev.target)
			const navTabs = navTabsList.find('li')
			const navPanes = navContent.find('.tab-pane')
			const index = target.attr('data-index')
			const parentNode = target.parents('li')

			const newActiveIndexs = activeIndexs.filter((d, i) => {
				if (d == index) {
					$(navTabs[i + 1]).remove()
					$(navPanes[i + 1]).remove()
					if (parentNode.hasClass('active')) {
						$(navTabs[activeIndexs.length - 1]).addClass('active')
						$(navPanes[activeIndexs.length - 1]).addClass('active')
					}
				}

				return d !== index
			})

			this.state.activeIndexs = newActiveIndexs
		}
		const openTab = (ev) => {
			ev.stopPropagation()
			const target = $(ev.target)
			let index = target.attr('data-index')
			let url = target.attr('data-url')
			const value = target.text()
			if (target.prop('tagName') != 'A') {
				url = target.parent().attr('data-url')
				index = target.parent().attr('data-index')
				target.attr('data-index', index)

			}

			const hasNotIndex = this.state.activeIndexs.filter((d) => {
				return d === index
			})

			tabInit()
			if (!hasNotIndex.length) {
				const navTabTemplate = `<li class="active"><a href="#tab_${this.state.count}" data-toggle="tab">${value}<i data-index="${index}" class="fa fa-times"></i></a></li>`
				const tabContentTemplate = `<div class="tab-pane active" id="tab_${this.state.count}"><iframe height="${this.state.iframeHeight}" class="iframe" src="${url}" frameborder="0"></iframe></div>`

				navTabsList.append(navTabTemplate)
				navContent.append(tabContentTemplate)
				this.state.count++
					this.state.activeIndexs.push(index)

				const navTabs = navTabsList.find('li')
				const navPanes = navContent.find('.tab-pane')
				let activeIndex
				this.state.activeIndexs.forEach((d, i) => {
					if (d == index) {
						activeIndex = i
					}
				})

				const closeBtns = $(navTabs.find('i')[activeIndex])
				closeBtns.click(closeTab)

			} else {
				const navTabs = navTabsList.find('li')
				const navPanes = navContent.find('.tab-pane')

				let activeIndex
				this.state.activeIndexs.forEach((d, i) => {
					if (d == index) {
						activeIndex = i
					}
				})

				$(navTabs[activeIndex + 1]).addClass('active')
				$(navPanes[activeIndex + 1]).addClass('active')
			}
		}


		openBtns.click(openTab)
		openBtn.click(openTab)
	}
}







const index = new Index()
index.init()
index.tabFn()
export {
	Public,
	moment
}