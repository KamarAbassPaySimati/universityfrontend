import React from 'react'
import { useState } from 'react'
import InputField from '../../../components/InputField/InputField'
import PassWordValidator from '../../../CommonMethods/PassWordValidator'
import Button from '../../../CommonMethods/Button/Button'

const NewPasswordSet = ({ setIsSuccess }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [isCriteriaMet, setIsCriteriaMet] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const specialCharactersPattern = /[.?!]/;
   

    const handleClick = (e) => {
        e.preventDefault()
        if (password.trim() === '' && confirmPassword.trim() == '') {
            setNewPasswordError('This field is mandatory')
            setConfirmPasswordError('This field is mandatory')
        }  else if (password.trim() === '') {
            setNewPasswordError('This field is mandatory')
        } else if (confirmPassword.trim() == '') {
            setConfirmPasswordError('This field is mandatory')
        }
        else if (!isCriteriaMet) {
            //Pssword Criteria did not met
            setConfirmPasswordError('Password Criteria did not match')
        } else if (password != confirmPassword) {
            //passwords do not match
            setConfirmPasswordError('Passwords do not match')
        } else if (specialCharactersPattern.test(password)) {
            console.log("came here")
            setNewPasswordError('Weak password. Check guidelines for strong passwords.')
        }
        else {
            // call api
           setIsSuccess(true)
        }
    }

    const changeHandler = (e, id) => {
        if (id == 'New Password') {
            setPassword(e.target.value)
        } else {
            setConfirmPassword(e.target.value)
        }
    }
    const focusHandler = () => {
        setNewPasswordError('')
        setConfirmPasswordError('')
    }
    return (
        <div className='z-20 mt-6 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
            <div className='flex justify-center items-center mb-9'>
                <img src='/images/logo.svg' />
            </div>
            <div>
                <div className='mb-9'>
                    <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                        Reset Password
                    </div>
                </div>
                <form className='flex flex-col gap-[16px]'>
                    <InputField
                        value={password}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='New Password'
                        error={newPasswordError}
                        label='New Password'
                        placeholder='Enter new password'
                        givenType='password'
                    />
                    <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                      <PassWordValidator newPassword={password} setIsCriteriaMet={setIsCriteriaMet} />
                    </div>

                    <InputField
                        value={confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='Confirm New Password'
                        error={confirmPasswordError}
                        label='Confirm New Password'
                        placeholder='Re-enter new password'
                        givenType='password'
                    />
                    <Button
                        text="Reset"
                        onClick={handleClick}
                        isLoading={isLoading}
                        color="#ff0000"
                        smallLoader={false}
                        disabled={false}
                    />
                </form>
            </div>
        </div>

    )
}
export default NewPasswordSet
