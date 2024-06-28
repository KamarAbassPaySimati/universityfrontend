import React from 'react';
import FelidDivision from '../../FelidDivision/FelidDivision';
import { nationality } from '../../JsonLists/Nationality';

export default function Address ({ bankSelected, handleStates, states, submitSelected, isFullKYC }) {
    const AddressDetails = {
        nothing_to_show: {
            po_box_no: {
                label: 'P.O Box NO (Optional)',
                type: 'input',
                key: 'po_box_no',
                require: false,
                disable: isFullKYC ? true : undefined
            },
            house_number: {
                label: 'House Name/Number (Optional)',
                type: 'input',
                key: 'house_number',
                require: false,
                disable: isFullKYC ? true : undefined
            },
            street_name: {
                label: 'Street Name',
                type: 'googleAPI',
                key: 'street_name',
                require: true,
                disable: isFullKYC ? true : undefined
            },
            landmark: {
                label: 'Landmark (Optional)',
                type: 'input',
                key: 'landmark',
                require: false,
                disable: isFullKYC ? true : undefined
            },
            town_village_ta: {
                label: 'Town/Village/TA',
                type: 'googleAPI',
                key: 'town_village_ta',
                require: true,
                disable: isFullKYC ? true : undefined
            },
            district: {
                label: 'District',
                type: 'googleAPI',
                key: 'district',
                require: true,
                disable: isFullKYC ? true : undefined
            }
        }
    };
    const NonMalawiAddressDetails = {
        nothing_to_show: {
            Nationality: {
                label: 'Nationality',
                type: 'InputSearch',
                key: 'nationality',
                require: true
            }
        },
        'Malawi Address': AddressDetails.nothing_to_show
    };
    const InterNationalAddress = {
        'International Address': {
            // postal_zip_code: {
            //     label: 'Postal/Zip Code',
            //     type: 'input',
            //     key: 'intl_po_box_no',
            //     require: true
            // },
            // house_number: {
            //     label: 'House Name/Number',
            //     type: 'input',
            //     key: 'intl_house_number',
            //     require: true
            // },
            address: {
                label: 'Address',
                type: 'googleAPI',
                key: 'intl_address',
                require: true
            }
            // city_town: {
            //     label: 'City/Town',
            //     type: 'googleAPI',
            //     key: 'intl_landmark',
            //     require: true
            // },
            // county_state: {
            //     label: 'County/State',
            //     type: 'googleAPI',
            //     key: 'intl_town_village_ta',
            //     require: true
            // },
            // country: {
            //     label: 'Country',
            //     type: 'googleAPI',
            //     key: 'intl_district',
            //     require: true
            // }
        }
    };
    const handleSearchItem = async (id, newValue) => {
        return nationality.filter(item => {
            // Example: assuming data is an array of objects with a 'name' field
            return item.toLowerCase().includes(newValue.toLowerCase());
        });
    };
    return (
        <>
            <div data-testid="kyc_address_details">
                <FelidDivision
                    divisionClassName = {'w-1/3'}
                    divisionObject = {states.citizen_type === 'Non Malawi citizen' ? NonMalawiAddressDetails : AddressDetails}
                    handleOnChange={handleStates}
                    states={states}
                    submitSelected={submitSelected}
                    handleSearchItem={handleSearchItem}
                />
                {states.citizen_type === 'Non Malawi citizen' && <FelidDivision
                    divisionClassName = {'w-1/3'}
                    divisionObject = {InterNationalAddress}
                    handleOnChange={handleStates}
                    states={states}
                    submitSelected={bankSelected}
                />}
            </div>
        </>
    );
}
