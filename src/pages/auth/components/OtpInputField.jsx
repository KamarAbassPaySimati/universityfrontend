import React, { useEffect, useRef } from 'react';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const OtpInputField = ({ numInputs, otp, setOTP, setError, otpError, handleSubmit }) => {
    const inputRefs = useRef([]);

    // Otp change handle
    const handleInputChange = (e, index) => {
        let value = e.target.value;
        value = value.split('').at(-1);

        // Once reached the end remove focus so that when click any number again the number does not change
        // if (index === numInputs - 1) {
        //     const nextInput = inputRefs.current[index];
        //     nextInput.blur();
        // }

        // set OTP
        setOTP((prevOTP) => {
            const newOTP = [...prevOTP];
            newOTP[index] = value;
            return newOTP;
        });
        // focus on next input box
        if (index < numInputs - 1) {
            const nextInput = inputRefs.current[index + 1];
            nextInput.focus();
        }
    };

    // Otp paste handle
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const pastedChars = pastedData.split('').slice(0, numInputs);
        setOTP(pastedChars);
        for (let i = pastedChars.length; i < numInputs; i++) {
            setOTP((prevOTP) => {
                const newOTP = [...prevOTP];
                newOTP[i] = '';
                return newOTP;
            });
        }

        if (pastedChars.length > 0) {
            inputRefs.current[pastedChars.length - 1].focus();
        }
    };

    // Otp key down handle
    const handleKeyDown = (e, index) => {
        // Check if the Backspace key is pressed (keyCode 8) and if not at the beginning of the OTP
        if (index >= 0 && e.keyCode !== 13) {
            if (otp[index] === '' && e.keyCode === 8 && index !== 0) {
                inputRefs.current[index - 1].focus();
                setOTP((prevOTP) => {
                    const newOTP = [...prevOTP];
                    newOTP[index - 1] = '';
                    return newOTP;
                });
            } else {
                inputRefs.current[index].focus();
                setOTP((prevOTP) => {
                    const newOTP = [...prevOTP];
                    newOTP[index] = '';
                    return newOTP;
                });
            }
        }

        if (e.key === 'Delete') {
            e.preventDefault();
        }
    };

    // First Box Focus
    useEffect(() => {
        const firstBox = inputRefs.current[0];
        firstBox.focus();
    }, []);

    return (
        <div className='flex justify-center flex-col gap-2'>
            <div className="flex justify-between items-center">
                {Array.from({ length: 6 }).map((_, index) => (
                    <input
                        id={`digit-${index}`}
                        key={index}
                        type="password"
                        maxLength="1"
                        value={otp[index]}
                        onKeyDown={(e) => {
                            handleKeyDown(e, index);
                        }}
                        onChange={(e) => {
                            if (!/[^0-9]/g.test(e.target.value)) {
                                setError(false);
                                handleInputChange(e, index);
                            }
                        }}
                        onFocus={() => setError(false)}
                        onPaste={handlePaste}
                        ref={(input) => (inputRefs.current[index] = input)}
                        className={`w-11 h-11 bg-[#F5F5F5] rounded-[5px] outline-0 text-center text-[36px]
                    font-normal text-[#4F5962] caret-transparent focus:border-primary-normal focus:border`}
                    />
                ))}
            </div>
            <ErrorMessage error={otpError} />
        </div>
    );
};

export default OtpInputField;
