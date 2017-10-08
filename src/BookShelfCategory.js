import React, { Component } from 'react'
import BookItem from './BookItem'

class BookShelfCategory extends Component {

  render() {
    const { title, books, onChangeCategory } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {title}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books && !books.length && <span className="book-empty-list">No books in this category, yet...</span>}
            {books &&
              books.map((book) => (
                <li key={book.id}>
                  <BookItem bookInfo={book} onChangeCategory={onChangeCategory} />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelfCategory
