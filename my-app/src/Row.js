import React from 'react';
import Card from './Card';
import CardGag from './CardGag';

class Row extends React.Component {
  createCards = () => {
    const items = this.props.items;
    const cols = this.props.cols;
    let children = [];
    for (let i = 0; i < items.length; i++) {
      children.push(<Card product={items[i]} />);
    }
    for (let i = 0; i < cols - items.length; i++) {
      children.push(<CardGag />);
    }
    return children;
  }

  render() {
    //console.log(this.props.items);
    return (
      <div className="card-deck">
        {this.createCards()}
      </div>
    );
  }
}

export default Row;
