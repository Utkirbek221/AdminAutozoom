import { Commet } from "react-loading-indicators";
import Table from "./Table";
import { useFetch } from "../Pages/useFetch";

export default function Brands() {
  const token = localStorage.getItem("token");
  const { data: brands, loading, error, fetchData } = useFetch(
    "https://realauto.limsa.uz/api/brands",
    token
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Commet color="#000000" size="medium" />
      </div>
    );
  }

  if (error) {
    return <div>Xatolik yuz berdi: {error}</div>;
  }

  return (
    <div className="p-3">
      <Table
        onDelete="brands"
        items={brands}
        columns={[{ key: "title", label: "Brand" }]}
        img={[{ key: "images", label: "Images" }]}
        fetchData={fetchData}
      />
    </div>
  );
}
