import { Commet } from "react-loading-indicators";
import Table from "./Table";
import { useFetch } from "../Pages/useFetch";

export default function Cities() {
  const token = localStorage.getItem("token");
  const { data: cities, loading, error, fetchData } = useFetch(
    "https://realauto.limsa.uz/api/cities",
    token
  );

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Commet color="#000000" size="medium" />
    </div>;
  }

  if (error) {
    return <div>Xatolik yuz berdi: {error}</div>;
  }

  return (
    <div className="p-3 ">
      <Table
        onDelete="cities"
        items={cities}
        img={[{ key: "images", label: "Images" }]}
        columns={[
          { key: "name", label: "Name" },
          { key: "text", label: "Ta'rif" },
        ]}
        
        fetchData={fetchData}
      />
    </div>
  );
}

