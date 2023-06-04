import { PropsWithChildren, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SideBar, SideBarElement } from "@fast-monorepo/shared/index";
import useAuthStore from "../../store/authStore";
import { MdDashboard } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiUser2Line, RiUser3Line } from "react-icons/ri";

const Dashboard: React.FC<PropsWithChildren> = ({ children }) => {
    const { auth, logout } = useAuthStore((state) => state);
    if (!auth) return <Navigate to="/login" />;

    const [opened, setOpened] = useState(true);
    const navigate = useNavigate();
    const color = "#14532d";
    return (
        <div className="flex min-h-screen">
            <SideBar
                fontSize="16px"
                backgroundColor="white"
                logo={<p className="text-center">F</p>}
                toggle={(open) => {
                    setOpened(open);
                }}>
                <SideBarElement
                    text="Overview"
                    icon={<MdDashboard />}
                    open={opened}
                    color={color}
                    onClick={() => navigate("/dashboard")}
                />
                <SideBarElement
                    text="Orders"
                    icon={<AiOutlineShoppingCart />}
                    open={opened}
                    color={color}
                    onClick={() => navigate("/dashboard")}
                />
                <SideBarElement
                    text="Restaurants"
                    icon={<IoRestaurantOutline />}
                    open={opened}
                    onClick={() => navigate("/dashboard/restaurants")}
                    color={color}
                    active={location.pathname.includes("restaurants")}
                />
                <SideBarElement
                    text="Delivery "
                    icon={<RiUser2Line />}
                    open={opened}
                    color={color}
                    onClick={() => navigate("/dashboard/delivery")}
                />
                <SideBarElement
                    text="Clients"
                    icon={<RiUser3Line />}
                    open={opened}
                    color={color}
                    onClick={() => navigate("/login")}
                />
                <SideBarElement
                    text="Logout "
                    icon={<RiUser2Line />}
                    open={opened}
                    color={color}
                    onClick={() => {
                        logout();
                        location.assign("/");
                    }}
                />
            </SideBar>
            <div className="p-8 w-full bg-slate-100">{children}</div>
        </div>
    );
};

export default Dashboard;
