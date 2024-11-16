import { createBrowserRouter } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "./midleware";
import LoginPage from "@/pages/auth/login";
import MainPage from "@/pages";
import ErrorBoundary from "@/components/error-boundary";

export const router = createBrowserRouter([
	{
		element: (
			<ErrorBoundary>
				<GuestRoute />
			</ErrorBoundary>
		),
		children: [
			{
				path: "/login",
				element: <LoginPage />,
			},
		],
	},
	{
		path: "/",
		element: (
			<ErrorBoundary>
				<PrivateRoute />
			</ErrorBoundary>
		),
		children: [
			{
				index: true,
				element: <MainPage />,
			},
		],
	},
]);
