import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            searchResult: "",
        };
    }

    componentDidMount() {}

    handleSearch(event) {
        if (event.key === "Enter") {
            this.setState({ searchString: event.target.value }, () => {
                console.log(process.env.REACT_APP_UNSPLASH_ACCESS_KEY);
                const options = {
                    headers: {
                        Authorization:
                            "Client-ID " +
                            process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
                    },
                };
                axios
                    .get(
                        "https://api.unsplash.com/search/photos?page=1&query=office",
                        options
                    )
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
            });
        }
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search images here"
                    aria-label="Search bar for images"
                    onKeyPress={this.handleSearch.bind(this)}
                />
                <InputGroup.Append>
                    <InputGroup.Text>Search</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default Home;
