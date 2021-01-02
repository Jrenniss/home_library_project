import React from 'react';
import axios from "axios";
import {Input} from 'reactstrap';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInfo: {}
    };
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    console.log('Value', value);
    this.setState({
      query: value
    });
    this.search(value);
  };

  search = query => {
    axios.get('http://localhost:4000/search/')
      .then(res => {
        const searchInfo = (res.data || {}).map(obj => ({
          author: obj.author,
          bookTitle: obj.bookTitle,
          synopsis: obj.synopsis,
          genre: obj.genre,
          lent: obj.lent
        }));

        this.setState({ searchInfo });
      })
  };

  componentDidMount() {
    this.search("");
  }

  render() {
    const { query } = this.state;
    //console.warn(this.state);
    return (
      <div className="container">
        <Input onChange={this.handleInputChange} type="search" name="search" id="exampleSearch" placeholder="search" />
        
        {this.state.searchInfo.map(function(searchInfo, index){
          return (
              <div key={index}>
                <h2>Book Title: {searchInfo.bookTitle}</h2>
                <p>{searchInfo.synopsis}</p>
                <p>{searchInfo.author}</p>
                <p>{searchInfo.genre}</p>
              </div>
            )
          }
        )}
      </div>
    )
  }
}


export default SearchPage