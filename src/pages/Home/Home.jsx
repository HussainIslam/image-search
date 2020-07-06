import React, { Component } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import Images from "../../Components/images/images";
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            searchResult: [],
            pageNumber: 1,
            orderBy: "relevant", //relevant, latest
            contentFilter: "low", //low, high
            imageColor: "", //black_and_white, black, white, yellow, orange, red, purple, magenta, green, teal, blue
            orientation: "", // landscape, portrait, squarish
        };
        this.pullData = this.pullData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillMount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

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
                    searchResult: this.state.searchResult.concat(
                        res.data.results
                    ),
                    pageNumber: this.state.pageNumber + 1,
                });
            })
            .catch((error) => console.log(error));
    }

    handleSearch(event) {
        if (event.key === "Enter") {
            this.setState(
                {
                    searchString: event.target.value,
                    searchResult: [],
                    pageNumber: 1,
                },
                (item) => this.pullData()
            );
        }
    }

    handleScroll(e) {
        const bottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (bottom) {
            this.pullData();
        }
    }

    render() {
        return (
            <div onScroll={this.handleScroll}>
                <div
                    style={{
                        display: "flex",
                        width: "90vw",
                        margin: "20px auto 20px auto",
                    }}
                >
                    <InputGroup
                        className="mb-3"
                        style={{
                            width: "60%",
                            height: "40px",
                            margin: "10px",
                            alignSelf: "center",
                        }}
                    >
                        <InputGroup.Append style={{ height: "inherit" }}>
                            <InputGroup.Text>Search</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl
                            placeholder="Enter text. Press enter."
                            aria-label="Search bar for images"
                            onKeyPress={this.handleSearch.bind(this)}
                            autoFocus
                            style={{ height: "inherit" }}
                        />
                    </InputGroup>
                    <Form.Group
                        style={{
                            height: "40px",
                            margin: "10px",
                            fontSize: ".8em",
                        }}
                    >
                        <Form.Control as="select" size="sm">
                            <option>Relevance</option>
                            <option>Latest</option>
                        </Form.Control>
                        <Form.Check
                            type={"checkbox"}
                            label={"Filter Contents"}
                            style={{ margin: "5px" }}
                        />
                    </Form.Group>
                    <Form.Group
                        style={{
                            margin: "5px",
                            fontSize: "0.8em",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Form.Control
                            as="select"
                            size="sm"
                            style={{ margin: "5px" }}
                        >
                            <option>Landscape</option>
                            <option>Portrait</option>
                            <option>Squarish</option>
                        </Form.Control>
                        <Form.Control as="select" size="sm">
                            <option>B & W</option>
                            <option>Black</option>
                            <option>White</option>
                            <option>Yellow</option>
                            <option>Orange</option>
                            <option>Red</option>
                            <option>Purple</option>
                            <option>Magenta</option>
                            <option>Green</option>
                            <option>Teal</option>
                            <option>Blue</option>
                        </Form.Control>
                    </Form.Group>
                </div>
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
