import React from 'react';
import DocumentSidebar from '../../../../../components/DocumentTab/DocumentSidebar';
import Documents from './Documents';

export default function IdentityDetails ({ handleStates, states, documentSideBarData, setDocumentSidebarData }) {
    const handleOnClick = (selectedItem) => {
        setDocumentSidebarData(prevState => {
            return { ...prevState, selectedData: selectedItem };
        });
    };
    return (
        <div className='flex'>
            <DocumentSidebar
                documentTypes={documentSideBarData.documentTypes}
                selectedData={documentSideBarData.selectedData}
                handleOnClick={handleOnClick}
            />
            <Documents
                type={documentSideBarData.selectedData}
                handleStates={handleStates}
                states={states}
            />
        </div>
    );
}
