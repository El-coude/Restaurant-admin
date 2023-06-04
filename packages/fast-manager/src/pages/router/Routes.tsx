import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Dashboard from "../../components/layouts/Dashboard";
import Login from "../auth/Login";
import Delivers from "../dashboard/Delivers";
import Meals from "../dashboard/Meals";

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
                element={<Dashboard children={<Meals />} />}
            />

            <Route
                path="/dashboard/meals"
                element={<Dashboard children={<Meals />} />}
            />
            <Route
                path="/dashboard/delivery"
                element={<Dashboard children={<Delivers />} />}
            />
        </Route>
    )
);

export default router;
