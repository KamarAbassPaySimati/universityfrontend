import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import SetNewPassword from '../pages/auth/SetNewPassword';
import { fetchUserAttributes } from 'aws-amplify/auth';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setUser } from '../pages/auth/authSlice';
import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';
import Profile from '../pages/Profile';
import OnboardAgent from '../pages/Users/Agent/Onboard Agent/OnboardAgent';
import Agent from '../pages/Users/Agent';
import OnboardAdmin from '../pages/Users/Admin/Onboard admin/OnboardAdmin';
import Admin from '../pages/Users/Admin';
import UpdatePassword from '../pages/UpdatePassword/UpdatePassword';

export default function NavigationRoutes (props) {
    const auth = useSelector((state) => state.auth);
    const { loggedIn } = auth;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [pageLoading, setPageLoading] = useState(true);

    const checkLoggedInUser = async () => {
        try {
            setPageLoading(true);
            const userAttributes = await fetchUserAttributes();
            setPageLoading(false);
            if (userAttributes) {
                dispatch(setUser(userAttributes));
                dispatch(login());
            }
        } catch (error) {
            if ((error.message.includes('User needs to be authenticated')) || (error.name === 'UserUnAuthenticatedException')) {
                setPageLoading(false);
                dispatch(setUser(''));
                dispatch(logout());
            }
        }
    };

    useEffect(() => {
        checkLoggedInUser();
    }, []);

    useEffect(() => {
        if (!pageLoading && !loggedIn && (window.location.pathname !== '/forgot-password' &&
        window.location.pathname !== '/set-new-password')) {
            navigate('/');
        } else if (!pageLoading && loggedIn && window.location.pathname === '/') {
            navigate('/dashboard');
        }
    }, [pageLoading]);

    return (

        <Suspense fallback={<div>Loading...</div>}>{
            <>
                <Routes location={location} key={location.pathname}>
                    {pageLoading
                        ? <Route path="*" element={<Loading />} />
                        : !loggedIn
                            ? <>
                                <Route path="/" element={<Login />} />
                                <Route
                                    path={'/forgot-password'}
                                    element={<ForgotPassword />} />
                                <Route
                                    path={'/set-new-password'}
                                    element={<SetNewPassword />} />
                            </>
                            : <>
                                <Route element={<Layout />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/users/agents" element={<Agent />} />
                                    <Route path="/users/agents/onboard-agent" element={<OnboardAgent />} />
                                    <Route path="/users/admin" element={<Admin />} />
                                    <Route path="/users/admin/register-admin" element={<OnboardAdmin />} />
                                    <Route path="/profile/update-password" element={<UpdatePassword />} />
                                </Route>
                            </>
                    }
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </>
        }
        </Suspense>
    );
}
