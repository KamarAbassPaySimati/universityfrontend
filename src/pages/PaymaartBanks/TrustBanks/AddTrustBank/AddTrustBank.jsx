import React from 'react';
import CardHeader from '../../../../components/CardHeader';

const AddTrustBank = () => {
    return (
        <CardHeader
            activePath={'Add Trust Bank'}
            paths={['Paymaart Banks', 'Trust Banks']}
            pathurls={['paymaart-banks', 'users']}
            header={'Add Trust Bank'}
            minHeightRequired={true}
            table={false}
        >
            <>
                <h1 className='text-header-dark font-[600] text-[18px] leading-[26px] my-2'>
                    Basic Details
                </h1>
                {/* {loading
                    ? <div className='flex flex-wrap'>
                        {[...Array(3)].map((_, ind) => (

                            <InputFieldShimmer key={ind}
                            />

                        ))}
                    </div> */}
                <div className='my-4 flex flex-wrap gap-[20px]'>
                    {/* <InputField
                        className='w-[339px]'
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='firstName'
                        testId='first_name'
                        error={formErrors.firstName}
                        label='First Name'
                        placeholder='Enter first name'
                        setEnteredLetter={setEnteredLetter}
                        maxLength="100"
                    />
                    <InputField
                        className='w-[339px]'
                        value={formData.middleName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='middleName'
                        testId='middle_name'
                        error={formErrors.middleName}
                        label='Middle Name'
                        placeholder='Enter middle name'
                        setEnteredLetter={setEnteredLetter}
                        maxLength="100"
                    />
                    <InputField
                        className='w-[339px]'
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='lastName'
                        testId='last_name'
                        error={formErrors.lastName}
                        label='Last Name'
                        placeholder='Enter last name'
                        setEnteredLetter={setEnteredLetter}
                        maxLength="100"
                    /> */}
                </div>

            </>
        </CardHeader>
    );
};

export default AddTrustBank;
