import React from 'react';

class PhoneSpecs extends React.Component {
  render() {
    return (
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Дисплей</th>
            <td>{this.props.product.display}</td>
          </tr>
          <tr>
            <th scope="row">Встроенная память</th>
            <td>{this.props.product.diskSpace}</td>
          </tr>
          <tr>
            <th scope="row">Оперативная память</th>
            <td>{this.props.product.ram}</td>
          </tr>
          <tr>
            <th scope="row">Камеры</th>
            <td>{this.props.product.cameras}</td>
          </tr>
          <tr>
            <th scope="row">Ёмкость аккумулятора</th>
            <td>{this.props.product.battery}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PhoneSpecs;
