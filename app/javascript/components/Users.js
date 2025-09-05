// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const[name, setName] = useState("");
//   const[email, setEmail] = useState("");
//   const[age, setAge] = useState("");

//   const url ="http://127.0.0.1:5000/api";

//   useEffect(() => {
//     // fetch users data from the backend API
//     // fetch(`${url}/users`, {
//     //     headers: {
//     //         "Accept": "application/json"
//     //     }
//     //     })
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     console.log("Fetched data:", data);
//     //     setUsers(data);
//     //   })
//     //   .catch((error) => console.error("Error fetching data:", error));


//     // using axios to fetch data form backend api
//     axios.get(`${url}/users`, {
//       headers: {
//         "Accept": "application/json",   // tell server Hey, please send me back data in JSON format.
//         // "Content-Type": "application/json" //the server what kind of data you are sending in the request body.
//       }
//     })
//     .then((response) => {
//           console.log("Fetched data:", response.data);
//           setUsers(response.data);
//         }
//         )
//         .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Function to fetch and show a single user by ID
//   const showUser = (id) => {
//     axios.get(`${url}/users/${id}`, {
//       headers: {
//         "Accept": "application/json",   // tell server Hey, please send me back data in JSON format.
//       }
//     })
//     .then((response) => {
//           console.log("Fetched data:", response.data);
//           setSelectedUser(response.data);
//         })
//         .catch((error) => console.error("Error fetching data:", error));
//   }

// //create new user function
//   function handleCreateUser(e) {
//     e.preventDefault();

//     const newUser = {
//       name: name,
//       email: email,
//       age: age
//     };
//     console.log(newUser);

//     axios.post(`${url}/users`, newUser, {
//       headers: {
//         "Accept": "application/json",   // tell server Hey, please send me back data in JSON format.
//         "Content-Type": "application/json" //the server what kind of data you are sending in the request body.
//       }
//     })
//     .then((response) => {
//           console.log("User created:", response.data);
//           // Optionally, you can update the users list to include the newly created user
//           setUsers([...users, response.data]);
//           // Clear the form fields
//           setName("");
//           setEmail("");
//           setAge("");
//         })
//         .catch((error) => console.error("Error creating user:", error));
//   }

// //update user function
//   function handleUpdateUser(e) {
//     e.preventDefault();
//     if (!selectedUser) return;
//     const updatedUser = {
//       name: name || selectedUser.name,
//       email: email || selectedUser.email,
//       age: age || selectedUser.age
//     };
//     console.log(updatedUser);
//     axios.put(`${url}/users/${selectedUser.id}`, updatedUser, {
//       headers: {
//         "Accept": "application/json",   // tell server Hey, please send me back data in JSON format.
//         "Content-Type": "application/json" //the server what kind of data you are sending in the request body.
//       }
//     })
//     .then((response) => {
//           console.log("User updated:", response.data);
//           // Update the users list to reflect the updated user details
//           setUsers(users.map(user => user.id === selectedUser.id ? response.data : user));
//           // Update the selected user details
//           setSelectedUser(response.data);
//           // Clear the form fields
//           setName("");
//           setEmail("");
//           setAge("");
//         })
//         .catch((error) => console.error("Error updating user:", error));
//   }

// //delete user function
//   function handleDeleteUser(id) {
//     axios.delete(`${url}/users/${id}`, {
//       headers: {
//         "Accept": "application/json",   // tell server Hey, please send me back data in JSON format.
//         "Content-Type": "application/json" //the server what kind of data you are sending in the request body.
//       }
//     })
//     .then((response) => {
//           console.log("User deleted:", response.data);
//           // Update the users list to remove the deleted user
//           setUsers(users.filter(user => user.id !== id));
//           // Clear selected user if it was deleted
//           if (selectedUser && selectedUser.id === id) {
//             setSelectedUser(null);
//           }
//         })
//         .catch((error) => console.error("Error deleting user:", error));
//   }

  

