import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
//Component Imports
import { Index } from './components/index';
import { Library } from './components/library';
import { AddBook } from './components/addBook';
import { UpdateBook } from './components/updateBook';
import  SearchPage  from "./components/searchPage";
//Browser
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Bootstrap Additions
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/*Navigation Bar present across all components/pages displayed  */}
          <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">My Home Library</Navbar.Brand>
            <Nav className="mr-auto">
              {/*Links to each Component Page */}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/library">Library</Nav.Link>
              <Nav.Link href="/addBook">Add Book</Nav.Link>
              <Nav.Link href="/search">Search Library</Nav.Link>
            </Nav>
          </Navbar>

          {/*URLs to app pages linking to components */}
          <Switch>
            <Route path='/' component={Index} exact></Route>
            <Route path='/library' component={Library} exact></Route>
            <Route path='/addBook' component={AddBook} exact></Route>
            <Route path='/updateBook/:id' component={UpdateBook} exact></Route>
            <Route path='/search' component={SearchPage} exact></Route>
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
