import React, { Component } from "react";
import Gallery from "react-photo-gallery";

class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noData: true,
            parsingData: false,
            parsedData: [],
        };
    }

    render() {
        const data = this.props.data
            ? this.props.data.map((item) => {
                  const container = {};
                  container.src = item.urls.thumb;
                  container.width = item.width;
                  container.height = item.height;
                  return container;
              })
            : null;
        return data ? <Gallery photos={data} /> : null;
    }
}

export default Images;
