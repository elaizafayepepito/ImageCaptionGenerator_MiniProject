import React, { useState } from 'react';
import './GenerateCaption.css';
import { Stack } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const GenerateCaption = () => {
  const [caption, setCaption] = useState('');
  const [showCaption, setShowCaption] = useState(false);

  const generateCaption = () => {
    const randomCaption = 'This is a generated caption.';
    setCaption(randomCaption);
    setShowCaption(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
  };

  return (
    <div className='caption-section'>
      <Stack direction='row'>
        <div className='caption-container'>
          {showCaption && <p>{caption}</p>}
        </div>
        <CopyToClipboard text={caption} onCopy={handleCopy}>
          <button className='copy-btn'>Copy</button>
        </CopyToClipboard>
      </Stack>
      <div>
        <button className="caption-btn" onClick={generateCaption}>
          Generate Caption
        </button>
      </div>
    </div>
  );
};

export default GenerateCaption;