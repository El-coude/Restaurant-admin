import { useRef } from "react";
import useDeliversStore, { Deliver } from "../../store/DeliverStore";
import Modal from "../general/Modal";
import { ImSpinner2 } from "react-icons/im";

const DeliverRequestModal = ({
    close,
    deliver,
}: {
    close: () => void;
    deliver: Deliver;
}) => {
    const { updateDeliver, loading, removeDeliver } = useDeliversStore(
        (state) => state
    );

    const save = (accept: boolean, id: number) => {
        if (accept)
            updateDeliver(
                {
                    id: deliver.id,
                    accepted: accept,
                },
                () => {
                    close();
                },
                (err) => (errLabel.current.innerText = err)
            );
        else {
            removeDeliver(id);
            close();
        }
    };

    const errLabel = useRef<HTMLParagraphElement>(null!);

    return (
        <Modal close={close}>
            <p>
                <span className="font-bold">Name:</span> {deliver.name}
            </p>
            <p>
                <span className="font-bold">Phone number:</span> {deliver.phone}
            </p>
            <p className="font-bold">Message</p>
            <p className="mb-20">{deliver.requestMessage}</p>
            <div className="flex gap-2 m-auto w-fit">
                <button
                    type="submit"
                    className="btn btn-secondary text-white flex gap-2"
                    onClick={() => save(true, deliver.id!)}>
                    {loading && <ImSpinner2 className="spinner" size={14} />}
                    Accept
                </button>
                <button
                    type="submit"
                    className="btn btn-error text-white flex gap-2"
                    onClick={() => () => save(false, deliver.id!)}>
                    {loading && <ImSpinner2 className="spinner" size={14} />}
                    Refuse
                </button>
            </div>
        </Modal>
    );
};

export default DeliverRequestModal;
