import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import datos from '../data/data.csv';
import Titulo from './Titulo/Titulo';
import Navegacion from './Navegacion/Navegacion';
import Chart from './visualizaciones/Chart';
import Explicacion from './Explicacion/Explicacion';

class App extends Component {
	state = { granularidad: 40 };

	componentWillMount() {
		d3.csv(datos, (err, datos) => {
			datos.forEach(d => {
				d.dia = d3.timeParse('%d')(d.dia);
				d.seguidores = +d.seguidores;
			});
			this.setState({ datos_originales: datos, datos });
		});
	}

	cambiarGranularidad = nuevaGranularidad => {
		this.setState({ granularidad: nuevaGranularidad });
	};

	filtrar = seleccionados => {
		console.log(seleccionados);
		this.setState({
			datos: this.state.datos_originales.filter(elemento => {
				var devuelto = false;
				seleccionados.map(candidatoSeleccionado => {
					if (elemento.candidato === candidatoSeleccionado.value) {
						devuelto = true;
					}
				});
				return devuelto;
			}),
			filtro: true
		});
	};

	render() {
		return (
			<div>
				<center>
					<p>
						La siguiente es una visualización de la cantidad de seguidores en Twitter sobre los top 4
						candidatos a las elecciones presidenciales colombianas en el 2018.
					</p>
					<p>
						Los datos no son reales y fueron fabricados con el propósito de representar la visualización.
					</p>
					<Titulo />
					<h3>Claudia Lopez y Sergio Fajardo crecen abundantemente en Octubre</h3>
					<Navegacion filtrar={this.filtrar} />
					<Chart
						datos={this.state.datos}
						granularidad={this.state.granularidad}
						filtro={this.state.filtro}
					/>
					<Explicacion />
				</center>
			</div>
		);
	}
}

export default App;
