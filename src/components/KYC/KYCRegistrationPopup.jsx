/* eslint-disable max-len */
import React from 'react';
import { Modal } from 'react-responsive-modal';
import Image from '../Image/Image';

export default function KYCRegistrationPopup ({ handleClose, isModalOpen }) {
    return (
        <div className=''>
            <Modal center open={isModalOpen} onClose={handleClose} closeIcon={<Image src='x'/>} styles={{ modal: { borderRadius: 10 } }} >
                <div className='bg-[#3B2A6F] w-[700px] h-[600px] p-10 rounded'>
                    <div className='text-[#13B681] font-normal text-[16px] leading-6 ml-2 mb-2'>KYC Registration</div>
                    <div className='ml-2 text-[#FFF] text-[14px] leading-6 font-normal'>
                        <p className='mt-4'>Paymaart is identifying its customers, via the following Know Your Customer (KYC) process,
                            according to provisions of Malawi’s Financial Crimes (Money Laundering) Regulations, 2019 viz.:</p>
                        <p className='mt-6 flex'>
                            <span className='mr-2'>
                                1. </span>
                            <span>Every reporting institution shall apply a risk-based approach in identifying its customers in
                                accordance with section 21 of the Act;</span>
                        </p>
                        <p className='mt-6 flex'>
                            <span className='mr-2'>
                                2. </span>
                            <span>
                                In applying the requirements of sub-regulation (1), every reporting institution shall ensure that
                                the results of the risk assessment are consistent with national risk assessment of money
                                laundering and terrorist financing or other relevant assessments done by supervisory
                                authorities;
                            </span>

                        </p>
                        <p className='mt-6 flex'>
                            <span className='mr-2'>
                                3. </span>
                            <span>
                                Where a reporting institution identifies lower risks, the reporting institution may decide to allow
                                simplified measures for customer due diligence provided that enhanced due diligence shall be
                                applied where there is suspicion of money laundering, terrorist financing or other financial
                                crime;
                            </span>

                        </p>
                        <p className='mt-6 flex'>
                            <span className='mr-2'>
                                4.
                            </span>
                            <span>
                                Every reporting institution shall ensure that the results of the institution’s risk assessment are
                                communicated to all departments or sections of the institution.
                            </span>

                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