//   return (
//     <>
//       <div>
//         <h2>Users List</h2>
//           <ul>
//               {users.map((user) => (
//               <li key={user.id}>{user.name} | {user.email}  |  {user.age}   | {user.created_at}
//               <button onClick={() =>showUser(user.id)}>Show User</button>
//               <button onClick={() =>handleDeleteUser(user.id)}>Delete User</button>

//               </li>
//               ))}     
//           </ul>
//       </div>

//       <div>
//         {selectedUser && (
//           <>
//             <div>
//               <h2>Custom User Details</h2>
//               <p>ID: {selectedUser.id}</p>
//               <p>Name: {selectedUser.name}</p>
//               <p>Email: {selectedUser.email}</p>
//               <p>Age: {selectedUser.age}</p>
//             </div>

//             <div> 
//               <h2>Edit User</h2>
//               <form onSubmit={handleUpdateUser}>
//                 <label>
//                   Name:
//                   <input type="text" name="name" defaultValue={selectedUser.name} onChange={(e) => setName(e.target.value)}/>
//                 </label>
//                 <br />
//                 <label>
//                   Email:
//                   <input type="email" name="email" defaultValue={selectedUser.email} onChange={(e) => setEmail(e.target.value)}/>
//                 </label>
//                 <br />
//                 <label>
//                   Age:
//                   <input type="number" name="age" defaultValue={selectedUser.age} onChange={(e) => setAge(e.target.value)}/>
//                 </label>
//                 <br />
//                 <button type="submit">Update User</button>
//               </form>
//             </div>
//           </>
//         )}
//       </div>

//       <div>
//         <h2>Create New User</h2>
//         <form onSubmit={handleCreateUser}>
//           <label>
//             Name:
//             <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </label>
//           <br />
//           <label>
//             Email:
//             <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
//           </label>
//           <br />
//           <label>
//             Age:
//             <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)}/>
//           </label>
//           <br />
//           <button type="submit">Create User</button>
//         </form>
//       </div>

//     </>
//   );
// }

// export default Users;


import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Users.css"; // <-- import CSS

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const url = "http://127.0.0.1:5000/api";

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        console.log("Fetched data:", response.data);
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const showUser = (id) => {
    axios
      .get(`${url}/users/${id}`, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        console.log("Fetched data:", response.data);
        setSelectedUser(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  function handleCreateUser(e) {
    e.preventDefault();
    const newUser = { name, email, age };
    axios
      .post(`${url}/users`, newUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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

  function handleUpdateUser(e) {
    e.preventDefault();
    if (!selectedUser) return;

    const updatedUser = {
      name: name || selectedUser.name,
      email: email || selectedUser.email,
      age: age || selectedUser.age,
    };

    axios
      .put(`${url}/users/${selectedUser.id}`, updatedUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("User updated:", response.data);
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? response.data : user
          )
        );
        setSelectedUser(response.data);
        setName("");
        setEmail("");
        setAge("");
      })
      .catch((error) => console.error("Error updating user:", error));
  }

  function handleDeleteUser(id) {
    axios
      .delete(`${url}/users/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("User deleted:", response.data);
        setUsers(users.filter((user) => user.id !== id));
        if (selectedUser && selectedUser.id === id) {
          setSelectedUser(null);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  return (
    <div className="users-container">
      <div className="users-list card">
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <span>
                {user.name} | {user.email} | {user.age} | {user.created_at}
              </span>
              <div className="user-actions">
                <button onClick={() => showUser(user.id)}>Show</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="selected-user card">
          <div>
            <h2>Custom User Details</h2>
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Age:</strong> {selectedUser.age}
            </p>
          </div>

          <div>
            <h2>Edit User</h2>
            <form onSubmit={handleUpdateUser} className="form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedUser.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedUser.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  defaultValue={selectedUser.age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <button type="submit" className="update-btn">
                Update User
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="create-user card">
        <h2>Create New User</h2>
        <form onSubmit={handleCreateUser} className="form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <button type="submit" className="create-btn">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Users;
