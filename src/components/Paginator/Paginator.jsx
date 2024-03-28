/* istanbul ignore file */
/* eslint-disable max-len */
import React from 'react';
import ReactPaginate from 'react-paginate';
import Image from '../Image/Image';

export default function Paginator ({ setSearchParams, searchParams, currentPage, totalPages }) {
    const handlePage = (page) => {
        const params = Object.fromEntries(searchParams);
        setSearchParams({ ...params, page: page + 1 });
    };
    return (
        <div className="flex items-center w-full mt-1 py-3">
            <div className="flex items-center justify-end sticky bottom-0 z-[9] w-[60%]">
                <div className=" flex items-center rounded-lg p-1" data-testid="paginator">
                    <ReactPaginate
                        previousLabel={
                            <div className='flex'>
                                <div data-testid="paginate-prev" onClick={() => handlePage(currentPage - 1)}
                                    className={`rounded-[5px] flex justify-center ${currentPage > 1 ? '' : 'pointer-events-none cursor-default'}`}>
                                    <Image src={currentPage > 1 ? 'paginator_left_arrow' : 'active_paginator_left_arrow'} className='w-[20px]' />
                                </div>
                            </div>
                        }
                        nextLabel={
                            <div className='flex'>
                                <div data-testid="paginate-next" onClick={() => handlePage(currentPage + 1)}
                                    className={currentPage === totalPages ? 'pointer-events-none cursor-default mt-[3px]' : 'mt-[3px]'}>
                                    <Image src={(currentPage && (currentPage !== totalPages)) ? 'paginator_right_arrow' : 'active_paginator_right_arrow'}
                                        className={(currentPage === totalPages) ? 'pointer-events-none w-[20px]' : 'w-[20px]'}
                                    />
                                </div>
                            </div>
                        }
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        forcePage={currentPage - 1}
                        onPageChange={(page) => handlePage(page.selected)}
                        containerClassName="text-[14px] font-[400] text-[#000000] rounded sm:h-5 w-full h-4 inline-flex justify-center items-center ml-1"
                        pageClassName="text-[14px] font-[400] text-[#4F5962] ml-2 px-2 py-2 rounded h-[32px] w-[32px] inline-flex justify-center items-center border-[4F5962] hover:border"
                        disabledLinkClassName="pointer-events-none cursor-default"
                        activeClassName="text-[14px] font-[400] text-[#7949FF] px-2  py-2 rounded h-[32px] w-[32px]inline-flex justify-center items-center border-[4F5962] hover:border-none"
                        pageLinkClassName="p-2"
                    />
                </div>
            </div>
        </div>
    );
};
