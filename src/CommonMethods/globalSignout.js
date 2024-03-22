import { useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '../pages/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const useGlobalSignout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const signout = async () => {
            try {
                // eslint-disable-next-line no-unused-vars
                const userAttributes = await fetchUserAttributes();
                return false;
            } catch (error) {
                if (window.location.pathname === '/forgot-password' ||
                window.location.pathname === '/set-new-password') {
                    console.log('fdf');
                    return;
                }
                dispatch(setUser(''));
                dispatch(logout());
                navigate('/');
                return true;
            }
        };

        signout();
    }, [dispatch, navigate]);
};

export default useGlobalSignout;
