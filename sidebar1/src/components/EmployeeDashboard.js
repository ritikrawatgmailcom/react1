import React, { useState } from 'react';
import { Container, Button, Typography, Box, TextField, List, ListItem, ListItemText } from '@mui/material';

const EmployeeDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser('');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">Employee Dashboard</Typography>
        <Button variant="contained" color="primary" onClick={handleAddUser}>Add User</Button>
      </Box>
      <TextField label="New User Email" fullWidth margin="normal" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EmployeeDashboard;
