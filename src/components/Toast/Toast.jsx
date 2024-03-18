/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../Image/Image';

const Toast = ({ message, type, setToastmessage }) => {
    const [showToast, setShowToast] = useState(true);

    /* This `useEffect` hook is setting a timer using `setTimeout` function to hide the toast message
    after 5 seconds (5000 milliseconds) and also resetting the `toastMessage` state to an empty
    string. The `clearTimeout` function is used to clear the timer when the component unmounts. The
    empty dependency array `[]` ensures that this effect runs only once when the component mounts. */
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToast(false);
            setToastmessage('');
        }, 7000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {showToast && (
                <motion.div
                    initial={{ x: 1000 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                    exit={{ opacity: 0.5 }}
                    onClick={() => { setShowToast(!showToast); setToastmessage(''); }}
                    style={{ zIndex: '999' }}
                    className={`rounded-[4px] px-5 py-[15px] flex absolute top-7 right-5 items-center z-50 gap-4
                        ${type === 'success'
                    ? 'bg-[#13B681]'
                    : type === 'warning'
                        ? 'bg-[#FEC87E]'
                        : type === 'error' ? 'bg-[#FF6363]' : 'bg-[#0066F6]'}`} >
                    <span>
                        {<Image src={`toast-${type}`} />}
                    </span>
                    <p className="font-[400] text-[14px] leading-[24px] text-[#fff]" id="toast-message">{message}</p>
                </motion.div>
            )}
        </>
    );
};

export default Toast;
