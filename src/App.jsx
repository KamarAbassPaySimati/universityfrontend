import './App.css'
import React from 'react'
import NavigationRoutes from './routes'
import { motion } from 'framer-motion'

function App (props) {
    const navigationPath = NavigationRoutes(props)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {navigationPath}
        </motion.div>
    )
}

export default App
