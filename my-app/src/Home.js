import React from 'react';
import Header from './Header';
import List from './List';

class Home extends React.Component {
  render() {
    const request = { type: "all" };

    return (
      <div>
        <Header body="Все товары" />
        <List cols="5" request={request} />
      </div>
    );
  }
}

export default Home;
