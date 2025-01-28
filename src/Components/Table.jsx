import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { TiEdit, TiTrash } from "react-icons/ti";

export default function Table({ items, columns }) {
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // "edit" or "delete"

    const openModal = (type, id) => {
        setModalType(type);
        if (type === "edit") setEditingId(id);
        if (type === "delete") setDeletingId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType("");
        setEditingId(null);
        setDeletingId(null);
    };

    const handleSave = () => {
        if (modalType === "edit") {
            console.log(`Saving edits for ID: ${editingId}`);
        } else if (modalType === "delete") {
            console.log(`Deleting item with ID: ${deletingId}`);
        } else if (modalType === "add") {
            console.log(`Adding new item`);
        }
        closeModal();
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                        <th>Actions</th>
                        <th>
                            <button
                                onClick={() => openModal("add", null)}
                                className="cursor-pointer px-3 py-1 bg-[#222222] rounded-[5px] text-[#fff]"
                            >
                                Add category
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.key}>{item[column.key]}</td>
                            ))}
                            <td>
                                <div className="flex gap-2 text-2xl font-bold justify-center items-center">
                                    <button
                                        onClick={() => openModal("edit", item.id)}
                                        className="cursor-pointer px-3 py-1 bg-[#222222] rounded-[5px] text-[#fff]"
                                        data-tip="Edit"
                                    >
                                        <TiEdit />
                                    </button>
                                    <button
                                        onClick={() => openModal("delete", item.id)}
                                        className="cursor-pointer px-3 py-1 bg-[red] rounded-[5px] text-[#fff]"
                                        data-tip="Delete"
                                    >
                                        <TiTrash />
                                    </button>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#22222251] z-50 flex justify-center items-center duration-500 rounded-[8px]">
                    <div className="border-2 border-[#222222] bg-[#fff] w-auto h-auto rounded-[6px] p-5 flex flex-col gap-1 relative">
                        <button
                            onClick={closeModal}
                            className="cursor-pointer absolute -top-2 -right-2 text-xl bg-[#fff] border-[2px] border-[#222222] rounded-[50%]"
                        >
                            <IoClose />
                        </button>
                        <h1 className="text-xl font-[700] mb-10 mt-4">
                            {modalType === "edit" && "Edit Item"}
                            {modalType === "delete" && "Are you sure you want to delete?"}
                            {modalType === "add" && "Add New Item"}
                        </h1>
                        <div className="gap-3 flex">
                            <button
                                onClick={closeModal}
                                className="cursor-pointer bg-[#222222] text-[#fff] hover:text-[red] hover:bg-[#fbd0d0] px-3 py-1 rounded-[8px]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="cursor-pointer bg-[#222222] text-[#fff] hover:text-[green] hover:bg-[#c3fcc3] px-3 py-1 rounded-[8px]"
                            >
                                {modalType === "edit" && "Save"}
                                {modalType === "delete" && "Delete"}
                                {modalType === "add" && "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
