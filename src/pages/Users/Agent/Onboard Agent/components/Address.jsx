import React, { useEffect } from 'react';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';
import { countries } from 'country-list';

export default function Address ({ handleStates, states, submitSelected }) {
    useEffect(() => {
        const nationalityList = Object.values(countries).map(country => country.nationality);
        console.log('nnnnnn', nationalityList)
    }, []);

    const AddressDetails = {
        nothing_to_show: {
            po_box_no: {
                label: 'P.O Box NO (Optional)',
                type: 'input',
                key: 'po_box_no',
                require: false
            },
            house_number: {
                label: 'House Name/Number (Optional)',
                type: 'input',
                key: 'house_number',
                require: false
            },
            street_name: {
                label: 'Street Name',
                type: 'googleAPI',
                key: 'street_name',
                require: true
            },
            landmark: {
                label: 'Landmark (Optional)',
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
    const NonMalawiAddressDetails = {
        nothing_to_show: {
            po_box_no: {
                label: 'P.O Box NO (Optional)',
                type: 'input',
                key: 'po_box_no',
                require: false
            },
            house_number: {
                label: 'House Name/Number (Optional)',
                type: 'input',
                key: 'house_number',
                require: false
            },
            street_name: {
                label: 'Street Name',
                type: 'googleAPI',
                key: 'street_name',
                require: true
            },
            landmark: {
                label: 'Landmark (Optional)',
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
            <div data-testid="kyc_address_details">
                <FelidDivision
                    divisionClassName = {'w-1/3'}
                    divisionObject = {NonMalawiAddressDetails}
                    handleOnChange={handleStates}
                    states={states}
                    submitSelected={submitSelected}
                />
            </div>
        </>
    );
}
