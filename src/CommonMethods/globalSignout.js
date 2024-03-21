import { fetchUserAttributes } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '../pages/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const globalSignout = async () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    try {
        // eslint-disable-next-line no-unused-vars
        const userAttributes = await fetchUserAttributes();
        return false;
    } catch (error) {
        dispatch(setUser(''));
        dispatch(logout());
        navigate('/');
        return true;
    }
};
