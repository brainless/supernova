import React, { useContext, useState } from "react";

import { QueryContext } from "utils";
import { useSchema, useQuerySpecification } from "services/store";
import { Hx } from "components/LayoutHelpers";

export default () => {
  const [state, setState] = useState({
    userSelectedTableName: null,
  });

  const queryContext = useContext(QueryContext);
  const querySpecification = useQuerySpecification(
    (state) => state[queryContext.key]
  );
  const toggleColumnSelection = useQuerySpecification(
    (state) => state.toggleColumnSelection
  );
  const schema = useSchema((state) => state[querySpecification.sourceLabel]);
  const selectedColumLabels = querySpecification.columns.map((x) => x.label);
  const selectedTableNames = [
    ...new Set(querySpecification.columns.map((x) => x.tableName)),
  ];
  const selectedTables = selectedTableNames.map((x) =>
    schema.rows.find((y) => y.table_name === x)
  );
  const currentTable = state.userSelectedTableName
    ? selectedTables.find((x) => x.table_name === state.userSelectedTableName)
    : selectedTables[0];

  const BoundInput = ({ tableName, column }) => {
    const columnLabel = `${tableName}.${column.name}`;
    const handleClick = () => {
      toggleColumnSelection(queryContext.key, columnLabel);
    };
    const checked = selectedColumLabels.includes(columnLabel);

    return (
      <label
        className={`block font-mono font-normal text-sm py-1 px-2 ml-6 hover:bg-gray-200 ${
          checked ? "text-gray-700" : "text-gray-500"
        }`}
      >
        <input
          type="checkbox"
          name={columnLabel}
          checked={checked}
          onChange={handleClick}
          className="mr-1"
        />
        {column.name}
      </label>
    );
  };

  const TableItem = ({ tableName }) => {
    const handleTableSelect = () => {
      setState({
        userSelectedTableName: tableName,
      });
    };

    return (
      <div className="bg-gray-100 mb-2">
        <div
          key={`opt-${tableName}`}
          className="w-full cursor-pointer hover:bg-gray-200"
          onClick={handleTableSelect}
        >
          <span className="text-lg text-gray-600 text-center ml-2 mr-3">
            <i className="fas fa-table" />
          </span>
          <span className="break-all text-sm font-bold text-blue-700">
            {tableName}
          </span>
        </div>

        {currentTable.table_name === tableName
          ? currentTable.columns.map((col) => (
              <BoundInput
                key={`sel-${currentTable.table_name}-${col.name}`}
                tableName={currentTable.table_name}
                column={col}
              />
            ))
          : null}
      </div>
    );
  };

  return (
    <div
      className="fixed bg-white border rounded p-4 shadow-md"
      style={{ top: "4rem", right: "1rem" }}
    >
      <Hx x="4">Columns</Hx>

      <p className="text-gray-700 my-2 max-w-sm">
        For any selected table, you can choose which columns you want to see.
      </p>

      {selectedTables.map((x) => (
        <TableItem tableName={x.table_name} />
      ))}
    </div>
  );
};
