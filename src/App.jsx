import React, { useState } from 'react';
import NavigationRoutes from './routes/routes';
import { motion } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { awsConfig } from './config';
import Toast from './components/Toast/Toast';
import GlobalContext from './components/Context/GlobalContext';
import useGlobalSignout from './CommonMethods/globalSignout';

Amplify.configure(awsConfig);

function App (props) {
    const navigationPath = NavigationRoutes(props);
    const [ToastSuccess, setToastSuccess] = useState('');
    const [ToastSuccessBottom, setToastSuccessBottom] = useState('');
    const [ToastError, setToastError] = useState('');
    const [ToastWarning, setToastWarning] = useState('');
    const [ToastInformation, setToastInformation] = useState('');

    useGlobalSignout();

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
