import './App.css';
import { useState } from 'react';
import FileUpload from './Components/FileUpload/FileUpload';
import Header from './Components/Header/Header';
import GenerateCaption from './Components/GenerateCaption/GenerateCaption';
import {Stack } from '@mui/material';
;

function App() {
  const [files, setFiles] = useState([])
  const [filename, setFilename] = useState("");

  const handleGetFilename = (data) => {
    setFilename(data);
  }
  return (
    <div className="App">
      <Header/>
      <Stack direction='row'>
        <FileUpload files={files} setFiles={setFiles} getFilename={handleGetFilename}/>
        <GenerateCaption filename={filename}/>
      </Stack>
    </div>
  );
}

export default App;