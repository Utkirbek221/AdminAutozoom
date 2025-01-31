import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { TiEdit, TiTrash } from "react-icons/ti";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Table({ items = [], columns = [], img = [], imgs = [], onDelete, select = [], fetchData }) {
  const [editeModal, setEditeModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState({});
  const [newImg, setNewImg] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editeId, setEditeId] = useState(null);
  const token = localStorage.getItem("token");

  // Modalni ochish/yopish
  const toggleEditeModal = () => {
    setEditeModal(!editeModal);
    if (!editeModal) {
      setNewData({}); // Modal ochilganda yangi ma'lumotlarni tozalash
      setNewImg(null); // Rasmni tozalash
    }
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  // Tahrirlash uchun ma'lumotlarni yuklash
  useEffect(() => {
    if (editeId) {
      const selectedItem = items.find((item) => item.id === editeId);
      if (selectedItem) {
        setNewData(selectedItem); // Tanlangan element ma'lumotlarini modalga yuklash
      }
    }
  }, [editeId, items]);

  // Yangi ma'lumot qo'shish yoki tahrirlash
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    columns.forEach(({ key }) => formData.append(key, newData[key] || ""));
    select.forEach(({ key }) => formData.append(key, newData[key] || ""));
    if (newImg) formData.append("images", newImg);

    const url = editeId
      ? `https://realauto.limsa.uz/api/${onDelete}/${editeId}` // Tahrirlash uchun URL
      : `https://realauto.limsa.uz/api/${onDelete}`; // Yangi ma'lumot qo'shish uchun URL

    const method = editeId ? "PUT" : "POST"; // Tahrirlash yoki qo'shish uchun metod

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => response.json().then((data) => ({ status: response.status, data })))
      .then(({ status, data }) => {
        if (status >= 400) {
          throw new Error(data.message || "Something went wrong");
        }
        toast.success(editeId ? "Ma'lumot muvaffaqiyatli tahrirlandi!" : "Ma'lumot muvaffaqiyatli qo'shildi!");
        setNewData({});
        setNewImg(null);
        setEditeId(null); // Tahrirlash rejimini tugatish
        toggleEditeModal();
        fetchData(); // Ma'lumotlarni qayta yuklash
      })
      .catch((error) => {
        toast.error(error.message || "Xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Ma'lumotni o'chirish
  const handleDelete = (id) => {
    setLoading(true);
    fetch(`https://realauto.limsa.uz/api/${onDelete}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json().then((data) => ({ status: response.status, data })))
      .then(({ status, data }) => {
        if (status >= 400) {
          throw new Error(data.message || "Something went wrong");
        }
        toast.success("Ma'lumot muvaffaqiyatli o'chirildi!");
        fetchData(); // Ma'lumotlarni qayta yuklash
      })
      .catch((error) => {
        toast.error(error.message || "Ma'lumotni o'chirishda xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
        toggleDeleteModal();
      });
  };

  return (
    <div className="w-full">
      {/* Jadval ustidagi qo'shish tugmasi */}
      <div className="flex justify-end my-3">
        <button onClick={toggleEditeModal} className="px-4 py-2 bg-[#222] text-white rounded">
          Qo'shish
        </button>
      </div>

      {/* Jadval */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {(img.length || imgs.length) > 0 && <th className="border p-2">Rasmlar</th>}
            {columns.map(({ key, label }) => (
              <th key={key} className="border p-2">
                {label}
              </th>
            ))}
            {select.map(({ key, label }) => (
              <th key={key} className="border p-2">
                {label}
              </th>
            ))}
            <th className="border p-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, image_src, brand, ...rest }) => (
            <tr key={id} className="border">
              {(img.length || imgs.length) > 0 && (
                <td className="border p-2 text-center">
                  <div className="flex justify-center items-center w-full">
                    <img
                      src={`https://realauto.limsa.uz/api/uploads/images/${img.length ? image_src : brand?.image_src}`}
                      className="w-[150px] object-cover rounded-md"
                      alt="Rasm"
                    />
                  </div>
                </td>
              )}
              {columns.map(({ key }) => (
                <td key={key} className="border p-2 text-center">
                  {rest[key]}
                </td>
              ))}
              {select.map(({ key, options }) => (
                <td key={key} className="border p-2 text-center">
                  {options.find((option) => option.id === rest[key])?.title || rest[key]}
                </td>
              ))}
              <td className="border p-2 text-center">
                <button
                  onClick={() => {
                    setEditeId(id); // Tahrirlash uchun ID ni saqlash
                    toggleEditeModal(); // Modalni ochish
                  }}
                  className="mx-1 px-3 py-1 bg-[#222] text-white rounded"
                >
                  <TiEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedItemId(id);
                    toggleDeleteModal();
                  }}
                  className="mx-1 px-3 py-1 bg-red-600 text-white rounded"
                >
                  <TiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* O'chirish modali */}
      {deleteModal && (
        <div className="fixed inset-0 bg-[#00000037] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg relative border-2 border-gray-700">
            <button onClick={toggleDeleteModal} className="absolute -top-2 -right-2 text-xl bg-white border-2 border-gray-700 rounded-full">
              <IoClose />
            </button>
            <h1 className="text-xl font-bold mb-4">Ishonchingiz komilmi?</h1>
            <div className="flex gap-3">
              <button onClick={toggleDeleteModal} className="px-3 py-1 text-white rounded bg-gray-800">
                Bekor qilish
              </button>
              {loading ? (
                <div className="mt-[25px] mb-[10px] flex items-center justify-center">
                  <ThreeDot color="#000000" size="medium" text="" textColor="" />
                </div>
              ) : (
                <button onClick={() => handleDelete(selectedItemId)} className="px-3 py-1 text-white rounded bg-red-600">
                  O'chirish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tahrirlash/Qo'shish modali */}
      {editeModal && (
        <div className="fixed inset-0 bg-[#00000034] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg relative border-2 border-gray-700">
            <button onClick={toggleEditeModal} className="absolute -top-2 -right-2 text-xl bg-white border-2 border-gray-700 rounded-full">
              <IoClose />
            </button>
            <div>
              {/* Rasm yuklash */}
              {(img.length || imgs.length) > 0 && (
                <div>
                  <h1 className="font-bold text-lg">Rasmlar</h1>
                  <input
                    type="file"
                    className="hidden"
                    id="file"
                    onChange={(e) => setNewImg(e.target.files[0])}
                    accept="image/png, image/jpeg"
                  />
                  <label htmlFor="file" className="border-2 border-gray-700 rounded flex w-[150px] h-[80px] mt-2 overflow-hidden cursor-pointer">
                    {newImg ? (
                      <img src={URL.createObjectURL(newImg)} className="object-cover w-full h-full" alt="Yuklangan rasm" />
                    ) : (
                      <img
                        src={`https://realauto.limsa.uz/api/uploads/images/${newData.image_src || newData.brand?.image_src}`}
                        className="object-cover w-full h-full"
                        alt="Mavjud rasm"
                      />
                    )}
                  </label>
                </div>
              )}

              {/* Forma maydonlari */}
              {columns.map(({ key, label }) => (
                <div key={key} className="flex justify-between items-center mt-5 mb-2">
                  <h1 className="font-bold text-lg">{label}:</h1>
                  <input
                    value={newData[key] || ""}
                    onChange={(e) => setNewData((prev) => ({ ...prev, [key]: e.target.value }))}
                    required
                    type="text"
                    className="border-2 border-gray-700 px-2 py-1 rounded ml-2"
                  />
                </div>
              ))}

              {/* Select maydonlari */}
              {select.map(({ key, label, options }) => (
                <div key={key} className="flex justify-between items-center mt-5 mb-2">
                  <h1 className="font-bold text-lg">{label}:</h1>
                  <select
                    value={newData[key] || ""}
                    onChange={(e) => setNewData((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="border-2 border-gray-700 px-2 py-1 rounded ml-2"
                  >
                    <option value="">Tanlang</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Yuborish tugmasi */}
              {loading ? (
                <div className="mt-[25px] mb-[10px] flex items-center justify-center">
                  <ThreeDot color="#000000" size="medium" text="" textColor="" />
                </div>
              ) : (
                <button onClick={handleSubmit} className="bg-gray-800 text-white px-4 py-2 mt-3 rounded w-full">
                  {editeId ? "Tahrirlash" : "Qo'shish"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}