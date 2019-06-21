import React from 'react';
import Header from './Header';
import List from './List';

class Laptops extends React.Component {
  render() {
    const request = {
      type: "laptops"
    }

    return(
      <div>
        <Header body="Ноутбуки" />
        <List cols="5" request={request} />
      </div>
    )
  }
}

export default Laptops;
