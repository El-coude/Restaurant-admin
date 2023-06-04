import { useEffect, useState } from "react";

import useDeliverStore from "../../store/DeliverStore";
import Container from "../../components/general/Container";
import { ImSpinner2 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const Delivers = () => {
    const { delivers, getDelivers, loading, error } = useDeliverStore(
        (state) => state
    );

    useEffect(() => {
        getDelivers();
    }, []);

    return (
        <Container>
            <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Delivery guys</h1>
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
                                {/*  <th>RESTAURANT</th>
                                <th></th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {delivers.map((del, i) => (
                                <tr
                                    key={i}
                                    className="text-sm hover:bg-slate-200 cursor-pointer [&>td]:bg-transparent">
                                    <td>{del.name}</td>
                                    <td>{del.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Container>
    );
};

export default Delivers;
