/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { dataService } from '../../../services/data.services';
import SetLimitViewShimmer from '../../../components/Shimmers/SetLimitViewShimmer';
import { useLocation, useNavigate } from 'react-router';
import GlobalContext from '../../../components/Context/GlobalContext';

function SetLimit () {
    const [viewLimitData, setViewLimitData] = useState();
    const [activeTab, setActiveTab] = useState('fullKYC');
    const [loadingdata, setLodingData] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        max_agent: false,
        max_merchant: false,
        max_customer: false,
        full_agent: false,
        full_merchant: false,
        full_customer: false,
        simplified_agent: false,
        simplified_merchant: false,
        simplified_customer: false

    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setIsEditing(params.get('update') === 'true');
    }, [location.search]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleUpdateClick = () => {
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
        // Clear error when the field is filled
        setErrors({
            ...errors,
            [name]: false
        });
    };
    // Add this function to handle key press events
    function handleKeyPress(event) {
        const charCode = event.which || event.keyCode;
        // Allow only numbers (0-9) and specific control keys (like arrows, backspace, delete)
        if (!(charCode >= 48 && charCode <= 57) && // numbers
            !(charCode >= 37 && charCode <= 40) && // arrows
            charCode !== 8 && charCode !== 46) { // backspace and delete
            event.preventDefault();
        }
    }
    const handleSubmit = async () => {
        // Check for empty fields and set errors
        const newErrors = {};
        for (const key in formData) {
            if (!formData[key]) {
                newErrors[key] = true;
            }
        }
        setErrors(newErrors);

        // If any field is empty, stop the submission
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

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
            if (!response.error) {
                setToastError('');
                setToastSuccess('Transaction Limit updated successfully');
                setIsEditing(false);
                navigate({ search: '' }, { replace: true });
                // Fetch updated data
                const updatedData = await dataService.GetAPI('admin-users/view-limit');
                setViewLimitData(updatedData?.data?.data);
            } else {
                // Display error message if not successful
                setToastError(response.message || 'Something went wrong!');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error updating limits:', error);
            setToastError('Something went wrong!');
        }
    };

    const handleBack = () => {
        navigate('/financials/set-limit');
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
                    activePath='Set-limit'
                    paths={['Financials']}
                    pathurls={['financials/set-limit']}
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
                            <div className='w-1/3 mr-5'>
                                <p className='font-normal text-sm text-[#A4A9AE]'>Agent</p>
                                {isEditing
                                    ? (
                                        <div>
                                            <input
                                                type="text"
                                                name="max_agent"
                                                data-testid="agentMaxLimit"
                                                defaultValue={viewLimitData[0]?.agent || ''}
                                                className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8]  ${errors.max_agent ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}

                                            />
                                            {errors.max_agent && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                        </div>
                                    )
                                    : (
                                        <p className='mt-2 font-normal text-sm text-[#4F5962]' data-testid="agentMaxLimit"
                                        >{viewLimitData[0]?.agent || 0} MWK</p>
                                    )}

                            </div>
                            <div className='w-1/3 mr-5'>
                                <p className='font-normal text-sm text-[#A4A9AE]'>Merchant</p>
                                {isEditing
                                    ? (
                                        <div>
                                            <input
                                                type="text"
                                                name="max_merchant"
                                                data-testid="merchantMaxLimit"
                                                defaultValue={viewLimitData[0]?.merchant || 0}
                                                className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.max_merchant ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}

                                            />
                                            {errors.max_merchant && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                        </div>
                                    )
                                    : (
                                        <p className='mt-2 font-normal text-sm text-[#4F5962]' data-testid="merchantMaxLimit"
                                        >{viewLimitData[0]?.merchant || 0} MWK</p>
                                    )}
                            </div>
                            <div className='w-1/3'>
                                <p className='font-normal text-sm text-[#A4A9AE]'>Customer</p>
                                {isEditing
                                    ? (
                                        <div>
                                            <input
                                                type="text"
                                                name="max_customer"
                                                data-testid="customerMaxLimit"
                                                defaultValue={viewLimitData[0]?.customer || 0}
                                                className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.max_customer ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}

                                            />
                                            {errors.max_customer && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                        </div>
                                    )
                                    : (
                                        <p className='mt-2 font-normal text-sm text-[#4F5962]' data-testid="customerMaxLimit"
                                        >{viewLimitData[0]?.customer || 0} MWK</p>
                                    )}
                            </div>
                        </div>
                        <p className='font-semibold text-lg text-[#4F5962] mt-8'>Transaction Limit</p>
                        <div className='mt-7'>
                            <div className='flex items-start justify-between w-full'>
                                <div className='flex space-x-4 mb-4'>
                                    <div
                                        className={`cursor-pointer text-sm text-[#4F5962] ${activeTab === 'fullKYC' ? 'font-semibold border-b border-[#4F5962] pb-2 ' : 'font-normal'}`}
                                        onClick={() => handleTabClick('fullKYC')}
                                        data-testid="fullKycTab"
                                    >
                                        Full KYC
                                    </div>
                                    <div
                                        className={`cursor-pointer text-sm text-[#4F5962] ${activeTab === 'simplifiedKYC' ? 'font-semibold border-b border-[#4F5962] pb-2' : 'font-normal'}`}
                                        onClick={() => handleTabClick('simplifiedKYC')}
                                        data-testid="simplified KycTab"
                                    >
                                        Simplified KYC
                                    </div>
                                </div>
                                {activeTab === 'fullKYC' &&
                                <p className='font-normal text-sm text-[#0066F6]' data-testid="staticMessage">*Full KYC is daily maximum transaction limit</p>}
                                {activeTab === 'simplifiedKYC' &&
                                <p className='font-normal text-sm text-[#0066F6]' data-testid="staticMessage">*Simplified KYC is monthly maximum withdrawal limit</p>}
                            </div>

                            {activeTab === 'fullKYC' && (
                                <div className='tab-content'>
                                    {/* Tab 1 Content */}
                                    <div className='mt-5 w-full flex items-start'>
                                        <div className='w-1/3 mr-5'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Agent</p>
                                            {isEditing
                                                ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="full_agent"
                                                            data-testid="agentTransactionLimit"
                                                            defaultValue={viewLimitData[0]?.agent || 0}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.full_agent ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.full_agent && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="agentTransactionLimit"
                                                    >{viewLimitData[1]?.agent} MWK</p>
                                                )}
                                        </div>
                                        <div className='w-1/3 mr-5'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Merchant</p>
                                            {isEditing
                                                ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="full_merchant"
                                                            data-testid="MerchantTransactionLimit"
                                                            defaultValue={viewLimitData[1]?.merchant || 0}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.full_merchant ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.full_merchant && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="MerchantTransactionLimit"
                                                    >{viewLimitData[1]?.merchant} MWK</p>
                                                )}
                                        </div>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Customer</p>
                                            {isEditing
                                                ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="full_customer"
                                                            data-testid="CustomerTransactionLimit"
                                                            defaultValue={viewLimitData[1]?.customer || 0}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.full_customer ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.full_customer && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="CustomerTransactionLimit"
                                                    >{viewLimitData[1]?.customer} MWK</p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'simplifiedKYC' && (
                                <div className='tab-content'>
                                    {/* Tab 2 Content */}
                                    <div className='mt-5 w-full flex items-start'>
                                        <div className='w-1/3 mr-5'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Agent</p>
                                            {isEditing
                                                ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="simplified_agent"
                                                            data-testid="agentTransactionLimit"
                                                            defaultValue={viewLimitData[2]?.agent || 0}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.simplified_agent ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.simplified_agent && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="agentTransactionLimit"
                                                    >{viewLimitData[2]?.agent} MWK</p>
                                                )}
                                        </div>
                                        <div className='w-1/3 mr-5'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Merchant</p>
                                            {isEditing
                                                ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="simplified_merchant"
                                                            data-testid="MerchantTransactionLimit"
                                                            defaultValue={viewLimitData[2]?.merchant || 0}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.simplified_merchant ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.simplified_merchant && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="MerchantTransactionLimit"
                                                    >{viewLimitData[2]?.merchant} MWK</p>
                                                )}
                                        </div>
                                        <div className='w-1/3'>
                                            <p className='font-normal text-sm text-[#A4A9AE]'>Customer</p>
                                            {isEditing
                                                ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="simplified_customer"
                                                            data-testid="CustomerTransactionLimit"
                                                            defaultValue={viewLimitData[2]?.customer || 0}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.simplified_customer ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.simplified_customer && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="CustomerTransactionLimit"
                                                    >{viewLimitData[2]?.customer} MWK</p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {isEditing && (
                        <div className='flex'>
                            <div className='pl-10'>
                                <button
                                    className='mt-5 border border-[#3B2A6F] h-[40px] text-[#3B2A6F] px-4 py-2 rounded-[6px] font-normal text-sm w-[104px]'
                                    onClick={handleBack}
                                    disabled={loadingdata}
                                >
                                    Back
                                </button>
                            </div><div className='px-6'>
                                <button
                                    className='mt-5 bg-[#3B2A6F] h-[40px] text-white px-4 py-2 rounded-[6px] font-semibold text-sm w-[200px]'
                                    onClick={handleSubmit}
                                    disabled={loadingdata}
                                    data-testid="updateSubmitButtion"
                                >
                                    Update
                                </button>
                            </div></div>
                    )}
                </CardHeader>

            </div>)
    );
}

export default SetLimit;
