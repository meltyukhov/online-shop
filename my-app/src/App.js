import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from './Navbar';
import Content from './Content';


class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Content />
        </Router>
      </div>
    );
  }
}

export default App;
