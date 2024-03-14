import React, { useState } from 'react'
import { motion } from 'framer-motion'

const InputField = ({ value, onChange, type, givenType, onFocus, id, error, label, placeholder, onBlur }) => {
    const [ispasswordType, setIsPasswordType] = useState(true)
    return (
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{label}</label>
            <input
                value={value}
                type={givenType ? ispasswordType ? 'password' : 'text' : type || 'text'}
                className={`placeholder:text-neutral-secondary text-neutral-primary bg-[#F8F8F8] px-[10px] py-[11px]
                    font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal pr-[62px]
                    ${error ? 'border-error' : 'border-[#DDDDDD]'}`}
                id={id}
                placeholder={placeholder}
                onFocus={onFocus}
                onChange={(e) => onChange(e, id)}
                onBlur={onBlur}
            />
            {/* && value.length > 0 */}
            {givenType === 'password' &&
                <div className={`absolute right-0 py-[18.79px] pl-[10px] pr-[23.77px] cursor-pointer 
                    ${error ? 'bottom-[30px]' : 'bottom-0'}`} onClick={() => setIsPasswordType(prevState => !prevState)}>
                    {ispasswordType ? <img src='/images/SHOW.svg' /> : <img src='/images/HIDE.svg' />}
                </div>
            }
            {error &&
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className='text-error font-[400] text-[12px] leading-[20px]'
                >
                    {error}
                </motion.div>}
        </div>
    )
}

export default InputField