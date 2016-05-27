import React from 'react';
import ReactDOM from 'react-dom';

var BookList = React.createClass({
    getInitialState() {
        return { 
            books: [
                { id: 1, name: "Zero to One", author: "Peter Thiel" },
                { id: 2, name: "Monk Who Sold Ferrari", author: "Robin Sharma" },
                { id: 3, name: "Wings of Fire", author: "APJ Kalam"}
            ],
            selectedBooks: [],
            error: false
        }
    },
    _renderError() {
        if( this.state.error )
            return <div className="alert alert-danger">{this.state.error}</div>;
    },
    _renderBook(book) {
        return (
            <div className="checkbox" key={book.id}>
                <label>
                    <input type="checkbox" value={book.name} onChange={this.handleSelectedBooks} />
                    {book.name} -- {book.author}
                </label>
            </div>
        )
    },
    handleSelectedBooks(event) {
        var selectedBooks = this.state.selectedBooks;
        var index = selectedBooks.indexOf(event.target.value);

        if( event.target.checked ) {
            if (index === -1)
                selectedBooks.push(event.target.value);
        } else {
            selectedBooks.splice(index,1);
        }
        console.log("handleSelectedBooks");
        console.log(index);
        console.log(selectedBooks);

        this.setState({selectedBooks: selectedBooks});
    },
    handleSubmit(event) {
        console.log("handleSubmit");
        console.log(event);
        event.preventDefault();
        if( this.state.selectedBooks.length === 0 ) {
            this.setState({error: "Please select a book."});
        } else {
            this.setState({error: false});
            this.props.updateFormData({selectedBooks: this.state.selectedBooks});
        }
        console.log(this.state.error)
        console.log(this.state.selectedBooks);
    },
    render() {
        var errorMessage = this._renderError();
        return (
            <div>
                <h3>Choose a book:</h3>
                {errorMessage}
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.books.map((book) => {
                            return this._renderBook(book);
                        })
                    }
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
});

var BookStore = React.createClass({
    getInitialState() {
        return {currentStep: 1, formValues: {}}
    },
    updateFormData(formData) {
        var formValues = Object.assign({}, this.state.formValues, formData);
        var currentStep = Math.max(this.state.currentStep+1, 3);
        this.setState({formValues: formValues, currentStep: currentStep});
    },
    render() {
        switch(this.state.currentStep) {
            case 1:
                return <BookList updateFormData={this.updateFormData} />;
            case 2:
                return <ShippingDetails updateFormData={this.updateFormData} />;
            case 3:
                return <DeliveryDetails updateFormData={this.updateFormData} />;
        }
    }
});

ReactDOM.render(<BookStore />, document.getElementById('root'));