import {
	Public
} from '../public'

import '../../depend/bower_components/bideo.js/bideo.js'
import '../../depend/bower_components/bideo.js/main.js'
import '../../style/main.less'
class Main {
	constructor() {

	}
	init() {
		$(() => {
			/* jQueryKnob */
			$('.knob').knob();

			// jvectormap data
			var visitorsData = {
				US: 398, // USA
				SA: 400, // Saudi Arabia
				CA: 1000, // Canada
				DE: 500, // Germany
				FR: 760, // France
				CN: 300, // China
				AU: 700, // Australia
				BR: 600, // Brazil
				IN: 800, // India
				GB: 320, // Great Britain
				RU: 3000 // Russia
			};
			// World map by jvectormap
			$('#world-map').vectorMap({
				map: 'world_mill_en',
				backgroundColor: 'transparent',
				regionStyle: {
					initial: {
						fill: '#e4e4e4',
						'fill-opacity': 1,
						stroke: 'none',
						'stroke-width': 0,
						'stroke-opacity': 1
					}
				},
				series: {
					regions: [{
						values: visitorsData,
						scale: ['#92c1dc', '#ebf4f9'],
						normalizeFunction: 'polynomial'
					}]
				},
				onRegionLabelShow: function(e, el, code) {
					if (typeof visitorsData[code] != 'undefined')
						el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
				}
			});

			// Sparkline charts
			var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
			$('#sparkline-1').sparkline(myvalues, {
				type: 'line',
				lineColor: '#92c1dc',
				fillColor: '#ebf4f9',
				height: '50',
				width: '80'
			});
			myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
			$('#sparkline-2').sparkline(myvalues, {
				type: 'line',
				lineColor: '#92c1dc',
				fillColor: '#ebf4f9',
				height: '50',
				width: '80'
			});
			myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
			$('#sparkline-3').sparkline(myvalues, {
				type: 'line',
				lineColor: '#92c1dc',
				fillColor: '#ebf4f9',
				height: '50',
				width: '80'
			});

			// SLIMSCROLL FOR CHAT WIDGET
			$('#chat-box').slimScroll({
				height: '250px'
			});



			// Fix for charts under tabs
			$('.box ul.nav a').on('shown.bs.tab', function() {
				area.redraw();
				donut.redraw();
				line.redraw();
			});

			/* The todo list plugin */

		})
	}

}

const main = new Main()

const run = () => {
	main.init()
}

run()