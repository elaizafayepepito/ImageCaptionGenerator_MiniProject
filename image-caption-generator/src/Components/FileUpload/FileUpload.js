import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FileUpload.scss';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const uploadHandler = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
  };

  return (
    <div className='file-image-section'>
      <div>
          {file && (
            <img className="uploaded-image" src={URL.createObjectURL(file)} alt={file.name} />
          )}
      </div>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload Image
          </button>
        </div>
        <h5 className="info">Supported files: JPG, PNG</h5>
      </div>
    </div>
  );
};

export default FileUpload;
