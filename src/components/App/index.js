import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from '../Search';
import Library from '../Library'
import { Route } from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {

    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books: books
        }))
      })
  }
  changeBookState = (shelf, book) => {
    BooksAPI.update(book, shelf)
      .then(books => {
        let newBooks = this.state.books.map(b => {
          if (book.id === b.id) {
            book.shelf = shelf
            return book;
          } else {
            return b;
          }
        })
        this.setState(() => ({
          books: newBooks
        }))
      })
  }

  addNewBook = (shelf, book) => {
    BooksAPI.update(book, shelf)
      .then(books => {
        BooksAPI.get(book.id)
          .then(book => {
            let newBooks = this.state.books.filter(b => b.id !== book.id);
            this.setState(() => ({
              books: [...newBooks, book]
            }))
          })
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library changeBookState={this.changeBookState} books={this.state.books} />
        )} />
        <Route
          exact path="/search"
          render={() => (
            <Search books={this.state.books} changeBookState={this.addNewBook} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
