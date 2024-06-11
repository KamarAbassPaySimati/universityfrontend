import React, { useContext, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { useNavigate, useParams } from 'react-router';
import FelidDivision from '../../../components/FelidDivision/FelidDivision';
import UploadPlaceholder from '../../../components/S3Upload/UploadPlaceholder';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import { dataService } from '../../../services/data.services';
import { TransactionCode } from './TransactionCode';
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
        case `Pay-in by Agent to ${id} | RM credit`:
            return 'Agent Paymaart ID';
        default:
            return '<Beneficiary> Paymaart ID';
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
                    `Pay-in by Agent to ${id} | RM credit`
                ]
            },
            '<Beneficiary> Paymaart ID': {
                label: getPaymaartIdType(),
                placeHolder: 'Enter paymaart ID',
                type: 'input',
                key: 'entry_for',
                require: true
            },
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
                    const regex = /^(\d{1,15}(\.\d{0,2})?)?$/;
                    if (regex.test(value.target.value)) {
                        console.log('type', type, id, regex.test(value.target.value));
                        setFiledData((prevState) => ({ ...prevState, [id]: value.target.value }));
                    } else {
                        setFiledData((prevState) => ({ ...prevState, [id]: filedData.amount }));
                    }
                }
            } else {
                setFiledData((prevState) => ({ ...prevState, [id]: value.target.value }));
            }
        } else {
            setFiledData((prevState) => ({ ...prevState, [id]: value }));
        }
    };
    const handleAddTransaction = async () => {
        setLoading(true);
        setSubmitSelected(false);
        const dataArray = ['transaction_code', 'entry_for', 'amount', 'pop_file_key', 'transaction_pop_ref_number'];
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
                    entry_for: filedData?.entry_for,
                    entry_by: filedData?.entry_by,
                    amount: parseInt(filedData?.amount),
                    transaction_pop_ref_number: filedData.transaction_pop_ref_number,
                    pop_file_key: filedData.pop_file_key,
                    bank_id: id
                };
                const res = await dataService.PostAPI('bank-transactions/direct-payin', payload);
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
