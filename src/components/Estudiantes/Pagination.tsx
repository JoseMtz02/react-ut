import React from 'react';
import { Button, Typography, Grid } from '@mui/material';

interface PaginationProps {
  currentPage: number;      
  totalItems: number;      
  itemsPerPage: number;    
  onPageChange: (newPage: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);  

  return (
    <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
      <Button
        variant="outlined"
        disabled={currentPage === 1}  
        onClick={() => onPageChange(currentPage - 1)}  
      >
        Anterior
      </Button>
      <Typography variant="body1">
        Página {currentPage} de {totalPages}  
      </Typography>
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}  
        onClick={() => onPageChange(currentPage + 1)}  
      >
        Siguiente
      </Button>
    </Grid>
  );
};

export default Pagination;
