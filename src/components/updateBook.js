import React from 'react';
//Sends Data to the Server
import axios from 'axios';
import '../style/style.css';
//Edit Component
export class UpdateBook extends React.Component {

    //
    constructor() {
        super();

        //Binding of Events 
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.onChangeUpdateBookTitle = this.onChangeUpdateBookTitle.bind(this);
        this.onChangeUpdateSynopsis = this.onChangeUpdateSynopsis.bind(this);
        this.onChangeUpdateAuthor = this.onChangeUpdateAuthor.bind(this);
        this.onChangeUpdateGenre = this.onChangeUpdateGenre.bind(this);
        this.onChangeUpdateCoverImg = this.onChangeUpdateCoverImg.bind(this);
        this.onChangeUpdateLent = this.onChangeUpdateLent.bind(this);

        //On load values of Title, Year and Poster will be clear
        this.state = {
            BookTitle: '',
            Synopsis: '',
            Author: '',
            Genre: '',
            CoverImg: '',
            Lent: ''
        }
    }

    //Pull Movie ID from the URL
    componentDidMount() {
        console.log(this.props.match.params.id);

        //Fills in Fields with Current Information
        axios.get('http://localhost:4000/api/books/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    BookTitle: response.data.bookTitle,
                    Synopsis: response.data.synopsis,
                    Author: response.data.author,
                    Genre: response.data.genre,
                    CoverImg: response.data.coverImg,
                    Lent: response.data.lent
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //Updates the Title of the Book
    onChangeUpdateBookTitle(t) {
        this.setState({
            BookTitle: t.target.value
        })
    }

    //Updates the Synopsis of the Book
    onChangeUpdateSynopsis(s) {
        this.setState({
            Synopsis: s.target.value
        })
    }

    //Updates the Author of the Book
    onChangeUpdateAuthor(a) {
        this.setState({
            Author: a.target.value
        })
    }

    //Updates the Genre of the Book
    onChangeUpdateGenre(g) {
        this.setState({
            Genre: g.target.value
        })
    }

    //Updates the Genre of the Book
    onChangeUpdateCoverImg(c) {
        this.setState({
            CoverImg: c.target.value
        })
    }

    //Updates the Lent state of the Book
    onChangeUpdateLent(l) {
        this.setState({
            Lent: l.target.value
        });
    }

    //Button to Submit form to Update Book
    onUpdateSubmit(e) {
        //Alert Displaying Addition
        alert("Book Updated" + this.state.BookTitle + ", " + this.state.Genre + ", " + this.state.Author + ", " + this.state.CoverImg);

        //Sends Title, Year and Poster to the BackEnd Server.js
        const newBook = {
            bookTitle: this.state.BookTitle,
            author: this.state.Author,
            genre: this.state.Genre,
            coverImg: this.state.CoverImg,
            synopsis: this.state.Synopsis,
            lent: this.state.Lent,
            _id: this.state._id
        }

        //Sends the data to the BackEnd with upadtes made
        axios.put('http://localhost:4000/api/books/' + this.state._id, newBook)
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Method to display what is within
    render() {
        return (
            //Contents on display in the Component
            //Form to Update a Book
            <div className='AddBook'>
                <h1>Upadte Book</h1>
            <form className="AddForm" onSubmit={this.onUpdateSubmit}>
                {/*Edit Book Title */}
                <div className="form-group">
                    <label>Update Book Title:</label>
                    <input type="text" className="form-control" value={this.state.BookTitle} onChange={this.onChangeUpdateBookTitle}>
                    </input>
                </div>

                {/*Edit Book Author */}
                <div className="form-group">
                    <label>Update Book Synopsis:</label>
                    <input type="text" className="form-control" value={this.state.Author} onChange={this.onChangeUpdateAuthor}>
                    </input>
                </div>

                {/*Edit Book Synopsis */}
                <div className="form-group">
                    <label>Update Book Synopsis:</label>
                    <textarea type="text" className="form-control" value={this.state.Synopsis} onChange={this.onChangeUpdateSynopsis}>
                    </textarea>
                </div>

                {/*Edit Book Genre */}
                <div className="form-group">
                    <label>Edit Book Genre: </label>
                    <select class="form-control" id="exampleFormControlSelect1" value={this.state.Genre} onChange={this.onChangeUpdateGenre}>
                        <option selected>Choose...</option>
                        <option>Romance</option>
                        <option>Drama</option>
                        <option>Sci-Fy</option>
                        <option>Fantasy</option>
                        <option>Historical</option>
                    </select>
                </div>

                {/*Edit Book Cover Image */}
                <div className="form-group">
                    <label>Update Book Cover Image:</label>
                    <textarea type="text" className="form-control" value={this.state.CoverImg} onChange={this.onChangeUpdateCoverImg}>
                    </textarea>
                </div>

                {/*Edit Lent Out */}
                <div className="form-group">
                    <label>Update Lent Out To:</label>
                    <input type="text" className="form-control" value={this.state.Lent} onChange={this.onChangeUpdateLent}>
                    </input>
                </div>

                {/*Button Updating Form Contents to State */}
                <div>
                    <input type="submit" value="Update Book" className="btn btn-danger btn-lg"></input>
                </div>
            </form>
            </div>

        );
    }
}