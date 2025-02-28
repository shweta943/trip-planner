import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SignUpModal from './SignUpModal';

const HomeHeroSection = () => {
    const [formModal, setFormModal] = useState(false);

    useEffect(() => {
        console.log("formModal state changed:", formModal);
    }, [formModal]);

    return (
        <>
            <h1>Hello there!!!</h1>
            <h2>Lets get an Itenary designed for you!!</h2>
            <Button variant="outlined" onClick={() => setFormModal(true)}>Sign Up</Button>

            {formModal && <SignUpModal open={formModal} onFormClose={() => setFormModal(false)} />}
        </>
    )
}

export default HomeHeroSection;