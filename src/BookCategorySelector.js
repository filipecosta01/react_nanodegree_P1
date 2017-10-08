import React, { Component } from 'react'
import BOOK_SELECTOR_CATEGORY from './constants/BOOK_SELECTOR_CATEGORY'

class BookCategorySelector extends Component {
  render() {
    const { book, onChangeCategory } = this.props

    return (
      <div className="book-shelf-changer">
        <select value={book.shelf || 'none'} onChange={(event) => onChangeCategory(book, event.target.value)}>
          {BOOK_SELECTOR_CATEGORY.map((bookCategory, index) => (
            <option
              key={index}
              value={bookCategory.value}
              disabled={bookCategory.value === ''} >
                {bookCategory.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default BookCategorySelector
