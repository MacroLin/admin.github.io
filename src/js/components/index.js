import {Public} from '../public'
import '../../style/index.less'

class Index {
	constructor() {
		this.state = {
			count: 2,
			activeIndexs: [],
			iframeHeight: 0
		}
	}
	init() {
		const iframeInit = () => {
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
		}
		const tabInir = () => {
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
		$(iframeInit)
		$(tabInir)

	}

}

const index = new Index()
index.init()