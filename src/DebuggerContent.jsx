import React, { useState, useEffect } from 'react';
import LogComponent from './components/LogComponent';

function DebuggerContent() {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [querySearchText, setQuerySearchText] = useState('');
    const [filters, setFilters] = useState({
      query: true,
      execution_time: true,
      function_caller: true
  });


    useEffect(() => {
      fetchDebugData();
    }, []);

    const fetchDebugData = async () => {
        try {
            const response = await fetch('http://carton-premium.local/wp-json/custom-api/v1/debug?type=queries');
            const data = await response.json();
            setLogs(data);
            setFilteredLogs(data);
        } catch (error) {
            console.log(`Error fetching debug data: ${error}`);
        }
    };

    const handleFilter = () => {
      const filtered = logs.map(log => {
          if (!log.queries) {
              return log;
          }
  
          const filteredQueries = log.queries.filter(query => 
              query.function_caller && query.function_caller.toLowerCase().includes(searchText.toLowerCase()) &&
              query.query && query.query.toLowerCase().includes(querySearchText.toLowerCase())
          ).map(query => {
              let filteredQuery = {};
              if (filters.query) filteredQuery.query = query.query;
              if (filters.execution_time) filteredQuery.execution_time = query.execution_time;
              if (filters.function_caller) filteredQuery.function_caller = query.function_caller;
              return filteredQuery;
          });
  
          return { ...log, queries: filteredQueries };
      });
  
      setFilteredLogs(filtered);
  };

  const handleCheckboxChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
};

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
        <input 
          type="text" 
          value={searchText} 
          onChange={e => setSearchText(e.target.value)} 
          placeholder="Search logs..."
        />
        <input 
          type="text" 
          value={querySearchText} 
          onChange={e => setQuerySearchText(e.target.value)} 
          placeholder="Search queries..."
        />
        <button onClick={handleFilter}>Filter</button>
        <div>
            <label>
                <input type="checkbox" name="query" checked={filters.query} onChange={handleCheckboxChange} />
                Query
            </label>
            <label>
                <input type="checkbox" name="execution_time" checked={filters.execution_time} onChange={handleCheckboxChange} />
                Execution Time
            </label>
            <label>
                <input type="checkbox" name="function_caller" checked={filters.function_caller} onChange={handleCheckboxChange} />
                Function Caller
            </label>
        </div>
        <div className="logbox">
            <LogComponent
              data={filteredLogs}
              filters={filters} // pass filters to LogComponent
            />
        </div>
    </div>
  );
};

export default DebuggerContent;