import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange
}) => {
  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const getPages = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfRange) {
        for (let i = 1; i <= maxPagesToShow - 2; i++) {
          pages.push(i);
        }
        pages.push(null); // Ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfRange) {
        pages.push(1);
        pages.push(null); // Ellipsis
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(null); // Ellipsis
        for (
          let i = currentPage - halfRange + 1;
          i <= currentPage + halfRange - 1;
          i++
        ) {
          pages.push(i);
        }
        pages.push(null); // Ellipsis
        pages.push(totalPages);
      }
    }

    console.log(pages);

    // Remove duplicate entries
    return pages.filter(
      (item, index, arr) => !(item === null && arr[index - 1] === null)
    );
  };

  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={
              currentPage === 1
                ? handleDisabledClick
                : () => handlePageChange(currentPage - 1)
            }
            className={`cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
        </PaginationItem>
        {pages.map((page, idx) =>
          page === null ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={
              currentPage === totalPages
                ? handleDisabledClick
                : () => handlePageChange(currentPage + 1)
            }
            className={`cursor-pointer ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
