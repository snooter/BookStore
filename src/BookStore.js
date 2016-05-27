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
    getInitialState() {
        return {
            fullName: '', contactNumber: '', shippingAddress: '', error: false
        };
    },
    _renderError() {
        if( this.state.error )
            return <div className="alert alert-danger">{this.state.error}</div>;
    },
    _validateInput() {
        if( this.state.fullName === '' ) {
            this.setState({error: "Please enter your full name."});
        } else if( this.state.contactNumber === '' ) {
            this.setState({error: "Please enter your contact number."});
        } else if( this.state.shippingAddress === '' ) {
            this.setState({error: "Please enter your shipping address."});
        } else {
            this.setState({error: false});
            return true;
        }
    },
    handleSubmit(event) {
        event.preventDefault();
        var formData = {
            fullName: this.state.fullName, contactNumber: this.state.contactNumber, shippingAddress: this.state.shippingAddress
        };
        if( this._validateInput() )
            this.props.updateFormData(formData);
    },
    handleChange(event, attribute) {
        var newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
        console.log(this.state);
    },
    render() {
        var errorMessage = this._renderError();
        return <div>
            <h1>Enter shipping info:</h1>
            {errorMessage}

            <div style={{width: 200}}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group"> <input className="form-control" type="text" placeholder="Full Name" value={this.state.fullName} onChange={(event) => this.handleChange(event, 'fullName')} /> </div>
                    <div className="form-group"> <input className="form-control" type="text" placeholder="Contact number" value={this.state.contactNumber} onChange={(event) => this.handleChange(event, 'contactNumber')}/> </div>
                    <div className="form-group"> <input className="form-control" type="text" placeholder="Shipping Address" value={this.state.shippingAddress} onChange={(event) => this.handleChange(event, 'shippingAddress')} /> </div>
                    <div className="form-group"> <button type="submit" ref="submit" className="btn btn-success"> Submit </button></div>
                </form>
            </div>
        </div>;
    }
});

var DeliveryDetails = React.createClass({
    getInitialState() {
        return {
            deliveryOption: 'Primary'
        }
    },
    handleChange(event) {
        this.setState({deliveryOption: event.target.value});
    },
    handleSubmit(event) {
        event.preventDefault();
        this.props.updateFormData({deliveryOption: this.state.deliveryOption});
    },
    render() {
        return <div>
            <h1>Choose delivery option:</h1>

            <form onSubmit={this.handleSubmit}>
            <select onChange={(event) => this.handleChange(event)}>
                <option value="Primary">Primary</option>
                <option value="Normal">Normal</option>
            </select>

            <input type="submit" value="Save" />
            </form>
        </div>;
    }
});

var Confirmation = React.createClass({
    render() {
        return <div>
            Thanks! {this.props.data.fullName}
        </div>;
    }
});

var BookStore = React.createClass({
    getInitialState() {
        return {currentStep: 1, formValues: {}}
    },
    updateFormData(formData) {
        var formValues = Object.assign({}, this.state.formValues, formData);
        var currentStep = Math.min(this.state.currentStep+1, 4);
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
            case 4:
                return <Confirmation data={this.state.formValues} />;
        }
    }
});

ReactDOM.render(<BookStore />, document.getElementById('root'));