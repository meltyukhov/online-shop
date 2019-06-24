import React from 'react';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    //console.log(this.props.product);
    const product = this.props.product;
    return (
      <div className="card">
				<div className="card-img d-flex justify-content-center">
          <Link to={"/product?id="+product.id}>
            <img src={"img/products/title/" + product.id + ".jpg"} className="card-img-top" alt={product.name} />
          </Link>
				</div>
				<div className="card-body">
          <Link className="router-link" to={"/product?id="+product.id}>
            <h5 className="card-title">{product.name}</h5>
          </Link>
					<p className="card-text">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}₴</p>
					<a href="https://google.com/" className="btn btn-primary">Купить</a>
				</div>
			</div>
    );
  }
}

export default Card;
