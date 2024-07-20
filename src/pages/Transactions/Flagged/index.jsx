/* eslint-disable max-len */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import Table from './components/Table';
import Paginator from '../../../components/Paginator/Paginator';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FlaggedList } from './flaggedSlice';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Slugify from '../../../CommonMethods/Sulgify';
import GlobalContext from '../../../components/Context/GlobalContext';

const Flagged = () => {
    const [searchParams, setSearchParams] = useSearchParams({ });
    const [notFound, setNotFound] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    const dispatch = useDispatch();
    const { List, loading, error } = useSelector(state => state.agentUsers);

    const { user } = useSelector((state) => state.auth);
    let { user_type: CurrentUserRole } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }

    const filterOptions = {
        'Flagged Reason': ['Transaction & System Failures', 'Policy Clarity & Customer Support',
            'Service Quality & Marketing Accuracy', 'User Experience Challenges']
    };

    /* The `GetList` constant is a function created using the `useCallback` hook in React. This
    function is responsible for fetching the list of agents based on the search parameters provided.
    Here's a breakdown of what it does: */
    const GetList = useCallback(async () => {
        try {
            const obj = {
                ft01: 'Transaction & System Failures',
                ft02: 'Policy Clarity & Customer Support',
                ft03: 'Service Quality & Marketing Accuracy',
                ft04: 'User Experience Challenges'
            };
            const params = Object.fromEntries(searchParams);
            if (searchParams.get('Flagged Reason') !== null) {
                params.reasons = params['Flagged Reason'].split(',').map(value => {
                    const key = Object.keys(obj).find(key => obj[key] === value);
                    return key; // Return the key if found
                }).filter(key => key !== undefined);
                console.log('params', params['Flagged Reason'].split(',').map(value => {
                    const key = Object.keys(obj).find(key => obj[key] === value);
                    return key; // Return the key if found
                }).filter(key => key !== undefined));
            }
            const endPoint = `page=${searchParams.get('page') || '1'}${searchParams.get('Flagged Reason') === null ? '' : `&reasons=${params.reasons}`}${searchParams.get('search') !== null ? `&search=${searchParams.get('search')}` : ''}`;
            dispatch(FlaggedList(endPoint));
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
        if (List?.List?.transactions?.length !== 0) {
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
            activePath='Flagged'
            paths={['Transactions']}
            pathurls={['transactions/flagged']}
            header='Flagged'
            minHeightRequired={true}
            navigationPath='/users/agents/register-agent'
            table={true}
            headerWithoutButton={false}
        >
            <div className={`relative ${notFound || List?.transactions?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {(!notFound && List?.transactions?.length === 0 &&
                        searchParams.get('Flagged Reason') === null &&
                    searchParams.get('search') === null)
                    ? (
                        <></>
                    )
                    : (!notFound &&
                    <div className='bg-[#fff] border-b border-neutral-outline'>
                        <Topbar
                            setSearchParams={setSearchParams}
                            searchParams={searchParams}
                            filterOptions={filterOptions}
                            placeHolder="Paymaart ID or transaction ID"
                            filterType='Filter  Flagged Transaction'
                            isLoading={loading}
                            customClass={true}
                            filterActive={(searchParams.get('Flagged Reason') !== null)}
                        />
                    </div>)
                }
                {List?.transactions?.length === 0 && !loading &&
                (searchParams.get('Flagged Reason') !== null || searchParams.get('search') !== null)
                    ? (<NoDataError className='h-noDataError' heading='No data found' text='Try adjusting your filter or search to find what you’re looking for' />)
                    : <div className='overflow-auto scrollBar h-tableHeight'>
                        <Table
                            error={error}
                            loading={loading}
                            List={List}
                            setSearchParams={setSearchParams}
                            notFound={notFound}
                            searchParams={searchParams}
                        />
                    </div>
                }
                {notFound &&
                <NoDataError
                    className='h-noDataError' heading='No data found' text = "404 could not find what you are looking for."/>}
                {!loading && !error && !notFound && List?.transactions?.length !== 0 && <Paginator
                    currentPage={searchParams.get('page')}
                    totalPages={Math.ceil(List?.total_records / 10)}
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    totalRecords={List?.total_records}
                />}
            </div>
        </CardHeader>
    );
};

export default Flagged;
