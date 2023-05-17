import { useEffect, useState } from "react";

import AddDeliverModal from "../../components/dashboard/AddDeliverModal";
import useDeliverStore from "../../store/DeliverStore";
import Container from "../../components/general/Container";
import { ImSpinner2 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const Delivers = () => {
    const { delivers, getDelivers, loading, error, removeDeliver } =
        useDeliverStore((state) => state);

    useEffect(() => {
        getDelivers();
    }, []);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModal, setUpdateModal] = useState<number | null>(null);

    const handleAddDeliver = () => {
        setAddModalVisible(true);
    };

    const handeRemove = async (i: number) => {
        const res = await Swal.fire({
            title: "Are you sure you want to remove restaurant",
            showDenyButton: true,
            denyButtonText: "Cancel",
            confirmButtonText: "Confirm",
        });
        if (res.isConfirmed) removeDeliver(i);
    };
    return (
        <Container>
            <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Delivery guys</h1>
                <button
                    className="btn btn-secondary text-white"
                    onClick={handleAddDeliver}>
                    Create delivery man
                </button>
                {addModalVisible && (
                    <AddDeliverModal close={() => setAddModalVisible(false)} />
                )}
            </div>
            {error && <p className="text-center text-red-600">Network error</p>}
            {loading && <ImSpinner2 className="spinner m-auto" size={28} />}
            {delivers.length > 0 && (
                <div>
                    <table className="table w-full border-spacing-2">
                        <thead>
                            <tr className="bg-transparent [&>th]:bg-transparent ">
                                <th>NAME</th>
                                <th>PHONE</th>
                                <th>RESTAURANT</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {delivers.map((del, i) => (
                                <tr
                                    key={i}
                                    onClick={() => setUpdateModal(i)}
                                    className="text-sm hover:bg-slate-200 cursor-pointer [&>td]:bg-transparent">
                                    <td>{del.name}</td>
                                    <td>{del.phone}</td>
                                    <td>{del.restaurant?.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-circle btn-ghost text-error"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handeRemove(del.id!);
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
            {updateModal && (
                <AddDeliverModal
                    close={() => setUpdateModal(null)}
                    action="update"
                    prevValues={delivers[updateModal]}
                />
            )}
        </Container>
    );
};

export default Delivers;
