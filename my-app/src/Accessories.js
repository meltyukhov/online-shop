import React from 'react';
import Header from './Header';
import List from './List';

class Accessories extends React.Component {
  render() {
    return(
      <div>
        <Header body="Аксессуары" />
        <List cols="5" request="/accessories" />
      </div>
    )
  }
}

export default Accessories;
