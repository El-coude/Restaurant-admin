import { useEffect, useState } from "react";
import AddRestaurantModal from "../../components/dashboard/AddRestaurantModal";
import useRestaurantStore from "../../store/RestaurantStore";
import Swal from "sweetalert2";
import AddManagerModal from "../../components/dashboard/AddManagerModal";
import { ImSpinner2 } from "react-icons/im";
import Container from "../../components/general/Container";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";

const Restaurants = () => {
    const { restaurants, getRestaurants, removeRestaurant, loading, error } =
        useRestaurantStore((state) => state);
    const [managerModal, setManagerModal] = useState<number | null>(null); // null invisible else restaurant id
    const [updateRes, setUpdateRes] = useState<number | null>(null);

    useEffect(() => {
        getRestaurants();
    }, []);

    const [addModalVisible, setAddModalVisible] = useState(false);

    const handleAddRestaurant = () => {
        setAddModalVisible(true);
    };

    const handeRemove = async (id: number) => {
        const res = await Swal.fire({
            title: "Are you sure you want to remove restaurant",
            showDenyButton: true,
            denyButtonText: "Cancel",
            confirmButtonText: "Confirm",
        });
        if (res.isConfirmed) removeRestaurant(id);
    };

    return (
        <Container className="h-screen">
            <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Restaurants</h1>
                <button
                    className="btn btn-secondary text-white"
                    onClick={handleAddRestaurant}>
                    Create restaurant
                </button>
                {addModalVisible && (
                    <AddRestaurantModal
                        action="create"
                        close={() => setAddModalVisible(false)}
                    />
                )}
            </div>
            {error && <p className="text-center text-red-600">Network error</p>}
            {loading && <ImSpinner2 className="spinner m-auto" size={28} />}
            {restaurants.length > 0 && (
                <div>
                    <table className="table w-full border-spacing-2">
                        <thead>
                            <tr className="bg-transparent [&>th]:bg-transparent ">
                                <th>NAME</th>
                                <th>ADDRESS</th>
                                <th>MANAGER</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {restaurants.map((rest, i) => (
                                <tr
                                    key={i}
                                    onClick={() => setUpdateRes(i)}
                                    className="text-sm hover:bg-slate-200 cursor-pointer [&>td]:bg-transparent">
                                    <td>{rest.name}</td>
                                    <td>{rest.address}</td>
                                    <td>
                                        {rest.manager ? (
                                            rest.manager.name
                                        ) : (
                                            <button
                                                className="btn btn-circle btn-ghost text-secondary"
                                                onClick={(e) => {
                                                    console.log(rest.id);
                                                    e.stopPropagation();
                                                    setManagerModal(rest.id!);
                                                }}>
                                                <HiOutlineUserAdd size={20} />
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-circle btn-ghost text-error"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handeRemove(rest.id!);
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

            {managerModal != null && (
                <AddManagerModal
                    restaurantId={managerModal}
                    close={() => setManagerModal(null)}
                    onSuccess={() => getRestaurants()}
                />
            )}
            {updateRes != null && (
                <AddRestaurantModal
                    prevValues={restaurants[updateRes]}
                    action="update"
                    close={() => setUpdateRes(null)}
                />
            )}
        </Container>
    );
};

export default Restaurants;
