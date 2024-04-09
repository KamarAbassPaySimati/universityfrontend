import React from 'react';
import InputTypeRadio from '../../../../../components/InputField/InputTypeRadio';

export default function PersonalDetails () {
    return (
        <>
            <div className='flex w-[40%] justify-between'>
                <InputTypeRadio
                    label={'Male'}
                    id='male'
                />
                <InputTypeRadio
                    label={'Female'}
                    id='female'
                />
                <InputTypeRadio
                    label={'Undisclosed'}
                    id='undisclosed'
                />
            </div>
        </>
    );
}
