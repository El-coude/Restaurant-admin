import React, { PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";

type PropsType = {
    header: (string | ReactElement)[];
    setSortBy?: (s: string) => void;
};
export const Table: React.FC<PropsWithChildren & PropsType> = ({
    children,
    header,
}) => {
    const TableContainer = styled.div<{}>`
        border-raduis: 8px;
        font-size: 0.8rem;
    `;
    const Table = styled.div<{}>`
        display: grid;
        row-gap: 1rem;
        place-items: center;
        min-width: 624px;
    }
    `;
    const TableHeader = styled.div<{}>`
      font-weight: 700;
      padding: 1rem 1.25rem;
      width: 100%;
      text-align: left;
      min-width: max-content;
    }
    `;
    return (
        <TableContainer>
            <Table
                className={`grid gap-y-4 place-items-center min-w-[624px] `}
                style={{
                    gridTemplateColumns: `repeat(${header?.length}, 1fr)`,
                }}>
                {header?.map((name, i) => (
                    <>
                        <TableHeader
                            key={i}
                            className="font-bold py-4 px-5 w-full text-left min-w-max">
                            {name}
                        </TableHeader>
                    </>
                ))}
                {children}
            </Table>
        </TableContainer>
    );
};

export type TableRowDataType = {
    data: (string | number | ReactElement | undefined)[];
    disabled?: boolean;
};
export const TableRow = (props: {
    row: TableRowDataType;
    closed?: boolean;
}) => {
    const TableRow = styled.div<{}>`
    padding: 1rem 1.25rem;
    width: 100%;
    height: 100%;
    text-align: left;
    min-width: max-content;
    display: flex;
    align-items: center;
    justify-content: start
  }
  `;

    return (
        <>
            {props.row.data.map((info, i) => (
                <TableRow key={i}>{info}</TableRow>
            ))}
        </>
    );
};
