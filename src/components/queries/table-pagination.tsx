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
    const range = Math.min(totalPages, maxPagesToShow);

    if (totalPages <= range) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= Math.floor(range / 2)) {
        for (let i = 1; i <= range - 2; i++) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - Math.floor(range / 2)) {
        pages.push(1);
        pages.push(null);
        for (let i = totalPages - (range - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(null);
        for (
          let i = currentPage - Math.floor(range / 2) + 1;
          i <= currentPage + Math.floor(range / 2) - 1;
          i++
        ) {
          pages.push(i);
        }
        pages.push(null);
        pages.push(totalPages);
      }
    }
    return pages;
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
            <PaginationItem key={page}>
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
