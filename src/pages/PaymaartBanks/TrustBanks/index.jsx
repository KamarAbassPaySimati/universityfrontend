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

const TrustBanks = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isShownLayer, setIsShwonLayer] = useState(false);
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setToastError } = useContext(GlobalContext);
    const { List, error, loading } = useSelector(state => state.bankAccounts);
    const bankTypes = {
        'Trust Banks': 'clear',
        'Main Capital': 'clear',
        Suspense: 'clear',
        'Transaction fees & Commissions': 'clear',
        Taxes: 'clear'

    };
    useEffect(() => {
        if (searchParams.get('type') === null) {
            setSearchParams({ type: 'trust-banks' });
        }
        console.log(searchParams.get('type'), 'gettype');
        if (searchParams.get('type') !== null) {
            if (searchParams.get('type') !== 'trust-banks' ||
            searchParams.get('type') !== 'main-capital' ||
            searchParams.get('type') !== 'taxes' ||
            searchParams.get('type') !== 'transaction-fees-and-commissions' ||
            searchParams.get('type') !== 'suspense') {
                setSearchParams({ type: 'trust-banks' });
                // eslint-disable-next-line indent
                    <NotFound link={'/paymaart-banks'}
                />;
            }
        }
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            if (searchParams.get('type') !== null) {
                if (searchParams.get('type') === 'trust-banks') {
                    try {
                        // Fetch data using KycVerificationList
                        dispatch(bankAccountList('list-trust-bank'));

                        // Handle setting params and checking List length
                    } catch (error) {
                        console.error(error);
                        // Handle error
                        setToastError('Something went wrong!');
                    }
                }
            }
        };

        // Call fetchData on mount and when searchParams change
        fetchData();
    }, [searchParams]);

    function handleCloseOverlay () {
        setIsShwonLayer(false);
    }
    useEffect(() => {
        if (searchParams.get('type') === null) {
            setSearchParams({ type: 'trust-banks' });
        }
    }, []);
    function formatType (type) {
        if (type !== undefined || type !== null) {
            return type
                .replace(/-/g, ' ') // Replace "-" with space
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

    return (
        <CardHeader
            activePath= {searchParams.get('type') !== null ? formatType(searchParams.get('type')) : ''}
            paths={['Paymaart Banks']}
            pathurls={['paymaart-banks']}
            header='Paymaart Banks'
            minHeightRequired={true}
            headerWithoutButton={false}
            table={false}
        >
            <div className=''>
                <div className='flex justify-end mb-[10px]'>
                    <button data-testid="add_new_bank" onClick={() => { navigate('/paymaart-banks/trust-banks/add-trust-bank'); }}
                        className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]'>
                        <img src='/images/addIcon.svg'
                            className='mr-[8px]'/>
                        <p className='text-[14px] font-[600] text-[#ffffff]'>Add Trust Bank</p>
                    </button>
                </div>
                <div className='flex '>
                    <DocumentSidebar
                        documentTypes={bankTypes}
                        height={'h-heightSideBarOne'}
                        searchParams={searchParams}// pass this because its used
                        setSearchParams={setSearchParams}
                        width={'w-[200px]'}
                    />
                    <div className='ml-[10px] w-full overflow-auto scrollBar'>
                        <BankTable
                            loading={loading}
                            List={List}
                        />
                    </div>
                </div>
                { <div className='ml-[6px] mt-[20px] font-400 text-[14px] text-primary-normal '>
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
