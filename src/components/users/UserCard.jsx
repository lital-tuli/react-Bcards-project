import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Modal, Button, Alert } from 'react-bootstrap';

import { deleteUser , logoutUser, updateUserToken, updateUserType } from '../../services/UserService';

const UserCard = ({ userData }) => {
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const userId = jwtDecode(token)._id;

  const handleConfirmTypeChange = async () => {
    try {
      await updateUserType(userId);
      await updateUserToken(userData.email, password);
      setShowTypeModal(false);
      window.location.reload();
    } catch (error) {
      setErrorMessage(
        error.response?.status === 400 
          ? "Incorrect password" 
          : "User type change failed"
      );
      console.error("Type Change Error:", error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteUser(userId);
      logoutUser();
    }
  };

  return (
    <>
      {/* Type Change Modal */}
      <Modal show={showTypeModal} onHide={() => setShowTypeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Change to {userData.isBusiness ? "Customer" : "Business"} Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Changing the user type will change your permissions. Are you sure?</p>
          <div className="input-group mb-3">
            <span className="input-group-text">Confirm Password:</span>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTypeModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmTypeChange}>
            Confirm Change
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to log out from your account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User Information */}
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-12 col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Personal Information</h5>
                <div className="mb-3">
                  <strong>Full Name:</strong>
                  <p className="text-capitalize mb-2">
                    {`${userData.name.first} ${userData.name.last}`}
                  </p>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <p className="mb-2">{userData.email}</p>
                </div>
                <div className="mb-3">
                  <strong>Phone:</strong>
                  <p className="mb-2">{userData.phone}</p>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Address</h5>
                <div className="mb-2">
                  <strong>Street: </strong>
                  <span className="text-capitalize">
                    {userData.address.street} {userData.address.houseNumber}
                  </span>
                </div>
                <div className="mb-2">
                  <strong>City: </strong>
                  <span className="text-capitalize">{userData.address.city}</span>
                </div>
                {userData.address.state && (
                  <div className="mb-2">
                    <strong>State: </strong>
                    <span className="text-capitalize">{userData.address.state}</span>
                  </div>
                )}
                <div className="mb-2">
                  <strong>Country: </strong>
                  <span className="text-capitalize">{userData.address.country}</span>
                </div>
                <div className="mb-2">
                  <strong>Zipcode: </strong>
                  <span>{userData.address.zip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-12 col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Profile Image</h5>
                <div className="text-center">
                  <img
                    src={userData.image.url}
                    alt={userData.image.alt}
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Account Type</h5>
                <p className="mb-3">
                  Currently registered as a{" "}
                  <span className="fw-bold">
                    {userData.isBusiness ? "Business" : "Customer"}
                  </span>
                </p>
                <Button 
                  variant="warning"
                  className="w-100"
                  onClick={() => setShowTypeModal(true)}
                >
                  Change to {userData.isBusiness ? "Customer" : "Business"} Account
                </Button>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Account Actions</h5>
                <Button 
                  variant="danger" 
                  className="w-100 mb-3"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Log Out
                </Button>
                <p className="text-muted small">
                  Member since: {format(new Date(userData.createdAt), "MMMM do yyyy")}
                </p>
                <Link
                  onClick={handleDeleteAccount}
                  className="text-danger text-decoration-none"
                >
                  Delete account permanently
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default UserCard;