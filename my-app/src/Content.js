import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Phones from './Phones';
import Laptops from './Laptops';
import Desktops from './Desktops';
import Accessories from './Accessories';
import Search from './Search';
import Phone from './Phone';


class Content extends React.Component {
  render() {
    return (
        <div className="container content">
          <Route exact path="/" component={Home} />
          <Route path="/phones" component={Phones} />
          <Route path="/phone" component={Phone} />
          <Route path="/laptops" component={Laptops} />
          <Route path="/desktops" component={Desktops} />
          <Route path="/accessories" component={Accessories} />
          <Route path="/search" component={Search} />
        </div>
    );
  }
}

export default Content;
