import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/users", {
        headers: {
            "Accept": "application/json"
        }
        })
      .then((response) => response.json())   // 👈 convert to JSON
      .then((data) => {
        console.log("Fetched data:", data);  // Debug
        setUsers(data);                      // 👈 set actual array
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
        <ul>
            {users.map((user) => (
            <li key={user.id}>{user.name} | {user.email}  |  {user.age}</li>
            ))}     
        </ul>
    </div>
  );
}

export default Users;
