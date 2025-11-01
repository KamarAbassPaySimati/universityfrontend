/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading/Loading';
import Students from '../pages/Students';
import Faculty from '../pages/Faculty';
import Academics from '../pages/Academics';
import Finance from '../pages/Finance';
import Administration from '../pages/Administration';
import Dashboard from '../pages/Dashboard/Dashboard';
import StudentPortal from '../pages/StudentPortal';
import StudentDashboard from '../pages/StudentPortal/StudentDashboard';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';
export default function NavigationRoutes (props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [pageLoading, setPageLoading] = useState(true);
    const role = searchParams.get('role') || 'super-admin';

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
                                            {/* Dashboard Routes */}
                                            <Route path="/dashboard" element={role === 'student' ? <StudentDashboard /> : <Dashboard />} />
                                            
                                            {/* Admin/Super-Admin Only Routes */}
                                            <Route path="/students" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Students />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/students/all-students" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Students />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/students/admissions" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Students />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/students/enrollments" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Students />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/students/clearance" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Students />
                                                </ProtectedRoute>
                                            } />
                                            
                                            {/* Faculty Management Routes */}
                                            <Route path="/faculty" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Faculty />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/faculty/all-faculty" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Faculty />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/faculty/departments" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Faculty />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/faculty/assignments" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Faculty />
                                                </ProtectedRoute>
                                            } />
                                            
                                            {/* Academic Routes */}
                                            <Route path="/academics" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin', 'faculty']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/courses" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin', 'faculty']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/programs" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/schedules" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin', 'faculty']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/grades" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin', 'faculty']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/analytics" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/transcripts" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/appeals" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/academics/attendance" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin', 'faculty']} currentRole={role}>
                                                    <Academics />
                                                </ProtectedRoute>
                                            } />
                                            
                                            {/* Finance Routes - Admin Only */}
                                            <Route path="/finance" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Finance />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/finance/fee-management" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Finance />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/finance/scholarships" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Finance />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/finance/budgets" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Finance />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/finance/reports" element={
                                                <ProtectedRoute allowedRoles={['super-admin', 'admin']} currentRole={role}>
                                                    <Finance />
                                                </ProtectedRoute>
                                            } />
                                            
                                            {/* Administration Routes - Super Admin Only */}
                                            <Route path="/administration" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Administration />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/administration/users" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Administration />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/administration/settings" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Administration />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/administration/reports" element={
                                                <ProtectedRoute allowedRoles={['super-admin']} currentRole={role}>
                                                    <Administration />
                                                </ProtectedRoute>
                                            } />
                                            
                                            {/* Student-Only Routes */}
                                            <Route path="/my-courses" element={
                                                <ProtectedRoute allowedRoles={['student', 'faculty']} currentRole={role}>
                                                    <StudentPortal />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/schedule" element={
                                                <ProtectedRoute allowedRoles={['student']} currentRole={role}>
                                                    <StudentPortal />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/grades" element={
                                                <ProtectedRoute allowedRoles={['student']} currentRole={role}>
                                                    <StudentPortal />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/fees" element={
                                                <ProtectedRoute allowedRoles={['student']} currentRole={role}>
                                                    <StudentPortal />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/profile" element={<Profile />} />

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
