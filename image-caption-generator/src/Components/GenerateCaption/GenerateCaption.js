import React, { useState } from 'react';
import './GenerateCaption.css';
import { Stack } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GenerateCaption = ({filename}) => {
  const [caption, setCaption] = useState('');
  const [showCaption, setShowCaption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /*const generateCaption = () => {
    const randomCaption = filename;
    setCaption(randomCaption);
    setShowCaption(true);
  };*/

  const generateCaption = async () => {
    try {
      setIsLoading(true);

      const file = new File([filename], filename, { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://127.0.0.1:5000/process-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const { description } = data;
        setCaption(description);
        setShowCaption(true);
      } else {
        const { error } = data;
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
  };

  return (
    <div className='caption-section'>
      <Stack direction='row'>
        <div className='caption-container'>
          {/*showCaption && <p>{caption}</p>*/}
          {isLoading ? (
            <div className="loading-spinner"></div> // Display the loading spinner
          ) : (
            showCaption && <p>{caption}</p>
          )}
        </div>
        <CopyToClipboard text={caption} onCopy={handleCopy}>
          <button className='copy-btn'>Copy</button>
        </CopyToClipboard>
      </Stack>
      <div>
        <button className="caption-btn" onClick={generateCaption} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Caption'}
        </button>
      </div>
    </div>
  );
};

export default GenerateCaption;