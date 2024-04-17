import React, { useEffect, useState } from 'react';
import GoogleComponent from 'react-google-autocomplete';
import { GOOGLE_API } from '../../config';
import Image from '../Image/Image';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const GoogleApi = ({ labelName, id, placeholder, handleOnChange, value, submitSelected }) => {
    const handlePlaceSelect = (place) => {
        handleOnChange(place.formatted_address, id);
        switch (id) {
        case 'district':
            handleOnChange('', 'street_name');
            handleOnChange('', 'town_village_ta');
            break;
        case 'town_village_ta':
            handleOnChange('', 'street_name');
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
        case 'district':
        case 'occupation_town':
            return {
                types: ['(regions)'],
                componentRestrictions: { country: 'MW' } // 'MW' is the ISO 3166-1 alpha-2 code for Malawi
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
        case 'district':
            handleOnChange(place.formatted_address, 'district');
            handleOnChange('', 'street_name');
            handleOnChange('', 'town_village_ta');
            break;
        case 'occupation_town':
            handleOnChange(place.formatted_address, 'occupation_town');
            break;
        case 'street_name':
            handleOnChange(place.formatted_address, 'street_name');
            autofillTownVillageTAAndDistrict(place);
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
        handleOnChange(district, 'district');
        handleOnChange(townVillageTA, 'town_village_ta');
    };

    const autofillDistrict = (place) => {
        const addressComponents = place.address_components;
        for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            const types = component.types;
            if (types.includes('administrative_area_level_1')) {
                handleOnChange(component.long_name, 'district');
                break;
            }
        }
    };

    return (
        <div>
            <div className='mx-[10px]'>
                <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px] mr-4'>
                    {labelName}
                </label>
                <div>
                    <div className={`
                ${(submitSelected && (componentValue === undefined || componentValue === ''))
            ? 'google-key-error'
            : 'google-key-border'} google-key relative`}>
                        <GoogleComponent
                            placeholder={placeholder}
                            apiKey={GOOGLE_API}
                            onPlaceSelected={handlePlaceSelected}
                            options={autocompleteOptions()}
                            onChange={handlePlaceSelect}
                            className={'w-full mt-2'}
                            value={componentValue} // Use value prop
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Image src={'search_icon'} className="h-6 w-6 text-gray-400" />
                        </div>
                    </div>
                    {(submitSelected && (componentValue === undefined || componentValue === '')) &&
                    <ErrorMessage error={'Required field'} />}

                </div>
            </div>
        </div>
    );
};

export default GoogleApi;
