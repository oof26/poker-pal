import React, { useMemo, useState, useEffect } from "react"
import axios from 'axios'

import './Tournaments.css'

import Table from './Table'

export function  LargeMLLeaderboard(){
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/leagues/1/users");
      setData(result.data.value);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Main League",
        columns: [
          {
            Header: "User Name",
            accessor: "userName"
          },
          {
            Header: "Points",
            accessor: "totalScore"
          }
        ]
      }
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default LargeMLLeaderboard