import React, { Component } from "react";
import { InputGroup, FormControl, Form, Button } from "react-bootstrap";
import Images from "../../Components/images/images";
import axios from "axios";
import S from "./Home.module.css";
import Logo from "../../assets/img_logo.png";

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
            itemsPerSection: "6",
            showOptions: false,
        };
        this.pullData = this.pullData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleFilterContent = this.handleFilterContent.bind(this);
        this.handleSortBy = this.handleSortBy.bind(this);
        this.handleOrientation = this.handleOrientation.bind(this);
        this.handleOrganize = this.handleOrganize.bind(this);
        this.handleItemNumber = this.handleItemNumber.bind(this);
        this.handleOption = this.handleOption.bind(this);
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

    handleOption(e) {
        this.setState({ showOptions: !this.state.showOptions });
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

    handleItemNumber(e) {
        this.setState({
            itemsPerSection: e.target.value,
        });
    }

    render() {
        return (
            <div onScroll={this.handleScroll}>
                <div className={S.mainContainer}>
                    <div className={S.primaryControls}>
                        <img className={S.logo} src={Logo} alt="logo" />
                        <InputGroup className={`mb-3 ${S.inputField}`}>
                            <InputGroup.Append className={S.inputAppend}>
                                <InputGroup.Text>Search Images</InputGroup.Text>
                            </InputGroup.Append>
                            <FormControl
                                placeholder="Enter text. Press enter."
                                aria-label="Search bar for images"
                                onKeyPress={this.handleSearch.bind(this)}
                                autoFocus
                                style={{ height: "inherit" }}
                            />
                        </InputGroup>
                        <Button
                            variant="secondary"
                            onClick={this.handleOption}
                            className={S.optionButton}
                        >
                            Options
                        </Button>
                    </div>
                    {this.state.showOptions ? (
                        <div className={S.controlsContainer}>
                            <Form.Control
                                as="select"
                                size="sm"
                                onChange={this.handleSortBy}
                            >
                                <option>Relevance</option>
                                <option>Latest</option>
                            </Form.Control>
                            <Form.Control
                                as="select"
                                size="sm"
                                className={S.orientationSelect}
                                onChange={this.handleOrientation}
                            >
                                <option value="All">All Orientation</option>
                                <option value="landscape">Landscape</option>
                                <option value="portrait">Portrait</option>
                                <option value="squarish">Squarish</option>
                            </Form.Control>
                            <Form.Control
                                as="select"
                                size="sm"
                                onChange={this.handleColor}
                            >
                                <option value="All">All Color</option>
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
                            <Form.Control
                                as="select"
                                size="sm"
                                className={S.organization}
                                onChange={this.handleOrganize}
                            >
                                <option value="row">Row</option>
                                <option value="column" selected>
                                    Column
                                </option>
                            </Form.Control>
                            <Form.Control
                                as="select"
                                size="sm"
                                className={S.numberOfItem}
                                onChange={this.handleItemNumber}
                            >
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6" selected>
                                    6
                                </option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>
                        </div>
                    ) : null}
                </div>
                <Images
                    data={
                        this.state.searchResult.length === 0
                            ? null
                            : this.state.searchResult
                    }
                    organizeBy={this.state.organizeBy}
                    itemsPerSection={this.state.itemsPerSection}
                />
            </div>
        );
    }
}

export default Home;
