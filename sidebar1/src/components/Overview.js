import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Typography,
  Link,
  Grid
} from '@mui/material';

const createData = (name, position, office, age, startDate, salary) => {
  return { name, position, office, age, startDate, salary };
};

const rows = [
  createData('John Doe', 'Developer', 'New York', 30, '2019-01-01', '$100,000'),
  // Add more data as needed...
];

const Overview = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Database Example
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        <Box>
          <Button>10</Button>
          <Button>20</Button>
          <Button>30</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.office}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2">© 2024 Your Company</Typography>
        <Box>
          <Link href="#" underline="hover">
            Privacy Policy
          </Link>
          <Link href="#" underline="hover" ml={2}>
            Terms and Conditions
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Overview;
