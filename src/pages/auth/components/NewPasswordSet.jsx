import React from 'react'
import { useState } from 'react'
import InputField from '../../../components/InputField/InputField'
import PassWordValidator from '../../../CommonMethods/PassWordValidator'

const NewPasswordSet = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')
    const [isSuccessPage, setIsSuccess] = useState(false)
    const [isCriteriaMet, setIsCriteriaMet] = useState(false);
   

    const handleClick = (e) => {
        e.preventDefault()
        if (password === '' && confirmPassword == '') {

        } else if (!isCriteriaMet) {
            //Pssword Criteria did not met
        } else if (password != confirmPassword) {
            //passwords do not match
        } else {
            // call api
            setIsSuccess(true)
        }




        // when the error comes for email
        setError('invalid Email')
        // setIsSuccess(true)

        //api
    }

    const changeHandler = (e, id) => {

        if (id == 'New Password') {
            setPassword(e.target.value)
        } else {
            setConfirmPassword(e.target.value)
        }

        const focusHandler = (id) => {
            console.log("error", id)
            setError('')


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
                <form className='flex flex-col gap-[16px]'>
                    <InputField
                        value={password}
                        onChange={changeHandler}
                        onFocus={() => { focusHandler }}

                        id='New Password'
                        error={error}
                        label='New Password'
                        placeholder='Enter new password'
                    />
                    <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                      <PassWordValidator newPassword={newPassword} setIsCriteriaMet={setIsCriteriaMet} />
                    </div>

                    <InputField
                        value={confirmPassword}
                        onChange={changeHandler}
                        onFocus={() => { focusHandler }}

                        id='Confirm New Password'
                        error={error}
                        label='Confirm New Password'
                        placeholder='Re-enter new password'
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
