import React, { Fragment, useState, useContext } from "react";

// import { saveQuery } from "services/apps/actions";
import { QueryContext } from "utils";
import { useQueryContext } from "services/store";
import { Button, Hx } from "components/LayoutHelpers";
import ColumnSelectorInner from "./ColumnSelector";
import FilterEditorInner from "./FilterEditor";
// import OrderEditorInner from "./OrderEditor";

export default () => {
  const [state, setState] = useState({
    isSavingQuery: false,
    savedQueryLabel: "",
    openEditor: "column",
  });
  const queryContext = useContext(QueryContext);
  const toggleQueryUI = useQueryContext((state) => state.toggleQueryUI);

  const handleSaveQuery = async () => {
    if (state.isSavingQuery) {
      // await saveQuery(state.savedQueryLabel, querySpecification);
    } else {
      setState((state) => ({
        ...state,
        isSavingQuery: true,
      }));
    }
  };

  const handleChangeEditor = (name) => () =>
    setState({
      openEditor: name,
    });

  const cancelSaveQuery = () => {
    setState((state) => ({
      ...state,
      isSavingQuery: false,
    }));
  };

  const handleSavedFilterLabelChange = (event) => {
    const { value } = event.target;
    setState((state) => ({
      ...state,
      savedQueryLabel: value,
    }));
  };

  const handleClose = () => {
    toggleQueryUI(queryContext.key);
  };

  return (
    <div className="fixed bottom-0 right-0 h-screen max-w-sm bg-gray-200 border-l-4 px-2 shadow-lg">
      <div className="block w-full lg:inline-block lg:mt-0 p-4">
        <Button theme="primary" attributes={{ onClick: handleClose }}>
          Close
        </Button>
      </div>

      <div className="w-full">
        {state.openEditor === "column" ? (
          <div className="bg-white border my-1 rounded-md px-2 py-1">
            <ColumnSelectorInner />
          </div>
        ) : (
          <div
            className="bg-white border my-1 rounded-md px-2 py-1 cursor-pointer"
            onClick={handleChangeEditor("column")}
          >
            <Hx x="4">Columns</Hx>
          </div>
        )}

        {state.openEditor === "filter" ? (
          <div className="bg-white border my-1 rounded-md px-2 py-1">
            <FilterEditorInner />
          </div>
        ) : (
          <div
            className="bg-white border my-1 rounded-md px-2 py-1 cursor-pointer"
            onClick={handleChangeEditor("filter")}
          >
            <Hx x="4">Filters</Hx>
          </div>
        )}

        {/* {state.openEditor === "ordering" ? (
          <div className="bg-white border my-1 rounded-md px-2 py-1">
            <OrderEditorInner />
          </div>
        ) : (
          <div
            className="bg-white border my-1 rounded-md px-2 py-1 cursor-pointer"
            onClick={handleChangeEditor("ordering")}
          >
            <Hx x="4">Ordering</Hx>
          </div>
        )} */}
      </div>

      {state.isSavingQuery ? (
        <div className="field">
          <div className="control">
            <input
              className="input"
              onChange={handleSavedFilterLabelChange}
              value={state.savedQueryLabel}
              placeholder="Label for this Query"
            />
          </div>
        </div>
      ) : null}

      <div className="buttons">
        {state.isSavingQuery ? (
          <Fragment>
            <Button attributes={{ onClick: handleSaveQuery }}>
              Save Query
            </Button>
            <Button attributes={{ onClick: cancelSaveQuery }}>Cancel</Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button attributes={{ onClick: handleSaveQuery }}>
              Save Query
            </Button>
            <Button attributes={{ onClick: () => {} }}>Add to Funnel</Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};
