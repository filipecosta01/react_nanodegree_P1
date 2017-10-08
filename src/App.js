import React from 'react'

import _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import BookShelfResults from './BookShelfResults'
import BookShelfCategory from './BookShelfCategory'
import BOOK_SHELF_CATEGORIES from './constants/BOOK_SHELF_CATEGORIES'

import './App.css'

class BooksApp extends React.Component {
  state = {
    query: '',
    shelf: [],
    isLoading: false,
    booksFiltered: []
  }

  constructor(props) {
    super(props)

    this.searchOnServer = _.debounce(this.searchOnServer, 300)
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((results) => {
        var bookShelf = Object.keys(BOOK_SHELF_CATEGORIES).map((key) => {
          return {
            title: key,
            books: []
          }
        })

        results.forEach((book, index) => {
          const category = book.shelf

          bookShelf = bookShelf.map((element) => {
            if (element.title === category) {
              return {
                ...element,
                books: [
                  ...element.books,
                  book
                ]
              }
            }
            return element
          })

        })

        this.setState({ shelf: bookShelf })
      })
  }



  handleChangeCategory = (book, newCategory) => {
    const { shelf } = this.state

    BooksAPI.update(book, newCategory)
    .then(() => {
      const bookWithNewCategory = {
        ...book,
        shelf: newCategory === 'none' ? null : newCategory
      }
      const newShelf = shelf.map((element) => {
        if (element.title === newCategory) {
          return {
            title: element.title,
            books: [
              ...element.books,
              bookWithNewCategory
            ]
          }
        } else if (element.title === book.shelf) {
          return {
            title: element.title,
            books: element.books.filter((currentBook) => currentBook.id !== book.id)
          }
        }
        return element
      })

      this.setState({ shelf: newShelf })
    })
  }

  searchOnServer = (query) => {

    BooksAPI.search(escapeRegExp(query))
    .then((result) => {
      const hasResults = result && !result.error

      this.setState({ booksFiltered: hasResults ? result : result.items, isLoading: false })
    })
  }

  handleSearchChange = (event) => {
    const query = event.target.value

    this.setState({ query, isLoading: true, booksFiltered: [] })

    if (_.isEmpty(query)) {
      this.setState({ query: '', booksFiltered: [], isLoading: false })
    } else {
      this.searchOnServer(query)
    }
  }

  render() {
    const { shelf, query, isLoading, booksFiltered } = this.state
    const currentBooks = shelf.reduce((books, categories) => books.concat(categories.books), [])

    return (
      <div className="app">
        <div className="list-books">
          <Route exact path="/" render={() => (
            <div>
              <div className="list-books-title">
                <h1>My Reads</h1>
                <div className="open-search">
                  <Link to="/search">Search</Link>
                </div>
              </div>
              <div className="list-books-content">
                {shelf.map((bookCategory) =>
                  <BookShelfCategory
                    key={bookCategory.title}
                    books={bookCategory.books}
                    title={BOOK_SHELF_CATEGORIES[bookCategory.title]}
                    onChangeCategory={this.handleChangeCategory} />
                )}
              </div>
            </div>
          )} />

          <Route path="/search" render={({ history }) => (
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => history.push("/")}>
                  Close
                </a>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    value={query}
                    onChange={this.handleSearchChange}
                    placeholder="Search by title or author" />

                </div>
              </div>
              <div className="search-books-results">
                <BookShelfResults
                  search={query}
                  isLoading={isLoading}
                  currentBooks={currentBooks}
                  booksFiltered={booksFiltered}
                  onChangeCategory={this.handleChangeCategory} />
              </div>
            </div>
          )} />
        </div>
      </div>
    )
  }
}

export default BooksApp
