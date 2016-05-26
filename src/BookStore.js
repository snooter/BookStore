import React from 'react';

var BookList = React.createClass({
    render() {
        return (
            <h1>
                Choose a book:
            </h1>
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
    render() {
        switch(step) {
            case 1:
                return <BookList />
            case 2:
                return <ShippingDetails />
            case 3:
                return <DeliveryDetails />
        }
    }
});