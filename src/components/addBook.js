import React from 'react';
//Sendds Data to the Server
import axios from 'axios';


//Page to add books to the Library
export class AddBook extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
        this.onChangeSynopsus = this.onChangeSynopsus.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);

        //On load values of Title, Year and Poster will be clear
        this.state = {
            BookTitle: '',
            Synopsis: '',
            Author: '',
            Genre: ''
        }
    }
    onChangeBookTitle(t) {
        this.setState({
            BookTitle: t.target.value
        });
    }

    onChangeSynopsus(s) {
        this.setState({
            Synopsis: s.target.value
        });
    }

    onChangeAuthor(a) {
        this.setState({
            Author: a.target.value
        });
    }

    onChangeGenre(g) {
        this.setState({
            Genre: g.target.value
        });
    }
    //Button to submit form to add book
    onSubmit(s) {
        s.preventDefault();
        alert("Book: " + this.state.BookTitle + " " + this.state.Author + " " + this.state.Genre);

        const newBook = {
            bookTitle: this.state.BookTitle,
            author: this.state.Author,
            genre: this.state.Genre,
            synopsis: this.state.Synopsis
        }

        //Sends Data(newBook) to BackEnd - http://localhost:4000/api/movies
        axios.post('http://localhost:4000/api/books', newBook)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //Method to display what is within
    render() {
        return (
            //Contents on display in the Component
            //Form to Add a Book
            <div className='App'>
                <h1>Add Book to Library</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Book Title: </label>
                        <input type='text' className='form-control' value={this.state.BookTitle} onChange={this.onChangeBookTitle}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Book Synopsis: </label>
                        <textarea className='form-control' value={this.state.Synopsis} onChange={this.onChangeSynopsus}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Add Book Author: </label>
                        <input type='text' className='form-control' value={this.state.Author} onChange={this.onChangeAuthor}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Book Genre: </label>
                        <select class="form-control" id="exampleFormControlSelect1" value={this.state.Genre} onChange={this.onChangeGenre}>
                            <option selected>Choose...</option>
                            <option>Romance</option>
                            <option>Drama</option>
                            <option>Sci-Fy</option>
                            <option>Fantasy</option>
                            <option>Historical</option>
                        </select>
                    </div>
                    {/*Button Adding Form Contents to State */}
                    <div>
                        <input type="submit" value="Add Book" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}