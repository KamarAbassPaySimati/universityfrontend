/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react'
import CircularNumber from './CircularNumber'
import { QRCode } from 'react-qrcode-logo'
import Button from '../../../components/Button/Button'
import MFA from './MFA'

const Totp = ({ Qrcode }) => {
    const [isScanPage, setIsScanPage] = useState(true)

    const nextHandler = () => {
        setIsScanPage(false)
    }

    const [otp, setOtp] = useState(Array(6).fill(''))
    const [otpError, setOtpError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleScanAgain = () => {
        setIsScanPage(true)
        setOtp(Array(6).fill(''))
    }

    // OTP submit handler
    const handleTotpVerify = async (e) => {
        e.preventDefault()
        setOtpError('')
        const val = otp.toString().replace(/,/g, '')
        if (val.split('').length < 6) {
            setOtpError('Invalid code')
            setIsLoading(false)
            return
        }
        setIsLoading(true)
        let cognitoUserSession = ''
        console.log(userData)
        try {
            if (userData.Session && userData.Session !== null) {
                cognitoUserSession = await Auth.confirmSignIn(
                    userData,
                    val,
                    'SOFTWARE_TOKEN_MFA'
                )
            } else {
                const cognitoUserSession = await Auth.verifyTotpToken(userData, val)
                await Auth.setPreferredMFA(userData, 'TOTP')
            }
            // don't forget to set TOTP as the preferred MFA method
            setIsLoading(false)
            dispactch(verifyOtp(email))
        } catch (error) {
            if (error.message.includes('session is expired')) {
                setotpError('session has expired')
            } else if (error.message.includes('mismatch')) {
                setotpError('Invalid code')
            } else if (error.message === 'Missing required parameter Session') {
                setotpError('Missing required parameter Session')
            } else if (error.code === 'CodeMismatchException') {
                setotpError('Invalid OTP')
            } else {
                // handleToast(error.message, 'error');
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        console.log(Qrcode)
    }, [])

    return (
        <div>
            <div>
                <img src='/images/Header.svg' />
                <div className='bg-primary-normal text-[#fff] px-[67px] py-3 font-[400] text-[24px] leading-[32px]'>
                    {Qrcode ? 'Setup Two-Factor Authentication (2FA)' : 'Two-Factor Authentication (2FA)'}
                </div>
                <div className='flex gap-4 justify-center items-center mt-[106px] mb-[57px]'>
                    <CircularNumber text='1' active={isScanPage} />
                    <div className='text-neutral-primary'>
                        Scan QR Code
                    </div>
                    <img src='/images/line.svg' />
                    <CircularNumber text='2' active={!isScanPage} />
                    <div className='text-neutral-primary'>
                        Authentication OTP
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='p-8 border border-neutral-outline max-w-[425px]'>
                        {Qrcode
                            ? (isScanPage
                                ? <>
                                    <div className='text-center'>
                                        <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                                            Paymaart QR Code
                                        </div>
                                        <div className='text-neutral-secondary font-[400] text-[14px] leading-[24px]'>
                                            Scan QR Code using your Google Authenticator app
                                        </div>
                                    </div>
                                    <div className='flex justify-center mt-8'>
                                        <QRCode value={Qrcode} logoImage='/images/qr_logo.svg' />
                                    </div>
                                    <Button onClick={nextHandler} text='Next' className='mt-9' />
                                </>
                                : <MFA
                                    isLoading={isLoading}
                                    handleSubmit={handleTotpVerify}
                                    otp={otp} setOtp={setOtp}
                                    setOtpError={setOtpError}
                                    otpError={otpError}
                                    handleScanAgain={handleScanAgain}
                                />)
                            : <MFA
                                isLoading={isLoading}
                                isSecondTime={true}
                                handleSubmit={handleTotpVerify}
                                otp={otp} setOtp={setOtp}
                                setOtpError={setOtpError}
                                otpError={otpError}
                                handleScanAgain={handleScanAgain}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Totp
