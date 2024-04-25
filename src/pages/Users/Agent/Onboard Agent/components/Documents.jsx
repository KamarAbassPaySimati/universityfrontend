import React from 'react';
import Capture from '../../../../../components/CameraCapture/Capture';
import RulesList from '../../../../../components/InformationList/RulesList';
import UploadPlaceholder from '../../../../../components/S3Upload/UploadPlaceholder';
import InputFieldWithDropDown from '../../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import { useParams } from 'react-router-dom';
import { GetDocumentInfomation, GetIdDocumentList, SelfieRules } from './KYCFunctions';

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
                    information={GetDocumentInfomation(states.personal_customer, type)}
                    handleInput={handleStates}
                />
            </div>
            <div className='flex'>
                <div className="w-[48%] relative">
                    <UploadPlaceholder
                        label={(states[type] === 'National ID' || states[type] === 'Driver\'s Licence' ||
                        states[type] === 'Traffic Register Card')
                            ? 'Front'
                            : 'File Name'}
                        labelValue={`${states[type]} Image ${
                            (states[type] === 'National ID' || states[type] === 'Driver\'s Licence' ||
                        states[type] === 'Traffic Register Card')
                                ? 'Front'
                                : ''}`}
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
                states[type] === 'Traffic Register Card') &&
                <div className="w-[48%] relative ml-[4%]">
                    <UploadPlaceholder
                        label="Back"
                        labelValue={`${states[type]} Image Back'`}
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
