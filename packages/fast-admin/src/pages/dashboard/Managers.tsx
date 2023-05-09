import { useEffect, useState } from "react";
import {
    Button,
    Table,
    TableRow,
    TableRowDataType,
} from "@fast-monorepo/shared/index";
import AddManagerModal from "../../components/dashboard/AddManagerModal";
import useManagerStore from "../../store/ManagerStore";

const Managers = () => {
    const { managers, getManagers } = useManagerStore((state) => state);
    const [rows, setRows] = useState<TableRowDataType[]>([]);

    useEffect(() => {
        getManagers();
    }, []);

    useEffect(() => {
        let rows: TableRowDataType[] = [];
        managers.forEach((rest) => {
            rows.push({
                data: Object.values({
                    ...rest,
                }),
            });
        });
        console.log(rows);
        setRows([...rows]);
    }, [managers]);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const handleAddManager = () => {
        setAddModalVisible(true);
    };
    return (
        <>
            {/*   <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-2xl ">Managers</h1>
                <Button label="CREATE Manager" onClick={handleAddManager} />
                {addModalVisible && (
                    <AddManagerModal setVisible={setAddModalVisible} />
                )}
            </div>
            <div>
                <Table header={["Name", "Adresse", "City", "Manager"]}>
                    {rows.map((row, i) => (
                        <TableRow row={row} key={i} />
                    ))}
                </Table>
            </div> */}
        </>
    );
};

export default Managers;
