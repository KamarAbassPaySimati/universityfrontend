import React, { useContext, useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import PasswordValidator from '../../../components/PasswordValidator/PasswordValidator';
import Button from '../../../components/Button/Button';
import { dataService } from '../../../services/data.services';
import { signOut } from 'aws-amplify/auth';
import { logout, setUser } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GlobalContext from '../../../components/Context/GlobalContext';
import { endpoints } from '../../../services/endpoints';
import useGlobalSignout from '../../../CommonMethods/globalSignout';
import appLogout from '../../../CommonMethods/appLogout';

const UpdateToNewPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [newConfirmPasswordError, setNewConfirmPasswordError] = useState('');
    const [isCriteriaMet, setIsCriteriaMet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setToastError, setToastSuccessBottom } = useContext(GlobalContext);

    const { updatePassword } = endpoints;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line max-len
    const weakPasswordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%&])(?![.\d]{4,})(?!(.)\1{2})(?!(123|234|321|345|432|543|654|765|876|987))(?!.*(password|qwerty))(?!.*(admin|user|root|12345|abcd|abcd1234))([^.!?$\s]){8,12}$/;

    const handleClick = async (e) => {
        e.preventDefault();
        if (oldPassword.trim() === '' && newPassword.trim() === '' && confirmNewPassword.trim() === '') {
            setOldPasswordError('This field is mandatory');
            setNewPasswordError('This field is mandatory');
            setNewConfirmPasswordError('This field is mandatory');
        } else if (oldPassword.trim() === '' && newPassword.trim() === '') {
            setOldPasswordError('This field is mandatory');
            setNewPasswordError('This field is mandatory');
        } else if (newPassword.trim() === '' && confirmNewPassword.trim() === '') {
            setNewPasswordError('This field is mandatory');
            setNewConfirmPasswordError('This field is mandatory');
        } else if (confirmNewPassword.trim() === '' && oldPassword.trim() === '') {
            setOldPasswordError('This field is mandatory');
            setNewConfirmPasswordError('This field is mandatory');
        } else if (!isCriteriaMet) {
            setNewPasswordError('Password criteria is not met');
        } else if (newPassword !== confirmNewPassword) {
            setNewConfirmPasswordError('Password does not match');
        } else if (!weakPasswordValidation.test(newPassword)) {
            console.log('came here');
            setNewPasswordError('Weak password. Check guidelines for strong passwords.');
        } else if (oldPassword === newPassword) {
            setNewPasswordError('Old password and new password cannot be the same');
        } else {
            try {
                setIsLoading(true);
                const response = await dataService.PostAPI(updatePassword,
                    { old_password: oldPassword, new_password: newPassword });
                if (response === 'unauthorized') {
                    appLogout(dispatch, navigate);
                    return;
                }
                console.log(response, 'UpdatePassword response:');
                if (!response.error) {
                    setIsLoading(false);
                    handleSignOut();
                } else if (response?.data.status === 401) {
                    setOldPasswordError(response?.data?.data?.message);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setToastError('Something went wrong!');
                }
            } catch (error) {
                setIsLoading(false);
                console.log('EEER', error);
                setToastError('Something went wrong!......');
            }
        }
    };
    async function handleSignOut () {
        try {
            await signOut({ global: true });
            dispatch(logout());
            navigate('/');
            setToastSuccessBottom('Your password has been updated successfully');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const changeHandler = (e, id) => {
        if (id === 'Old Password') {
            setOldPassword(e.target.value);
        } else if (id === 'New Password') {
            setNewPassword(e.target.value);
        } else {
            setConfirmNewPassword(e.target.value);
        }
    };
    const focusHandler = (id) => {
        if (id === 'Old Password') {
            setOldPasswordError('');
        } else if (id === 'New Password') {
            setNewPasswordError('');
        } else {
            setNewConfirmPasswordError('');
        }
    };
    return (
        <div className='mt-6 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px] border border-neutral-outline '>
            <div>
                <form className='flex flex-col gap-[12px]'>
                    <InputField
                        value={oldPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='Old Password'
                        testId='current_password'
                        error={oldPasswordError}
                        label='Current Password'
                        placeholder='Enter current password'
                        givenType='password'
                    />
                    <InputField
                        value={newPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='New Password'
                        testId='new_password'
                        error={newPasswordError}
                        label='New Password'
                        placeholder='Enter new password'
                        givenType='password'
                    />
                    <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                        <PasswordValidator newPassword={newPassword} setIsCriteriaMet={setIsCriteriaMet} />
                    </div>

                    <InputField
                        value={confirmNewPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='Confirm New Password'
                        testId='new_confirm_password'
                        error={newConfirmPasswordError}
                        label='Confirm New Password'
                        placeholder='Re-enter new password'
                        givenType='password'
                    />
                    <div className='mt-6'>
                        <Button
                            text="Reset"
                            testId='submit_button'
                            onClick={handleClick}
                            isLoading={isLoading}
                        />
                    </div>

                </form>
            </div>
        </div>

    );
};
export default UpdateToNewPassword;
