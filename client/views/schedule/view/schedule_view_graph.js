/**
 * This render the graph's bots activity to the template
 * @return {Graph rendered} -
 */
 Template.schedule_view_graph.rendered = function(){
		// Data and options for charts
		/**
		 * The object barOptions holds the internal configurations for the graph. Here you can change the series, lines, axis , color[add a new color per each data], grid.
		 * @type {Object}
		 */
		 var barOptions = {
			series: {
				lines: {
					show: true,
					lineWidth: 5,
					fill: true,
					fillColor: {
						colors: [{
							opacity: 0.0
						}, {
							opacity: 0.0
						}]
					}
				},

			},
			xaxis: {
				tickDecimals: 0
			},
			colors: ["#1ab394","red", "orange"],
			grid: {
				color: "#999999",
				hoverable: true,
				clickable: true,
				tickColor: "#D4D4D4",
				borderWidth:0
			},
			legend: {
				show: true
			},
			tooltip: true,
			tooltipOpts: {
				content: "Bot Cuantity: %y, Hours: %x"
			}
		 };
		/**
		 * This the static data passed to draw the graph.
		 * This data will be fetched from mongodb database.
		 * @type {Object}
		 */
		 var barData = {
			label: "Succeeded",
			data: [
			[0,10],
			[1, 34],
			[2, 25],
			[3, 19],
			[4, 34],
			[5, 32],
			[6, 44],
			[7, 34],
			[8, 25],
			[9, 19],
			[10, 34],
			[11, 32],
			[12, 44],
			[13, 34],
			[14, 25],
			[15, 19],
			[16, 34],
			[17, 32],
			[18, 44],
			[19, 34],
			[20, 25],
			[21, 19],
			[22, 34],
			[23, 100],
			]
		 };
		 var barDataTwo = {
			label: "Failed",
			data: [
			[0,10],
			[1, 14],
			[2, 15],
			[3, 29],
			[4, 14],
			[5, 42],
			[6, 14],
			[7, 24],
			[8, 55],
			[9, 49],
			[10, 14],
			[11, 12],
			[12, 14],
			[13, 14],
			[14, 15],
			[15, 29],
			[16, 14],
			[17, 42],
			[18, 14],
			[19, 24],
			[20, 55],
			[21, 49],
			[22, 14],
			[23, 12],
			]
		 };
		 var barDataTree = {
			label: "Paused",
			data: [
			[0,10],
			[1, 4],
			[2, 5],
			[3, 9],
			[4, 4],
			[5, 2],
			[6, 4],
			[7, 4],
			[8, 5],
			[9, 9],
			[10, 4],
			[11, 2],
			[12, 4],
			[13, 4],
			[14, 5],
			[15, 9],
			[16, 4],
			[17, 2],
			[18, 4],
			[19, 4],
			[20, 5],
			[21, 9],
			[22, 4],
			[23, 2],
			]
		 };
		/**
		 * This the Jquery function that take the id of the graph container and pass the data and configuration to draw the data.
		 */
		 $.plot($("#flot-line-chart-schedule"), [barData,barDataTwo,barDataTree], barOptions);
		};