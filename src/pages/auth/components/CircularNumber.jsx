import React from 'react'

const CircularNumber = ({ active, text }) => {
    return (
        <div className={`w-8 h-8 rounded-full flex justify-center items-center 
        ${active ? 'bg-primary-normal text-[#fff]' : 'text-neutral-primary border border-neutral-primary'}`}>
            {text}
        </div>
    )
}

export default CircularNumber
