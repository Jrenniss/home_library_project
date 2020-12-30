import React from 'react';
//Bootstrap import for the Card.
import Card from 'react-bootstrap/Card';
//Bootstrap import for the Button
import Button from 'react-bootstrap/Button';
//Importing Axois
import axois from 'axios';
//Imported to change the URL and pass ID of current work
import {Link} from 'react-router-dom';

export class BookProfile extends React.Component {

    constructor(){
        super();

        this.DeleteBook = this.DeleteBook.bind(this);
    }

    //Delete Function
    DeleteBook(e) {
        //Stops Method getting Called on Load
        e.preventDefault();
        //Shows delete in the Console
        console.log("Delete: " + this.props.book._id);

        //Deletes Book from the Server and Reloads Page
        axois.delete("http://localhost:4000/api/books/" + this.props.book._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch();
    }

    render() {
        return (
            <div>
                {/*The content of each bookProfile is desplayed as requested, BookTitle, Author and Genre */}
                <Card>
                    {/*Card Holds Title in the Card Header. Year and Poster are held in the Card Body  */}
                    <Card.Header>{this.props.book.bookTitle}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>{this.props.book.synopsis}</p>
                            <p>{this.props.book.genre}</p>
                            <footer className="blockquote-footer">
                                {this.props.book.author}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    {/*Button to Delete Record*/}
                    <Button variant="danger" onClick={this.DeleteBook}>Delete</Button>
                    {/*Button to Upadte Record*/}
                    <Link to={"/updateBook/" + this.props.book._id} className="btn btn-primary">Update</Link>
                </Card>

            </div>
        );
    }
}