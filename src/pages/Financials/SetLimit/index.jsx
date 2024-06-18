/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { dataService } from '../../../services/data.services';
import SetLimitViewShimmer from '../../../components/Shimmers/SetLimitViewShimmer';
import { useLocation, useNavigate } from 'react-router';
import GlobalContext from '../../../components/Context/GlobalContext';
import Button from '../../../components/Button/Button';

function SetLimit () {
    const [activeTab, setActiveTab] = useState('fullKYC');
    const [loadingdata, setLodingData] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        if (value?.length <= 18) {
            const regex = /^(\d{1,15}(\.\d{0,2})?)?$/;
            if (regex.test(value)) {
                setFormData({
                    ...formData,
                    [name]: value
                });
                // Clear error when the field is filled
                setErrors({
                    ...errors,
                    [name]: false
                });
            }
        }
    };
    // Add this function to handle key press events
    function handleKeyPress (event) {
        const charCode = event.which || event.keyCode;
        // Allow only numbers (0-9) and specific control keys (like arrows, backspace, delete)
        if (!(charCode >= 48 && charCode <= 57) && // numbers
            !(charCode >= 37 && charCode <= 40) && // arrows
            charCode !== 8 && charCode !== 46) { // backspace and delete
            event.preventDefault();
        }
    }
    const handleSubmit = async () => {
        setIsLoading(true);
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
            setIsLoading(false);
            return;
        }

        // Construct the request body
        const requestBody = {
            max_agent: formData.max_agent,
            max_customer: formData.max_customer,
            max_merchant: formData.max_merchant,
            full_agent: formData.full_agent,
            full_customer: formData.full_customer,
            full_merchant: formData.full_merchant,
            simplified_agent: formData.simplified_agent,
            simplified_customer: formData.simplified_customer,
            simplified_merchant: formData.simplified_merchant
        };

        try {
            const response = await dataService.PatchAPI('admin-users/update-limit', requestBody);
            setIsLoading(false);
            if (!response.error) {
                setToastError('');
                setToastSuccess('Transaction Limit updated successfully');
                setIsLoading(false);
                setIsEditing(false);
                navigate({ search: '' }, { replace: true });
            } else {
                // Display error message if not successful
                setIsLoading(false);
                setToastError(response.message || 'Something went wrong!');
            }
        } catch (error) {
            // Handle network or other errors
            setIsLoading(false);
            console.error('Error updating limits:', error);
            setToastError('Something went wrong!');
        }
    };

    const handleBack = () => {
        navigate('/financials/set-limit');
    };

    // const formatNumberWithCommas = (value) => {
    //     if (typeof value === 'number') {
    //         return value.toLocaleString();
    //     } else if (typeof value === 'string' && !isNaN(Number(value))) {
    //         return Number(value).toLocaleString();
    //     }
    //     return value;
    // };

    const fetchViewLimitData = async () => {
        const response = await dataService.GetAPI('admin-users/view-limit');
        const responceValue = {};
        response?.data?.data.forEach(element => {
            switch (element.type) {
            case 'max_balance':
                responceValue.max_agent = element.agent;
                responceValue.max_merchant = element.merchant;
                responceValue.max_customer = element.customer;
                break;
            case 'transaction_full':
                responceValue.full_agent = element.agent;
                responceValue.full_merchant = element.merchant;
                responceValue.full_customer = element.customer;
                break;
            case 'transaction_simplified':
                responceValue.simplified_agent = element.agent;
                responceValue.simplified_merchant = element.merchant;
                responceValue.simplified_customer = element.customer;
                break;

            default:
                break;
            }
        });
        setFormData(responceValue);
        setLodingData(false);
    };

    useEffect(() => {
        fetchViewLimitData();
    }, []);

    return (
        loadingdata
            ? (<SetLimitViewShimmer />)
            : (<div>
                <CardHeader
                    activePath='Set Limit'
                    paths={['Financials']}
                    pathurls={['financials/set Limit']}
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
                                                value={formData.max_agent}
                                                className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8]  ${errors.max_agent ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}

                                            />
                                            {errors.max_agent && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                        </div>
                                    )
                                    : (
                                        <p className='mt-2 font-normal text-sm text-[#4F5962]' data-testid="agentMaxLimit">
                                            {(Number(formData.max_agent) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                        </p>
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
                                                value={formData.max_merchant}
                                                data-testid="merchantMaxLimit"
                                                className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.max_merchant ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}

                                            />
                                            {errors.max_merchant && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                        </div>
                                    )
                                    : (
                                        <p className='mt-2 font-normal text-sm text-[#4F5962]' data-testid="merchantMaxLimit">
                                            {(Number(formData.max_merchant) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                        </p>
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
                                                value={formData.max_customer}
                                                data-testid="customerMaxLimit"
                                                className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.max_customer ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}

                                            />
                                            {errors.max_customer && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                        </div>
                                    )
                                    : (
                                        <p className='mt-2 font-normal text-sm text-[#4F5962]' data-testid="customerMaxLimit">
                                            {(Number(formData.max_customer) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                        </p>
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
                                                            value={formData.full_agent}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.full_agent ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.full_agent && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="agentTransactionLimit">
                                                        {(Number(formData.full_agent) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                                    </p>
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
                                                            value={formData.full_merchant}
                                                            data-testid="MerchantTransactionLimit"
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.full_merchant ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.full_merchant && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="MerchantTransactionLimit">
                                                        {(Number(formData.full_merchant) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                                    </p>
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
                                                            value={formData.full_customer}
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.full_customer ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.full_customer && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="CustomerTransactionLimit">
                                                        {(Number(formData.full_customer) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                                    </p>
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
                                                            value={formData.simplified_agent}
                                                            data-testid="agentTransactionLimit"
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.simplified_agent ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.simplified_agent && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="agentTransactionLimit">
                                                        {(Number(formData.simplified_agent) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                                    </p>
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
                                                            value={formData.simplified_merchant}
                                                            data-testid="MerchantTransactionLimit"
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.simplified_merchant ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.simplified_merchant && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="MerchantTransactionLimit">
                                                        {(Number(formData.simplified_merchant) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                                    </p>
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
                                                            value={formData.simplified_customer}
                                                            data-testid="CustomerTransactionLimit"
                                                            className={`mt-2 font-normal text-sm text-[#4F5962] bg-[#F8F8F8] ${errors.simplified_customer ? 'border-b border-[#FF4343]' : 'border-b border-[#DDDDDD]'} w-full rounded-tl-[4px] rounded-tr-[4px] p-2.5 outline-0`}
                                                            onChange={handleInputChange}
                                                            onKeyPress={handleKeyPress}

                                                        />
                                                        {errors.simplified_customer && <span className="text-[#FF4343] font-medium text-sm mt-1">Required field</span>}
                                                    </div>
                                                )
                                                : (
                                                    <p className='mt-1 font-normal text-sm text-[#4F5962]' data-testid="CustomerTransactionLimit">
                                                        {(Number(formData.simplified_customer) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWK
                                                    </p>
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
                            </div>
                            <div className='px-6'>
                                <Button
                                    text='Update'
                                    testId='updateSubmitButtion'
                                    className='mt-5 bg-[#3B2A6F] h-[40px] text-white px-4 py-2 rounded-[6px] font-semibold text-sm w-[200px] min-w-[200px]'
                                    onClick={handleSubmit}
                                    isLoading={isLoading}
                                    disabled={loadingdata}

                                />
                            </div>
                        </div>
                    )}
                </CardHeader>

            </div>)
    );
}

export default SetLimit;
