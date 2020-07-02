import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getCacheKey } from "utils";
import { fetchData } from "services/browser/actions";
import { getSavedQuery } from "services/apps/getters";
import { toggleOrderBy, initiateFilter } from "services/querySpecification/actions";
import { toggleColumnHeadSpecification } from "services/global/actions";
import FilterItem from "components/QueryEditor/FilterItem";


const ColumnHeadSpecification = ({toggleOrderBy, head, fetchData}) => {
  const handleClick = event => {
    event.preventDefault();
    toggleOrderBy(head);
  }

  const handleSubmit = event => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="col-hd-spec-box">
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-white" onClick={handleClick}><i className="fas fa-sort" /></button>
        </div>
        <FilterItem columnName={head} />
        <div className="control">
          <button className="button is-success" onClick={handleSubmit}>Apply</button>
        </div>
      </div>
    </div>
  )
};


const TableHeadItem = ({
  isReady, head, ordering, activeColumnHeadSpecification, schemaColumns,
  toggleOrderBy, toggleColumnHeadSpecification, initiateFilter, fetchData
}) => {
  if (!isReady) {
    return null;
  }
  const handleClick = event => {
    event.preventDefault();
    toggleColumnHeadSpecification(head);
    const dataType = schemaColumns.find(x => x.name === head);
    initiateFilter(head, dataType);
  }

  if (ordering === "asc") {
    return (
      <th>
        <span className="hd-btn has-dropdown hdicn icn-asc" onClick={handleClick}>
          {head}
        </span>
        {activeColumnHeadSpecification === head ? <ColumnHeadSpecification toggleOrderBy={toggleOrderBy} head={head} fetchData={fetchData} /> : null}
      </th>
    );
  } else if (ordering === "desc") {
    return (
      <th>
        <span className="hd-btn has-dropdown hdicn icn-desc" onClick={handleClick}>
          {head}
        </span>
        {activeColumnHeadSpecification === head ? <ColumnHeadSpecification toggleOrderBy={toggleOrderBy} head={head} fetchData={fetchData} /> : null}
      </th>
    );
  } else {
    return (
      <th>
        <span className="hd-btn has-dropdown" onClick={handleClick}>{head}</span>
        {activeColumnHeadSpecification === head ? <ColumnHeadSpecification toggleOrderBy={toggleOrderBy} head={head} fetchData={fetchData} /> : null}
      </th>
    );
  }
}


const mapStateToProps = (state, props) => {
  // Our Grid can be called either for a particular data source/table or from a saved query
  let {sourceId, tableName, savedQueryId} = props.match.params;
  let cacheKey = null;
  if (!!savedQueryId) {
    const savedQuery = getSavedQuery(state, savedQueryId);
    if (!!savedQuery && Object.keys(savedQuery).includes("source_id")) {
      cacheKey = getCacheKey(null, savedQuery);
      sourceId = parseInt(savedQuery.source_id);
      tableName = savedQuery.table_name;
    } else {
      return {
        isReady: false,
      };
    }
  } else {
    cacheKey = getCacheKey(state);
    sourceId = parseInt(sourceId);
  }
  let isReady = false;

  if (state.schema.isReady && state.schema.sourceId === sourceId &&
    state.browser.isReady && state.browser.cacheKey === cacheKey &&
    state.querySpecification.isReady && state.querySpecification.cacheKey === cacheKey) {
    isReady = true;
  }

  if (isReady) {
    return {
      isReady,
      ordering: state.querySpecification.orderBy[props.head],
      activeColumnHeadSpecification: state.global.activeColumnHeadSpecification,
      schemaColumns: state.schema.rows.find(x => x.table_name === tableName).columns,
    };
  } else {
    return {
      isReady,
    };
  }
}


export default withRouter(connect(
  mapStateToProps,
  {
    toggleOrderBy,
    initiateFilter,
    toggleColumnHeadSpecification,
    fetchData,
  }
)(TableHeadItem));