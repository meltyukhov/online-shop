import React from 'react';
import Row from './Row';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  serialize = (obj) => {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  decode = (array) => {
    array.forEach((obj) => {
      for (var p in obj) {
        obj[p] = decodeURIComponent(obj[p]);
      }
    });
    return array;
  }

  myFetch() {
    fetch("http://127.0.0.1.:5000/get_list?" + this.serialize(this.props.request))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: this.decode(result.data),
            count: result.count
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    this.myFetch();
  }



  componentDidUpdate(prevProps) {
    if (prevProps.request !== this.props.request) {
      this.setState({
        error: null,
        isLoaded: false,
        items: []
      });
      this.myFetch();
    }
  }

  createRows = () => {
    let { items } = this.state;
    const cols = this.props.cols;
    let rows = Math.ceil(items.length / cols);
    let children = [];
    for (let i = 0; i < rows; i++) {
      children.push(<Row items={items.slice(cols * i, cols * (i + 1))} cols={cols} />);
    }
    return children;
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Загрузка...</div>
    }
    else {
      const count = this.props.count;
      return (
        <div>
          {count ? (<p>Найдено товаров: {this.state.count}</p>) : ''}
          {this.createRows()}
        </div>
      )
    }
  }
}

export default List;
