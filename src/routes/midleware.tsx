import GuestLayout from "@/layouts/guest-layout";
import PrivateLayout from "@/layouts/private-layout";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();

export const getAccessToken = () => {
	const token = cookies.get("dummyToken");
	return token;
};

export const GuestRoute = () => {
	if (!getAccessToken()) localStorage.removeItem("user");
	return !getAccessToken() ? <GuestLayout /> : <Navigate to={"/"} />;
};

export const PrivateRoute = () => {
	if (!getAccessToken()) localStorage.removeItem("user");
	return getAccessToken() ? <PrivateLayout /> : <Navigate to={"/login"} />;
};
