import React, { Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFount'
import Home from './pages/Home'

export default function NavigationRoutes (props) {
    const [loggedIn] = useState(false)
    return (

        <Suspense fallback={<div></div>}>{
            <>
                <Routes location={location} key={location.pathname}>
                    {!loggedIn
                        ? <>
                            <Route path="/" element={<Home />} />
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
