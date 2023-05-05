import React from 'react'
import "./FileUploader.css";

const FileUploader = ({state}) => {

    let fileChange = (e) => {
        console.log(e.target);
        state(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div>
            <input id='open-file' name="imgFile" type="file"  onChange={fileChange} />
        </div>
    )
}

export default FileUploader