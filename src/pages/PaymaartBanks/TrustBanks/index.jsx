import React, { useEffect } from 'react';
import CardHeader from '../../../components/CardHeader';
import DocumentSidebar from '../../../components/DocumentTab/DocumentSidebar';
import { useSearchParams } from 'react-router-dom';

const TrustBanks = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const bankTypes = {
        'Trust Banks': 'clear',
        'Main Capital': 'clear',
        Suspense: 'clear',
        'Transaction fees & Commissions': 'clear',
        Taxes: 'clear'

    };
    useEffect(() => {
        if (searchParams.get('type') == null) {
            setSearchParams({ type: 'trust-banks' });
        }
    });
    return (
        <CardHeader
            activePath='Trust Banks'
            paths={['Paymaart Banks']}
            pathurls={['paymaart-banks/trust-banks']}
            header='Banks'
            minHeightRequired={true}
            headerWithoutButton={false}
            table={false}

        >
            <div>

                <div className='flex'>
                    <div className='mt-[52px] ml-[8px] mr-[23px] w-full'>
                        <DocumentSidebar
                            documentTypes={bankTypes}
                            height={'heightSideBarOne'}
                            searchParams={searchParams}// pass this because its used
                            setSearchParams={setSearchParams}
                        />
                        <div className=' ml-[8px] mt-[40px] font-400 text-[14px] text-primary-normal '>Paymaart Banking OverView</div>
                    </div>

                    {/* <div className='flex flex-col'>
                        <button data-testid="" onClick={() => { navigate(''); }}
                            className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center
                    h-[40px] rounded-[6px]'>
                            <img src='/images/onboardIcon.svg'
                                className='mr-[8px]'/>
                            <p className='text-[14px] font-[600] text-[#ffffff]'>Add Trust Bank</p>
                        </button>
                        <div className='m-10px bg-black h-[100px]'></div>
                    </div> */}

                </div>

            </div>

        </CardHeader>
    );
};

export default TrustBanks;
