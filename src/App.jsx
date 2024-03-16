import React from 'react';
import NavigationRoutes from './routes/routes';
import { motion } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { awsConfig } from './config';

Amplify.configure(awsConfig);

function App (props) {
    const navigationPath = NavigationRoutes(props);

    return (
        <motion.div>
            {navigationPath}
        </motion.div>
    );
}

export default App;
