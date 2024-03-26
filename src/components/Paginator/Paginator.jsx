/* istanbul ignore file */
/* eslint-disable max-len */
import React from 'react';
import ReactPaginate from 'react-paginate';
import Image from '../Image/Image';

export default function Paginator ({ setSearchParams, searchParams, currentPage, totalPages }) {
    const handlePage = (page) => {
        const params = Object.fromEntries(searchParams);
        setSearchParams({ ...params, page_number: page + 1 });
    };
    return (
        <div className="flex items-center w-full mt-1 py-3">
            <div className="flex items-center justify-end sticky bottom-0 z-[9] w-[60%]">
                <div className=" flex items-center rounded-lg p-1" data-testid="paginator">
                    <ReactPaginate
                        previousLabel={
                            <div className='flex'>
                                <a data-testid="paginate-prev" onClick={() => handlePage(currentPage - 1)} href="javascript:void(0)"
                                    className={`rounded-[5px] flex justify-center ${currentPage > 1 ? '' : 'pointer-events-none cursor-default'}`}>
                                    <Image src={currentPage > 1 ? 'paginator_left_arrow' : 'active_paginator_left_arrow'} className='w-[20px]' />
                                </a>
                            </div>
                        }
                        nextLabel={
                            <div className='flex'>
                                <a data-testid="paginate-next" onClick={() => handlePage(currentPage + 1)} href="javascript:void(0)"
                                    className={currentPage === totalPages ? 'pointer-events-none cursor-default mt-[3px]' : 'mt-[3px]'}>
                                    <Image src={(currentPage && (currentPage !== totalPages)) ? 'paginator_right_arrow' : 'active_paginator_right_arrow'}
                                        className={(currentPage === totalPages) ? 'pointer-events-none w-[20px]' : 'w-[20px]'}
                                    />
                                </a>
                            </div>
                        }
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        forcePage={currentPage - 1}
                        onPageChange={(page) => handlePage(page.selected)}
                        containerClassName="text-xs11 font-medium text-[#000000] rounded sm:h-5 w-full h-4 inline-flex justify-center items-center hover:text-[#107CC1] ml-1"
                        pageClassName="text-base font-semibold text-[#333] ml-2 px-2 py-2 rounded h-[32px] w-[32px] inline-flex justify-center items-center"
                        pageLinkClassName="page-link"
                        previousClassName="text-xs11 font-medium text-[#000000] mx-2 rounded w-auto sm:h-5 h-4 inline-flex justify-center items-center hover:text-[#107CC1]"
                        previousLinkClassName="page-link"
                        nextClassName="text-xs11 font-medium text-[#000000] mx-2 rounded sm:h-5 w-auto h-4 inline-flex justify-center items-center hover:text-[#107CC1]"
                        nextLinkClassName="page-link min-w-[20px]"
                        breakClassName="text-xs font-regular text-[#000000] ml-2 px-2 border border-transparent rounded-[5px] w-5 h-5 inline-flex justify-center items-center hover:bg-[#F2F2F3]"
                        breakLinkClassName="page-link"
                        disabledLinkClassName="pointer-events-none cursor-default"
                        activeClassName="text-base font-semibold text-[#7949FF] px-2  py-2 rounded h-[32px] w-[32px]inline-flex justify-center items-center"
                    />
                </div>
            </div>
        </div>
    );
};
