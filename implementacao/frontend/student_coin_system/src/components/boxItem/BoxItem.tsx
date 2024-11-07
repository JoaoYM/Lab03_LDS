// src/components/BoxItem.js
import React from "react";

const BoxItem = ({ title, description, actionText, onAction }) => (
  <div className="p-4 border rounded shadow-sm bg-white">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-gray-700 mb-2">{description}</p>
    <button
      onClick={onAction}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {actionText}
    </button>
  </div>
);

export default BoxItem;