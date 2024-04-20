import React from 'react';
import DocumentSidebar from '../../../../../components/DocumentTab/DocumentSidebar';
import Documents from './Documents';

export default function IdentityDetails ({ handleStates, states, documentSideBarData, setDocumentSidebarData, submitSelected }) {
    const handleOnClick = (selectedItem) => {
        setDocumentSidebarData(prevState => {
            return { ...prevState, selectedData: selectedItem };
        });
    };
    return (
        <div data-testid="kyc_identity_details_screen" className='flex'>
            <DocumentSidebar
                documentTypes={documentSideBarData.documentTypes}
                selectedData={documentSideBarData.selectedData}
                handleOnClick={handleOnClick}
            />
            <Documents
                type={documentSideBarData.selectedData}
                handleStates={handleStates}
                states={states}
                submitSelected={submitSelected}
            />
        </div>
    );
}
