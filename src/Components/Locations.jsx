import { Commet } from "react-loading-indicators";
import Table from "./Table";
import { useFetch } from "../Pages/useFetch";

export default function Locations() {
  const token = localStorage.getItem("token");
  const { data: locations, loading, error } = useFetch(
    "https://realauto.limsa.uz/api/locations",
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
        items={locations}
        columns={[
          { key: "name", label: "Brand" },
          { key: "images", label: "Description" },
          { key: "text", label: "Description" },
        ]}
      />
    </div>
  );
}


