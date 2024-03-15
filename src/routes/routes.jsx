import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFount';
import Login from '../pages/auth/Login';
import { getCurrentUser } from 'aws-amplify/auth';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../pages/auth/authSlice';

export default function NavigationRoutes (props) {
    const auth = useSelector((state) => state.auth);
    const { loggedIn } = auth;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkLoggedInUser = async () => {
        try {
            const userData = await getCurrentUser();
            if (userData) {
                dispatch(login());
                // dispatch(setUser(userData));
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        checkLoggedInUser();
    }, []);

    useEffect(() => {
        if (loggedIn && window.location.pathname === '/') {
            navigate('/dashboard');
        }
    }, [loggedIn]);

    return (

        <Suspense fallback={<div></div>}>{
            <>
                <Routes location={location} key={location.pathname}>
                    {!loggedIn
                        ? <>
                            <Route path="/" element={<Login />} />
                            <Route
                                path="*"
                                element={
                                    <NotFound />
                                }
                            />
                        </>
                        : <>
                            {/* <Route element={<Layout />}> */}
                            <Route path="/dashboard" element={<Dashboard />} />
                            {/* </Route> */}
                        </>
                    }
                </Routes>
            </>
        }</Suspense>

    );
}
