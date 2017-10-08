import React, { Component } from 'react'

import BookItem from './BookItem'

class BookShelfResults extends Component {

  render() {
    const { currentBooks, booksFiltered, search, isLoading, onChangeCategory } = this.props

    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {booksFiltered.length === 0 && !search &&
            <span>Start typing something...</span>
          }
          {booksFiltered.length === 0 && search && !isLoading &&
            <span>
              No results for the query
              {' '}
              <span className='books-grid-search-input'>
                {search}
              </span>
            </span>
          }
          {isLoading && <span>Loading results...</span>}
          {booksFiltered.length > 0 && booksFiltered.map((book) => {
            const shelfBook = currentBooks.filter(thisBook => thisBook.id === book.id)
            const hasBook = shelfBook.length > 0
            const whichBook = hasBook ? shelfBook[0] : book

            return (
              <li key={whichBook.id}>
                <BookItem bookInfo={whichBook} onChangeCategory={onChangeCategory} />
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

export default BookShelfResults
