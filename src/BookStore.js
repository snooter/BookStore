import React from 'react';

var BookList = React.createClass({
    getInitialState() {
        return { 
            books: [
                { name: "Zero to One", author: "Peter Thiel" },
                { name: "Monk Who Sold Ferrari", author: "Robin Sharma" },
                { name: "Wings of Fire", author: "APJ Kalam"}
            ]
        }
    },
    _renderBook(book) {
        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" />
                    {book.name} -- {book.author}
                </label>
            </div>
        )
    },
    render() {
        return (
            <div>
            <h3>Choose a book:</h3>
                <form>
                    {this.state.books.map((book) => {
                        return this._renderBook(book);
                    })}
                    <input type="submit" className="btn btn-success" />
                </form>
            </div>
        );
    }
});

var ShippingDetails = React.createClass({
    render() {
        return <h1>Enter shipping info:</h1>;
    }
});

var DeliveryDetails = React.createClass({
    render() {
        return <h1>Choose delivery option:</h1>;
    }
})

var BookStore = React.createClass({
    getInitialState() {
        return {currentStep: 1}
    },
    render() {
        switch(this.state.currentStep) {
            case 1:
                return <BookList />
            case 2:
                return <ShippingDetails />
            case 3:
                return <DeliveryDetails />
        }
    }
});