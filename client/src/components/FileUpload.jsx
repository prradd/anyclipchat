import React, {Fragment, useState} from 'react'
import axios from 'axios'
import PropTypes from "prop-types";


const FileUpload = ({setUploadedFIle, uploadedFile, imageArea = 'room'}) => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose file');

    const onChange = e => {

        if (e.target.files[0] && e.target.files[0].name) {
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
        }
        console.log(e.target.files);

    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {fileName, filePath} = res.data;

            setUploadedFIle({
                    ...uploadedFile,
                    [imageArea]: {fileName, filePath}
                }
            );

            setFilename('Choose file');

        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <label className="custom-file-label overflow-hidden" htmlFor="customFile">
                        {filename}
                    </label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </form>
        </Fragment>
    );
};

FileUpload.propTypes = {
    setUploadedFIle: PropTypes.func,
    imageArea: PropTypes.any
}

export default FileUpload
