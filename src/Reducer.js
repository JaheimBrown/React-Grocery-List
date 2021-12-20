export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newItem = [...state.items, action.payload];
    return {
      ...state,
      items: newItem,
      showModal: true,
      modalContent: "Added new item ✅",
      class: "success",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      showModal: false,
    };
  }
  if (action.type === "NO_VALUE") {
    return {
      ...state,
      showModal: true,
      class: "error",
      modalContent: "Please Enter Value",
    };
  }
  if (action.type === "DELETE_ITEM") {
    const newItems = state.items.filter(i => i.id !== action.payload);
    return {
      ...state,
      items: newItems,
      showModal: true,
      modalContent: "Item Deleted",
      class: "error",
    };
  }
  if (action.type === "EDIT_ITEM") {
    return {
      ...state,
      isEditing: true,
      class: "edit",
      showModal: true,
      modalContent: "Edit Mode",
      objId: action.payload,
    };
  }
  if (action.type === "UPDATE_VALUE") {
    state.items.map(item => {
      if (item.id === state.objId) {
        item.name = action.payload;
      }
    });
    return {
      ...state,
      isEditing: false,
      showModal: true,
      modalContent: "success, item updated ✅",
      class: "success",
    };
  }
  throw new Error("no action matching dispatch type");
};
