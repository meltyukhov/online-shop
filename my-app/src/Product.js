import React from 'react';
import queryString from 'query-string';
import PhoneSpecs from './PhoneSpecs';
import LaptopSpecs from './LaptopSpecs';
import DesktopSpecs from './DesktopSpecs';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      product: null
    };
  }

  decode = (obj) => {
      for (var p in obj) {
        obj[p] = decodeURIComponent(obj[p]);
      }
      return obj;
  }

  myFetch() {
    fetch("http://127.0.0.1:5000/get_one?id=" + queryString.parse(this.props.location.search).id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            product: this.decode(result)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    this.myFetch();
  }

  specs(product) {
    const types = {
      'phone': <PhoneSpecs product={product} />,
      'laptop': <LaptopSpecs product={product} />,
      'desktop': <DesktopSpecs product={product} />
    }
    return types[product.type];
  }

  render() {
    let { error, isLoaded, product } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Загрузка...</div>
    }
    else {
      return (
        <div>
          <h1>{product.name}</h1>
          <div className="row">
            <div className="col-6 col-md-3">
              <img src={"img/products/title/" + product.id + ".jpg"} className="card-img-top" alt={product.name} />
            </div>
            <div className="col-12 col-md-9">

              <h2>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}₴</h2>
              <a href="https://google.com/" className="btn btn-primary">Купить</a>
            </div>
          </div>
          <div className="specs">
            <h3>Характеристики</h3>
            {this.specs(product)}
          </div>
        </div>
      );
    }
  }
}

export default Product;
