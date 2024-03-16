import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFount';
import Login from '../pages/auth/Login';
import { getCurrentUser } from 'aws-amplify/auth';
import Dashboard from '../pages/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setUser } from '../pages/auth/authSlice';
import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';

export default function NavigationRoutes (props) {
    const auth = useSelector((state) => state.auth);
    const { loggedIn } = auth;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [pageLoading, setPageLoading] = useState(false);

    const checkLoggedInUser = async () => {
        try {
            setPageLoading(true);
            const userData = await getCurrentUser();
            setPageLoading(false);
            if (userData) {
                dispatch(setUser(userData));
                dispatch(login());
            }
        } catch (error) {
            setPageLoading(false);
            dispatch(setUser(''));
            dispatch(logout());
        }
    };

    useEffect(() => {
        checkLoggedInUser();
    }, []);

    useEffect(() => {
        if (!pageLoading && !loggedIn) {
            navigate('/');
        } else if (!pageLoading && loggedIn && window.location.pathname === '/') {
            navigate('/dashboard');
        }
    }, [loggedIn, pageLoading]);

    return (

        <Suspense fallback={<div>Loading...</div>}>{
            <>
                <Routes location={location} key={location.pathname}>
                    {pageLoading
                        ? <Route path="*" element={<Loading />} />
                        : !loggedIn
                            ? <Route path="/" element={<Login />} />
                            : <>
                                <Route element={<Layout />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
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
