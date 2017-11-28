import React, { Component } from 'react';
import Select from 'react-select';
import css from 'react-select/dist/react-select.min.css';

class Navegacion extends Component {
	state = {
		seleccionado: [
			{ value: 'petrogustavo', label: 'Gustavo Petro', color: '#1f77b4' },
			{ value: 'German_Vargas', label: 'German Vargas Lleras', color: '#d62728' },
			{ value: 'ClaudiaLopez', label: 'Claudia Lopez', color: '#2ca02c' },
			{ value: 'sergio_fajardo', label: 'Sergio Fajardo', color: '#ff7f0e' }
		]
	};

	options = [
		{ value: 'petrogustavo', label: 'Gustavo Petro', color: '#1f77b4' },
		{ value: 'German_Vargas', label: 'German Vargas Lleras', color: '#d62728' },
		{ value: 'ClaudiaLopez', label: 'Claudia Lopez', color: '#2ca02c' },
		{ value: 'sergio_fajardo', label: 'Sergio Fajardo', color: '#ff7f0e' }
	];

	seleccionar = value => {
		this.setState({ seleccionado: value });
		this.props.filtrar(value);
	};

	renderValue(option) {
		return (
			<label style={{ color: 'white', backgroundColor: option.color }}>
				&nbsp;{option.label} &nbsp;
			</label>
		);
	}

	render() {
		return (
			<div>
				<br />
				<br />
				<div style={{ width: 800 }}>
					<Select
						value={this.state.seleccionado}
						multi={true}
						options={this.options}
						onChange={this.seleccionar}
						valueRenderer={this.renderValue}
					/>
					<br />
					<br />
				</div>
				<div className="row" />
			</div>
		);
	}
}

export default Navegacion;
