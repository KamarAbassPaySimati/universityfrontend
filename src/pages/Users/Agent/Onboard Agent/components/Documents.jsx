import React from 'react';
import Capture from '../../../../../components/CameraCapture/Capture';
import RulesList from '../../../../../components/InformationList/RulesList';
import UploadPlaceholder from '../../../../../components/S3Upload/UploadPlaceholder';
import InputFieldWithDropDown from '../../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import { useParams } from 'react-router-dom';
import { GetDocumentInfomation, GetIdDocumentList, NatureOfPermitOptions, SelfieRules } from './KYCFunctions';
import InputField from '../../../../../components/InputField/InputField';

export default function Documents ({ type, handleStates, states, submitSelected }) {
    const { id } = useParams();

    return (
        <div className='ml-[30px] w-[70%] overflow-auto scrollBar h-heightSideBar pr-2'>
            <div className="w-[48%] relative">
                <InputFieldWithDropDown
                    labelName={type}
                    value={states[type] === undefined ? '' : states[type]}
                    placeholder={`Select ${type}`}
                    error={submitSelected && (states[type] === undefined || states[type]?.trim() === '')
                        ? 'Required field'
                        : undefined}
                    options={GetIdDocumentList(states.citizen_type === 'Malawi citizen'
                        ? states.personal_customer
                        : 'Non Malawi citizen', type)}
                    id={type}
                    testId={`${type.replaceAll(' ', '_').toLowerCase()}_dropdown`}
                    information={GetDocumentInfomation(states.citizen_type === 'Malawi citizen'
                        ? states.personal_customer
                        : 'Non Malawi citizen', type)}
                    handleInput={handleStates}
                />
            </div>
            {states.citizen_type !== 'Malawi citizen' && states[type] === 'Passport' &&
            <div className='flex'>
                <div className="w-[48%] relative mt-2">
                    <InputFieldWithDropDown
                        labelName={'Nature of permit'}
                        value={states.nature_of_permit === undefined ? '' : states.nature_of_permit}
                        placeholder={'Select Nature of permit'}
                        error={submitSelected && (states.nature_of_permit === undefined || states.nature_of_permit === '')
                            ? 'Required field'
                            : undefined}
                        options={NatureOfPermitOptions}
                        id={'nature_of_permit'}
                        testId={'nature_of_permit_dropdown'}
                        handleInput={handleStates}
                    />
                </div>
                <div className='mt-2 w-[48%]  ml-[2%]'>
                    <InputField
                        className=''
                        divClassName='mx-2.5'
                        value={states.ref_no === undefined ? '' : states.ref_no}
                        id={'ref_no'}
                        testId={'ref_no'}
                        error={submitSelected && (states.ref_no === undefined || states.ref_no === '')
                            ? 'Required field'
                            : undefined}
                        label={'Reference number'}
                        placeholder={'Enter Reference number'}
                        maxLength="100"
                        onChange={handleStates}
                        inputType={'input'}
                    />
                </div>
            </div>
            }
            <div className='flex'>
                <div className="w-[48%] relative">
                    <UploadPlaceholder
                        label={(states[type] === 'National ID' || states[type] === 'Driver\'s Licence' ||
                        states[type] === 'Traffic Register Card')
                            ? 'Front'
                            : (states.citizen_type !== 'Malawi citizen' && states[type] === 'Passport')
                                ? 'Data page'
                                : 'File Name'}
                        labelValue={`${states[type]} ${
                            (states[type] === 'National ID' || states[type] === 'Driver\'s Licence' ||
                        states[type] === 'Traffic Register Card')
                                ? 'Image Front'
                                : (states.citizen_type !== 'Malawi citizen' && states[type] === 'Passport')
                                    ? 'Data page Image'
                                    : 'Image'}`}
                        testId={'kyc_upload_document_front'}
                        disabled={states[type] === undefined}
                        path={`kyc_data/${id}`}
                        handleUploadImg={handleStates}
                        selectedUploadImg={`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`}
                        states={states}
                        handleStates={handleStates}
                        error={submitSelected && (states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`] ===
                        undefined ||
                        states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`] === '')}
                    />
                </div>
                {(states[type] === 'National ID' || states[type] === 'Driver\'s Licence' ||
                states[type] === 'Traffic Register Card' ||
                (states.citizen_type !== 'Malawi citizen' && states[type] === 'Passport')) &&
                <div className="w-[48%] relative ml-[4%]">
                    <UploadPlaceholder
                        label={(states.citizen_type !== 'Malawi citizen' && states[type] === 'Passport') ? 'Visa page' : 'Back'}
                        labelValue={`${states[type]} ${(states.citizen_type !== 'Malawi citizen' && states[type] === 'Passport')
                            ? 'Visa page'
                            : 'Image Back'}`}
                        testId={'kyc_upload_document_back'}
                        disabled={states[type] === undefined}
                        path={`kyc_data/${id}`}
                        selectedUploadImg={`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_back`}
                        states={states}
                        handleStates={handleStates}
                        error={submitSelected && (states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_back`] ===
                        undefined ||
                        states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_back`] === '')}
                    />
                </div>}
            </div>
            {type === 'ID Document' && <div>
                <h1 className='font-bold text-[16px] leading-4 text-neutral-primary'>Biometrics | Live selfie</h1>
                <div className='flex'>
                    <div className="w-[48%] relative">
                        <Capture
                            label="Selfie"
                            handleStates={handleStates}
                            states={states}
                            submitSelected={submitSelected && (states?.capture === '' || states?.capture === undefined)}
                        />

                    </div>
                    <div className='w-[48%] ml-[4%]'>
                        <RulesList
                            heading="Selfie Rules"
                            rulesList={SelfieRules}
                        />
                    </div>
                </div>
            </div>}
        </div>
    );
}
