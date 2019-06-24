import React from 'react';

class DesktopSpecs extends React.Component {
  render() {
    return (
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Процессор</th>
            <td>{this.props.product.processor}</td>
          </tr>
          <tr>
            <th scope="row">Встроенная память</th>
            <td>{this.props.product.diskSpace}</td>
          </tr>
          <tr>
            <th scope="row">Оперативная память</th>
            <td>{this.props.product.ram}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default DesktopSpecs;
