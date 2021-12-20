import { useState, useReducer, useRef, useEffect } from "react";
// COMPONENTS
import ListComponent from "./List";
import Modal from "./Modal";

// Reducer function
import { reducer } from "./Reducer";
const local = window.localStorage.getItem("items");
function App() {
  const defaultState = {
    items: JSON.parse(local),
    showModal: false,
    modalContent: "",
    class: "",
    isEditing: false,
    objId: "",
  };

  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const inputEl = useRef(null);

  // FUNCTIONS
  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      dispatch({ type: "NO_VALUE" });
    } else if (name && state.isEditing) {
      dispatch({ type: "UPDATE_VALUE", payload: name });
      setName("");
    } else if (name) {
      let newPerson = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_ITEM", payload: newPerson });
      setName("");
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const deleteItem = id => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const editItem = id => {
    const selectedItem = state.items.find(element => id === element.id);
    setName(selectedItem.name);
    const itemId = selectedItem.id;
    dispatch({ type: "EDIT_ITEM", payload: itemId });
    console.log(inputEl);
    inputEl.current.focus();
  };

  // localstorage
  useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(state.items));
  }, [state]);

  return (
    <div className="container">
      {state.showModal && (
        <Modal
          modalContent={state.modalContent}
          cls={state.class}
          closeModal={closeModal}
          state={state}
        />
      )}
      <form className="form-container" onSubmit={handleSubmit}>
        <h3>Grocery Bud🛒</h3>
        <div className="form-elements">
          <input
            type="text"
            value={name}
            ref={inputEl}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit" className="formBtn">
            {state.isEditing ? "Update" : "Add"}
          </button>
        </div>
      </form>
      {state.items.length > 0 && (
        <div className="list-container">
          {state.items.map(i => {
            return (
              <ListComponent
                key={i.id}
                {...i}
                handleDelete={deleteItem}
                editItem={editItem}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
