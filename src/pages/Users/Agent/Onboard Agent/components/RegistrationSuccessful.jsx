import React, { useContext } from 'react';
import Image from '../../../../../components/Image/Image';
import Button from '../../../../../components/Button/Button';
import { dataService } from '../../../../../services/data.services';
import { endpoints } from '../../../../../services/endpoints';
import GlobalContext from '../../../../../components/Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccessful = ({ email }) => {
    const { resendCredentials } = endpoints;
    const { setToastSuccess, setToastError } = useContext(GlobalContext);
    const Navigate = useNavigate();
    const handleResendCredentials = async () => {
        const response = await dataService.PostAPIAgent(resendCredentials, { email });
        if (!response.error) {
            setToastSuccess('Credentials resent successfully');
        } else {
            setToastError('Something went wrong, please try again');
        }
    };
    return (
        <div className='min-h-[calc(100vh-176px)] min-w-[700px] flex justify-center items-center text-neutral-primary
        font-[400] text-[14px] leading-[22px]'>
            <div className='bg-background-light py-8 px-24 rounded-[6px] relative
            flex flex-col justify-center items-center text-center'>
                <Image className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2' src='registrationSuccessful' />
                <div className='z-20'>
                    <h1 className='text-[30px] font-[700] leading-[40px] text-primary-normal'>Welcome to Paymaart!</h1>
                    <p data-testid="registration_success_message"
                        className='text-[20px] font-[400] leading-[28px] w-[691px] mt-9'>
                        Registration is a vital step in realising our vision of universal e-payments.
                        Thank you for joining us on this transformative journey.
                        Please now complete online KYC registration to start
                    </p>
                    <p className='mt-10'>
                        Didn’t receive credentials?
                        <span className='text-[16px] leading-[24px] text-primary-normal cursor-pointer'
                            onClick={handleResendCredentials}>
                        &nbsp;Resend
                        </span>
                    </p>
                    <p className='mt-[37px]'>
                        Click below to complete agent’s KYC registration
                    </p>
                    <Button
                        className='max-w-[200px] mt-2'
                        testId='kyc-btn'
                        text='KYC Registration'
                        onClick={() => Navigate('/users/agents/register-agent/kyc-registration')}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccessful;
