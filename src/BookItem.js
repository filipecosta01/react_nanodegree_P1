import React, { Component } from 'react'
import NoImage from './images/no_image.jpg'
import BookCategorySelector from './BookCategorySelector'

class BookItem extends Component {
  render() {
    const { bookInfo, onChangeCategory } = this.props
    const { title, authors, imageLinks } = bookInfo

    const urlFromImages = imageLinks && (imageLinks.smallThumbnail || imageLinks.thumbnail)
    const url = urlFromImages || NoImage

    return (
      <div className="book">
      <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${url}")` }}></div>
          <BookCategorySelector book={bookInfo} onChangeCategory={onChangeCategory} />
        </div>
        <div className="book-title">
          {title}
        </div>
        {authors && authors.length > 0 &&
          <div className="book-authors">
            {authors.join(', ')}
          </div>
        }
      </div>
    )
  }
}

export default BookItem
