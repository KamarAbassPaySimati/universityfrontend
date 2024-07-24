import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { useNavigate, useParams } from 'react-router';
import FelidDivision from '../../../components/FelidDivision/FelidDivision';
import UploadPlaceholder from '../../../components/S3Upload/UploadPlaceholder';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import { dataService } from '../../../services/data.services';
import { TransactionCode } from '../TransactionCode';
import GlobalContext from '../../../components/Context/GlobalContext';
import ViewDetail from '../../../components/ViewDeatilComponent/ViewDeatil';
export default function AddTransaction ({ type }) {
    const { id } = useParams();
    const [submitSelected, setSubmitSelected] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { user } = useSelector((state) => state.auth);
    const [filedData, setFiledData] = useState({ entry_by: user.paymaart_id, amount: '' });
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [BankDropDownValue, setBankDropDownValue] = useState([]);
    const Navigate = useNavigate();
    const getPaymaartIdType = () => {
        switch (filedData.transaction_code) {
        case `Pay-in by Paymaart OBO Agent to ${id} | RM credit`:
        case `Pay-in by Agent to ${id} | RM credit`:
        case 'Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deactivation from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deactivation from PTBA3 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deletion from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deletion from PTBA3 | EM credit to PMCAT':
            return 'Agent Paymaart ID';
        case `Pay-in by Paymaart OBO Standard Customer to ${id} | RM credit`:
        case `Pay-in by Standard Customer to ${id} | RM credit`:
        case `Pay-in by Paymaart OBO G2P Customer to ${id} | RM credit`:
        case 'Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deactivation from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deactivation from PTBA3 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deletion from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deletion from PTBA3 | EM credit to PMCAT':
            return 'Customer Paymaart ID';
        case `Pay-in by G2P Customer to ${id} | RM credit`:
            return 'G2P Customer Paymaart ID';
        case 'Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT':
        case 'Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT':
        case 'Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT':
            return 'Amount';
        default:
            return '<Beneficiary> Paymaart ID';
        }
    };
    const getBankTypes = async () => {
        try {
            const response = await dataService.GetAPI('admin-users/list-trust-bank');
            const bankTypes = response.data.data;

            const arrayValue = bankTypes.reduce((acc, item) => {
                if (item.ref_no !== 'PTBAT') {
                    if (type === 'main-capital') {
                        acc.push(`Outflow for excess Float withdrawal from ${item.ref_no} | EM credit to PMCAT`);
                        acc.push(`Settlement to Merchant Biller from ${item.ref_no} | EM credit to PMCAT`);
                        acc.push(`Payout to Paymaart Operations for excess Float in PMCA to ${item.ref_no}`);
                    } else {
                        acc.push(`Pay-out to Agent Post Deactivation from ${item.ref_no} | EM credit to PMCAT`);
                        acc.push(`Pay-out to Customer Post Deactivation from ${item.ref_no} | EM credit to PMCAT`);
                        acc.push(`Pay-out to Agent Post Deletion from ${item.ref_no} | EM credit to PMCAT`);
                        acc.push(`Pay-out to Customer Post Deletion from ${item.ref_no} | EM credit to PMCAT`);
                    }
                }
                return acc;
            }, []);
            if (type === 'main-capital') {
                arrayValue.push('Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF');
            }
            setBankDropDownValue(arrayValue);
        } catch (error) {
            console.error('Error fetching bank types:', error);
        } finally {
            setLoadingPage(false);
        }
    };

    useEffect(() => {
        if (type === 'main-capital' || type === 'suspense-account') {
            getBankTypes();
        } else {
            setLoadingPage(false);
        }
    }, [type]);
    const getStaticText = () => {
        console.log(filedData.transaction_code, 'filedData.transaction_code');
        switch (filedData.transaction_code) {
        case `Pay-in by Agent to ${id} | RM credit`:
        case `Pay-in by Paymaart OBO Agent to ${id} | RM credit`:
        case 'Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deactivation from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deactivation from PTBA3 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deletion from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Agent Post Deletion from PTBA3 | EM credit to PMCAT':
            return 'AGT';
        case `Pay-in by Paymaart OBO Standard Customer to ${id} | RM credit`:
        case `Pay-in by Standard Customer to ${id} | RM credit`:
        case `Pay-in by Paymaart OBO G2P Customer to ${id} | RM credit`:
        case `Pay-in by G2P Customer to ${id} | RM credit`:
        case 'Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deactivation from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deactivation from PTBA3 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deletion from PTBA2 | EM credit to PMCAT':
        case 'Pay-out to Customer Post Deletion from PTBA3 | EM credit to PMCAT':
            return 'CMR';
        default:
            return undefined;
        }
    };

    let path;
    let pathUrls;
    switch (type) {
    case 'trust-bank':
        path = ['Paymaart Banks', 'Trust Banks', 'Transaction Details'];
        pathUrls = ['paymaart-banks', `trust-banks/view-trust-bank/${id}`];
        break;
    case 'suspense-account':
        path = ['Paymaart Banks', 'Suspense Account', 'Transaction Details'];
        pathUrls = ['paymaart-banks', `suspense-account/view-suspense-account/${id}`];
        break;
    case 'main-capital':
        path = ['Paymaart Banks', 'Main Capital', 'Transaction Details'];
        pathUrls = ['paymaart-banks', `main-capital/view-main-capital/${id}`];
        break;
    case 'taxes':
        path = ['Paymaart Banks', 'Taxes', 'Transaction Details'];
        pathUrls = ['paymaart-banks', `taxes/view-taxes/${id}`];
        break;
    case 'transaction-fees-and-commissions':
        path = ['Paymaart Banks', 'Transaction fees & Commissions'];
        pathUrls = ['paymaart-banks', `transaction-fees-and-commissions/view-transaction-fees-and-commissions/${id}`];
        break;
    default:
        path = ['Paymaart Banks', 'Trust Banks', 'Transaction Details'];
        pathUrls = ['paymaart-banks', `trust-banks/view-trust-bank/${id}`];
        break;
    }

    const transactionMapping = {
        'Settlement to Merchant Biller from PTBA1 | EM credit to PMCAT': 'PTBA1',
        'Settlement to Merchant Biller from PTBA2 | EM credit to PMCAT': 'PTBA2',
        'Settlement to Merchant Biller from PTBA3 | EM credit to PMCAT': 'PTBA3'
    };
    const merchantMapping = {
        'Afrimax | MCT24680': 'MCT24680',
        'Paymaart | MCT13579': 'MCT13579'
    };

    const determineOptions = (type, id) => {
        switch (type) {
        case 'trust-bank':
            return [
                `Pay-in by Agent to ${id} | RM credit`,
                `Pay-in by Standard Customer to ${id} | RM credit`,
                `Pay-in by G2P Customer to ${id} | RM credit`,
                `Pay-in by Paymaart OBO Agent to ${id} | RM credit`,
                `Pay-in by Paymaart OBO Standard Customer to ${id} | RM credit`,
                `Pay-in by Paymaart OBO G2P Customer to ${id} | RM credit`,
                `Inflow For EM Float/other E-Funding to ${id} | RM credit`,
                `Inflow for Marketing Campaign Fund to ${id} | RM credit`,
                `Receipt of Customer Balances Interest from ${id} | RM credit`,
                `Charge for Bank Services or Transactions from ${id} | RM debit`
            ];
        case 'main-capital':
        case 'suspense-account':
            return BankDropDownValue.sort();
        case 'taxes':
            return [
                'Balance EM Excess Return to Paymaart Main Capital Account for Float',
                'Balance EM Excess Return to Paymaart Main Capital Account for Payout'
            ];
        case 'transaction-fees-and-commissions':
            return [
                'Balance EM Excess Return to Paymaart Main Capital Account for Float',
                'Balance EM Excess Return to Paymaart Main Capital Account for Payout'
            ];
        default:
            return [
                'Balance EM Excess Return to Paymaart Main Capital Account for Float',
                'Balance EM Excess Return to Paymaart Main Capital Account for Payout'
            ];
        }
    };

    const options = determineOptions(type, id);

    const TransactionFieldValue = {
        nothing_to_show: {
            Type: {
                label: 'Type',
                type: 'dropdown',
                key: 'transaction_code',
                require: true,
                options
            },
            ...(type !== 'main-capital' && type !== 'taxes' && type !== 'transaction-fees-and-commissions' && {
                '<Beneficiary> Paymaart ID':
                    (filedData.transaction_code === `Inflow For EM Float/other E-Funding to ${id} | RM credit` ||
                        filedData.transaction_code === `Inflow for Marketing Campaign Fund to ${id} | RM credit` ||
                        filedData.transaction_code === `Receipt of Customer Balances Interest from ${id} | RM credit` ||
                        filedData.transaction_code === `Charge for Bank Services or Transactions from ${id} | RM debit`
                    )
                        ? undefined
                        : {
                            label: getPaymaartIdType(),
                            placeHolder: 'Enter paymaart ID',
                            type: 'inputStaticText',
                            key: 'entry_for',
                            require: true,
                            staticText: getStaticText()
                        }
            }),
            ...(Object.keys(transactionMapping).includes(filedData.transaction_code) && {
                'Merchant Biller Paymaart ID': {
                    label: 'Merchant Biller Paymaart ID',
                    type: 'dropdown',
                    key: 'merchant_biller_id',
                    require: true,
                    options: Object.keys(merchantMapping)
                }
            }),
            Amount: {
                label: 'Amount (MWK)',
                type: 'input',
                key: 'amount',
                require: true
            },
            'Entry by': {
                label: 'Entry by',
                type: 'input',
                key: 'entry_by',
                disable: true
            },
            'Transaction POP Ref. No': {
                label: 'Transaction POP Ref. No',
                type: 'input',
                key: 'transaction_pop_ref_number',
                require: true
            }
        }
    };

    const handleStates = (value, id, type) => {
        if (type === 'input') {
            if (id === 'amount') {
                if (value.target.value?.length <= 18) {
                    const regex = /^\d{0,8}(\.\d{0,2})?$/;
                    if (regex.test(value.target.value)) {
                        setFiledData((prevState) => ({ ...prevState, [id]: value.target.value }));
                    } else {
                        setFiledData((prevState) => ({
                            ...prevState,
                            [id]: filedData?.amount
                                ? filedData.amount
                                : ''
                        }));
                    }
                }
            } else {
                setFiledData((prevState) => ({ ...prevState, [id]: value.target.value }));
            }
        } else if (type === 'inputStaticText') {
            // if (value.target.value.length <= 8) {
            const regex = /^\d{0,9}$/;
            if (regex.test(value.target.value)) {
                setFiledData((prevState) => ({ ...prevState, [id]: value.target.value }));
            } else {
                setFiledData((prevState) => ({
                    ...prevState,
                    [id]: filedData?.entry_for
                        ? filedData.entry_for.replace(/[^0-9]/g, '')
                        : ''
                }));
            }
            // }
        } else {
            setFiledData((prevState) => ({ ...prevState, [id]: value }));
        }
    };

    const getEndPoint = () => {
        switch (type) {
        case 'transaction-fees-and-commissions':
            return 'add-commission-account-transaction';
        case 'suspense-account':
            return 'suspense-transaction';
        default:
            switch (filedData.transaction_code) {
            case `Pay-in by Agent to ${id} | RM credit`:
            case `Pay-in by Standard Customer to ${id} | RM credit`:
                return 'direct-payin';
            case `Pay-in by Paymaart OBO Agent to ${id} | RM credit`:
            case `Pay-in by Paymaart OBO Standard Customer to ${id} | RM credit`:
                return 'payin-on-behalf';
            case `Pay-in by G2P Customer to ${id} | RM credit`:
                return 'g2p-payin';
            case `Pay-in by Paymaart OBO G2P Customer to ${id} | RM credit`:
                return 'g2p-on-behalf';
            case `Inflow For EM Float/other E-Funding to ${id} | RM credit`:
            case `Inflow for Marketing Campaign Fund to ${id} | RM credit`:
            case `Receipt of Customer Balances Interest from ${id} | RM credit`:
                return 'float';
            case 'Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT':
            case 'Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT':
            case 'Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT':
            case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA1':
            case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA2':
            case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA3':
                return 'excess-float';
            case 'Balance EM Excess Return to Paymaart Main Capital Account for Float':
            case 'Balance EM Excess Return to Paymaart Main Capital Account for Payout':
                return 'add-tax-account-transaction';
            case 'Settlement to Merchant Biller from PTBA1 | EM credit to PMCAT':
            case 'Settlement to Merchant Biller from PTBA2 | EM credit to PMCAT':
            case 'Settlement to Merchant Biller from PTBA3 | EM credit to PMCAT':
                return 'settlement';
            case 'Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF':
                return 'pmtf-float';
            case 'Charge for Bank Services or Transactions from PTBA1 | RM debit':
            case 'Charge for Bank Services or Transactions from PTBA2 | RM debit':
            case 'Charge for Bank Services or Transactions from PTBA3 | RM debit':
                return 'bank-charges';
            default:
                return '<Beneficiary> Paymaart ID';
            }
        }
    };

    const handleAddTransaction = async () => {
        setLoading(true);
        setSubmitSelected(false);
        let dataArray =
            (filedData.transaction_code === `Inflow For EM Float/other E-Funding to ${id} | RM credit` ||
                filedData.transaction_code === `Inflow for Marketing Campaign Fund to ${id} | RM credit` ||
                filedData.transaction_code === `Charge for Bank Services or Transactions from ${id} | RM debit` ||
                filedData.transaction_code === `Receipt of Customer Balances Interest from ${id} | RM credit` ||
                filedData.transaction_code === 'Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT' ||
                filedData.transaction_code === 'Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT' ||
                filedData.transaction_code === 'Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT' ||
                filedData.transaction_code === 'Payout to Paymaart Operations for excess Float in PMCA to PTBA1' ||
                filedData.transaction_code === 'Payout to Paymaart Operations for excess Float in PMCA to PTBA2' ||
                filedData.transaction_code === 'Payout to Paymaart Operations for excess Float in PMCA to PTBA3' ||
                type === 'transaction-fees-and-commissions' ||
                // type === 'taxes'
                filedData.transaction_code === 'Balance EM Excess Return to Paymaart Main Capital Account for Float' ||
                filedData.transaction_code === 'Balance EM Excess Return to Paymaart Main Capital Account for Payout' ||
                filedData.transaction_code === 'Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF'
            )
                ? ['transaction_code', 'amount', 'pop_file_key', 'transaction_pop_ref_number']
                : ['transaction_code', 'entry_for', 'amount', 'pop_file_key', 'transaction_pop_ref_number'];
        let dataError = false;
        if (Object.keys(transactionMapping).includes(filedData.transaction_code)) {
            dataArray = ['transaction_code', 'merchant_biller_id', 'amount', 'pop_file_key', 'transaction_pop_ref_number'];
        }
        dataArray.forEach((item) => {
            if (!dataError) {
                if (filedData[item]?.trim() === '' || filedData[item] === undefined) {
                    dataError = true;
                }
            }
        });
        // Check for undefined or empty values
        if (dataError) {
            setSubmitSelected(true);
            setLoading(false);
        } else {
            try {
                const variable = TransactionCode(filedData.transaction_code, type);
                console.log(variable);
                const payload = {
                    transaction_code: TransactionCode(filedData.transaction_code, type),
                    entry_by: filedData?.entry_by,
                    amount: parseFloat(filedData?.amount),
                    transaction_pop_ref_number: filedData.transaction_pop_ref_number,
                    pop_file_key: filedData.pop_file_key,
                    bank_id: id
                };
                switch (filedData.transaction_code) {
                case `Inflow For EM Float/other E-Funding to ${id} | RM credit`:
                    payload.transaction_type = 'float';
                    break;
                case `Inflow for Marketing Campaign Fund to ${id} | RM credit`:
                    payload.transaction_type = 'float';
                    break;
                case `Receipt of Customer Balances Interest from ${id} | RM credit`:
                    payload.transaction_type = 'float';
                    break;
                case 'Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT':
                    payload.transaction_type = 'excess-float';
                    payload.bank_type = 'PTBA1';
                    break;
                case 'Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT':
                    payload.transaction_type = 'excess-float';
                    payload.bank_type = 'PTBA2';
                    break;
                case 'Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT':
                    payload.transaction_type = 'excess-float';
                    payload.bank_type = 'PTBA3';
                    break;
                case 'Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF':
                    payload.transaction_type = 'pmtf_float';
                    break;
                case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA1':
                    payload.transaction_type = 'pmtf_float';
                    payload.bank_type = 'PTBA1';
                    break;
                case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA2':
                    payload.transaction_type = 'pmtf_float';
                    payload.bank_type = 'PTBA2';
                    break;
                case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA3':
                    payload.transaction_type = 'pmtf_float';
                    payload.bank_type = 'PTBA3';
                    break;
                case 'Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT':
                case 'Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT':
                case 'Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT':
                case 'Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT':
                    payload.transaction_type = 'delete_payout';
                    payload.bank_id = 'PTBA1';
                    payload.entry_for = `${getStaticText()}${filedData?.entry_for}`;
                    break;
                case 'Pay-out to Agent Post Deactivation from PTBA2 | EM credit to PMCAT':
                case 'Pay-out to Customer Post Deactivation from PTBA2 | EM credit to PMCAT':
                case 'Pay-out to Agent Post Deletion from PTBA2 | EM credit to PMCAT':
                case 'Pay-out to Customer Post Deletion from PTBA2 | EM credit to PMCAT':
                    payload.transaction_type = 'delete_payout';
                    payload.bank_id = 'PTBA2';
                    payload.entry_for = `${getStaticText()}${filedData?.entry_for}`;
                    break;
                case 'Pay-out to Agent Post Deactivation from PTBA3 | EM credit to PMCAT':
                case 'Pay-out to Customer Post Deactivation from PTBA3 | EM credit to PMCAT':
                case 'Pay-out to Agent Post Deletion from PTBA3 | EM credit to PMCAT':
                case 'Pay-out to Customer Post Deletion from PTBA3 | EM credit to PMCAT':
                    payload.transaction_type = 'delete_payout';
                    payload.bank_id = 'PTBA3';
                    payload.entry_for = `${getStaticText()}${filedData?.entry_for}`;
                    break;
                case `Charge for Bank Services or Transactions from ${id} | RM debit`:
                    console.log('nnnn');
                    payload.transaction_type = 'bank_charges';
                    payload.entered_by = payload.entry_by;
                    delete payload.entry_by;
                    break;
                    // write my three conditions
                default:
                    if (type !== 'transaction-fees-and-commissions' && type !== 'taxes' &&
                        !transactionMapping[filedData.transaction_code]) {
                        payload.entry_for = `${getStaticText()}${filedData?.entry_for}`;
                    };
                    break;
                }

                // For Settlement Type of Merchant
                if (transactionMapping[filedData.transaction_code]) {
                    payload.transaction_type = 'settlement';
                    payload.bank_type = transactionMapping[filedData.transaction_code];
                }

                // For Merchant Biller ID
                if (merchantMapping[filedData.merchant_biller_id]) {
                    payload.merchant_biller_id = merchantMapping[filedData.merchant_biller_id];
                }

                const res = await dataService.PostAPI(`bank-transactions/${getEndPoint()}`, payload);
                if (res.error) {
                    setToastError(res.data.data.message);
                } else {
                    setToastSuccess('Transaction details added successfully ');
                    Navigate(`/${pathUrls[0]}/${pathUrls[1]}`);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setToastError(error.data.message);
            }
        }
    };

    return (
        <div>
            <CardHeader
                activePath={'Add Transaction'}
                paths={path}
                pathurls={pathUrls}
                header={'Add Transaction'}
                minHeightRequired={true}
                table={false}
            >
                { loadingPage
                    ? <div className='w-full flex flex-wrap mt-1 -mx-1'>

                        {[...Array(5)].map((_, ind) => (
                            <div className='w-1/3 px-1' key={_}>
                                <ViewDetail
                                    itemkey='Loading...'
                                    userDetails='Loading...'
                                    loading={loadingPage}
                                />
                            </div>
                        ))}
                    </div>
                    : <>
                        <FelidDivision
                            divisionClassName={'w-1/3'}
                            divisionObject={TransactionFieldValue}
                            handleOnChange={handleStates}
                            states={filedData}
                            submitSelected={submitSelected}
                        />
                        <div className="w-[339px] relative ml-2">
                            <UploadPlaceholder
                                label={'Transaction POP'}
                                labelValue={'Transaction POP'}
                                testId={'pop_file_key'}
                                disabled={undefined}
                                path={`add_transaction/${id}`}
                                handleUploadImg={handleStates}
                                selectedUploadImg={'pop_file_key'}
                                states={filedData}
                                handleStates={handleStates}
                                error={submitSelected && (filedData?.pop_file_key?.trim() === '' ||
                                    filedData.pop_file_key === undefined)}
                            />
                        </div>
                        <div className='w-[200px] ml-2'>
                            <Button
                                testId='add_transaction'
                                text='Add'
                                isLoading={loading}
                                onClick={handleAddTransaction}
                            />
                        </div>
                    </>}

            </CardHeader>
        </div>
    );
}
