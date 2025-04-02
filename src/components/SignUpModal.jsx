/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Backdrop, Modal, Fade, Box, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { auth } from '../config/Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import travelImage from '../assets/Images/travel-2.avif';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// eslint-disable-next-line react/prop-types
const SignUpModal = ({ open, onFormClose }) => {

    const [name, setName] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [isSignUp, setIsSignUp] = useState(false);
    const [tabVal, setTabVal] = useState(0);
    // const [errorMessage, setErrorMessage] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, signUpEmail, password);
            alert('User created Successfully!!');
        } catch (error) {
            console.error(error)
        }
    }
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginEmail, password);
            alert('Login Successfully!!')
        } catch (error) {
            console.error(error)
        }
    }
    const handleTabChange = (event, newVal) => {
        setTabVal(newVal);
    }
    const handleNameChange = (name) => {
        console.log('name: ', name);
        setName(name);
    }

    function CustomTabPanel (props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
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
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type='email'
                        id='signUpEmail'
                        name='signUpEmail'
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
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
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirm_password'
                        name='confirm_password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition-transform duration-300 hover:scale-110">
                    Register
                </button>
                <p>Already registered?<span onClick={() => setTabVal(1)}>Login here</span></p>
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
                        id='loginEmail'
                        name='loginEmail'
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
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
                    timeout: 300,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Tabs value={tabVal} onChange={handleTabChange}>
                                <Tab label='Login' {...a11yProps(0)} />
                                <Tab label='Sign Up' {...a11yProps(1)} />
                            </Tabs>
                            <CustomTabPanel value={tabVal} index={0}>
                                <LoginForm />
                            </CustomTabPanel>
                            <CustomTabPanel value={tabVal} index={1}>
                                <SignUpForm />
                            </CustomTabPanel>
                        </Grid>
                        <Grid size={6}>
                            <img src={travelImage} height='auto' />
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
}

export default SignUpModal;