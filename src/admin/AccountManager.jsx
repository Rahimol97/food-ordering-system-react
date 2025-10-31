import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetch("https://user-api-6rny.onrender.com/users")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((u) => ({
          id: u.id,
          username: u.username,
          email: u.email,
          password: u.password,
        }));
        setUsers(formatted);
      })
      .catch((err) => console.error("Error fetching users:", err));

    const storedBlocked = JSON.parse(localStorage.getItem("blockedUsers")) || [];
    setBlockedUsers(storedBlocked);
  }, []);

  const toggleBlock = (username) => {
    let updatedBlocked = [...blockedUsers];
    if (blockedUsers.includes(username)) {
      updatedBlocked = updatedBlocked.filter((u) => u !== username);
      alert(`${username} has been unblocked.`);
    } else {
      updatedBlocked.push(username);
      alert(`${username} has been blocked.`);
    }
    setBlockedUsers(updatedBlocked);
    localStorage.setItem("blockedUsers", JSON.stringify(updatedBlocked));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10  shadow-lg rounded-2xl mt-12">
      <h2 className="text-3xl font-bold text-center  mb-6">
        User Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border  text-sm md:text-base rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700" >
            <tr>
              <th className="p-3 border text-left font-semibold">Username</th>
              <th className="p-3 border text-left font-semibold">Email</th>
              <th className="p-3 border text-left font-semibold">Password</th>
              <th className="p-3 border text-center font-semibold">Status</th>
              <th className="p-3 border text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const isBlocked = blockedUsers.includes(user.username);
              return (
                <tr
                  key={user.id}
                 
                >
                  <td className="p-3 border">{user.username}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.password}</td>
                  <td
                    className={`p-3 border text-center font-semibold ${
                      isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => toggleBlock(user.username)}
                      className={`px-4 py-1.5 rounded-lg font-medium text-white transition-all ${
                        isBlocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly info */}
      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
       API not reachable.
        </p>
      )}
    </div>
  );
};

export default UserList;
