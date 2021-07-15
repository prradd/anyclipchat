import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

import defAvatar from '../assets/img/AnyClip_Default_Avatar_flat.png';

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";

const ImageUpload = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    const avatarUrl = selectedImage ?
        `${process.env.REACT_APP_SERVER_URL}/${selectedImage.filename}`
        : defAvatar;

    const useStyles = makeStyles((theme) => ({
        button: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            "&:before": {
                content: '""',
                position: 'absolute',
                display: 'block',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                backgroundImage: `url("${avatarUrl}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                backgroundSize: '100% 100%',
                borderRadius: '50%',
                opacity: '0.5'
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
                console.log(res.data.filename);
                setSelectedImage(res.data);
            })
    }

    // const avatar = () => {
    //     return (
    //         selectedImage ?
    //             <img src={`${process.env.REACT_APP_SERVER_URL}/${selectedImage.filename}`} alt="avatar"/>
    //             : <img src={defAvatar} alt="default avatar"/>
    //     )
    // }


    useEffect(() => {
        console.log(selectedImage);
    })

    return (
        <Box textAlign="center">
            <Button
                onClick={handleClick}
                variant="contained"
                className={classes.button}
                // style={{backgroundImage: ""}}
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
