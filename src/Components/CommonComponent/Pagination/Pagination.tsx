import { RoomData } from '@/app/spectatorDashboard/Room/page';
import React, { useState } from 'react';
import styles from '@/styles/pagination.module.scss';
interface CustomPaginationProps {
  data: RoomData[]; // Replace 'any' with the actual type of your data
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data?.slice(firstIndex, lastIndex);

  const nPage = Math.ceil(data?.length / recordsPerPage);
  const numbers: number[] = [];

  for (let i = 1; i <= nPage; i++) {
    numbers.push(i);
  }

  const handlePrePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id: number) => {
    setCurrentPage(id);
  };

  return (
    <div className={styles.main_container}>
      <ul className={styles.un_list}>
        <li>
          <a href="#" onClick={handlePrePage}>
            {`<`} Previous
          </a>
        </li>
        {numbers.map((n, i) => (
          <li key={i} className={currentPage === n ? 'active' : 'inactive'}>
            <a href="#" onClick={() => changePage(n)}>
              {n}
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={handleNextPage}>
            Next {`>`}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;
