import React from 'react';

const LogComponent = ({ data, filters}) => {
  const style = { fontFamily: 'Consolas, "Courier New", monospace', color: "#93d993", textAlign:'left'};

  const renderLogs = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data available</p>;
    }

    return data.map((item, index) => (
      <div key={index}>
        <p>Request Time: {item.request_time}</p>
        {item.queries.map((query, i) => (
          <div key={i}>
            {filters.query && query.query && <p>Query: {query.query}</p>}
            {filters.execution_time && query.execution_time && <p>Execution Time: {query.execution_time}</p>}
            {filters.function_caller && query.function_caller && <p>Function Caller: {query.function_caller}</p>}
          </div>
        ))}
      </div>
    ));
  };  

  return (
    <div style={style}>
      {renderLogs()}
    </div>
  );
};

export default LogComponent;