import React from 'react';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';
import { nationality } from '../../../../../components/JsonLists/Nationality';

export default function Address ({ handleStates, states, submitSelected }) {
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
            Nationality: {
                label: 'Nationality',
                type: 'dropdown',
                key: 'industry',
                require: true,
                options: nationality
            }
        },
        'Malawi Address': AddressDetails.nothing_to_show,
        'International Address (Optional)': {
            postal_zip_code: {
                label: 'Postal/Zip Code',
                type: 'input',
                key: 'intl_po_box_no',
                require: false
            },
            house_number: {
                label: 'House Name/Number',
                type: 'input',
                key: 'intl_house_number',
                require: false
            },
            street_name: {
                label: 'Street Name',
                type: 'googleAPI',
                key: 'intl_street_name',
                require: true
            },
            city_town: {
                label: 'City/Town',
                type: 'input',
                key: 'intl_landmark',
                require: false
            },
            county_state: {
                label: 'County/State',
                type: 'googleAPI',
                key: 'intl_town_village_ta',
                require: true
            },
            country: {
                label: 'Country',
                type: 'googleAPI',
                key: 'intl_district',
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
