import React from 'react';
import { Link, withRouter } from 'react-router-dom';
//import history from './history';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    const query = this.state.query;
    this.props.history.push('/search?query=' + query);
    event.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
  			<div className="container">
  				<a className="navbar-brand" href="/">Все товары</a>
  				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
  					<span className="navbar-toggler-icon"></span>
  				</button>

  				<div className="collapse navbar-collapse" id="navbarSupportedContent">
  					<ul className="navbar-nav mr-auto">
  						<li className="nav-item">
  							<Link className="nav-link" to="/phones">Смартфоны</Link>
  						</li>
  						<li className="nav-item">
  							<Link className="nav-link" to="/laptops">Ноутбуки</Link>
  						</li>
  						<li className="nav-item">
  							<Link className="nav-link" to="/desktops">Компьютеры</Link>
  						</li>
  						{/*<li className="nav-item">
  							<Link className="nav-link" to="/accessories">Аксессуары</Link>
  						</li>*/}
  					</ul>
  					<form className="form-inline my-2 my-lg-0">
  						<input className="form-control mr-sm-2" type="search" placeholder="Поиск..." value={this.state.query} onChange={this.handleChange} />
  						<button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Поиск</button>
  					</form>
  				</div>
  			</div>
  		</nav>
    );
  }
}

export default withRouter(Navbar);
