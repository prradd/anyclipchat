import React, {useContext, useRef} from 'react';
import {ChatContext} from "../ChatContext";

import axios from 'axios';

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import makeStyles from "@material-ui/core/styles/makeStyles";

const ImageUpload = () => {

    const {selectedImage, setSelectedImage} = useContext(ChatContext);

    const useStyles = makeStyles(() => ({
        button: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            "&:before": { // Set avatar image
                content: '""',
                position: 'absolute',
                display: 'block',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                backgroundImage: `url("${selectedImage}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                backgroundSize: '100% 100%',
                borderRadius: '50%',
                opacity: '0.5',
            },
        },
        input: {
            display: 'none'
        }
    }));

    const classes = useStyles();

    const imageUploadRef = useRef();

    // Button click will execute the hidden input type file
    const handleClick = () => {
        imageUploadRef.current.click();
    }

    // When the file is chosen it will be uploaded automatically
    const handleChange = e => {
        const data = new FormData();
        data.append('file', e.target.files[0]);

        // TODO uri to env property
        axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, data, {} )
            .then((res) => {
                if (res.data.filename)
                    setSelectedImage(`${process.env.REACT_APP_SERVER_URL}/public/${res.data.filename}`);
            })
    }

    return (
        <Box textAlign="center">
            <Button
                onClick={handleClick}
                variant="contained"
                className={classes.button}
                startIcon={<CloudUploadIcon/>}
            >
                <input type="file"
                       ref={imageUploadRef}
                       id="imageUpload"
                       className={classes.input}
                       onChange={handleChange}
                />
            </Button>
        </Box>
    );
};

export default ImageUpload;
