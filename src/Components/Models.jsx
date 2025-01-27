import { Commet } from "react-loading-indicators";
import Table from "./Table";
import { useFetch } from "../Pages/useFetch";

export default function Models() {
  const token = localStorage.getItem("token");
  const { data: models, loading, error } = useFetch(
    "https://realauto.limsa.uz/api/models",
    token
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Commet color="#000000" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return <div>Xatolik yuz berdi: {error}</div>;
  }

  return (
    <div className="p-3">
      <Table
        items={models}
        columns={[
          { key: "brand_id", label: "ID" },
          { key: "name", label: "Model" },
        ]}
      />
    </div>
  );
}
