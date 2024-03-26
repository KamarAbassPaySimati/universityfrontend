/* istanbul ignore file */
/* eslint-disable max-len */
import React from 'react';
import ReactPaginate from 'react-paginate';
import { getSearchParamDetail } from '../../CommonMethods/getSearchParamDetails';

export default function Paginator ({ Pagination, setSearchParams, searchParams }) {
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
                                <a data-testid="paginate-prev" onClick={() => handlePage(Pagination?.page - 1 || Pagination.current_page - 1)} href="javascript:void(0)"
                                    className={`rounded-[5px] flex justify-center ${Pagination?.page > 1 || Pagination.current_page > 1 ? '' : 'pointer-events-none cursor-default'}`}>
                                    <img src={Pagination?.page > 1 || Pagination.current_page > 1 ? '/images/right chevron.svg' : '/images/left chevron.svg'} alt="icon" className={Pagination?.page > 1 || Pagination.current_page > 1 ? 'image-rotate w-[20px]' : 'w-[20px]'} />
                                </a>
                            </div>
                        }
                        nextLabel={
                            <div className='flex'>
                                <a data-testid="paginate-next" onClick={() => handlePage(Pagination?.page + 1 || Pagination.current_page + 1)} href="javascript:void(0)"
                                    className={Pagination?.page === Pagination?.total_pages || Pagination.current_page === Pagination?.total_pages ? 'pointer-events-none cursor-default mt-[3px]' : 'mt-[3px]'}>
                                    <img src={(Pagination.page && (Pagination?.page !== Pagination?.total_pages)) || (Pagination.current_page && (Pagination.current_page !== Pagination?.total_pages)) ? '/images/right chevron.svg' : '/images/left chevron.svg'}
                                        alt="icon"
                                        className={(Pagination?.page === Pagination?.total_pages || Pagination?.current_page === Pagination?.total_pages) ? 'image-rotate pointer-events-none w-[20px]' : 'w-[20px]'}
                                    />
                                </a>
                            </div>
                        }
                        pageCount={Pagination?.total_pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        forcePage={Pagination.page ? Pagination?.page - 1 : Pagination.current_page - 1}
                        onPageChange={(page) => handlePage(page.selected + 1)}
                        containerClassName="text-xs11 font-medium text-[#000000] rounded sm:h-5 w-full h-4 inline-flex justify-center items-center hover:text-[#107CC1] ml-1"
                        pageClassName="text-base font-semibold text-[#333] ml-2 px-2 py-2 rounded h-[32px] w-[32px] inline-flex justify-center items-center border border-[#D7D7D7]"
                        pageLinkClassName="page-link"
                        previousClassName="text-xs11 font-medium text-[#000000] mx-2 rounded w-auto sm:h-5 h-4 inline-flex justify-center items-center hover:text-[#107CC1]"
                        previousLinkClassName="page-link"
                        nextClassName="text-xs11 font-medium text-[#000000] mx-2 rounded sm:h-5 w-auto h-4 inline-flex justify-center items-center hover:text-[#107CC1]"
                        nextLinkClassName="page-link min-w-[20px]"
                        breakClassName="text-xs font-regular text-[#000000] ml-2 px-2 border border-transparent rounded-[5px] w-5 h-5 inline-flex justify-center items-center hover:bg-[#F2F2F3]"
                        breakLinkClassName="page-link"
                        disabledLinkClassName="pointer-events-none cursor-default"
                        activeClassName="text-base font-semibold text-[#FFFFFF] bg-[#0080B0] px-2  py-2 rounded h-[32px] w-[32px]inline-flex justify-center items-center"
                    />
                </div>
            </div>
        </div>
    );
};
