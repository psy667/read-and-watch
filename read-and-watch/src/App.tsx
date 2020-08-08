import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {gql, NetworkStatus, useLazyQuery, useQuery} from "@apollo/client";


const GET_BOOKS = gql`
    {
        books {
            id
            title
        }
    }
`;

function App() {
    // const { loading, error, data, refetch, networkStatus } = useQuery(GET_BOOKS);
    const [getBooks, { loading, error, data }] = useLazyQuery(GET_BOOKS);
    const [books, setBooks] = useState([]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if(data && data.books){
        setBooks(data.books);
    }

    const handleLoad = () => {
        getBooks()
    }

    return (
        <div>
            <button onClick={() => handleLoad()}>Load!</button>
            {
                books.map(({ id, title }) => (
                    <div key={id}>
                        <p>
                            {title}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default App;
