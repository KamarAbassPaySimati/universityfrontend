/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import NavigationRoutes from './routes/routes';
import { motion } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { awsConfig, STAGE } from './config';
import Toast from './components/Toast/Toast';
import GlobalContext from './components/Context/GlobalContext';
import { Hub } from 'aws-amplify/utils';
import { dataService } from './services/data.services';
import { endpoints } from './services/endpoints';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { login, logout, setUser } from './pages/auth/authSlice';
import { useDispatch } from 'react-redux';

import { AwsRum } from 'aws-rum-web';
// console.log(STAGE);
if (STAGE?.includes('prod')) {
    let awsRum = null;
    try {
        console.log('dev', STAGE);
        const config = {
            sessionSampleRate: 1,
            identityPoolId: 'eu-west-1:e076455e-09ba-4dea-be50-9547bf91779d',
            endpoint: 'https://dataplane.rum.eu-west-1.amazonaws.com',
            telemetries: ['performance', 'errors', 'http'],
            allowCookies: true,
            enableXRay: false
        };

        const APPLICATION_ID = 'b8fe1828-224d-4f33-bc94-f655dad022e9';
        const APPLICATION_VERSION = '1.0.0';
        const APPLICATION_REGION = 'eu-west-1';

        // eslint-disable-next-line no-unused-vars
        awsRum = new AwsRum(
            APPLICATION_ID,
            APPLICATION_VERSION,
            APPLICATION_REGION,
            config
        );
        console.log('sakjd');
    } catch (error) {
        console.log(error);
        // Ignore errors thrown during CloudWatch RUM web client initialization
    }
}

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

    useEffect(() => {
        Hub.listen('auth', async ({ payload }) => {
            switch (payload.event) {
            case 'tokenRefresh':
                try {
                    const userAttributes = await fetchUserAttributes();

                    if (userAttributes) {
                        dispatch(setUser(userAttributes));
                        dispatch(login());
                    }
                } catch (error) {
                    if (
                        ((error.message.includes('User needs to be authenticated')) ||
                        (error.name === 'UserUnAuthenticatedException') ||
                       (error.message.includes('Access Token has been revoked')) || (error.name === 'NotAuthorizedException'))) {
                        dispatch(setUser(''));
                        if (localStorage.getItem('userLogedIn')) {
                            setToastError('user session failed!');
                        }
                        dispatch(logout());
                    }
                }
                try {
                    const response = await dataService.PatchAPI(`admin-users/${updateLoggedIn}`);
                    console.log('response of hub api', response);
                } catch (error) {
                    console.log('auth tokens have not been refreshed.');
                }
                console.log('auth tokens have been refreshed.');
                break;
            case 'signedIn':
                // Call api
                try {
                    const response = await dataService.PatchAPI(`admin-users/${updateLoggedIn}`);
                    console.log('response of hub api', response);
                } catch (error) {
                    console.log('auth tokens have not been refreshed.');
                }
                console.log('auth tokens have been refreshed.');
                break;
            case 'tokenRefresh_failure':
                // dispatch(logout());
                // navigate('/');
                // setToastError('Logged out due to session expiration');
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
