import { Checkbox, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React from 'react';

const MyTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>First Item</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Verify</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>Verify</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>Verify</TableCell>
            <TableCell>
              <Checkbox checked={false} onChange={() => {}} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5</TableCell>
            <TableCell>Verify</TableCell>
            <TableCell>
              <Switch checked={false} onChange={() => {}} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
