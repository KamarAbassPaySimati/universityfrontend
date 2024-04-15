import React from 'react';
import Capture from '../../../../../components/CameraCapture/Capture';
import RulesList from '../../../../../components/InformationList/RulesList';
import UploadPlaceholder from '../../../../../components/S3Upload/UploadPlaceholder';
import InformationList from '../../../../../components/InformationList/InformationList';
import InputFieldWithDropDown from '../../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import { Tooltip } from 'react-tooltip';

export default function Documents ({ type, handleStates, states, submitSelected }) {
    const IdDocumentList = ['National ID', 'Passport'];
    const VerificationDocumentList = [
        'Driver\'s Licence',
        'Traffic Register Card',
        'Birth Certificate',
        'Employer letter',
        'Institute letter'];

    const IdInfomation = {
        List1: {
            text: 'Please provide one of these documents plus a selfie (Biometric ID)',
            insideList1: {
                text: 'Valid National ID Card issued by National Registration Bureau',
                insideList1: {
                    text: 'Front and back'
                }
            },
            insideList2: {
                text: 'Valid Passport issued by Department of Immigration'
            }
        }
    };
    const VerificationInfomation = {
        List1: {
            text: 'Please provide one of these documents for additional verification of your primary ID:',
            insideList1: {
                text: 'Valid Driver\'s Licence issued by an appropriate authority',
                insideList1: {
                    text: 'Front and back'
                }
            },
            insideList2: {
                text: 'Valid Traffic Register Card issued by an appropriate authority',
                insideList1: {
                    text: 'Front and back'
                }
            },
            insideList3: {
                text: 'Birth certificate'
            },
            insideList4: {
                text: 'Stamped Letter with Verifiable Particulars of an employer',
                insideList1: {
                    text: 'Signed by Head of the employer'
                }
            },
            insideList5: {
                text: 'Stamped Letter with Verifiable Particulars of a learning institution',
                insideList1: {
                    text: 'Signed by Head of the institution'
                }
            }
        }
    };
    const SelfieRules = {
        List1: {
            text: 'Your digital selfie must be',
            insideList1: {
                text: 'clear and in focus'
            },
            insideList2: {
                text: 'in colour'
            },
            insideList3: {
                text: 'unaltered by computer software'
            },
            insideList4: {
                text: 'at least 600 pixels wide and 750 pixels tall'
            },
            insideList5: {
                text: 'at least 50KB and no more than 10MB'
            },
            insideList6: {
                text: 'contain no other objects or people'
            },
            insideList7: {
                text: 'be taken against a plain light-coloured background'
            },
            insideList8: {
                text: 'be in clear contrast to the background'
            }
        },
        List2: {
            text: 'In your selfie, you must',
            insideList1: {
                text: 'include your head, shoulders and upper body'
            },
            insideList2: {
                text: 'be facing forwards and looking straight at the camera'
            },
            insideList3: {
                text: 'have a plain expression and your mouth closed'
            },
            insideList4: {
                text: 'have your eyes open and visible'
            },
            insideList5: {
                text: 'not have ‘red eye’'
            },
            insideList6: {
                text: 'not have hair in front of your eyes'
            },
            insideList7: {
                text: 'not have a head covering (unless it’s for religious or medical reasons)'
            },
            insideList8: {
                text: 'not have anything covering your face'
            },
            insideList9: {
                text: 'not have any shadows on your face or behind you'
            }
        }
    };
    return (
        <div className='ml-[30px] w-[70%] overflow-auto scrollBar h-heightSideBar pr-2'>
            <div className="w-[48%] relative">
                <InputFieldWithDropDown
                    labelName={type}
                    value={states[type] === undefined ? '' : states[type]}
                    placeholder={`Select ${type}`}
                    error={submitSelected && (states[type] === undefined || states[type] === '') ? 'Required field' : undefined}
                    options={type !== 'ID Document' ? VerificationDocumentList : IdDocumentList}
                    id={type}
                    testId={type}
                    information
                    handleInput={handleStates}
                />
                <Tooltip
                    className='info-tooltip'
                    anchorSelect=".info-icon"
                    place='right-start'
                    effect="solid"
                    arrowColor="transparent"
                >
                    <InformationList
                        heading="Your ID Verification Document Options"
                        information={type === 'ID Document' ? IdInfomation : VerificationInfomation}
                    />
                </Tooltip>

            </div>
            <div className='flex'>
                <div className="w-[48%] relative">
                    <UploadPlaceholder
                        label="Front"
                        disabled={states[type] === undefined}
                        path={`${states[type]?.replaceAll(' ', '_').toLowerCase()}/front`}
                        handleUploadImg={handleStates}
                        selectedUploadImg={`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`}
                        states={states}
                        handleStates={handleStates}
                        error={submitSelected && (states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`] ===
                        undefined ||
                        states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`] === '')}
                    />
                </div>
                {states[type] !== 'Passport' && <div className="w-[48%] relative ml-[4%]">
                    <UploadPlaceholder
                        label="Back"
                        disabled={states[type] === undefined}
                        path={`${states[type]?.replaceAll(' ', '_').toLowerCase()}/back`}
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
                        />

                    </div>
                    <div className='w-[48%] ml-[4%] mt-[15px]'>
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
