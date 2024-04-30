import React from 'react';
import FelidDivision from '../../FelidDivision/FelidDivision';
import { tradingTypes } from '../../JsonLists/TradingTypes';
import UploadPlaceholder from '../../S3Upload/UploadPlaceholder';

export default function TradingDetails ({ states, handleStates, bankSelected, submitSelected }) {
    const AddressDetails = {
        nothing_to_show: {
            trading_name: {
                label: 'Trading Name of Business(Optional)',
                type: 'input',
                key: 'trading_name',
                require: false
            },
            trading_types: {
                label: 'Trading Types',
                type: 'InputSearchMuliSelect',
                key: 'trading_type',
                require: true
            }
        },
        'Trading Address':
        {
            house_number: {
                label: 'House Name/Number (Optional)',
                type: 'input',
                key: 'trading_house_name',
                require: true
            },
            street_name: {
                label: 'Street Name',
                type: 'googleAPI',
                key: 'trading_street_name',
                require: false
            },
            town_village_ta: {
                label: 'Town/Village/TA',
                type: 'googleAPI',
                key: 'trading_town_village_ta',
                require: false
            },
            district: {
                label: 'District',
                type: 'googleAPI',
                key: 'trading_district',
                require: false
            }
        }
    };
    const handleSearchItem = async (id, newValue) => {
        return tradingTypes.sort().filter(item => {
            // Example: assuming data is an array of objects with a 'name' field
            return item.toLowerCase().includes(newValue.toLowerCase());
        });
    };
    return (
        <>
            <div data-testid="kyc_trading_details">
                <FelidDivision
                    divisionClassName = {'w-1/3'}
                    divisionObject = {AddressDetails}
                    handleOnChange={handleStates}
                    states={states}
                    submitSelected={submitSelected}
                    handleSearchItem={handleSearchItem}
                />
                <div className="w-[48%] relative mr-2">
                    <UploadPlaceholder
                        multiselectImage
                        info={'Maximum upload limit is 8 images'}
                        label={'Business images for public display (Optional)'}
                        testId={'business_images'}
                        // disabled={states[type] === undefined}
                        path={'trading_data/business_image'}
                        handleUploadImg={handleStates}
                        selectedUploadImg={'trading_images'}
                        states={states}
                        handleStates={handleStates}
                        // error={submitSelected && (states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`] ===
                        // undefined ||
                        // states[`${states[type]?.replaceAll(' ', '_').toLowerCase()}_img_front`] === '')}
                    />
                </div>
            </div>
        </>
    );
}
