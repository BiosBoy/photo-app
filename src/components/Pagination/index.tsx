import { Box, Pagination as PaginationControl, Typography } from '@mui/material';

import styles from './index.module.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  label?: string;
}

const Pagination = ({ totalPages, currentPage, onChange, label = 'Page' }: Props) => {
  return (
    <Box className={styles.paginationWrap}>
      <Typography variant="body2">
        {label} {currentPage} of {totalPages || 1}
      </Typography>
      <PaginationControl
        count={totalPages || 1}
        page={currentPage || 1}
        onChange={onChange}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
