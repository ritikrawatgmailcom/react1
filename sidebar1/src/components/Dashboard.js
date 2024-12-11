import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FaTimes } from 'react-icons/fa'; // Import the FaTimes icon for the close button

const Dashboard = () => {
    const [users, setUsers] = useState([
        { id: 1, email: 'john@example.com', position: 'Developer', active: true },
        { id: 2, email: 'jane@example.com', position: 'Designer', active: false },
        { id: 3, email: 'sam@example.com', position: 'Manager', active: true },
        { id: 4, email: 'paul@example.com', position: 'Developer', active: true },
        { id: 5, email: 'emily@example.com', position: 'Tester', active: true },
        { id: 6, email: 'anna@example.com', position: 'QA', active: false },
        { id: 7, email: 'james@example.com', position: 'Prod', active: false },
        { id: 8, email: 'sarah@example.com', position: 'Developer', active: true },
        { id: 9, email: 'tom@example.com', position: 'Tester', active: true },
        { id: 10, email: 'linda@example.com', position: 'QA', active: false },
        { id: 11, email: 'mike@example.com', position: 'Prod', active: false },
        { id: 12, email: 'chris@example.com', position: 'Developer', active: true },
        { id: 13, email: 'olivia@example.com', position: 'Designer', active: true },
        { id: 14, email: 'noah@example.com', position: 'Manager', active: false },
        { id: 15, email: 'lucas@example.com', position: 'Developer', active: true },
        { id: 16, email: 'mia@example.com', position: 'Tester', active: true },
        { id: 17, email: 'harry@example.com', position: 'QA', active: false },
        { id: 18, email: 'emma@example.com', position: 'Prod', active: true },
        { id: 19, email: 'jack@example.com', position: 'Developer', active: false },
        { id: 20, email: 'sophie@example.com', position: 'Designer', active: true },
        // Add more user data as needed
    ]);
    const [showForm, setShowForm] = useState(false);
    const [formState, setFormState] = useState({ id: null, email: '', position: 'Developer', active: false });
    const [notification, setNotification] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification('');
            }, 3000); // Notification disappears after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddUser = () => {
        setShowForm(true);
        setFormState({ id: null, email: '', position: 'Developer', active: false });
    };

    const handleEditUser = (user) => {
        setShowForm(true);
        setFormState(user);
    };

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
        setNotification('User deleted successfully');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formState.id) {
            setUsers(users.map(user => (user.id === formState.id ? formState : user)));
            setNotification('User updated successfully');
        } else {
            const newUser = { ...formState, id: users.length + 1 };
            setUsers([...users, newUser]);
            setNotification('User added successfully');
        }
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState({
            ...formState,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="dashboard">
            {notification && <div className="notification">{notification}</div>}
            <button className="add-user-btn" onClick={handleAddUser}>+Add User</button>
            <input
                type="text"
                placeholder="Search by email or position"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {showForm && (
                <div className="form-overlay">
                    <form className="user-form" onSubmit={handleSubmit}>
                        <FaTimes className="close-btn" onClick={() => setShowForm(false)} />
                        <h2>{formState.id ? 'Update User' : 'Add New User'}</h2>
                        <label>
                            Email ID:
                            <input type="email" name="email" value={formState.email} onChange={handleInputChange} required />
                        </label>
                        <label>
                            Position:
                            <select name="position" value={formState.position} onChange={handleInputChange} required>
                                <option value="Developer">Developer</option>
                                <option value="Tester">Tester</option>
                                <option value="QA">QA</option>
                                <option value="Prod">Prod</option>
                            </select>
                        </label>
                        <label>
                            Active:
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formState.active}
                                    onChange={handleInputChange}
                                />
                                <span className="slider"></span>
                            </div>
                        </label>
                        <button type="submit">{formState.id ? 'Update' : 'Add'}</button>
                    </form>
                </div>
            )}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Email ID</th>
                        <th>Position</th>
                        <th>Active/Not Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.position}</td>
                            <td>{user.active ? 'Active' : 'Not Active'}</td>
                            <td>
                                <button className="update-btn" onClick={() => handleEditUser(user)}>Update</button>
                                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={prevPage} className="page-item">&laquo; Previous</button>
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className="page-item">Next &raquo;</button>
            </div>
        </div>
    );
};

export default Dashboard;
