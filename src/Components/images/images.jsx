import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const Images = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const data = props.data
        ? props.data.map((item) => {
              const container = {};
              container.src = item.urls.thumb;
              container.width = item.width;
              container.height = item.height;
              container.large = item.urls.regular;
              return container;
          })
        : null;
    const customStyles = {
        view: (base) => ({
            ...base,
            height: "90vh",
        }),
    };
    return (
        <div>
            {data ? (
                <Gallery
                    photos={data}
                    direction={props.organizeBy}
                    columns={props.itemsPerSection}
                    onClick={openLightbox}
                />
            ) : null}
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            styles={customStyles}
                            views={data.map((x) => ({
                                source: x.large,
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default Images;
