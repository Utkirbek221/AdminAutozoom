import { Commet } from "react-loading-indicators";
import Table from "./Table";
import { useFetch } from "../Pages/useFetch";

export default function Cars() {
  const token = localStorage.getItem("token");
  const { data: cars, loading, error } = useFetch(
    "https://realauto.limsa.uz/api/cars",
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

  const formattedCars = cars.map(car => ({
    ...car,
    city_name: car.city?.name,
    city_image: car.city?.image_src,
    barnd_title: car.brand?.title,
  }));
  return (
    <div className="p-3">
      <Table
        onDelete="cars"
        items={formattedCars}
        imgs={[{ key: "city_image", label: "Image" }]}
        columns={[
          { key: "city_name", label: "Brand" },
          { key: "barnd_title", label: "Model" },
        ]}
      />
    </div>
  );
}
