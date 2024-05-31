/* eslint-disable max-len */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import G2PTable from './Components/G2PTable';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Paginator from '../../../components/Paginator/Paginator';
import { G2PList } from './G2PSlice';
import GlobalContext from '../../../components/Context/GlobalContext';

function G2pList () {
    const { List, error, loading } = useSelector(state => state.G2PList);
    const [searchParams, setSearchParams] = useSearchParams();
    const [notFound, setNotFound] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    const dispatch = useDispatch();

    const GetList = useCallback(async () => {
        try {
            dispatch(G2PList(searchParams));
        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

    useEffect(() => {
        if (error) {
            if (error.status === 400) {
                setNotFound(true);
            } else {
                setToastError('Something went wrong!');
            }
        }
    }, [error]);
    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        if (List?.data?.length !== 0) {
            setNotFound(false);
            params.page = 1;
        }
    }, [List]);

    /* This `useEffect` hook is responsible for triggering a side effect whenever the dependencies
 specified in the dependency array change. In this case, the effect will run when the `GetList`
 function changes. */
    useEffect(() => {
        if (searchParams.get('page') === null) {
            setSearchParams({ page: 1 });
        } else {
            GetList();
        }
    }, [GetList]);

    return (
        <CardHeader
            activePath='G2P'
            paths={['financials']}
            pathurls={['financials/G2P']}
            header='G2P'
            minHeightRequired={true}
            headerWithoutButton={true}
            table={true}
            searchParams={searchParams}// pass this because its used
            setSearchParams={setSearchParams}
        >
            <div className={`relative ${notFound || List?.data?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {(!notFound && List?.data?.length === 0 &&
                    searchParams.get('status') === null &&
                    searchParams.get('search') === null)
                    ? (
                        <></>
                    )
                    : (!notFound &&
                        <div className='bg-[#fff] border-b border-neutral-outline'>
                            {/* <Topbar
                                // setSearchParams={setSearchParams}
                                // searchParams={searchParams}
                                isLoading={loading}
                            /> */}
                        </div>)
                }
                {!notFound && !(List?.data?.length === 0 && !loading &&
                    !(searchParams.get('status') !== null || searchParams.get('search') !== null)) &&
                    <div className='overflow-auto scrollBar h-tableHeight'>
                        <G2PTable
                            error={error}
                            loading={loading}
                            List={List}
                            setSearchParams={setSearchParams}
                            notFound={notFound}
                            searchParams={searchParams}
                        />
                    </div>}
                {notFound &&
                    <NoDataError
                        className='h-noDataError' heading='No data found' text="404 could not find what you are looking for." />}
                {List?.data?.length === 0 && !loading &&
                    !(searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                    (<NoDataError className='h-noDataError' heading='No data found' text='Click “Register Agent ” to add agent' />)}
                {!loading && !error && !notFound && List?.data?.length !== 0 && <Paginator
                    currentPage={searchParams.get('page')}
                    totalPages={Math.ceil(List?.totalRecords / 10)}
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    totalRecords={List?.totalRecords}
                />}

            </div>
        </CardHeader>
    );
}

export default G2pList;
