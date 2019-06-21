import React from 'react';
import Header from './Header';
import List from './List';

class Phones extends React.Component {
  render() {
    const request = {
      type: "phones"
    }

    return(
      <div>
        <Header body="Смартфоны" />
        <List cols="5" request={request} />
      </div>
    )
  }
}

export default Phones;
