import React from "react";

const Images = ({ data }) => {
    return (
        <div>
            {data ? data.map((item) => <img src={item.urls.thumb} />) : null}
        </div>
    );
};

export default Images;
