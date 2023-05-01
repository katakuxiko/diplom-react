import { FC } from "react";
import "./Profile.scss";
interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
	const name = localStorage.getItem("username");
	const email = localStorage.getItem("email");
	const id = localStorage.getItem("id");
	return (
		<div className="profile">
			<h1 className="profile_title">{name}</h1>
			<h2 className="profile_email">{email}</h2>
			<div className="profile_id">Ваш ID {id}</div>
		</div>
	);
};

export default Profile;
