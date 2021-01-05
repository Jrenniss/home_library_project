import React from 'react';
import { Books } from "./books";
//http Client
import axios from "axios";
import SearchField from "react-search-field";

//Page to Display, Update and Edit Books in the Library
export class Library extends React.Component {

    constructor() {
        super()

        this.ReloadData = this.ReloadData.bind(this);
        this.OnSearchClick = this.OnSearchClick.bind(this);
    }

    //State object that holds data within it. Eg: books.
    state = {
        //JSON Script of Books to be accessed through Books and BookProfile Components
        books: [],
        searchValue: ""

    };

    ///Retrives info from the api
    componentDidMount() {
        //Axios implements a retrivel form BackEnd Server
        axios.get('http://localhost:4000/api/books')
            //Fufilled response = Holds the data retrived with axios - 
            .then(response => {
                //updates the state object
                this.setState({
                    books: response.data
                })
            })
            //Exception Response = Log an error
            .catch(
                (error) => {
                    console.log(error);
                });
    }

    //Method to Reload data on Delete 
    ReloadData() {
        //Axios implements a retrivel form BackEnd Server
        axios.get('http://localhost:4000/api/books')
            //Fufilled response = Holds the data retrived with axios - 
            .then(response => {
                //updates the state object
                this.setState({
                    books: response.data
                })
            })
            //Exception Response = Log an error
            .catch((error) => {
                console.log(error);
            });
    }

    OnSearchClick(value){
        this.setState({
            searchValue: value
        })
        console.log(this.state.searchValue);
    }

    //Method to display what is within
    render() {
        const filteredBooks = this.state.books.filter(book => {
            return book.bookTitle.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })
        return (
            //Contents on display in the Component
            <div className="Library">
                <h1>My Home Library</h1>
                <hr></hr>
                <SearchField
                    value={this.state.searchValue}
                    placeholder= "Search...."
                    OnSearchClick={this.OnSearchClick}
                    onEnter={this.OnSearchClick}
                />
                <hr></hr>
                 {/*Books Component Diaplay and Reload*/}
                <Books books={filteredBooks} ReloadData={this.ReloadData}></Books>
            </div>
        );
    }
}