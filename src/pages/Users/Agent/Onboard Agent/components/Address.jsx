import React from 'react';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';

export default function Address ({ handleStates, states }) {
    const AddressDetails = {
        nothing_to_show: {
            po_box_no: {
                label: 'P.O Box NO',
                type: 'input',
                key: 'po_box_no',
                require: false
            },
            street_name: {
                label: 'Street Name',
                type: 'googleAPI',
                key: 'street_name',
                require: true
            },
            house_number: {
                label: 'House Name/Number ',
                type: 'input',
                key: 'house_number',
                require: false
            },
            landmark: {
                label: 'Landmark',
                type: 'input',
                key: 'landmark',
                require: false
            },
            town_village_ta: {
                label: 'Town/Village/TA',
                type: 'googleAPI',
                key: 'town_village_ta',
                require: true
            },
            district: {
                label: 'District',
                type: 'googleAPI',
                key: 'district',
                require: true
            }
        }
    };
    return (
        <>
            <FelidDivision
                divisionClassName = {'w-1/3'}
                divisionObject = {AddressDetails}
                handleOnChange={handleStates}
                states={states}
            />
        </>
    );
}
