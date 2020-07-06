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
            organizeBy: "column", //column, row
        };
        this.pullData = this.pullData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleFilterContent = this.handleFilterContent.bind(this);
        this.handleSortBy = this.handleSortBy.bind(this);
        this.handleOrientation = this.handleOrientation.bind(this);
        this.handleOrganize = this.handleOrganize.bind(this);
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
                `https://api.unsplash.com/search/photos?page=${
                    this.state.pageNumber
                }&query=${this.state.searchString}&per_page=30&order_by=${
                    this.state.orderBy
                }&content_filter=${this.state.contentFilter}${
                    this.state.orientation === ""
                        ? ""
                        : "&orientation=" + this.state.orientation
                }${
                    this.state.imageColor === ""
                        ? ""
                        : "&color=" + this.state.imageColor
                }`,
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

    handleSortBy(e) {
        this.setState(
            {
                orderBy: e.target.value,
                searchResult: [],
                pageNumber: 1,
            },
            (item) => this.pullData()
        );
    }

    handleOrientation(e) {
        this.setState(
            {
                orientation: e.target.value === "All" ? "" : e.target.value,
                searchResult: [],
                pageNumber: 1,
            },
            (item) => this.pullData()
        );
    }

    handleColor(e) {
        this.setState(
            {
                imageColor: e.target.value === "All" ? "" : e.target.value,
                searchResult: [],
                pageNumber: 1,
            },
            (item) => this.pullData()
        );
    }

    handleFilterContent(e) {
        if (this.state.contentFilter === "low") {
            this.setState(
                { contentFilter: "high", searchResult: [], pageNumber: 1 },
                (item) => this.pullData()
            );
        } else {
            this.setState(
                { contentFilter: "low", searchResult: [], pageNumber: 1 },
                (item) => this.pullData()
            );
        }
    }

    handleOrganize(e) {
        this.setState({
            organizeBy: this.state.organizeBy === "column" ? "row" : "column",
        });
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
                        <Form.Control
                            as="select"
                            size="sm"
                            onChange={this.handleSortBy}
                        >
                            <option>Relevance</option>
                            <option>Latest</option>
                        </Form.Control>
                        <Form.Check
                            type={"checkbox"}
                            label={"Filter Contents"}
                            style={{ margin: "5px" }}
                            onChange={this.handleFilterContent}
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
                            onChange={this.handleOrientation}
                        >
                            <option value="All">All</option>
                            <option value="landscape">Landscape</option>
                            <option value="portrait">Portrait</option>
                            <option value="squarish">Squarish</option>
                        </Form.Control>
                        <Form.Control
                            as="select"
                            size="sm"
                            onChange={this.handleColor}
                        >
                            <option value="All">All</option>
                            <option value="black_and_white">B & W</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="yello">Yellow</option>
                            <option value="orange">Orange</option>
                            <option value="red">Red</option>
                            <option value="purple">Purple</option>
                            <option value="magenta">Magenta</option>
                            <option value="green">Green</option>
                            <option value="teal">Teal</option>
                            <option value="blue">Blue</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="select"
                            size="sm"
                            style={{ margin: "5px" }}
                            onChange={this.handleOrganize}
                        >
                            <option value="row">Organize by row</option>
                            <option value="column" selected>
                                Organize by column
                            </option>
                        </Form.Control>
                    </Form.Group>
                </div>
                <Images
                    data={
                        this.state.searchResult.length === 0
                            ? null
                            : this.state.searchResult
                    }
                    organizeBy={this.state.organizeBy}
                />
            </div>
        );
    }
}

export default Home;
