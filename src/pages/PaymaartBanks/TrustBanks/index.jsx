import React, { useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import DocumentSidebar from '../../../components/DocumentTab/DocumentSidebar';
import { useSearchParams } from 'react-router-dom';
import FullScreenImage from '../../../components/FullScreenImage/FullScreenImage';

const TrustBanks = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isShownLayer, setIsShwonLayer] = useState(false);
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
    });
    function handleCloseOverlay () {
        setIsShwonLayer(false);
    }
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
            header='Banks'
            minHeightRequired={true}
            headerWithoutButton={false}
            table={false}
        >
            <div className=''>
                <div className='flex justify-end mb-[10px]'>
                    <button data-testid="" onClick={() => { }}
                        className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]'>
                        <img src='/images/onboardIcon.svg'
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
                    />
                    <div className='ml-[10px] bg-white
                     h-[100px] w-full'></div>
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
