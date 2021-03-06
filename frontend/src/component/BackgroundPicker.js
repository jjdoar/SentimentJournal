import { requirePropFactory } from "@material-ui/core";
import React, { useState } from "react";
import { createApi } from 'unsplash-js';

//require('dotenv').config();

export default function BackgroundPicker() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);

    const unsplash = createApi({
        accessKey: "mJH3HcHVba0nK8uyHWGx2QNOZJa1soCIYinYYQRlv8Y"
    });

    const searchBackground = async (e) => {
        e.preventDefault();
        unsplash.search.getPhotos({
            query: query,
            page: 1,
            perPage: 12,
            orderBy: 'relevant',
            orientation: 'landscape'})
            .then(result => {
                if (!result.errors) {
                    const { results } = result.response;
                    setImages( results );
                }
            });
    };

    const setBackground = (image) => {
        document.body.style.background = 'url(' + image + ') no-repeat center center fixed';
        document.body.style.backgroundSize = 'cover';
    };

    return(
        <>
            <form onSubmit={searchBackground}>
                <h3>Pick a background!</h3>
                <input
                    type="text"
                    placeholder={'Enter "ocean", "beach", ...'}
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                />
                <button type="submit">&#x1f50d;</button>
            </form>
            <div>
                {
                    images.map((image) => 
                        <img src={image.urls.small} // or image.urls.thumb
                            width="30%"
                            height="30%"
                            onClick={() => setBackground(image.urls.full)}></img>
                    )
                }
            </div>
        </>
    )
}