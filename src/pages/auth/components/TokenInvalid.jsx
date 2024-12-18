import React from 'react';
import { useNavigate } from 'react-router-dom';

const TokenInvalid = () => {
    const navigate = useNavigate();
    return (
        <div className='z-20 bg-[#FFFFFF] md:px-20 rounded-[8px] md:w-auto md:min-w-[425px] mx-[12px] md:mx-0'>
            <div className='flex justify-center items-center flex-col '>
                <img src='/images/invalidToken.svg' className='md:mt-[129px] mt-[92px]' />
                <div>
                    <div data-testid="link_expired"
                        className='text-[#000103] font-[400] text-[20px] leading-[32px] text-center mt-10 mx-2'>
                        The link you are trying to access has expired or is invalid.
                    </div>
                    <div className='text-[#A4A9AE] font-[400] text-[14px] mt-1 mx-2 text-center'>
                        Please request a new link to continue
                    </div>
                    <div className="flex justify-center md:mb-[129px] mb-[92px] mt-10"> {/* Centering the button */}
                        <button data-testid="back_to_login" onClick={() => navigate('/')}
                            className='w-[140px] h-[40px] text-[#fff] bg-primary-normal font-semibold text-[14px] py-2
                        rounded-[8px] hidden md:block'>
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default TokenInvalid;
