
import React from 'react';

const BookList = ({bookList=[]}) => {
  return (
    <>
    { bookList.map((book) => {
        if (book) {
          return (
            <div key={book.author}>
              <h1>{book.author}</h1>
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default BookList