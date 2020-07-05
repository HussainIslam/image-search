import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
        };
    }

    handleSearch(event) {
        this.setState({ searchString: event.target.value }, () =>
            console.log(this.state.searchString)
        );
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search images here"
                    aria-label="Search bar for images"
                    onChange={this.handleSearch.bind(this)}
                />
                <InputGroup.Append>
                    <InputGroup.Text>Search</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default Home;
