import React from 'react';
import queryString from 'query-string';
import List from './List';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: queryString.parse(props.location.search).query
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //if (this.props.userID !== prevProps.userID) {
    if (prevProps.location.search !== this.props.location.search)
      this.setState({
        query: queryString.parse(this.props.location.search).query
      });
  }

  /*request() {
    return {
      type: 'search',
      query: this.state.query
    }
  }*/

  render() {
    let request = {
      type: 'search',
      query: this.state.query
    }

    return (
      <div>
        <h1>Поиск по запросу</h1>
        <h1>
          <span className="search-result-quotes">«</span>
          {this.state.query}
          <span className="search-result-quotes">»</span>
        </h1>
        <List cols="5" request={request} count />
      </div>
    );
  }
}

export default Search;
