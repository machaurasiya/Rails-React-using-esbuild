import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const url = "http://127.0.0.1:5000/api";

  // Fetch all users
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

  // Create new user
  function handleCreateUser(e) {
    e.preventDefault();

    const newUser = { name, email, age };

    axios.post(`${url}/users`, newUser, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then((response) => {
        console.log("User created:", response.data);
        setUsers([...users, response.data]);
        setName("");
        setEmail("");
        setAge("");
      })
      .catch((error) => console.error("Error creating user:", error));
  }

  // Show specific user
  function handleShowUser(id) {
    axios.get(`${url}/users/${id}`, {
      headers: { "Accept": "application/json" }
    })
      .then((response) => {
        console.log("Fetched user:", response.data);
        setSelectedUser(response.data);
      })
      .catch((error) => console.error("Error fetching user:", error));
  }

  // Update selected user
  function handleUpdateUser(e) {
    e.preventDefault();

    axios.patch(`${url}/users/${selectedUser.id}`, {
      name: selectedUser.name,
      email: selectedUser.email,
      age: selectedUser.age
    }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then((response) => {
        console.log("User updated:", response.data);

        // Update users list
        setUsers(users.map(u => u.id === response.data.id ? response.data : u));

        // Update selected user
        setSelectedUser(response.data);
      })
      .catch((error) => console.error("Error updating user:", error));
  }

  return (
    <>
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} | {user.email} | {user.age} | {user.created_at}
              <button onClick={() => handleShowUser(user.id)}>Show User</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div>
          <h3>User Details</h3>
          <p><b>ID:</b> {selectedUser.id}</p>
          <p><b>Name:</b> {selectedUser.name}</p>
          <p><b>Email:</b> {selectedUser.email}</p>
          <p><b>Age:</b> {selectedUser.age}</p>

          <h3>Edit User</h3>
          <form onSubmit={handleUpdateUser}>
            <label>
              Name:
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </label>
            <br />
            <label>
              Age:
              <input
                type="number"
                value={selectedUser.age}
                onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })}
              />
            </label>
            <br />
            <button type="submit">Update User</button>
          </form>
        </div>
      )}

      <div>
        <h2>Add New User</h2>
        <form onSubmit={handleCreateUser}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Add User</button>
        </form>
      </div>
    </>
  );
}

export default Users;
