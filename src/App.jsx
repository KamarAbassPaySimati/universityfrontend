import React, { useState } from 'react';
import NavigationRoutes from './routes/routes';
import { motion } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { awsConfig } from './config';
import Toast from './components/Toast/Toast';
import GlobalContext from './components/Context/GlobalContext';

Amplify.configure(awsConfig);

function App (props) {
    const navigationPath = NavigationRoutes(props);
    const [ToastSuccess, setToastSuccess] = useState('hello');
    const [ToastError, setToastError] = useState('');
    const [ToastWarning, setToastWarning] = useState('');
    const [ToastInformation, setToastInformation] = useState('');

    return (
        <GlobalContext.Provider value={{ setToastSuccess, setToastError, setToastWarning, setToastInformation }}>
            <motion.div>
                {ToastSuccess !== '' && <Toast
                    message={ToastSuccess}
                    type="success"
                    setToastmessage={setToastSuccess} />}
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
