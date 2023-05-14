import { useEffect, useState } from "react";
import {
    Button,
    Table,
    TableRow,
    TableRowDataType,
} from "@fast-monorepo/shared/index";
import AddDeliverModal from "../../components/dashboard/AddDeliverModal";
import useDeliverStore from "../../store/DeliverStore";
import Container from "../../components/general/Container";

const Delivers = () => {
    const { delivers, getDelivers } = useDeliverStore((state) => state);
    const [rows, setRows] = useState<TableRowDataType[]>([]);

    useEffect(() => {
        getDelivers();
    }, []);

    useEffect(() => {
        let rows: TableRowDataType[] = [];
        delivers.forEach((rest) => {
            rows.push({
                data: Object.values({
                    ...rest,
                }),
            });
        });
        console.log(rows);
        setRows([...rows]);
    }, [delivers]);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const handleAddDeliver = () => {
        setAddModalVisible(true);
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
            <div>
                <Table header={["Name", "Phone", "Restaurant"]}>
                    {rows.map((row, i) => (
                        <TableRow row={row} key={i} />
                    ))}
                </Table>
            </div>
        </Container>
    );
};

export default Delivers;
