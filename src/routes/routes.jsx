/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';
import Students from '../pages/Students';
import Faculty from '../pages/Faculty';
import Academics from '../pages/Academics';
import Administration from '../pages/Administration';
import Dashboard from '../pages/Dashboard/Dashboard';
export default function NavigationRoutes (props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        setPageLoading(false);
        if (window.location.pathname === '/') {
            navigate('/dashboard');
        }
    }, []);

    return (
        <>
            <Suspense fallback={<Loading />}>{
                <>
                    <Routes location={location} key={location.pathname}>
                        {pageLoading
                            ? <Route path="*" element={<Loading />} />
                                : (
                                    <>
                                        <Route element={<Layout {...props}/>} key={location.key}>
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/students" element={<Students />} />
                                            <Route path="/students/all-students" element={<Students />} />
                                            <Route path="/students/admissions" element={<Students />} />
                                            <Route path="/students/enrollments" element={<Students />} />
                                            <Route path="/students/clearance" element={<Students />} />
                                            <Route path="/faculty" element={<Faculty />} />
                                            <Route path="/faculty/all-faculty" element={<Faculty />} />
                                            <Route path="/faculty/departments" element={<Faculty />} />
                                            <Route path="/faculty/assignments" element={<Faculty />} />
                                            <Route path="/academics" element={<Academics />} />
                                            <Route path="/academics/courses" element={<Academics />} />
                                            <Route path="/academics/programs" element={<Academics />} />
                                            <Route path="/academics/schedules" element={<Academics />} />
                                            <Route path="/academics/grades" element={<Academics />} />
                                            <Route path="/academics/analytics" element={<Academics />} />
                                            <Route path="/academics/transcripts" element={<Academics />} />
                                            <Route path="/academics/appeals" element={<Academics />} />
                                            <Route path="/academics/attendance" element={<Academics />} />
                                            <Route path="/administration" element={<Administration />} />
                                            <Route path="/administration/users" element={<Administration />} />
                                            <Route path="/administration/settings" element={<Administration />} />
                                            <Route path="/administration/reports" element={<Administration />} />

                                        </Route>
                                        <Route path="*" element={<NotFound />} />
                                    </>
                                )
                        }
                    </Routes>
                </>
            }
            </Suspense>

        </>
    );
}
