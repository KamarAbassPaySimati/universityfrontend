import React, { useEffect, useState } from 'react';
import GoogleComponent from 'react-google-autocomplete';
import { GOOGLE_API } from '../../config';
import Image from '../Image/Image';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const GoogleApi = ({ testId, labelName, id, placeholder, handleOnChange, value, submitSelected }) => {
    const [key, setKey] = useState(0);
    const handlePlaceSelect = (place) => {
        handleOnChange(place.target.value, id);
        switch (id) {
        case 'district':
            handleOnChange('', 'street_name');
            handleOnChange('', 'town_village_ta');
            break;
        case 'town_village_ta':
            handleOnChange('', 'street_name');
            break;
        case 'intl_district':
            handleOnChange('', 'intl_town_village_ta');
            handleOnChange('', 'intl_landmark');
            handleOnChange('', 'intl_street_name');
            break;
        case 'intl_town_village_ta':
            handleOnChange('', 'intl_landmark');
            handleOnChange('', 'intl_street_name');
            break;
        case 'intl_street_name':
            handleOnChange('', 'intl_landmark');
            break;
        // case 'street_name':
        //     autofillTownVillageTAAndDistrict(place);
        //     break;
        default:
            break;
        }
    };

    const autocompleteOptions = () => {
        switch (id) {
        case 'intl_district':
            return {
                types: ['(regions)']
            };
        case 'district':
        case 'occupation_town':
            return {
                types: ['(regions)'],
                componentRestrictions: { country: 'MW' } // 'MW' is the ISO 3166-1 alpha-2 code for Malawi
            };
        case 'intl_street_name':
        case 'intl_town_village_ta':
        case 'intl_landmark':
            return {
                types: ['address']
            };
        case 'street_name':
        case 'town_village_ta':
            return {
                types: ['address'],
                componentRestrictions: { country: 'mw' } // No district restriction
            };
        default:
            return {};
        }
    };
    const handlePlaceSelected = (place) => {
        switch (id) {
        case 'country' :
            handleOnChange(place.formatted_address, 'country');
            handleOnChange('', 'intl_street_name');
            handleOnChange('', 'intl_town_village_ta');
            break;
        case 'district':
            handleOnChange(place.formatted_address, 'district');
            handleOnChange('', 'street_name');
            handleOnChange('', 'town_village_ta');
            break;
        case 'occupation_town':
            handleOnChange(place.formatted_address, 'occupation_town');
            break;
        case 'intl_street_name':
        case 'intl_landmark':
            handleOnChange(place.formatted_address, id);
            autofillTownVillageTAAndDistrict(place);
            break;
        case 'street_name':
            handleOnChange(place.formatted_address, 'street_name');
            autofillTownVillageTAAndDistrict(place);
            break;
        case 'intl_town_village_ta':
            handleOnChange(place.formatted_address, 'intl_town_village_ta');
            autofillDistrict(place);
            break;
        case 'town_village_ta':
            handleOnChange(place.formatted_address, 'town_village_ta');
            autofillDistrict(place);
            break;
        default:
            break;
        }
    };
    const [componentValue, setComponentValue] = useState(value);

    useEffect(() => {
        // Update component value when the value prop changes
        setComponentValue(value);
        if (value === undefined || value === '') {
            setKey(key + 1);
        }
    }, [value]);
    const autofillTownVillageTAAndDistrict = (place) => {
        const addressComponents = place.address_components;
        let district = '';
        let townVillageTA = '';

        for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            const types = component.types;

            // Check for the administrative_area_level_1 type for district
            if (types.includes('administrative_area_level_1') && !district) {
                district = component.long_name;
            }

            // Check for the locality type for town/village/TA
            if (types.includes('locality') && !townVillageTA) {
                townVillageTA = component.long_name;
            }

            // If no locality found, check for sublocality_level_1
            if (types.includes('sublocality_level_1') && !townVillageTA) {
                townVillageTA = component.long_name;
            }
        }
        // Set the values for district and town/village/TA
        if (id === 'intl_street_name') {
            handleOnChange(district, 'intl_district');
            handleOnChange(townVillageTA, 'intl_landmark');
            handleOnChange(townVillageTA, 'intl_town_village_ta');
        } else if (id === 'intl_landmark') {
            handleOnChange(townVillageTA, 'intl_town_village_ta');
            handleOnChange(district, 'intl_district');
        } else {
            handleOnChange(district, 'district');
            handleOnChange(townVillageTA, 'town_village_ta');
        }
    };

    const autofillDistrict = (place) => {
        const addressComponents = place.address_components;
        for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            const types = component.types;
            if (types.includes('administrative_area_level_1')) {
                handleOnChange(component.long_name, id === 'intl_town_village_ta' ? 'intl_district' : 'district');
                break;
            }
        }
    };

    return (
        <div className=''>
            <div className='mx-[10px]'>
                <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px] mr-4'>
                    {labelName}
                </label>
                <div>
                    <div className={`
                ${(submitSelected && (componentValue === undefined || componentValue?.trim() === ''))
            ? 'google-key-error'
            : 'google-key-border'} google-key relative w-[339px]`}>
                        <GoogleComponent
                            placeholder={placeholder}
                            apiKey={GOOGLE_API}
                            key={key}
                            onPlaceSelected={handlePlaceSelected}
                            options={autocompleteOptions()}
                            onChange={handlePlaceSelect}
                            className={'w-full mt-2'}
                            value={componentValue} // Use value prop
                            data-testid={testId}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Image src={'search_icon'} className="h-6 w-6 text-gray-400" />
                        </div>
                    </div>
                    {(submitSelected && (componentValue === undefined || componentValue?.trim() === '')) &&
                    <ErrorMessage error={'Required field'} />}

                </div>
            </div>
        </div>
    );
};

export default GoogleApi;
