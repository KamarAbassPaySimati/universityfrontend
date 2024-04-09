import React from 'react';

export default function InputTypeRadio ({ label, id }) {
    return (
        <div class="relative custom-radioBlue py-2" >
            <input id={id} type="radio" name={id}
            />
            <label
                for={id}
                className="ml-[30px] text-neutral-primary text-[16px]
                        leading-[20px] font-normal cursor-pointer">{label}</label>
        </div>
    );
}
