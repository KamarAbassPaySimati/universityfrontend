import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import CheckboxWithReason from '../InputField/CheckboxWithResone';

export default function KYCReject () {
    const [selectedCheckBox, setSelectedCheckBox] = useState([]);
    const [RejectReasons, setRejectReasons] = useState([
        {
            label: 'Incorrect or unreadable personal information',
            reason: 'Your <full name> or <date of birth> on the profile is incorrect, missing, or unreadable. Please update.'
        },
        {
            label: 'Unacceptable/incomplete address',
            reason: 'Your physical address does not meet our requirements for completeness and/or traceability. Please update.'
        },
        {
            label: 'Mismatched information',
            reason: 'The information provided in your submission does not match'
        },
        {
            label: 'Incomplete or inaccurate KYC documents',
            reason: 'Your submission is missing the following document and/or information: <full name>; <full address>; <etc…>',
            selectedObj: ['National ID card']
        },
        {
            label: 'Original documents not provided',
            reason: 'Your uploaded document <named document> appears not to be the original. Please upload the original version of this document.',
            selectedObj: ['Passport']
        },
        {
            label: 'Expiration of document validity period',
            reason: 'Your <named document> is expired and cannot be accepted for KYC registration. Please upload a valid document.',
            selectedObj: ['Biometrics']
        },
        {
            label: 'Incomplete or inaccurate KYC documents',
            reason: 'Your <named document> is expired and cannot be accepted for KYC registration. Please upload a valid document.',
            selectedObj: ['Driver’s Licence', 'Biometrics2']
        }
    ]);
    const DocumentObj = {
        'National ID card': 'Issued by National Registration Bureau',
        Passport: 'Issued by Department of Immigration',
        Passport: 'Displaying a business or residents permit or visa',
        Biometrics: 'Personal Selfie',
        Biometrics2: 'Personal Selfie',
        'Driver’s Licence': 'Issued by an appropriate authority'

    };
    const handleCheckBox = (e, id, type, index, selectedIndex) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            if (type === 'main') {
                const newCheckBox = { reason_id: index + 1 };
                setSelectedCheckBox([...selectedCheckBox, newCheckBox]);
            } else if (type === 'sub') {
                setSelectedCheckBox(selectedCheckBox.map((item, idx) => {
                    if (item.reason_id === selectedIndex) {
                        return {
                            ...item,
                            placeholder: item.placeholder ? [...item.placeholder, id] : [id] // Add the placeholder as an array
                        };
                    }
                    return item;
                }));
            }
        } else {
            if (type === 'main') {
                setSelectedCheckBox(selectedCheckBox.filter(item => item.reason_id !== index + 1));
            } else if (type === 'sub') {
                setSelectedCheckBox(selectedCheckBox.map((item, idx) => {
                    if (item.reason_id === selectedIndex) {
                        // Remove the id from the placeholder array if the sub-checkbox is unchecked
                        const newPlaceholder = (item.placeholder || []).filter(placeholderId => placeholderId !== id);
                        return {
                            ...item,
                            placeholder: newPlaceholder
                        };
                    }
                    return item;
                }));
            }
        }
    };

    return (
        <Modal center open={true}
            styles={{ modal: { borderRadius: 10 } }}
            onClose={() => {}} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <div className='p-6 min-w-[900px]'>
                <h1 className='text-[#4F5962] font-normal text-[20px] leading-7'>Confirm to Reject?</h1>
                <div className='border-t mt-2 w-[483px]'></div>
                <div className='flex justify-between mt-2'>
                    <p className='font-normal text-[#A4A9AE] text-[14px] leading-6'>Select the reason for rejection </p>
                    <div className='flex justify-between text-[#4F5962] font-normal text-[14px] leading-6 gap-6'>
                        <button className=''>Select all</button>
                        <button className=''>Clear</button>
                    </div>
                </div>
                {RejectReasons.map((item, index = 0) => (
                    <>
                        <CheckboxWithReason
                            key={item}
                            item={item}
                            testId={`reject_${index}`}
                            handleOnChange={handleCheckBox}
                            index={index}
                            id={`reject_${index}`}
                            type={'main'}
                        />
                        {item.selectedObj &&
                        <div className='ml-6 px-2 pt-2 flex flex-wrap'>
                            {item.selectedObj.map((reasonItem, reasonIndex = 0) => (
                                <div key={reasonItem} className='ml-4'>
                                    <CheckboxWithReason
                                        item={{
                                            label: reasonItem,
                                            reason: DocumentObj[reasonItem]
                                        }}
                                        index={reasonIndex}
                                        selectedIndex={index + 1}
                                        testId={`reject_sub_${reasonIndex}`}
                                        id={reasonItem}
                                        handleOnChange={handleCheckBox}
                                        type={'sub'}
                                    />
                                </div>
                            ))}

                        </div>
                        }

                    </>
                ))}
            </div>
        </Modal>
    );
}
