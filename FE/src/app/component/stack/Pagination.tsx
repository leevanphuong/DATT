import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const handlePageClick = (data: any) => {
    const selectedPage = data.selected;
    onPageChange(selectedPage);
  };

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      previousLinkClassName={"previous"}
      nextLinkClassName={"next"}
      pageClassName={"page"}
      pageLinkClassName={"page-link"}
    />
  );
};

export default Pagination;