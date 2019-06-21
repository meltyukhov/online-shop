import React from 'react';

class Card extends React.Component {
  render() {
    //console.log(this.props.product);
    const product = this.props.product;
    return (
      <div className="card">
				<div className="card-img d-flex justify-content-center">
					<img src={"img/products/title/" + product.id + ".jpg"} className="card-img-top" alt={product.name} />
				</div>
				<div className="card-body">
					<h5 className="card-title">{product.name}</h5>
					<p className="card-text">{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}₴</p>
					<a href="#" className="btn btn-primary">Купить</a>
				</div>
			</div>
    );
  }
}

export default Card;
