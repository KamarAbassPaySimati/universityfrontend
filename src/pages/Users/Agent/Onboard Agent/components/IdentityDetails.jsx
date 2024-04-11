import React from 'react';
import DocumentSidebar from '../../../../../components/DocumentTab/DocumentSidebar';
import Documents from './Documents';

export default function IdentityDetails ({ handleStates, states }) {
    const documentTypes = {
        'ID Document': 'clear',
        'Verification Document': 'pending'
    };
    return (
        <div className='flex'>
            <DocumentSidebar
                documentTypes={documentTypes}
            />
            <Documents
                type={'ID Document'}
                handleStates={handleStates}
                states={states}
            />
        </div>
    );
}
