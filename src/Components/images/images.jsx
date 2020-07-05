import React, { Component } from "react";
import Gallery from "react-photo-gallery";

class Images extends Component {
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
        return data ? (
            <Gallery photos={data} direction={"column"} columns={6} />
        ) : null;
    }
}

export default Images;
