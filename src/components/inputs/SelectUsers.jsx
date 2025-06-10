import React, { useState } from "react";
import { useEffect } from "react";
import { LuUsers } from "react-icons/lu";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../Modal";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Error while fetching all users", error.message);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prevUsers) =>
      prevUsers.includes(userId)
        ? prevUsers.filter((id) => id !== userId)
        : [...prevUsers, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length) setTempSelectedUsers(selectedUsers);

    return () => {};
  }, [selectedUsers]);
  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModalOpen(true)}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto"></div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
