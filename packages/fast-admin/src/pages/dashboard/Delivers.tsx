import { useEffect, useState } from "react";
import useDeliverStore from "../../store/DeliverStore";
import Container from "../../components/general/Container";
import { ImSpinner2 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import DeliverModal from "../../components/dashboard/DeliverModal";
import DeliverRequestModal from "../../components/dashboard/DeliverRequestModal";

const Delivers = () => {
    const { delivers, getDelivers, loading, error, removeDeliver } =
        useDeliverStore((state) => state);

    useEffect(() => {
        getDelivers();
    }, []);

    const [updateModal, setUpdateModal] = useState<number | null>(null);
    const [requestModal, setRequestModal] = useState<number | null>(null);

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
        <div className="flex gap-4">
            <Container className="w-3/5">
                <div className=" ml-auto mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Delivery guys</h1>
                </div>
                {error && (
                    <p className="text-center text-red-600">Network error</p>
                )}
                {loading && <ImSpinner2 className="spinner m-auto" size={28} />}
                {delivers.length > 0 && (
                    <div>
                        <table className="table w-full border-spacing-2">
                            <thead>
                                <tr className="bg-transparent [&>th]:bg-transparent ">
                                    <th>NAME</th>
                                    <th>PHONE</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {delivers
                                    .filter((dl) => dl.accepted)
                                    .map((del, i) => (
                                        <tr
                                            key={i}
                                            onClick={() => setUpdateModal(i)}
                                            className="text-sm hover:bg-slate-200 cursor-pointer [&>td]:bg-transparent">
                                            <td>{del.name}</td>
                                            <td>{del.phone}</td>
                                            <td>{del.accepted}</td>
                                            <td>
                                                <button
                                                    className="btn btn-circle btn-ghost text-error"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handeRemove(del.id!);
                                                    }}>
                                                    <MdDeleteForever
                                                        size={20}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {updateModal !== null && (
                    <DeliverModal
                        close={() => setUpdateModal(null)}
                        prevValues={delivers[updateModal]}
                    />
                )}
            </Container>
            <Container className="w-2/5">
                <h1 className="text-2xl font-bold">Requests</h1>
                {error && (
                    <p className="text-center text-red-600">Network error</p>
                )}
                {loading && <ImSpinner2 className="spinner m-auto" size={28} />}
                {delivers.length > 0 && (
                    <div>
                        <table className="table w-full border-spacing-2">
                            <thead>
                                <tr className="bg-transparent [&>th]:bg-transparent ">
                                    <th>NAME</th>
                                    <th>PHONE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {delivers
                                    .filter((dl) => !dl.accepted)
                                    .map((del, i) => (
                                        <tr
                                            key={i}
                                            onClick={() => setRequestModal(i)}
                                            className="text-sm hover:bg-slate-200 cursor-pointer [&>td]:bg-transparent">
                                            <td>{del.name}</td>
                                            <td>{del.phone}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {requestModal !== null && (
                    <DeliverRequestModal
                        close={() => setRequestModal(null)}
                        deliver={delivers[requestModal]}
                    />
                )}
            </Container>
        </div>
    );
};

export default Delivers;
