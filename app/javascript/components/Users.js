import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  const url ="http://127.0.0.1:5000/api";

  useEffect(() => {
    fetch(`${url}/users`, {
        headers: {
            "Accept": "application/json"
        }
        })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
        <ul>
            {users.map((user) => (
            <li key={user.id}>{user.name} | {user.email}  |  {user.age}   | {user.created_at}</li>
            ))}     
        </ul>
    </div>
  );
}

export default Users;
