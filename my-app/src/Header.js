import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <h1>
        {this.props.body}
      </h1>
    );
  }
}

export default Header;
