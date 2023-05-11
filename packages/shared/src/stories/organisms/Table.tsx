import React, { PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";

type PropsType = {
    header: (string | ReactElement)[];
    setSortBy?: (s: string) => void;
};
const TableContainer = styled.div<{}>`
    border-raduis: 8px;
    font-size: 0.8rem;
`;
const StyledTable = styled.div<{}>`
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
export const Table: React.FC<PropsWithChildren & PropsType> = ({
    children,
    header,
}) => {
    return (
        <TableContainer>
            <StyledTable
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
            </StyledTable>
        </TableContainer>
    );
};

export type TableRowDataType = {
    data: (string | number | ReactElement | undefined)[];
    disabled?: boolean;
};
const StyledTableRow = styled.div<{}>`
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

export const TableRow = (props: {
    row: TableRowDataType;
    closed?: boolean;
}) => {
    return (
        <>
            {props.row.data.map((info, i) => (
                <StyledTableRow key={i}>{info}</StyledTableRow>
            ))}
        </>
    );
};
