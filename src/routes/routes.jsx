/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import SetNewPassword from '../pages/auth/SetNewPassword';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setUser } from '../pages/auth/authSlice';
import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile';
import UpdatePassword from '../pages/UpdatePassword/UpdatePassword';
import { ComponentsBasedOnRole } from './ComponentsBasedOnRole';
import Slugify from '../CommonMethods/Sulgify';
import Agent from '../pages/Users/Agent';
import Toast from '../components/Toast/Toast';
import Merchant from '../pages/Users/Merchants';
import Customer from '../pages/Users/Customer';
export default function NavigationRoutes (props) {
    const auth = useSelector((state) => state.auth);
    const { loggedIn, user } = auth;
    // const { user_type } = user;
    const [CurrentUserRole, setCurrentUserRole] = useState('Super admin');
    const [ToastError, setToastError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [pageLoading, setPageLoading] = useState(true);

    const checkLoggedInUser = async () => {
        try {
            setPageLoading(true);
            const userAttributes = await fetchUserAttributes();
            if (userAttributes) {
                dispatch(setUser(userAttributes));
                dispatch(login());
                if (userAttributes['custom:user_type']) {
                    setCurrentUserRole(Slugify(userAttributes['custom:user_type']));
                }
            }
            setPageLoading(false);
        } catch (error) {
            setPageLoading(false);
            if (
                ((error.message.includes('User needs to be authenticated')) || (error.name === 'UserUnAuthenticatedException') ||
               (error.message.includes('Access Token has been revoked')) || (error.name === 'NotAuthorizedException'))) {
                dispatch(setUser(''));
                if (localStorage.getItem("userLogedIn")) {
                    setToastError('user session failed!');
                }
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
        <>
            <Suspense fallback={<Loading />}>{
                <>
                    <Routes location={location} key={location.pathname}>
                        {pageLoading
                            ? <Route path="*" element={<Loading />} />
                            : !user
                                ? <>
                                    <Route path="/" element={<Login />} />
                                    <Route
                                        path={'/forgot-password'}
                                        element={<ForgotPassword />} />
                                    <Route
                                        path={'/set-new-password'}
                                        element={<SetNewPassword />} />
                                </>
                                : (
                                    CurrentUserRole && ComponentsBasedOnRole[CurrentUserRole] && (
                                        <>
                                            <Route element={<Layout {...props}/>} key={location.key}>
                                                {ComponentsBasedOnRole[CurrentUserRole]?.map((nav) => (
                                                    <Route path={nav.path} element={React.cloneElement(nav.element, props)}
                                                        key={nav.path}/>
                                                ))}
                                                <Route path="/dashboard" element={<Dashboard />} />
                                                <Route path="/profile" element={<Profile />} />
                                                <Route path="/profile/update-password" element={<UpdatePassword />} />
                                                <Route path="/users/agents" element={<Agent />} />
                                                <Route path="/users/merchants" element={<Merchant />} />
                                                <Route path="/users/customers" element={<Customer />} />
                                            </Route>
                                            <Route path="*" element={<NotFound />} />
                                        </>
                                    )

                                )
                        }
                    </Routes>
                </>
            }
            </Suspense>
            {ToastError !== '' && <Toast
                message={ToastError}
                type="error"
                setToastmessage={setToastError} />}
        </>
    );
}
