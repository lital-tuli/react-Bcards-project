import EditUserDetails from "./EditUserDetails";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UserCard from "./UserCard";
import { Spinner } from "react-bootstrap";
import { getUserById } from "../../services/UserService";

function MyProfile() {
	const [loading, setLoading] = useState(true);
	const [disabled, setDisabled] = useState(true);
	const [user, setUser] = useState(null);
	const token =
		sessionStorage.getItem("token") || localStorage.getItem("token");
	let userData = jwtDecode(token);
	let isBusiness = userData.isBusiness;
	const [display, setDisplay] = useState(false);

	useEffect(() => {
		getUserById()
			.then((userData) => {
				setUser(userData);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, [display]);

	return (
		<>
			{loading ? (
				<div className="d-flex justify-content-center my-5">
					<Spinner animation="border" variant="primary" role="status"></Spinner>
				</div>
			) : (
				<>
					<h1 className="my-4 capitalize">
						{`${user.name.first} ${user.name.last}'s Profile`}{" "}
						<button
							onClick={() => setDisplay(true) && setDisabled(false)}
							type="button"
							className="btn btn-outline-warning"
						>
							<i className="fa-regular fa-pen-to-square"></i>
						</button>
					</h1>
					{display ? (
						<EditUserDetails
							isBusiness={isBusiness}
							setDisplay={setDisplay}
							disabled={disabled}
						/>
					) : (
						<UserCard userData={user} />
					)}
				</>
			)}
		</>
	);
}

export default MyProfile;