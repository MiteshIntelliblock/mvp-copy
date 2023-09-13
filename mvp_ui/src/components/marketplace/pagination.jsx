import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { usePagination, DOTS } from "../../utils/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
      pb="4.375rem"
      mt="1.875rem"
    >
      <Button
        bgColor="white"
        color="black"
        _hover={{ bgColor: "lightGreen", color: "white" }}
        isDisabled={currentPage === 1}
        onClick={onPrevious}
      >
        Prev
      </Button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <Button>&#8230;</Button>;
        }
        return (
          <Button
            border="1px solid rgba(17,17,17, 0.1)"
            bgColor="white"
            color="black"
            _hover={{ bgColor: "lightGreen", color: "white" }}
            onClick={() => onPageChange(pageNumber)}
            isActive={currentPage === pageNumber}
            _active={{ bgColor: "lightGreen", color: "white" }}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        bgColor="white"
        _hover={{ bgColor: "lightGreen", color: "white" }}
        isDisabled={currentPage === lastPage}
        onClick={onNext}
        color="black"
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
