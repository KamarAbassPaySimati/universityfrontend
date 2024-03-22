import { useContext, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '../pages/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../components/Context/GlobalContext';

const useGlobalSignout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setToastError } = useContext(GlobalContext);

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
                setToastError('Logged out due to session expiration');
                return true;
            }
        };

        signout();
    }, [dispatch, navigate]);
};

export default useGlobalSignout;
