import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchData } from "services/browser/actions";
import { fetchSchema } from "services/schema/actions";
import { toggleOrderBy } from "services/queryEditor/actions";
import { Section } from "components/BulmaHelpers";
import rowRenderer from "./rowRenderer";
import headRenderer from "./headRenderer";


class Browser extends PureComponent {
  state = {
    fetching: true,
    queriedColumns: [],
    tableColumns: [],
    tableData: [],
    count: 0,
    query: undefined,
    optionsOpen: false,
  }

	componentDidMount() {
    const {match: {params: {sourceId, tableName}}} = this.props;
    this.props.fetchSchema(sourceId);
    this.props.fetchData(sourceId, tableName);
  }

  componentDidUpdate(prevProps) {
    const {match: {params: {sourceId, tableName}}} = this.props;
    const {match: {params: {sourceId: prevSourceId, tableName: prevTableName}}} = prevProps;
    if (sourceId && tableName && prevSourceId && prevTableName &&
      (sourceId != prevSourceId || tableName != prevTableName)) {
        console.log(sourceId, tableName, prevSourceId, prevTableName);
        // Call the fetch actions when URL has changed but this Component was already loaded
        this.props.fetchSchema(sourceId);
        this.props.fetchData(sourceId, tableName);
    }
  }

	render() {
    const { tableData, schema } = this.props;
    if (!tableData.isReady || !schema.isReady || tableData.columns.length !== schema.columns.length) {
      return (
        <div>Loading...</div>
      );
    }

    const rowRendererList = rowRenderer(schema, tableData.columns);
    const headRendererList = headRenderer(schema, tableData.columns);

    return (
      <Section>
        <table className="table is-narrow is-fullwidth is-hoverable is-data-table">
          <thead>
            <tr>
              { tableData.columns.map((cell, j) => {
                const Cell = headRendererList[j];
                return Cell !== null ? <Cell key={`th-${j}`} data={cell} /> : null;
              }) }
              {/* { tableData.columns.map(head => <HeadItem toggleOrderBy={toggleOrderBy} key={`th-${head}`} head={head} />) } */}
            </tr>
          </thead>

          <tbody>
            { tableData.isReady ? tableData.rows.map((row, i) => (
              <tr key={`tr-${i}`}>
                { row.map((cell, j) => {
                  const Cell = rowRendererList[j];
                  return Cell !== null ? <Cell key={`td-${i}-${j}`} data={cell} /> : null;
                }) }
              </tr>
            )) : null }
          </tbody>
        </table>
      </Section>
    );
	}
}


const mapStateToProps = (state, props) => {
  let { sourceId, tableName } = props.match.params;
  sourceId = parseInt(sourceId);
  const _browserCacheKey = `${sourceId}/${tableName}`;

  return {
    sourceId,
    tableName,
    schema: state.schema.isReady && state.schema.sourceId === parseInt(sourceId) ? {
      ...state.schema.rows.find(x => x.table_name === tableName),
      isReady: true,
    } : {
      isReady: false,
    },
    tableData: state.browser.isReady && state.browser._cacheKey === _browserCacheKey ? state.browser : {
      isReady: false,
    },
    orderBy: state.queryEditor.orderBy,
  }
}


export default withRouter(connect(
  mapStateToProps,
  {
    toggleOrderBy,
    fetchData,
    fetchSchema,
  }
)(Browser));