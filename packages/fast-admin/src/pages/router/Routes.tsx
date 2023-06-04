import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Dashboard from "../../components/layouts/Dashboard";
import Login from "../auth/Login";
import Restaurants from "../dashboard/Restaurants";
import Delivers from "../dashboard/Delivers";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<AuthLayout children={<Login />} />} />
            <Route
                path="/login"
                element={<AuthLayout children={<Login />} />}
            />
            <Route
                path="/dashboard"
                element={<Dashboard children={<Restaurants />} />}
            />
            <Route
                path="/dashboard/restaurants"
                element={<Dashboard children={<Restaurants />} />}
            />

            <Route
                path="/dashboard/delivery"
                element={<Dashboard children={<Delivers />} />}
            />
        </Route>
    )
);

export default router;
