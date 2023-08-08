import React, { useState } from 'react';
//@ts-ignore
import { Pagination } from 'technogetic-iron-smart-ui';

const CustomPagination = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={onPageChange}
        />
    );
};

export default CustomPagination;
