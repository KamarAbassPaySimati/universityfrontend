/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import ProfileName from '../../../../components/ProfileName/ProfileName';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { G2PCustomerViewData } from '../G2PCustomerViewSlice';
import { useSearchParams } from 'react-router-dom';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import G2PCustomerTable from './G2PSCustomerTable';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import Paginator from '../../../../components/Paginator/Paginator';
import { dataService } from '../../../../services/data.services';
import * as XLSX from 'xlsx';
import { handleUpload } from '../../../../components/S3Upload/S3Functions';
import GlobalContext from '../../../../components/Context/GlobalContext';
import { BeatLoader } from 'react-spinners';

export default function G2PCustomerViewList() {
    const { id } = useParams();
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const dispatch = useDispatch();
    const fileInputRef = React.createRef();
    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    const [notFound, setNotFound] = useState(false);
    const [file, setFile] = useState(null);
    const [modalView, setModalView] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const { View, loading, error } = useSelector(state => state.G2PCustomerView); // to get the api respons
    const [selectedSheets, setSelectedSheets] = useState({});
    const [threedotLoader, setThreedotLoader] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const getG2PCustomerView = async () => {
        try {
            await dispatch(G2PCustomerViewData(`${id}?${searchParams.toString()}`));
        } catch (error) {
        }
    };

    const handleUploadSheet = async () => {
        fileInputRef.current.click();
    };

    // const handleFileChange = async (e) => {
    //     setThreedotLoader(true);
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         const reader = new FileReader();
    //         reader.onload = async (event) => {
    //             const data = new Uint8Array(event?.target?.result);
    //             const workbook = XLSX?.read(data, { type: 'array' });
    //             const sheetName = workbook?.SheetNames[0];
    //             const worksheet = workbook?.Sheets[sheetName];
    //             const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];

    //             const requiredHeaders = ['SL No', 'Name', 'Paymaart ID', 'Phone Number', 'Amount', 'Description'];
    //             const isValid = requiredHeaders.every(header => headers.includes(header));

    //             if (isValid) {
    //                 const path = 'g2p_customers';
    //                 const file = await handleUpload(e.target.files[0], path);
    //                 if (file.key !== '') {
    //                     const payload = {
    //                         sheet_name: file.key.split('/')[file.key.split('/').length - 1].split('.')[0],
    //                         uploaded_by: `${user?.first_name || ''} ${user?.middle_name || ''} ${user?.last_name || ''}`.trim(),
    //                         paymaart_id: user?.paymaart_id,
    //                         file_key: file.key
    //                     };
    //                     const response = await dataService.PostAPI(`g2p-users/${View?.transaction_id}`, payload);
    //                     if (response.error === false) {
    //                         setIsValid(true);
    //                         setThreedotLoader(false);
    //                         setToastSuccess(response.data.message);
    //                         getG2PCustomerView();
    //                         e.target.value = '';
    //                         setFile(null);
    //                     }
    //                 }
    //             } else {
    //                 setIsValid(false);
    //                 setThreedotLoader(false);
    //                 setToastError('Upload failed due to incorrect format');
    //                 e.target.value = '';
    //                 setFile(null);
    //             }
    //             // setTimeout(() => {
    //             //     setToastSuccess('');
    //             // }, 3000); // Clear message after 3 seconds
    //         };
    //         reader.readAsArrayBuffer(selectedFile);
    //         setFile(selectedFile);
    //     }
    // };

    const handleFileChange = async (e) => {
        setThreedotLoader(true);
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const data = new Uint8Array(event?.target?.result);
                const workbook = XLSX?.read(data, { type: 'array' });
                const sheetName = workbook?.SheetNames[0];
                const worksheet = workbook?.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const headers = rows[0];

                const requiredHeaders = ['SL No', 'Name', 'Paymaart ID', 'Phone Number', 'Amount', 'Description'];
                const isValid = requiredHeaders.every(header => headers.includes(header));

                if (!isValid) {
                    setIsValid(false);
                    setThreedotLoader(false);
                    setToastError('Upload failed due to incorrect format');
                    e.target.value = '';
                    setFile(null);
                    return;
                }

                // Check the number of rows
                const rowCount = rows.length - 1; // Exclude header row
                if (rowCount > 200) {
                    setIsValid(false);
                    setThreedotLoader(false);
                    setToastError('Maximum 200 beneficiaries per upload');
                    e.target.value = '';
                    setFile(null);
                    return;
                }

                const path = 'g2p_customers';
                const file = await handleUpload(e.target.files[0], path);
                if (file.key !== '') {
                    const payload = {
                        sheet_name: file.key.split('/')[file.key.split('/').length - 1].split('.')[0],
                        uploaded_by: `${user?.first_name || ''} ${user?.middle_name || ''} ${user?.last_name || ''}`.trim(),
                        paymaart_id: user?.paymaart_id,
                        file_key: file.key
                    };
                    const response = await dataService.PostAPI(`g2p-users/${View?.transaction_id}`, payload);
                    if (response.error === false) {
                        setIsValid(true);
                        setThreedotLoader(false);
                        setToastSuccess(response.data.message);
                        getG2PCustomerView();
                        e.target.value = '';
                        setFile(null);
                    }
                }
            };
            reader.readAsArrayBuffer(selectedFile);
            setFile(selectedFile);
        }
    };

    useEffect(() => {
        getG2PCustomerView();
    }, [searchParams]);

    useEffect(() => {
        if (View?.length !== 0) {
            setNotFound(false);
        }
    }, [View]);

    return (
        <>
            <CardHeader
                activePath={'G2P Profile'}
                paths={['Financials', 'G2P']}
                pathurls={['financials/G2P']}
                header=''
                minHeightRequired={true}
                ChildrenElement
            >
                {<>
                    <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 mt-8 px-[30px] pt-[24px] pb-[28px] 
        flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
        `}>
                        <div className='flex justify-between items-center' data-testid="customer_g2p_view">
                            <ProfileName
                                g2pCustomer={true}
                                userButtonName={`${View?.first_name[0] || ''}${View?.middle_name[0] || ''}${View?.last_name[0] || ''}`}
                                UserName={`${View?.first_name} ${View?.middle_name} ${View?.last_name}`}
                                payMaartID={View?.paymaart_id}
                                Amount={(View?.amount) ? `${View?.amount}` : `${View?.remaining_amount} MWK`}
                                CreatedDate={formatTimestamp(View?.created_at)}
                                loading={loading}
                            />
                            <div>
                                <div className="flex items-start">
                                    <a download href='/public/sample_G2P_Customers.xlsx'>
                                        <button onClick={() => setToastSuccess('Sample file downloaded successfully')} type='button' className='font-semibold text-base bg-white px-4 py-2 text-[#3B2A6F] border border-[#3B2A6F] rounded-[6px]'>
                                            Sample File
                                        </button>
                                    </a>
                                    <div className="file-upload-button">
                                        <button
                                            type='button'
                                            onClick={handleUploadSheet}
                                            className='font-semibold text-base text-white px-4 py-2 bg-[#3B2A6F] rounded-[6px] flex items-center ml-4'
                                        >
                                            {threedotLoader
                                                ? <span>{<BeatLoader color={'#ffff'} size={'10px'} />}</span>
                                                : <>
                                                    <span className='mr-2'>
                                                        <img src="/images/upload-white.svg" alt="upload" />
                                                    </span>
                                                    Upload Sheet
                                                </>
                                            }
                                        </button>
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls"
                                            data-testid="excel_sheet"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                                {validationMessage && (
                                    <p className={`mt-[10px] ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                                        {validationMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={`relative ${notFound || View?.length === 0 ? '' : 'mx-10 mb-8 mt-8 border border-[#DDDDDD] bg-white rounded-[6px]'}`}>
                        {!notFound && !(View && View?.sheets?.length === 0 && !loading &&
                            !(searchParams.get('status') !== null || searchParams.get('search') !== null)) &&
                            <div className='overflow-auto scrollBar h-g2pCustomerTableHeight rounded-[6px]'>
                                <G2PCustomerTable
                                    View={View}
                                    loading={loading}
                                    error={error}
                                    searchParams={searchParams}
                                    setSearchparams={setSearchParams}
                                    modalView={modalView}
                                    setModalView={setModalView}
                                    setSelectedSheets={setSelectedSheets}
                                    file={file}
                                />
                            </div>}
                        {notFound &&
                            <NoDataError
                                className='h-g2pNotFound' heading='No data found' text="404 could not find what you are looking for." />}
                        {View && View?.sheets?.length === 0 && !loading &&
                            !(searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                            (<NoDataError className='h-g2pNotFound' heading='There are no G2P list to view yet' topValue='mt-8' />)}
                        {(!loading && !error && !notFound && View && View?.sheets?.length > 0) && <Paginator
                            currentPage={searchParams.get('page')}
                            totalPages={Math.ceil(View?.total_records / 10)}
                            setSearchParams={setSearchParams}
                            searchParams={searchParams}
                            totalRecords={View?.total_records}
                        />}
                    </div>
                </>}
            </CardHeader>
        </>
    );
}
