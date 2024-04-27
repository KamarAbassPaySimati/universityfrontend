/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import NewPasswordSet from './components/NewPasswordSet';
import PasswordUpdateSuccess from './components/PasswordUpdateSuccess';
import { dataService } from '../../services/data.services';
import { useSearchParams } from 'react-router-dom';
import TokenInvalid from './components/TokenInvalid';
import Loading from '../../components/Loading/Loading';

const SetNewPassword = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [urlPrams, setUrlParams] = useSearchParams();
    const [screenLoading, setScreenLoading] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {
        const verifyJWT = async (token) => {
            const response = await dataService.PostAPIWithoutHeader('admin-users/verify-token', { token });
            if (!response.error) {
                setIsValidToken(true);
            } else {
                setIsValidToken(false);
            }
            setScreenLoading(false);
        };

        const token = urlPrams.get('token');
        setToken(token);
        if (token === null || token === undefined) {
            setScreenLoading(false);
            setIsValidToken(false);
            return;
        }
        verifyJWT(token);
    }, []);

    return (
        <div className={`whiteScrollBar overflow-auto h-[100vh] w-[100vw] ${screenLoading ? '' : 'setNewPassword'}`}>
            {screenLoading
                ? <Loading/>
                : <div className='bg-primary-normal'>
                    {/* <img className='fixed bottom-[30px] right-[100px] object-cover z-10' src='images/login_img.svg' /> */}
                    <div >
                        <div className='min-h-screen min-w-screen flex flex-col justify-center items-center gap-20'>
                            {!isValidToken
                                ? <TokenInvalid />
                                : !isSuccess
                                    ? (
                                        <>
                                            <NewPasswordSet
                                                setIsSuccess={setIsSuccess}
                                                token={token}
                                                setIsValidToken={setIsValidToken}
                                            />
                                            <div className='z-20 left-0 ml-[80px] mb-5 w-max max-w-[calc(100vw-90px)] break-words place-self-start'>
                                                <h1 className='text-[#fff] font-[500] text-[16px]'>Note: Password Guidelines</h1>
                                                <ul className='text-[#fff] font-[400] text-[14px] marker:text-[#fff] list-outside list-disc ml-6'>
                                                    <li>Passwords must not include spaces or any punctuation marks like &apos;.&apos;, &apos;!&apos;, or &apos;?&apos;.</li>
                                                    <li>Avoid using easily guessable personal information such as your name, birthdate, or common words.</li>
                                                    <li>Do not use simple patterns like &apos;12345678&apos;, &apos;22446688&apos;, &apos;password&apos;, or sequential keyboard patterns like &apos;qwerty&apos;.</li>
                                                    <li>Make sure passwords are created with random combinations of characters for better security.</li>
                                                </ul>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <PasswordUpdateSuccess />
                                    )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SetNewPassword;
