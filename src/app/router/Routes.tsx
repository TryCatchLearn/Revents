import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetails from "../../features/events/details/EventDetails";
import EventForm from "../../features/events/form/EventForm";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import ProfilePage from "../../features/profiles/ProfilePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/', element: <HomePage />},
            {path: 'events', element: <EventDashboard />},
            {path: 'events/:id', element: <EventDetails />},
            {path: 'manage/:id', element: <EventForm />},
            {path: 'createEvent', element: <EventForm />},
            {path: 'login', element: <LoginForm />},
            {path: 'register', element: <RegisterForm />},
            {path: 'profiles/:id', element: <ProfilePage />},
        ]
    }
])