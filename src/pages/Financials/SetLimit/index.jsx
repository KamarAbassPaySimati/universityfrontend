/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { dataService } from '../../../services/data.services';
import SetLimitViewShimmer from '../../../components/Shimmers/SetLimitViewShimmer';
import { useLocation, useNavigate } from 'react-router';

function SetLimit() {
    const [viewLimitData, setViewLimitData] = useState();
    const [activeTab, setActiveTab] = useState('fullKYC');
    const [loadingdata, setLodingData] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     setIsEditing(params.get('update') === 'true');
    // }, [location.search]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleUpdateClick = () => {
        console.log(isEditing, 'rrrrr');
        const newEditMode = !isEditing;
        setIsEditing(newEditMode);
        const params = new URLSearchParams(location.search);
        if (newEditMode) {
            params.set('update', 'true');
        } else {
            params.delete('update');
        }
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        // Construct the request body
        const requestBody = {
            max_agent: formData.max_agent || viewLimitData[0]?.agent,
            max_customer: formData.max_customer || viewLimitData[0]?.customer,
            max_merchant: formData.max_merchant || viewLimitData[0]?.merchant,
            full_agent: formData.full_agent || viewLimitData[1]?.agent,
            full_customer: formData.full_customer || viewLimitData[1]?.customer,
            full_merchant: formData.full_merchant || viewLimitData[1]?.merchant,
            simplified_agent: formData.simplified_agent || viewLimitData[2]?.agent,
            simplified_customer: formData.simplified_customer || viewLimitData[2]?.customer,
            simplified_merchant: formData.simplified_merchant || viewLimitData[2]?.merchant
        };

        try {
            const response = await dataService.PatchAPI('admin-users/update-limit', requestBody);
            if (response.success) {
                setIsEditing(false);
                navigate({ search: '' }, { replace: true });
                // Fetch updated data
                const updatedData = await dataService.GetAPI('admin-users/view-limit');
                setViewLimitData(updatedData?.data?.data);
            }
        } catch (error) {
            console.error('Error updating limits:', error);
        }
    };

    useEffect(() => {
        setLodingData(true);
        const fetchViewLimitData = async () => {
            const response = await dataService.GetAPI('admin-users/view-limit');
            setViewLimitData(response?.data?.data);
            setLodingData(false);
        };
        fetchViewLimitData();
    }, []);

    return (
        loadingdata
            ? (<SetLimitViewShimmer />)
            : (<div>
                <CardHeader
                    activePath='set-limit'
                    paths={['financials']}
                    pathurls={['finanacials/set-limit']}
                    header='Set Limit'
                    minHeightRequired={true}
                    buttonText={isEditing ? '' : 'Update'}
                    onClickButtonFunction={handleUpdateClick}
                    UpdateIcon={true}
                    navigationPath=''
                    table={true}
                    headerWithoutButton={isEditing}

                >
                    <div className='p-10'>
                        <p className='font-semibold text-lg text-[#4F5962]'>Maximum Account Balances</p>
                        <div className='mt-7 w-full flex items-start'>
                            <div className='w-1/3'>
                                <p className='font-normal text-sm text-[#A4A9AE]'>Agent</p>
                                {isEditing
                                    ? (
                                        <input
                                            type="text"
                                            name="max_agent"
                                            defaultValue={viewLimitData[0]?.agent || 0}
                                            className="mt-2 font-normal text-sm text-[#4F5962]"
                                            onChange={handleInputChange}
                                        />
                                    )
                                    : (
                                        <p className='mt-2 font-normal text-sm text-[#4F5962]'>{viewLimitData[0]?.agent || 0} MWK</p>
                                    )}                            </div>
                            <div className='w-1/3'>
                                <p className='font-normal text-sm text-[#A4A9AE]'>Merchant</p>
                                <p className='mt-2 font-normal text-sm text-[#4F5962]'>{viewLimitData[0]?.merchant || 0} MWK</p>
                            </div>
                            <div className='w-1/3'>
                                <p className='font-normal text-sm text-[#A4A9AE]'>Customer</p>
                                <p className='mt-2 font-normal text-sm text-[#4F5962]'>{viewLimitData[0]?.customer || 0} MWK</p>
                            </div>
                        </div>
                        <p className='font-semibold text-lg text-[#4F5962] mt-8'>Transaction Limit</p>
                        <div className='mt-7'>
                            <div className='flex items-start justify-between w-full'>
                                <div className='flex space-x-4 mb-4'>
                                    <div
                                        className={`cursor-pointer text-sm text-[#4F5962] ${activeTab === 'fullKYC' ? 'font-semibold border-b border-[#4F5962] pb-2 ' : 'font-normal'}`}
                                        onClick={() => handleTabClick('fullKYC')}
                                    >
                                        Full KYC
                                    </div>
                                    <div
                                        className={`cursor-pointer text-sm text-[#4F5962] ${activeTab === 'simplifiedKYC' ? 'font-semibold border-b border-[#4F5962] pb-2' : 'font-normal'}`}
                                        onClick={() => handleTabClick('simplifiedKYC')}
                                    >
                                        Simplified KYC
                                    </div>
                                </div>
                                <p className='font-normal text-sm text-[#0066F6]'>*Full KYC is daily maximum transaction limit</p>
                            </div>

                            {activeTab === 'fullKYC' && (
                                <div className='tab-content'>
                                    {/* Tab 1 Content */}
                                    <div className='mt-5 w-full flex items-start'>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Agent</p>
                                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>{viewLimitData[1]?.agent} MWK</p>
                                        </div>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Merchant</p>
                                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>{viewLimitData[1]?.merchant} MWK</p>
                                        </div>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Customer</p>
                                            <p className='mt-1 font-normal text-//sm text-[#4F5962]'>{viewLimitData[1]?.customer} MWK</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'simplifiedKYC' && (
                                <div className='tab-content'>
                                    {/* Tab 2 Content */}
                                    <div className='mt-5 w-full flex items-start'>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Agent</p>
                                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>{viewLimitData[2]?.agent} MWK</p>
                                        </div>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Merchant</p>
                                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>{viewLimitData[2]?.merchant} MWK</p>
                                        </div>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Customer</p>
                                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>{viewLimitData[2]?.customer} MWK</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                {isEditing && (
                    <div className='p-10'>
                        <button
                            className='mt-5 bg-blue-500 text-white px-4 py-2 rounded'
                            onClick={handleSubmit}
                            disabled={loadingdata}
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>)
    );
}

export default SetLimit;
