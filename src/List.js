import React from "react";
// ICONS
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const List = ({ id, name, handleDelete, editItem }) => {
  return (
    <div className="item">
      <h4>{name}</h4>
      <div className="btn-container">
        <FaEdit className="icons" onClick={() => editItem(id)} />
        <AiFillDelete
          className="icons"
          onClick={() => handleDelete(id)}
          style={{ color: "red" }}
        />
      </div>
    </div>
  );
};

export default List;
