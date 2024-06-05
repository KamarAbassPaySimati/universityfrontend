import React from 'react';
import NoDataError from '../../../components/NoDataError/NoDataError';

export default function TransactionList () {
    useEffect(() => {
        if (searchParams.get('type') === null) {
            setSearchParams({ type: 'trust-banks' });
        }
        if (searchParams.get('type') !== null) {
            if (searchParams.get('type') !== 'trust-banks' &&
                searchParams.get('type') !== 'main-capital' &&
                searchParams.get('type') !== 'taxes' &&
                searchParams.get('type') !== 'transaction-fees-and-commissions' &&
                searchParams.get('type') !== 'suspense') {
                setSearchParams({ type: 'trust-banks' });
                // eslint-disable-next-line indent
                    <NotFound link={'/paymaart-banks'}
                />;
            }
        }
        if (searchParams.get('type') !== null) {
            if (searchParams.get('type') === 'trust-banks') {
                fetchDataByUrl(listTrustBank);
            } else if (searchParams.get('type') === 'main-capital') {
                fetchDataByUrl(listCapitalBank);
            }
        }
    }, [searchParams]);
    const fetchDataByUrl = async (url) => {
        try {
            // Fetch data using the provided URL
            await dispatch(bankAccountList(url));

            // Handle setting params and checking List length
        } catch (error) {
            console.error(error);
            // Handle error
            setToastError('Something went wrong!');
        }
    };

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
        <div data-testid="view_admin"
            className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
            flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
            `}>
            <div className='flex justify-between'>
                <h1 className='text-[#4F5962] text-lg font-semibold'>Transaction Details</h1>
                <div className='flex'>
                    <img src="/images/filter_icon.svg" alt="" />
                    <button data-testid="add_new_bank"
                        className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center ml-8
                    h-[40px] rounded-[6px]'>
                        <img src='/images/addIcon.svg'
                            className='mr-[8px]'/>
                        <p className='text-[14px] font-semibold text-[#ffffff]'>Add Trust Bank</p>
                    </button>
                </div>
            </div>
            {/* <NoDataError className='h-tableHeight'
                heading='No data found'
                text='Try adjusting your search or filter to find what you’re looking for' /> */}
            <table className='w-full min-w-max'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Name</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>

            </table>
            <table className='w-full min-w-max'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Name</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>

            </table>
            <table className='w-full min-w-max'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Name</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>

            </table>
            <table className='w-full min-w-max'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Name</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>

            </table>
            <table className='w-full min-w-max'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Name</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>

            </table>

            <table className='w-full min-w-max'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Name</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>

            </table>
            <table className='w-full min-w-max'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Name</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>

            </table>

        </div>
    );
}
