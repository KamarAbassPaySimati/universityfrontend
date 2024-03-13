import React from 'react'
import { motion } from 'framer-motion'

const InputField = ({ setErrors, id, error, label, placeholder }) => {
    const focusHandler = () => {
        setErrors(prevState => {
            return { ...prevState, [id]: '' }
        })
    }

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{label}</label>
            <input
                className={`placeholder:text-neutral-secondary text-neutral-primary bg-[#F8F8F8] px-[10px] py-[11px]
                    font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal
                    ${error ? 'border-error' : 'border-[#DDDDDD]'}`}
                id={id}
                placeholder={placeholder}
                onFocus={focusHandler}
            />
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
