import React, { useEffect, useState } from "react";
import Table from "./Table";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Todolist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itemList, setItemList] = useState(
    JSON.parse(localStorage.getItem("item")) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // get localstorage function
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(itemList));
  }, [itemList]);

  ///////////////////////////////////////////////7

  /////////

  function handleBtn() {
    if (editId !== null) {
      // Editing an existing item
      const updatedItems = [...itemList];
      const itemToEdit = updatedItems.find((item) => item.id === editId);
      if (itemToEdit) {
        itemToEdit.title = title;
        itemToEdit.description = description;
      }
      setItemList(updatedItems);
      setEditId(null); // Reset editing state
    } else if (title === "" || description === "") {
      alert("please fill all field");
      return;
    } else {
      // Adding a new item
      const newItem = {
        id: new Date().getTime(),
        title: title,
        description: description
      };
      setItemList([...itemList, newItem]);
    }

    // Clear input fields after adding/updating
    setTitle("");
    setDescription("");
  }

  ////////////////////////////////////////////
  // Handle delete item
  function handleDelete(index) {
    const confirmed = confirm("are u sure to Delete");
    if (confirmed) {
      const updatedItems = itemList.filter((_, i) => i !== index);
      setItemList(updatedItems);
    }
  }

  // Handle edit item
  function handleEdit(id) {
    const itemToEdit = itemList.find((item) => item.id === id);
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setEditId(id);
      setIsEditing(true);
    }
  }
  ////////////////////////////////////
  return (
    <div>
      <h1>TODO LIST</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button onClick={handleBtn}>
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </div>
      <div className="t-body-container">
        <Table />

        {itemList.map((item, index) => (
          <div className="tbody" key={index}>
            <div className="td">{index + 1}</div>
            <div className="td">{item.title}</div>
            <div className="td">{item.description}</div>

            <div className="td btn-container">
              <button onClick={() => handleEdit(item.id)}>
                <MdEditSquare className="edit-icon" title="Edit" />
              </button>
              <button onClick={() => handleDelete(index)}>
                <RiDeleteBin6Fill className="delete-icon" title="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
