import React, { Component } from 'react'
import swal from 'sweetalert'
import Ruleta from './Ruleta'
import Premios from './Premios'
import './index.css';

class App extends Component {
	
	constructor(...props){
		super(...props);

		this.state = {
			total_points: 	0,
			data_ruleta: 	0,
			animated_ruleta: 	false,
		}

		this.premios = [
			{ id: 1, premio: 'Primer premio', precio: '150'},
			{ id: 2, premio: 'Segundo premio', precio: '200'},
			{ id: 3, premio: 'Tercer premio', precio: '500'},
			{ id: 4, premio: 'Cuarto premio', precio: '1000'}
		]

		this.premios_list 	=	[100,200,0,500,50,-1,0,150];

		this.points_data = 0;
		this.rulets_data = 0;

		this.ruleta = React.createRef()

		this.animarEvent = this.animarEvent.bind(this)
		this.showRuletaResult = this.showRuletaResult.bind(this)
		this.shopPremio = this.shopPremio.bind(this)

	}

	componentDidMount(){
		
	}

	componentDidUpdate() {

	}

	animarEvent() {
		
		var ruleta_temp = this.rulets_data;

		let grados_circulo 	=	360;
		let premio 	= 	grados_circulo / 8;
		
		var valor_aleatorio =	Math.floor(Math.random()*8);
		var ruleta_result 	= 	premio * valor_aleatorio;
		var valor_premio 	= 	(grados_circulo	* 4) + ruleta_result;
		
		this.rulets_data = 	valor_aleatorio;

		// puntos ganados
		this.points_data 	= 	this.premios_list[valor_aleatorio];
		
		this.setState({
			data_ruleta: ruleta_temp * premio,
			animated_ruleta: true,
		})
		
		setTimeout(() => {
			this.ruleta.current.classList.add('img-ruleta');
			this.setState({
				data_ruleta: valor_premio,
			})
		}, 200);
		
	}

	showRuletaResult(){
		
		this.ruleta.current.classList.remove("img-ruleta");

		if (this.points_data >= 0) {
			
			this.setState({
				total_points: this.state.total_points + this.points_data,
				animated_ruleta: false,
			})

		}
		else{

			this.setState({
				animated_ruleta: false,
			})

		}

		if(this.points_data === -1){
			swal("Felicidades", "Ganaste un premio oculto", "success");
		}
		else if(this.points_data > 0) {
			swal("Ganaste", "Felicitaciones ganaste " + this.points_data + " puntos", "success");
		}
		else {
			swal("Perdiste", "Podes intentarlo nuevamente ", "warning");
		}

	}

	shopPremio(item){

		if (this.premios[item].precio <= this.state.total_points) {

			this.setState({
				total_points: this.state.total_points - this.premios[item].precio,
			})

			swal("Comprado", "Has comprado un item con éxito. ("+this.premios[item].premio+")", "success");
			
		}
		else{

			swal("No podes reclamar el premio", "No tenes puntos suficientes para comprar este premio", "warning");

		}
		
	}

	render() {

		return (
			<div  id="main">
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<h2 align="center" className="ruleta-puntos">RECLAMAR PREMIO</h2>
							<br/>
							{
								this.premios.map((item, index) => (
						       		<Premios
										key={item.id}
										indice={index}
										data={item}
										total_points={this.state.total_points}
										shopPremio={this.shopPremio}
									/>
						    	))
							}
							<br/>
						</div>
						<div className="col-md-6">
							<Ruleta 
								total_points={this.state.total_points}
								animatedRuleta={this.state.animated_ruleta} 
								data_ruleta={this.state.data_ruleta}
								showRuletaResult={this.showRuletaResult}
								animarEvent={this.animarEvent}
								ruleta={this.ruleta}
							/>
						</div>
					</div>
				</div>
			</div>
		)

	}
}

export default App