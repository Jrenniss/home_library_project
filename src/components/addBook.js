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
        this.onChangeLent = this.onChangeLent.bind(this);

        //On load values of Title, Year and Poster will be clear
        this.state = {
            BookTitle: '',
            Synopsis: '',
            Author: '',
            Genre: '',
            Lent: ''
        }
    }

    //Updates the Title of the Book
    onChangeBookTitle(t) {
        this.setState({
            BookTitle: t.target.value
        });
    }

    //Updates the Synopsis of the Book
    onChangeSynopsus(s) {
        this.setState({
            Synopsis: s.target.value
        });
    }

    //Updates the Author of the Book
    onChangeAuthor(a) {
        this.setState({
            Author: a.target.value
        });
    }

    //Updates the Genre of the Book
    onChangeGenre(g) {
        this.setState({
            Genre: g.target.value
        });
    }

    //Updates the Lent state of the Book
    onChangeLent(l){
        this.setState({
            Lent: l.target.value
        });
    }
    //Button to Submit form to Add Book
    onSubmit(s) {
        s.preventDefault();
        //Alert Displaying Addition
        alert("Book: " + this.state.BookTitle + ", " + this.state.Author + ", " + this.state.Genre+ ", " +this.state.Lent);

        //Sends BookTitle, Author, Genre, Synopsis and Lent to the BackEnd Server.js
        const newBook = {
            bookTitle: this.state.BookTitle,
            author: this.state.Author,
            genre: this.state.Genre,
            synopsis: this.state.Synopsis,
            lent: this.state.Lent
        }

        //Sends Data(newBook) to BackEnd - http://localhost:4000/api/books
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
                    {/*Add Book Title*/}
                    <div className="form-group">
                        <label>Add Book Title: </label>
                        <input type='text' className='form-control' value={this.state.BookTitle} onChange={this.onChangeBookTitle}></input>
                    </div>

                    {/*Add Book Synopsis*/}
                    <div className="form-group">
                        <label>Add Book Synopsis: </label>
                        <textarea className='form-control' value={this.state.Synopsis} onChange={this.onChangeSynopsus}></textarea>
                    </div>

                    {/*Add Book Author*/}
                    <div className="form-group">
                        <label>Add Book Author: </label>
                        <input type='text' className='form-control' value={this.state.Author} onChange={this.onChangeAuthor}></input>
                    </div>

                    {/*Select Book Genre*/}
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

                    {/*Add Lent Out*/}
                    <div className="form-group">
                        <label>Lent Out To: </label>
                        <input type='text' className='form-control' value={this.state.Lent} onChange={this.onChangeLent} placeholder="In Library"></input>
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