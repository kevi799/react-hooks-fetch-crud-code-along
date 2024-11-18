import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    async function patchDataFetched() {
      await fetch(`http://localhost:4000/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          isInCart: !item.isInCart,
        }),
      })
        .then((resp) => resp.json())
        .then((updatedItem) => onUpdateItem(updatedItem));
    }
    window.location.reload();
    patchDataFetched();
  }

  function handleDeleteClick() {
    async function deleteDataFetched() {
      await fetch(`http://localhost:4000/items/${item.id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then(() => onDeleteItem(item));
    }
    window.location.reload();
    deleteDataFetched();
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
