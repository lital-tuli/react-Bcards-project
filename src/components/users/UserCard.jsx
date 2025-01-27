import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import { useTheme } from '../../providers/ThemeProvider';
import TypeChange from '../modals/TypeChange';
import Logout from '../modals/Logout';
import DeleteAccount from '../modals/DeleteAccount';
import { deleteUser, logoutUser, updateUserToken, updateUserType } from '../../services/UserService';
import { useSnack } from '../../providers/SnackBarProvider';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ userData }) => {
  const { theme } = useTheme();
  const setSnack = useSnack();
  const navigate = useNavigate();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const userId = token ? jwtDecode(token)?._id : null;

  if (!userData || !userId) {
    return (
      <div className="alert alert-warning">
        No user data available or not logged in.
        Please try logging in again.
      </div>
    );
  }

  const handleConfirmTypeChange = async () => {
    try {
      await updateUserType(userId);
      await updateUserToken(userData.email, password);
      setShowTypeModal(false);
      setPassword("");
      setErrorMessage("");
      setSnack('success', 'Account type changed successfully');
      window.location.reload();
    } catch (error) {
      setErrorMessage(
        error.response?.status === 400 
          ? "Incorrect password" 
          : "Failed to change account type. Please try again."
      );
    }
  };

  const handleTypeChange = async (e) => {
    e.preventDefault();
    setShowTypeModal(true);
  };

  const handleCloseTypeModal = () => {
    setShowTypeModal(false);
    setPassword("");
    setErrorMessage("");
  };

  const handleCloseLogout = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      setSnack('error', 'Failed to logout. Please try again.');
    }
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      await logoutUser();
      navigate('/');
      setSnack('success', 'Account deleted successfully');
    } catch (error) {
      console.error("Delete account error:", error);
      setSnack('error', 'Failed to delete account. Please try again.');
    }
  };

  const defaultImage = "https://placehold.co/100x100?text=Profile";

  return (
    <>
      <TypeChange 
        show={showTypeModal}
        handleClose={handleCloseTypeModal}
        handleConfirm={handleConfirmTypeChange}
        userData={userData}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />

      <Logout 
        show={showLogoutModal}
        handleClose={handleCloseLogout}
        handleLogout={handleLogout}
      />

      <DeleteAccount 
        show={showDeleteModal}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
      />

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className={`card mb-3 ${theme.cardBg} ${theme.borderColor}`}>
              <div className="card-body">
                <h5 className={`card-title ${theme.textColor}`}>Personal Information</h5>
                <div className="mb-3">
                  <strong className={theme.textColor}>Full Name:</strong>
                  <p className={`text-capitalize mb-2 ${theme.textColor}`}>
                    {`${userData.name.first} ${userData.name.middle ? userData.name.middle + ' ' : ''}${userData.name.last}`}
                  </p>
                </div>
                <div className="mb-3">
                  <strong className={theme.textColor}>Email:</strong>
                  <p className={`mb-2 ${theme.textColor}`}>{userData.email}</p>
                </div>
                <div className="mb-3">
                  <strong className={theme.textColor}>Phone:</strong>
                  <p className={`mb-2 ${theme.textColor}`}>{userData.phone}</p>
                </div>
              </div>
            </div>

            <div className={`card mb-3 ${theme.cardBg} ${theme.borderColor}`}>
              <div className="card-body">
                <h5 className={`card-title ${theme.textColor}`}>Address</h5>
                <div className="mb-2">
                  <strong className={theme.textColor}>Street: </strong>
                  <span className={`text-capitalize ${theme.textColor}`}>
                    {userData.address.street} {userData.address.houseNumber}
                  </span>
                </div>
                <div className="mb-2">
                  <strong className={theme.textColor}>City: </strong>
                  <span className={`text-capitalize ${theme.textColor}`}>
                    {userData.address.city}
                  </span>
                </div>
                {userData.address.state && (
                  <div className="mb-2">
                    <strong className={theme.textColor}>State: </strong>
                    <span className={`text-capitalize ${theme.textColor}`}>
                      {userData.address.state}
                    </span>
                  </div>
                )}
                <div className="mb-2">
                  <strong className={theme.textColor}>Country: </strong>
                  <span className={`text-capitalize ${theme.textColor}`}>
                    {userData.address.country}
                  </span>
                </div>
                <div className="mb-2">
                  <strong className={theme.textColor}>Zipcode: </strong>
                  <span className={theme.textColor}>{userData.address.zip}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className={`card mb-3 ${theme.cardBg} ${theme.borderColor}`}>
              <div className="card-body">
                <h5 className={`card-title ${theme.textColor}`}>Profile Image</h5>
                <div className="text-center">
                  <img
                    src={userData.image?.url || defaultImage}
                    alt={userData.image?.alt || "Profile"}
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = defaultImage;
                      e.target.onerror = null;
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={`card mb-3 ${theme.cardBg} ${theme.borderColor}`}>
              <div className="card-body">
                <h5 className={`card-title ${theme.textColor}`}>Account Type</h5>
                <p className={`mb-3 ${theme.textColor}`}>
                  Currently registered as a{" "}
                  <span className="fw-bold">
                    {userData.isBusiness ? "Business" : "Customer"}
                  </span>
                </p>
                <button 
                  className={`btn ${theme.btnOutline} w-100`}
                  onClick={handleTypeChange}
                >
                  Change to {userData.isBusiness ? "Customer" : "Business"} Account
                </button>
              </div>
            </div>

            <div className={`card mb-3 ${theme.cardBg} ${theme.borderColor}`}>
              <div className="card-body">
                <h5 className={`card-title ${theme.textColor}`}>Account Actions</h5>
                <button 
                  className="btn btn-danger w-100 mb-3"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Log Out
                </button>
                <p className={`small ${theme.textMuted}`}>
                  Member since: {format(new Date(userData.createdAt), "MMMM do yyyy")}
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="btn btn-link text-danger text-decoration-none p-0"
                >
                  Delete account permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;