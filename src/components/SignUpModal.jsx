import { useState } from 'react';
import { Backdrop, Modal, Fade, Box, DialogTitle, DialogContent } from '@mui/material';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SignUpModal = ({ open, onFormClose }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response: ', response);
        } catch (error) {
            console.error(error)
        }
    }
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('signinresponse: ', response);
        } catch (error) {
            console.error(error)
        }
    }

    const toggleForm = () => {
        setIsSignUp(false);
    }

    const SignUpForm = () => {
        return (
            <form onSubmit={handleCreateUser}>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='confirm_password'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='confirm_password'
                        name='confirm_password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Register</button>
                <p>Already registered?<span onClick={toggleForm}>Login here</span></p>
            </form>
        )
    }

    const LoginForm = () => {
        return (
            <form onSubmit={handleSignIn}>
                <div>
                    <label htmlFor='email'>Email</label>

                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' onClick={handleSignIn}>Login</button>
            </form>
        )
    }

    return (
        <Modal
            open={open}
            onClose={onFormClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <DialogTitle>{isSignUp ? 'Sign Up' : 'Login'}</DialogTitle>
                    <DialogContent>
                        {isSignUp ? (
                            <SignUpForm />) : (<LoginForm></LoginForm>)
                        }
                    </DialogContent>
                </Box>
            </Fade>
        </Modal>
    );
}

export default SignUpModal;