/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Modal } from 'react-responsive-modal';
import Image from '../Image/Image';
import RuleDropdown from '../InformationList/RuleDropdown';

export default function KYCGuidPopup ({ handleClose, isModalOpen }) {
    const rulesList = {
        List1: {
            text: 'Malawi Simplified KYC Registration',
            insideList1: {
                text: 'Your ID Document Options:',
                insideList1: {
                    text: 'Please provide one of these documents plus a selfie (Biometric ID)',
                    insideList1: {
                        text: 'Valid National ID Card issued by National Registration Bureau',
                        insideList1: {
                            text: 'Front and back'
                        }
                    },
                    insideList2: {
                        text: 'Valid Passport issued by Department of Immigration or other appropriate authority'
                    }
                }
            },
            insideList2: {
                text: 'Your ID Verification Document Options:',
                insideList1: {
                    text: 'Please provide one of these documents for additional verification of your primary ID:',
                    insideList1: {
                        text: 'Valid Driver\'s Licence issued by an appropriate authority',
                        insideList1: {
                            text: 'Front and back'
                        }
                    },
                    insideList2: {
                        text: 'Valid Driver\'s Licence issued by an appropriate authority',
                        insideList1: {
                            text: 'Front and back'
                        }
                    },
                    insideList3: {
                        text: 'Birth certificate'
                    },
                    insideList4: {
                        text: 'Stamped Letter with Verifiable Particulars of an employer',
                        insideList1: {
                            text: 'Signed by Head of the employer'
                        }
                    },
                    insideList5: {
                        text: 'Stamped Letter with Verifiable Particulars of a learning institution',
                        insideList1: {
                            text: 'Signed by Head of the institution'
                        }
                    }

                }
            }
        },
        List2: {
            text: 'Malawi Full KYC Registration',
            insideList1: {
                text: 'Your ID Document Options:',
                insideList1: {
                    text: 'Please provide one of these documents plus a selfie (Biometric ID)',
                    insideList1: {
                        text: 'Valid Driver\'s Licence issued by an appropriate authority',
                        insideList1: {
                            text: 'Front and back'
                        }
                    },
                    insideList2: {
                        text: 'Valid Traffic Register Card issued by an appropriate authority',
                        insideList1: {
                            text: 'Front and back'
                        }
                    },
                    insideList3: {
                        text: 'Birth certificate (for minors only)'
                    },
                    insideList4: {
                        text: 'Valid Student Identification from recognised learning institution'
                    },
                    insideList5: {
                        text: 'Valid Employee Identification authenticated by a Commissioner for Oaths'
                    }
                }
            },
            insideList2: {
                text: 'Your ID Verification Document Options:',
                insideList1: {
                    text: 'Please provide one of these documents for additional verification of your primary ID:',
                    insideList1: {
                        text: 'Stamped Letter with Verifiable Particulars of an employer',
                        insideList1: {
                            text: 'Signed by Head of the employer'
                        }
                    },
                    insideList2: {
                        text: 'Stamped Letter with Verifiable Particulars of a learning institution',
                        insideList1: {
                            text: 'Signed by Head of the institution'
                        }
                    },
                    insideList3: {
                        text: 'Stamped Letter from a Chief,Sub-Chief, Village Headman, leader of a recognized religious institution, or District Commissioner'
                    }

                }
            }
        },
        List3: {
            text: 'Non-Malawi KYC Registration',
            insideList1: {
                text: 'Your ID Document Options:',
                insideList1: {
                    text: 'Please provide one of these documents plus a selfie (Biometric ID)',
                    insideList1: {
                        text: 'Valid Passport displaying a business or resident permit or visa',
                        insideList1: {
                            text: 'Data and Visa pages of Passport'
                        }
                    },
                    insideList2: {
                        text: 'Valid Refugee Identity Card displaying a photo and proof of refugee status from an appropriate authority'
                    },
                    insideList3: {
                        text: 'Valid Asylum Seeker Identity Card displaying a photo and proof of asylum seeker status from an appropriate authority'
                    }
                }
            },
            insideList2: {
                text: 'Your ID Verification Document Options:',
                insideList1: {
                    text: 'Please provide one of these documents for additional verification of your primary ID:',
                    insideList1: {
                        text: 'Valid Driver\'s Licence issued by an appropriate authority',
                        insideList1: {
                            text: 'Front and back'
                        }
                    },
                    insideList2: {
                        text: 'Valid National ID Card issued by an appropriate authority',
                        insideList1: {
                            text: 'Front and back'
                        }
                    },
                    insideList3: {
                        text: 'Stamped Letter with Verifiable Particulars of an employer',
                        insideList1: {
                            text: 'Signed by Head of the employer'
                        }
                    },
                    insideList4: {
                        text: 'Stamped Letter with Verifiable Particulars of a learning institution',
                        insideList1: {
                            text: 'Signed by Head of the institution'
                        }
                    }

                }
            }
        }
    };
    return (
        <div className=''>
            <Modal center open={isModalOpen} onClose={handleClose} closeIcon={<Image src='x'/>} styles={{ modal: { borderRadius: 10 } }} >
                <div className='bg-[#3B2A6F] w-[700px] h-[600px] p-10 rounded'>
                    <div className='text-[#13B681] font-normal text-[16px] leading-6 ml-2 mb-2'>KYC Requirements</div>

                    <div className=''>
                        <div className="">
                            <div className="">
                                <div className="w-full">
                                    <div className="h-[500px]
                        rounded-lg overflow-auto whiteScrollBar pl-2" >
                                        {Object.keys(rulesList).map((ruleItem) => (
                                            <Fragment key={ruleItem}>
                                                <RuleDropdown
                                                    heading={rulesList[ruleItem].text}
                                                    rules={rulesList[ruleItem]}
                                                    textColor='text-[#FFF]'
                                                    imageSrc='chevron-right'
                                                    Guid
                                                />
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
