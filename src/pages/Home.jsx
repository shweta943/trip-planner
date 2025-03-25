import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SignUpModal from '../components/SignUpModal';

const Home = () => {
    const [formModal, setFormModal] = useState(false);

    useEffect(() => {
        console.log("formModal state changed:", formModal);
    }, [formModal]);

    return (
        <>
            <h1>Hello there!!!</h1>
            <h2>Your Dream Trip, Designed by AI</h2>
            <Button variant="outlined" onClick={() => setFormModal(true)}>Get Itenary</Button>

            {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />}
        </>
    )
}

export default Home;