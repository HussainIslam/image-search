import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import Images from "../../Components/images/images";
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            searchResult: [],
            pageNumber: 1,
        };
    }

    componentDidMount() {}

    pullData() {
        const options = {
            headers: {
                Authorization:
                    "Client-ID " + process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            },
        };
        axios
            .get(
                `https://api.unsplash.com/search/photos?page=${this.state.pageNumber}&query=${this.state.searchString}&per_page=30`,
                options
            )
            .then((res) => {
                console.log(res);
                this.setState({
                    searchResult: res.data.results,
                    pageNumber: this.state.pageNumber + 1,
                });
            })
            .catch((error) => console.log(error));
    }

    handleSearch(event) {
        if (event.key === "Enter") {
            this.setState({ searchString: event.target.value }, (item) =>
                this.pullData()
            );
        }
    }

    render() {
        return (
            <div>
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
                <Images
                    data={
                        this.state.searchResult.length === 0
                            ? null
                            : this.state.searchResult
                    }
                />
            </div>
        );
    }
}

export default Home;
