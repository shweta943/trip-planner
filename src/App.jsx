// import { useState } from 'react'
import Button from '@mui/material/Button';
import { useState } from 'react';
import './App.css'
import LoginFormModal from './components/LoginForm';

const App = () => {
  
  const [ formModal, setFormModal ] = useState(false);
  return (
    <>
      <h1>Hello there!!!</h1>
      <h2>Lets get an Itenary designed for you!!</h2>
      <Button variant="outlined" onClick={() => setFormModal(true)}>Sign Up</Button>

      {formModal && (
        <LoginFormModal />
      )}
    </>
  )
}
export default App;
