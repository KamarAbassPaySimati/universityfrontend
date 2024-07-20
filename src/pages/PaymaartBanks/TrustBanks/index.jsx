import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import DocumentSidebar from '../../../components/DocumentTab/DocumentSidebar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FullScreenImage from '../../../components/FullScreenImage/FullScreenImage';
import NotFound from '../../NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { bankAccountList } from './BankSlice';
import GlobalContext from '../../../components/Context/GlobalContext';
import BankTable from './Components/BankTable';
import { endpoints } from '../../../services/endpoints';
import { handleSearchParams } from '../../../CommonMethods/ListFunctions';

const TrustBanks = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageLoading, setPageLoading] = useState(true);
    const [isShownLayer, setIsShwonLayer] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { setToastError } = useContext(GlobalContext);
    const { List, error } = useSelector(state => state.bankAccounts);
    const { listTrustBank, listCapitalBank } = endpoints;
    const bankTypes = {
        'Trust Banks': 'clear',
        'Main Capital': 'clear',
        'Suspense Account': 'clear',
        'Transaction fees & Commissions': 'clear',
        Taxes: 'clear'

    };
    useEffect(() => {
        if (searchParams.get('type') === null) {
            setSearchParams({ type: 'trust-banks' });
        }
        if (searchParams.get('type') !== null) {
            if (searchParams.get('type') !== 'trust-banks' &&
                searchParams.get('type') !== 'main-capital' &&
                searchParams.get('type') !== 'taxes' &&
                searchParams.get('type') !== 'transaction-fees-and-commissions' &&
                searchParams.get('type') !== 'suspense-account') {
                setSearchParams({ type: 'trust-banks' });
                // eslint-disable-next-line indent
                    <NotFound link={'/paymaart-banks'}
                />;
            }
        }
        if (searchParams.get('type') !== null) {
            setPageLoading(true);
            if (searchParams.get('type') === 'trust-banks') {
                fetchDataByUrl(listTrustBank);
            } else if (searchParams.get('type') === 'main-capital') {
                fetchDataByUrl(listCapitalBank);
            } else if (searchParams.get('type') === 'transaction-fees-and-commissions') {
                fetchDataByUrl('list-transaction-fee-commission');
            } else if (searchParams.get('type') === 'suspense-account') {
                fetchDataByUrl('list-suspense-account');
            } else if (searchParams.get('type') === 'taxes') {
                fetchDataByUrl('list-tax-account');
            }
        }
    }, [searchParams]);
    const fetchDataByUrl = async (url) => {
        try {
            // Fetch data using the provided URL
            await dispatch(bankAccountList(url));
            setTimeout(() => {
                setPageLoading(false);
            }, 200);
            // Handle setting params and checking List length
        } catch (error) {
            setPageLoading(false);
            console.error(error);
            // Handle error
            setToastError('Something went wrong!');
        }
    };

    function handleCloseOverlay () {
        setIsShwonLayer(false);
    }
    function formatType (type) {
        if (type !== undefined || type !== null) {
            return type
                .replace(/-/g, ' ')
                .replace(/and/g, '&') // Replace "and" with "&"
                .split(' ') // Split the string into words
                .map((word, index) => {
                    // Capitalize the first letter of each word except 'fees'
                    if (word.toLowerCase() === 'fees') {
                        return word;
                    }
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                })
                .join(' '); // Join the words back together into a single string
        }
    }
    const handleOnClick = (docItem) => {
        handleSearchParams('type', docItem.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'),
            searchParams, setSearchParams, 'false');
    };
    return (
        <CardHeader
            activePath= {searchParams.get('type') !== null ? formatType(searchParams.get('type')) : ''}
            paths={['Paymaart Banks']}
            pathurls={['paymaart-banks']}
            header='Banks'
            minHeightRequired={true}
            headerWithoutButton={false}
            table={false}
        >
            <div className=''>
                {searchParams.get('type') === 'trust-banks' && List?.data?.length !== 4 &&
                <div className='flex justify-end mb-[10px]'>
                    <button data-testid="add_new_bank" onClick={() => { navigate('/paymaart-banks/trust-banks/add-trust-bank'); }}
                        className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]'>
                        <img src='/images/addIcon.svg'
                            className='mr-[8px]'/>
                        <p className='text-[14px] font-semibold text-[#ffffff]'>Add Trust Bank</p>
                    </button>
                </div>}
                {<div className='flex mt-[20px]'>
                    <DocumentSidebar
                        documentTypes={bankTypes}
                        handleOnClick={handleOnClick}
                        selectedData={searchParams.get('type') === null
                            ? 'trust-banks'
                            : formatType(searchParams.get('type'))}
                        height={'h-heightSideBarOne'}
                        width={'w-[200px]'}
                    />
                    <div className='ml-[10px] w-full overflow-hidden'>
                        <div className='scrollBar pb-[8px] h-[calc(100vh - 10px - 48px)] overflow-auto'>
                            {!error && <BankTable
                                loading={pageLoading}
                                List={List}
                                searchParams={searchParams}
                            />}
                        </div>
                    </div>
                </div>}
                { <div className='ml-[6px] mt-[20px] font-400 text-[14px]
                 text-primary-normal '>
                    <button data-testid="view-bank-overview"
                        onClick={() => setIsShwonLayer(true)}>Paymaart Banking OverView</button></div> }
            </div>
            {isShownLayer &&
                <FullScreenImage
                    labelValue={'Paymaart Bank Flow'}
                    onClose={handleCloseOverlay}
                    imagevalue={'bankFlow'}
                />
            }
        </CardHeader>
    );
};

export default TrustBanks;
