import React, { useEffect, useState } from 'react';
import NavigationRoutes from './routes/routes';
import { motion } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { awsConfig } from './config';
import Toast from './components/Toast/Toast';
import GlobalContext from './components/Context/GlobalContext';
import useGlobalSignout from './CommonMethods/globalSignout';
import { Hub } from 'aws-amplify/utils';
import { dataService } from './services/data.services';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { endpoints } from './services/endpoints';
import { logout } from './pages/auth/authSlice';

Amplify.configure(awsConfig);

function App (props) {
    const navigationPath = NavigationRoutes(props);
    const [ToastSuccess, setToastSuccess] = useState('');
    const [ToastSuccessBottom, setToastSuccessBottom] = useState('');
    const [ToastError, setToastError] = useState('');
    const [ToastWarning, setToastWarning] = useState('');
    const [ToastInformation, setToastInformation] = useState('');
    const { updateLoggedIn } = endpoints;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useGlobalSignout();
    useEffect(() => {
        Hub.listen('auth', async ({ payload }) => {
            switch (payload.event) {
            case 'tokenRefresh':
            case 'signedIn':
                // Call api
                try {
                    const response = await dataService.PatchAPI(updateLoggedIn);
                    console.log('response of hub api', response);
                } catch (error) {
                    console.log('auth tokens have not been refreshed.');
                }
                console.log('auth tokens have been refreshed.');
                break;
            case 'tokenRefresh_failure':
                dispatch(logout());
                navigate('/');
                setToastError('Logged out due to session expiration');
                break;
            }
        });
    }, []);

    return (
        <GlobalContext.Provider value={{
            setToastSuccess,
            setToastError,
            setToastWarning,
            setToastInformation,
            setToastSuccessBottom
        }}>
            <motion.div className='overflow-x-hidden h-screen relative'>
                {ToastSuccess !== '' && <Toast
                    message={ToastSuccess}
                    type="success"
                    setToastmessage={setToastSuccess} />}
                {ToastSuccessBottom !== '' && <Toast
                    bottom={true}
                    message={ToastSuccessBottom}
                    type="success"
                    setToastmessage={setToastSuccessBottom} />}
                {ToastError !== '' && <Toast
                    message={ToastError}
                    type="error"
                    setToastmessage={setToastError} />}
                {ToastWarning !== '' && <Toast
                    message={ToastWarning}
                    type="warning"
                    setToastmessage={setToastWarning} />}
                {ToastInformation !== '' && <Toast
                    message={ToastInformation}
                    type="info"
                    setToastmessage={setToastInformation}
                />}
                {navigationPath}
            </motion.div>
        </GlobalContext.Provider>
    );
}

export default App;
