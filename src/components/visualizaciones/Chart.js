import React, { Component } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

class Chart extends Component {
	state = {
		height: 500,
		width: 1000,
		margin_left: 200,
		margin_bottom: 50,
		margin_right: 200
	};

	shouldComponentUpdate(nextProps) {
		this.renderChart(nextProps);
		return false;
	}

	renderChart(props) {
		let { datos, granularidad, filtro } = props;
		const { height, width, margin_bottom, margin_left, margin_right } = this.state;
		granularidad = 48; // Se pone así para que sean 30 num_slots
		const num_slots = 24 * (60 / granularidad) - 1;

		d3.selectAll('path').remove();

		// data
		var svg = d3
			.select('svg')
			.attr('height', height)
			.attr('width', width);

		var parser = d3.timeParse('%d');
		var first_day = parser('1');
		var last_day = parser('30');

		console.log(datos);
		var yMax = d3.max(datos, d => d.seguidores);

		var yScale = d3
			.scaleLinear()
			.domain([0, yMax])
			.range([height - margin_bottom, 0]);

		var xScale = d3
			.scaleTime()
			.domain([first_day, last_day])
			.rangeRound([0 + margin_left, width - margin_right]);

		var color = d3.scaleOrdinal(d3.schemeCategory10).domain(d3.range(0, 15));

		var por_candidato = {};
		_.uniqBy(datos, 'candidato').map(candidato => {
			datos.map(dato => {
				if (!por_candidato[candidato.candidato]) {
					por_candidato[candidato.candidato] = [];
				}
				if (dato.candidato === candidato.candidato) {
					por_candidato[candidato.candidato].push(dato);
				}
			});
		});

		Object.keys(por_candidato).map((candidato, index) => {
			var seguidores = d3
				.line()
				.x(d => xScale(d.dia))
				.y(d => yScale(d.seguidores));

			var options = {
				petrogustavo: '#1f77b4',
				German_Vargas: '#d62728',
				ClaudiaLopez: '#2ca02c',
				sergio_fajardo: '#ff7f0e'
			};

			// data
			svg
				.append('path')
				.datum(por_candidato[candidato])
				.attr('id', 'cantidad')
				.attr('fill', 'none')
				.attr('stroke', options[candidato])
				.attr('stroke-width', 4)
				.attr('d', seguidores);
		});
		// seguidores
		// var seguidores = d3
		// 	.line()
		// 	.x(d => xScale(d.dia))
		// 	.y(d => yScale(d.seguidores));
		//
		// // data
		// svg
		// 	.append('path')
		// 	.datum(datos)
		// 	.attr('id', 'cantidad')
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'steelblue')
		// 	.attr('d', seguidores);

		var yAxis = d3.axisLeft().scale(yScale);
		d3.select('#y_axis').remove();
		d3.select('#x_axis').remove();
		// d3.select('#x_axis_label').remove();

		svg
			.append('g')
			.attr('id', 'y_axis')
			.attr('transform', `translate(${margin_left}, 0)`)
			.call(yAxis);

		var auxiliaryScale = d3
			.scaleTime()
			.domain([first_day, last_day])
			.range([0 + margin_left, width - margin_right]);

		var xAxis = d3
			.axisBottom()
			.scale(auxiliaryScale)
			.tickFormat(d3.timeFormat('%d'));

		svg
			.append('g')
			.attr('id', 'x_axis')
			.attr('transform', `translate(0, ${height - margin_bottom})`)
			.call(xAxis.ticks(30));

		svg
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 0 - margin_left)
			.attr('x', 0 - height / 2)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.text('Cantidad');

		svg
			.attr('id', 'x_axis_label')
			.append('text')
			.attr('transform', 'translate(' + width / 2 + ' ,' + height + ')')
			.style('text-anchor', 'middle')
			.text('Día de Octubre');
	}

	render() {
		return (
			<div>
				<svg ref="container" className="" />
			</div>
		);
	}
}

export default Chart;
