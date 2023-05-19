import './App.css';
import { useState } from 'react';
import FileUpload from './Components/FileUpload/FileUpload';
import Header from './Components/Header/Header';
import GenerateCaption from './Components/GenerateCaption/GenerateCaption';
import {Stack } from '@mui/material';
;

function App() {
  const [files, setFiles] = useState([])

  return (
    <div className="App">
      <Header/>
      <Stack direction='row'>
        <FileUpload files={files} setFiles={setFiles}/>
        <GenerateCaption/>
      </Stack>
    </div>
  );
}

export default App;