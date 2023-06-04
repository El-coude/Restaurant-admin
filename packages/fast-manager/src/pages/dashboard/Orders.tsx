import { useEffect, useState } from "react";
import useOrderStore from "../../store/OrderStore";
import Swal from "sweetalert2";
import { ImSpinner2 } from "react-icons/im";
import Container from "../../components/general/Container";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";

const Orders = () => {
    const { orders, getOrders, removeOrder, loading, error } = useOrderStore(
        (state) => state
    );
    const [updateRes, setUpdateRes] = useState<number | null>(null);

    useEffect(() => {
        getOrders();
    }, []);

    const [addModalVisible, setAddModalVisible] = useState(false);

    const handleAddOrder = () => {
        setAddModalVisible(true);
    };

    const handeRemove = async (id: number) => {
        const res = await Swal.fire({
            title: "Are you sure you want to remove Order",
            showDenyButton: true,
            denyButtonText: "Cancel",
            confirmButtonText: "Confirm",
        });
        if (res.isConfirmed) removeOrder(id);
    };

    return (
        <Container className="min-h-screen">
            <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Orders</h1>
            </div>
            {error && <p className="text-center text-red-600">Network error</p>}
            {loading && <ImSpinner2 className="spinner m-auto" size={28} />}
            {Orders.length > 0 && (
                <div className="mb-40">
                    <table className="table w-full border-spacing-2">
                        <thead>
                            <tr className="bg-transparent [&>th]:bg-transparent ">
                                <th>Order</th>
                                <th>Client</th>
                                <th>Client phone</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order, i) => (
                                <tr
                                    key={i}
                                    onClick={() => setUpdateRes(i)}
                                    className="text-sm hover:bg-slate-200 cursor-pointer [&>td]:bg-transparent">
                                    <td>
                                        {order.images.length ? (
                                            <img
                                                src={order.images[0]}
                                                className="w-20 h-24"
                                            />
                                        ) : (
                                            <>No Image</>
                                        )}
                                    </td>
                                    <td>{order.name}</td>
                                    <td>{order.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-circle btn-ghost text-error"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handeRemove(order.id!);
                                            }}>
                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Container>
    );
};

export default Orders;
