import React, { useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import { dataService } from '../../../services/data.services';
import Button from '../../../components/Button/Button';
import emailValidation from '../../../CommonMethods/emailValidtion';
import Button2 from '../../../components/Button2/Button2';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordEmail = ({ setIsSuccess }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // regex check for email and call the api
    const handleClick = async (e) => {
        e.preventDefault();
        if (email === '') {
            setError('This field is mandatory');
        } else if (!emailValidation(email)) {
            setError('Invalid Email');
            setIsSuccess(false); // Set isSuccess to false since the email is invalid
        } else {
            try {
                setIsLoading(true);
                const response = await dataService.PostAPIWithoutHeader('send-reset-link', { email_address: email });
                console.log(response, 'Forgot Password response:');
                if (!response.error) {
                    setIsSuccess(true);
                } else if (response?.data?.status === 404) {
                    setError(response?.data?.data?.message);
                    setIsLoading(false);
                    setIsSuccess(false);
                } else {
                    setIsLoading(false);
                    setIsSuccess(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                setIsSuccess(false);
            }
        }
    };
    // set the email
    const changeHandler = (e) => {
        setEmail(e.target.value);
    };
    const focusHandler = () => {
        setError('');
    };
    const handleBacktoLogin = () => {
        navigate('/');
    };
    return (
        <div className='z-20 bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
            <div className='flex justify-center items-center mb-9'>
                <img src='/images/logo.svg' />
            </div>
            <div>
                <div className='mb-9'>
                    <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                        Reset Password
                    </div>
                    <div className='text-neutral-secondary font-[400] text-[14px] leading-[24px]'>
                        Enter registered email to reset your password
                    </div>
                </div>
                <form className='flex flex-col gap-[16px]'>
                    <InputField
                        value={email}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='email_address'
                        testId='email_address'
                        error={error}
                        label='Email'
                        placeholder='Enter email'
                    />
                    <Button
                        text="Proceed"
                        onClick={handleClick}
                        id="Proceed"
                        isLoading={isLoading}
                    />
                    <Button2 testId='Login' onClick={handleBacktoLogin} text='Back to Login' disabled={isLoading} />
                </form>
            </div>
        </div>
    );
};
export default ForgotPasswordEmail;
