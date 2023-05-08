import { PropsWithChildren, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SideBar, SideBarElement } from "@fast-monorepo/shared/index";
import useAuthStore from "../../store/authStore";
import { MdDashboard } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiUser2Line, RiUser3Line } from "react-icons/ri";

const Dashboard: React.FC<PropsWithChildren> = ({ children }) => {
    const { auth } = useAuthStore((state) => state);
    if (!auth) return <Navigate to="/login" />;

    const [opened, setOpened] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="flex">
            <SideBar
                fontSize="16px"
                logo={<p className="text-center">F</p>}
                toggle={(open) => {
                    setOpened(open);
                }}>
                <SideBarElement
                    text="Overview"
                    icon={<MdDashboard />}
                    open={opened}
                    onClick={() => navigate("/dashboard")}
                />
                <SideBarElement
                    text="Orders"
                    icon={<AiOutlineShoppingCart />}
                    open={opened}
                    onClick={() => navigate("/dashboard")}
                />
                <SideBarElement
                    text="Restaurants"
                    icon={<IoRestaurantOutline />}
                    open={opened}
                    onClick={() => navigate("/dashboard/restaurants")}
                />
                <SideBarElement
                    text="Managers"
                    icon={<RiUser2Line />}
                    open={opened}
                    onClick={() => navigate("/dashboard")}
                />
                <SideBarElement
                    text="Clients"
                    icon={<RiUser3Line />}
                    open={opened}
                    onClick={() => navigate("/login")}
                />
            </SideBar>
            <div className="p-12 w-full">{children}</div>
        </div>
    );
};

export default Dashboard;
