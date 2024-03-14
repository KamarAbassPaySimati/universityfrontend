import React from 'react'
import { useState } from 'react'
import InputField from '../../../components/InputField/InputField'

 const NewPasswordSet = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')
    const [isSuccessPage, setIsSuccess] = useState(false)
    const [showPasswordValidation, setShowPasswordValidation] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        // when the error comes for email
        setError('invalid Email')
        // setIsSuccess(true)
        
        //api
    }

    const changeHandler = (e, id) => {

        if(id == 'New Password') {
            setPassword(e.target.value)
        } else {
            setConfirmPassword(e.target.value)
    }

    const focusHandler = (id) => {
      console.log("error", id)
      setError('')

      setShowPasswordValidation(true)
    }
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
            <form onSubmit={submitHandler} className='flex flex-col gap-[16px]'>
                <InputField
                    value={password}
                    onChange={changeHandler}
                    onFocus={() => { setShowPasswordValidation(true) }}
                    onBlur = {() => { setShowPasswordValidation(false) }}
                    id='New Password' 
                    error={error}
                    label='New Password'
                    placeholder='Enter new password' 
                />
                {showPasswordValidation && <div className='ml-[1px] mt-[0.5px] mb-[4px]'><p className='text-[#A4A9AE] font-[400] text-[14px]'>Password must have atleast:</p>
                <ul>
                    <li className='text-[#A4A9AE] font-[400] text-[14px] mb-[4px] mt-[4px]'>8-12 characters</li>
                    <li className='text-[#A4A9AE] font-[400] text-[14px] mb-[4px]'>1 uppercase</li>
                    <li className='text-[#A4A9AE] font-[400] text-[14px] mb-[4px]'>1 lowercase</li>
                    <li className='text-[#A4A9AE] font-[400] text-[14px] mb-[4px]'>1 number</li>
                    <li className='text-[#A4A9AE] font-[400] text-[14px] mb-[4px]'>1 special character</li>
                </ul>
                </div>}
                
                <InputField
                   value={confirmPassword}
                   onChange={changeHandler}
                   onFocus={() => { setShowPasswordValidation(false) }}
                   onBlur = {() => { setShowPasswordValidation(false) }}
                   id='Confirm New Password' 
                   error={error}
                   label='Confirm New Password'
                   placeholder='Re-enter new password'
                />
                <button className='w-full text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2
                                rounded-[8px] mt-8'>
                    Proceed
                </button>
            </form>
        </div>
       </div>   
     
    )
}
export default NewPasswordSet
