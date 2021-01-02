import React from 'react';
import { BookProfile } from './bookProfile';


export class Books extends React.Component{

    //Method to display what is within
    render(){//Breaks into a single book profile
        return this.props.books.map( (book)=>{
            //Return each Book as a single profile + Reload
            return <BookProfile book={book} ReloadData={this.props.ReloadData}></BookProfile>
        })
    }
}