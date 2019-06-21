import React from 'react';
import Header from './Header';
import List from './List';

class Desktops extends React.Component {
  render() {
    const request = {
      type: "desktops"
    }

    return(
      <div>
        <Header body="Компьютеры" />
        <List cols="5" request={request} />
      </div>
    )
  }
}

export default Desktops;
