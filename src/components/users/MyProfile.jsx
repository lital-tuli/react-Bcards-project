import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getUserById, updateUser } from "../../services/UserService";
import UserCard from "./UserCard";
import EditUserDetails from "./EditUserDetails";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserById();
        setUser(userData);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [display, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-warning" role="alert">
        User data not available. Please try logging in again.
      </div>
    );
  }

  return (
    <>
      <h1 className="my-4">
        {`${user.name.first} ${user.name.last}'s Profile`}{" "}
        <button
          onClick={() => setDisplay(true)}
          type="button"
          className="btn btn-outline-warning"
        >
          <i className="bi bi-pencil"></i>
        </button>
      </h1>

      {display ? (
        <EditUserDetails
          user={user}
          onSave={updateUser}
          onCancel={() => setDisplay(false)}
        />
      ) : (
        <UserCard userData={user} />
      )}
    </>
  );
}

export default MyProfile;