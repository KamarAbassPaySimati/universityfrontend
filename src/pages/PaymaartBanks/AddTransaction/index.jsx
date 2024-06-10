import React, { useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { useParams } from 'react-router';
import FelidDivision from '../../../components/FelidDivision/FelidDivision';
import UploadPlaceholder from '../../../components/S3Upload/UploadPlaceholder';

export default function AddTransaction () {
    const { id } = useParams();
    const [filedData, setFiledData] = useState({});
    const [submitSelected, setSubmitSelected] = useState(false);
    const InterNationalAddress = {
        nothing_to_show: {
            Type: {
                label: 'Type',
                type: 'dropdown',
                key: 'transaction_code',
                require: true,
                options: [
                    `Pay-in by Agent to ${id} | RM Credit`
                ]
            },
            '<Beneficiary> Paymaart ID': {
                label: '<Beneficiary> Paymaart ID',
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
    const handleStates = (value, id) => {
        setFiledData((prevState) => ({ ...prevState, [id]: value }));
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
                    submitSelected={false}
                />
                <div className="w-[48%] relative ml-2">
                    <UploadPlaceholder
                        label={'Transaction POP'}
                        labelValue={'Transaction POP'}
                        testId={'kyc_upload_document_front'}
                        disabled={undefined}
                        path={`add_transaction/${id}`}
                        handleUploadImg={handleStates}
                        selectedUploadImg={filedData.pop_file_key}
                        states={filedData}
                        handleStates={handleStates}
                        error={submitSelected && filedData.pop_file_key}
                    />
                </div>
            </CardHeader>
        </div>
    );
}
