import React from 'react';
import '../style/style.css';
import Image from "react-bootstrap/Image";
import homeImage from "../assets/homepic.jpg";
import { Jumbotron } from 'reactstrap';

//<Image src={homeImage} fluid />

//Navigate from here to the component pages
export class Index extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <Jumbotron>
                        <h1>Welcome to the Home Library</h1>
                        <p>
                            This is a modified jumbotron that occupies the entire horizontal space of
                            its parent.
                    </p>
                    </Jumbotron>
                </div>
            </div>

        )
    }
}