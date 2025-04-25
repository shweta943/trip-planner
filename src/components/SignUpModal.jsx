/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Backdrop, Modal, Fade, Box, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { auth } from '../config/Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';
import travelImage from '../assets/Images/travel-2.avif';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    // backdropFilter: 'blur(20px)',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 0 0 2px #ffffff, 0 0 30px #90cdf4',
    padding: '32px',
};

// eslint-disable-next-line react/prop-types
const SignUpModal = ({ open, onFormClose, showSnackbar }) => {

    // const [isSignUp, setIsSignUp] = useState(false);
    const [tabVal, setTabVal] = useState(0);
    const [snackbarError, setSnackbarError] = useState('');

    const loginEmailRef = useRef(null);
    const loginPasswordRef = useRef(null);

    const signUpEmailRef = useRef(null);
    const signUpPasswordRef = useRef(null);
    const signUpConfirmPasswordRef = useRef(null);

    const handleTabChange = (event, newValue) => {
        setTabVal(newValue);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                id={`simple-tabpanel-${index}`}
                hidden={value !== index}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Box sx={{ p: 3, display: value === index ? 'block' : 'none' }}>
                    {children}
                </Box>
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

    const submitLoginForm = async (e) => {
        e.preventDefault();

        const loginEmail = loginEmailRef.current.value;
        const loginPassword = loginPasswordRef.current.value;

        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            // await show
            // setLoginForm(false);
        } catch (error) {
            console.error(error)
        }
    };

    const submitSignUpForm = async (e) => {
        e.preventDefault();
        const signUpEmail = signUpEmailRef.current.value;
        const signUpPassword = signUpPasswordRef.current.value;
        const signUpConfirmPassword = signUpConfirmPasswordRef.current.value;

        const errors = [];

        if (signUpPassword.length < 8) {
            setSnackbarError('Password must be at least 8 characters long.');
            showSnackbar(showSnackbar, 'error');
        }
        if (!/[A-Z]/.test(signUpPassword)) {
            setSnackbarError('Password must contain at least one uppercase letter.');
            showSnackbar(showSnackbar, 'error');
        }
        if (!/[a-z]/.test(signUpPassword)) {
            setSnackbarError('Password must contain at least one lowercase letter.');
            showSnackbar(showSnackbar, 'error');
        }
        if (!/[0-9]/.test(signUpPassword)) {
            setSnackbarError('Password must contain at least one number.');
            showSnackbar(showSnackbar, 'error');
        }
        if (!/[!@#$%^&*]/.test(signUpPassword)) {
            setSnackbarError('Password must contain at least one special character.');
            showSnackbar(showSnackbar, 'error');
        }
        if (signUpPassword !== signUpConfirmPassword) {
            setSnackbarError('Passwords do not match.');
            showSnackbar(showSnackbar, 'error');
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
            showSnackbar('User created successfully!', 'success');
            // setLoginForm(false);
        } catch (error) {
            console.error(error)
        }
    };

    const SignUpForm = () => {
        return (
            <form onSubmit={submitSignUpForm}>

                <div>
                    <label className='block text-sm/6 font-medium mt-6'>Email</label>
                    <input
                        id="email"
                        type="email"
                        ref={signUpEmailRef}
                        required
                        autoComplete
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mt-6">
                        <label htmlFor="password" className="block text-sm/6 font-medium">
                            Password
                        </label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            type="password"
                            ref={signUpPasswordRef}
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='confirm_password' className="block text-sm/6 font-medium mt-6">Confirm Password</label>
                    <input
                        id='confirm_password'
                        type='password'
                        ref={signUpConfirmPasswordRef}
                        autoComplete="current-confirm-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>

                <div className='mt-6'>
                    <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-orange-500/50 transition duration-300">
                        Register
                    </button>
                </div>

                {/* <p className='text-sm/6 font-medium text-gray-900 mt-6'>Already registered?
                    <span>
                        <button
                            onClick={() => setTabVal(1)}
                            className="ml-2 cursor-pointer text-blue-500 hover:underline"
                        >
                            Login here
                        </button>
                    </span>
                </p> */}
            </form>

        )

    }

    const LoginForm = () => {
        return (
            <form onSubmit={submitLoginForm}>
                <div>
                    <label htmlFor='email' className='text-sm/6 font-medium text-gray-900'>Email</label>
                    <input
                        id="loginId"
                        type="email"
                        ref={loginEmailRef}
                        required
                        autoComplete="true"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div className='mt-6'>
                    <label htmlFor='password' className='text-sm/6 font-medium text-gray-900'>Password</label>
                    <input
                        id="loginPassword"
                        type='password'
                        ref={loginPasswordRef}
                        required
                        autoComplete="true"
                        className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    />
                </div>
                <div className='mt-6'>
                    <button
                        className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-orange-500/50 transition duration-300"
                    >
                        Login
                    </button>
                </div>
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
                                <Tab label='Login' className='border-none' {...a11yProps(0)} />
                                <Tab label='Sign Up' className='border-none text-white' {...a11yProps(1)} />
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