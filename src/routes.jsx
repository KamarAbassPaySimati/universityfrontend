import React, { Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFount'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import SetNewPassword from './pages/auth/SetNewPassword'

export default function NavigationRoutes (props) {
    const [loggedIn] = useState(false)
    return (

        <Suspense fallback={<div></div>}>{
            <>
                <Routes location={location} key={location.pathname}>
                    {!loggedIn
                        ? <>
                            <Route path="/" element={<Login />} />
                            <Route
                               path={"/forgot-password"}
                               element={<ForgotPassword/>}/>
                            <Route
                               path={"/set-new-password"}
                               element={<SetNewPassword/>}/>
                            <Route
                                path="*"
                                element={
                                    <NotFound/>
                                }
                            />
                        </>
                        : <></>
                    }
                </Routes>
            </>
        }</Suspense>

    )
}
