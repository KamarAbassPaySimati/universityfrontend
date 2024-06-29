import React, { useContext, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { useNavigate, useParams } from 'react-router';
import FelidDivision from '../../../components/FelidDivision/FelidDivision';
import UploadPlaceholder from '../../../components/S3Upload/UploadPlaceholder';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import { dataService } from '../../../services/data.services';
import { TransactionCode } from '../TransactionCode';
import GlobalContext from '../../../components/Context/GlobalContext';

export default function AddTransaction () {
    const { id } = useParams();
    const [submitSelected, setSubmitSelected] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { user } = useSelector((state) => state.auth);
    const [filedData, setFiledData] = useState({ entry_by: user.paymaart_id });
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const getPaymaartIdType = () => {
        switch (filedData.transaction_code) {
        case `Pay-in by Paymaart OBO Agent to ${id} | RM credit`:
        case `Pay-in by Agent to ${id} | RM credit`:
            return 'Agent Paymaart ID';
        case `Pay-in by Paymaart OBO Standard Customer to ${id} | RM credit`:
        case `Pay-in by Standard Customer to ${id} | RM credit`:
        case `Pay-in by Paymaart OBO G2P Customer to ${id} | RM credit`:
            return 'Customer Paymaart ID';
        case `Pay-in by G2P Customer to ${id} | RM credit`:
            return 'G2P Customer Paymaart ID';
        default:
            return '<Beneficiary> Paymaart ID';
        }
    };

    const getStaticText = () => {
        switch (filedData.transaction_code) {
        case `Pay-in by Agent to ${id} | RM credit`:
        case `Pay-in by Paymaart OBO Agent to ${id} | RM credit`:
            return 'AGT';
        case `Pay-in by Paymaart OBO Standard Customer to ${id} | RM credit`:
        case `Pay-in by Standard Customer to ${id} | RM credit`:
        case `Pay-in by Paymaart OBO G2P Customer to ${id} | RM credit`:
        case `Pay-in by G2P Customer to ${id} | RM credit`:
            return 'CMR';
        default:
            return undefined;
        }
    };

    const InterNationalAddress = {
        nothing_to_show: {
            Type: {
                label: 'Type',
                type: 'dropdown',
                key: 'transaction_code',
                require: true,
                options: [
                    `Pay-in by Agent to ${id} | RM credit`,
                    `Pay-in by Standard Customer to ${id} | RM credit`,
                    `Pay-in by G2P Customer to ${id} | RM credit`,
                    `Pay-in by Paymaart OBO Agent to ${id} | RM credit`,
                    `Pay-in by Paymaart OBO Standard Customer to ${id} | RM credit`,
                    `Pay-in by Paymaart OBO G2P Customer to ${id} | RM credit`,
                    `Inflow For EM Float/other E-Funding to ${id} | RM credit`,
                    `Inflow for Marketing Campaign Fund to ${id} | RM credit`,
                    `Receipt of Customer Balances Interest from ${id} | RM credit`

                ]
            },
            '<Beneficiary> Paymaart ID':
            (filedData.transaction_code === `Inflow For EM Float/other E-Funding to ${id} | RM credit` ||
                filedData.transaction_code === `Inflow for Marketing Campaign Fund to ${id} | RM credit` ||
                filedData.transaction_code === `Receipt of Customer Balances Interest from ${id} | RM credit`
            )
                ? undefined
                : {
                    label: getPaymaartIdType(),
                    placeHolder: 'Enter paymaart ID',
                    type: 'inputStaticText',
                    key: 'entry_for',
                    require: true,
                    staticText: getStaticText()
                },
            lll: undefined,
            Amount: {
                label: 'Amount',
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
            if (value.target.value.length <= 8) {
                const regex = /^\d{0,9}$/;
                if (regex.test(value.target.value)) {
                    setFiledData((prevState) => ({ ...prevState, [id]: value.target.value }));
                } else {
                    setFiledData((prevState) => ({
                        ...prevState,
                        [id]: filedData?.entry_for
                            ? filedData.entry_for
                            : ''
                    }));
                }
            }
        } else {
            setFiledData((prevState) => ({ ...prevState, [id]: value }));
        }
    };
    const getEndPoint = () => {
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
        default:
            return '<Beneficiary> Paymaart ID';
        }
    };
    const handleAddTransaction = async () => {
        setLoading(true);
        setSubmitSelected(false);
        const dataArray =
        (filedData.transaction_code === `Inflow For EM Float/other E-Funding to ${id} | RM credit` ||
            filedData.transaction_code === `Inflow for Marketing Campaign Fund to ${id} | RM credit` ||
            filedData.transaction_code === `Receipt of Customer Balances Interest from ${id} | RM credit`
        )
            ? ['transaction_code', 'amount', 'pop_file_key', 'transaction_pop_ref_number']
            : ['transaction_code', 'entry_for', 'amount', 'pop_file_key', 'transaction_pop_ref_number'];
        let dataError = false;
        dataArray.forEach((item) => {
            if (!dataError) {
                if (filedData[item]?.trim() === '' || filedData[item] === undefined) {
                    console.log('item', item);
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
                const payload = {
                    transaction_code: TransactionCode(filedData.transaction_code),
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

                default:
                    payload.entry_for = `${getStaticText()}${filedData?.entry_for}`;
                    break;
                }
                const res = await dataService.PostAPI(`bank-transactions/${getEndPoint()}`, payload);
                if (res.error) {
                    setToastError(res.data.data.message);
                } else {
                    setToastSuccess('Transaction details added successfully ');
                    Navigate(`/paymaart-banks/trust-banks/view-trust-bank/${id}`);
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
                paths={['Paymaart Banks', 'Trust Banks', 'Transaction Details']}
                pathurls={['paymaart-banks', `trust-banks/view-trust-bank/${id}`]}
                header={'Add Transaction'}
                minHeightRequired={true}
                table={false}
            >
                <FelidDivision
                    divisionClassName = {'w-1/3'}
                    divisionObject = {InterNationalAddress}
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
                        error={submitSelected && (filedData?.pop_file_key?.trim() === '' || filedData.pop_file_key === undefined)}
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

            </CardHeader>
        </div>
    );
}
