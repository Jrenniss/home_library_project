import React from 'react';
import '../style/style.css';
import Button from "react-bootstrap/Button";
import { Container, Jumbotron } from 'react-bootstrap';



//<Image src={homeImage} fluid />

//Navigate from here to the component pages
export class Index extends React.Component {
    render() {
        return (
            <div className="App">
                <Jumbotron>
                    <Container>
                        <h1>Welcome to the Home Library</h1>
                        <p>
                            Where you can track all the Books in your Library.
                        </p>
                        <div class="row">
                            <div class="col-sm-4">
                                <Button href="/library" variant="danger" size="lg">My Library</Button>
                            </div>
                            <div class="col-sm-4">
                            <Button href="/addBook" variant="danger" size="lg">Add to Library</Button>
                            </div>
                            <div class="col-sm-4">
                            <Button href="/search" variant="danger" size="lg">Search Library</Button>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
            </div>

        )
    }
}