import { TiEdit, TiTrash } from "react-icons/ti";


export default function Table({ items, columns }) {
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
                            <button className="cursor-pointer px-3 py-1 bg-[#222222] rounded-[5px] text-[#fff]">Add category</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.key}>{item[column.key]}</td>
                            ))}
                            <td className=" ">
                                <div className="flex gap-2 text-2xl font-bold justify-center items-center ">
                                    <div className="cursor-pointer px-3 py-1 bg-[#222222] rounded-[5px] text-[#fff]" data-tip="Edit">
                                        <TiEdit />
                                    </div>
                                    <div className="cursor-pointer px-3 py-1 bg-[red] rounded-[5px] text-[#fff]" data-tip="Delete">
                                        <TiTrash />
                                    </div>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

