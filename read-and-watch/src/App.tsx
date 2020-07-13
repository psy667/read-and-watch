import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {apollo} from "./index";
import {gql} from "@apollo/client";
import {BooksService} from "./services/books";

const booksService = new BooksService();

class App extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
    }

    componentDidMount() {
        booksService.getBooks().subscribe(r => {
            this.setState({books: r.data.books});
        });
    }

    render(){
        return <div className="App">
                Books
                {
                    this.state.books.map(it =>
                        <div key={it.id}> {it.title}</div>
                    )
                }
            </div>
    }

}

export default App;
