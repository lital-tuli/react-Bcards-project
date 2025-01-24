import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { deleteUser, getAllUsers, updateUserType } from '../../services/UserService';
import { getAllCards } from '../../services/CardService';
import { useTheme } from '../../providers/ThemeProvider';

const Sandbox = () => {
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const { theme } = useTheme();
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const loggedUserId = token ? jwtDecode(token)._id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, cardsData] = await Promise.all([
          getAllUsers(),
          getAllCards()
        ]);
        const adminUser = usersData.find(user => user._id === loggedUserId);
        
        setUsers(usersData);
        setCards(cardsData);
        setCurrentAdmin(adminUser);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedUserId]);

  const handleEditRole = async (userId) => {
    try {
      setProcessingId(userId);
      await updateUserType(userId);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setProcessingId(userId);
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRowClick = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const getUserCardCount = (userId) => 
    cards.filter(card => card.user_id === userId).length;

  const filteredUsers = users.filter(user => {
    const searchString = searchTerm.toLowerCase();
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const role = user.isAdmin ? 'admin' : user.isBusiness ? 'business' : 'customer';
    
    return fullName.includes(searchString) ||
           user.email.toLowerCase().includes(searchString) ||
           role.includes(searchString);
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className={theme.textColor}>Admin Dashboard</h1>
        <p className={theme.textMuted}>
          Manage users and their permissions
        </p>
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className={`form-control ${theme.inputBg}`}
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className={`table table-hover ${theme.cardBg}`}>
          <thead className={theme.borderColor}>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Cards</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <React.Fragment key={user._id}>
                <tr 
                  className={theme.textColor}
                  onClick={() => handleRowClick(user._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    {user.email}
                    {currentAdmin?._id === user._id && 
                      <span className="badge bg-primary ms-2">YOU</span>
                    }
                  </td>
                  <td>
                    <span className={`badge ${
                      user.isAdmin ? 'bg-danger' : 
                      user.isBusiness ? 'bg-success' : 'bg-info'
                    }`}>
                      {user.isAdmin ? 'Admin' : user.isBusiness ? 'Business' : 'Customer'}
                    </span>
                  </td>
                  <td>{getUserCardCount(user._id)}</td>
                  <td>
                    {!user.isAdmin && (
                      <div className="btn-group">
                        <button
                          className={`btn btn-sm ${theme.btnOutline}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(user._id);
                          }}
                          disabled={processingId === user._id}
                        >
                          {processingId === user._id ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <>
                              <i className="bi bi-person-gear me-1"></i>
                              Toggle Business
                            </>
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user._id);
                          }}
                          disabled={processingId === user._id}
                        >
                          {processingId === user._id ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <i className="bi bi-trash"></i>
                          )}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
                {expandedUserId === user._id && (
                  <tr>
                    <td colSpan="4" className={theme.textColor}>
                      <div className="p-3">
                        <h6 className="mb-3">User Details</h6>
                        <div className="row">
                          <div className="col-md-6">
                            <p><strong>First Name:</strong> {user.name.first}</p>
                            <p><strong>Last Name:</strong> {user.name.last}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Address:</strong></p>
                            <p>{user.address.street} {user.address.houseNumber}</p>
                            <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                            <p>{user.address.country}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center mt-4">
          <i className="bi bi-search fs-1 text-muted"></i>
          <p className={`mt-2 ${theme.textMuted}`}>No users found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Sandbox;