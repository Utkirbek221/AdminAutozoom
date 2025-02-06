import { Commet } from "react-loading-indicators";
import Table from "./Table";
import { useFetch } from "../Pages/useFetch";

export default function Cars() {
  const token = localStorage.getItem("token");
  const { data: cars, loading, error, fetchData } = useFetch(
    "https://realauto.limsa.uz/api/cars",
    token
  );
  // brand
  const { data: brands } = useFetch(
    "https://realauto.limsa.uz/api/brands",
    token
  );
  // model
  const { data: models } = useFetch(
    "https://realauto.limsa.uz/api/models",
    token
  );
  // city
  const { data: cities } = useFetch(
    "https://realauto.limsa.uz/api/cities",
    token
  );
  // category
  const { data: categories } = useFetch(
    "https://realauto.limsa.uz/api/categories",
    token
  );
  //location
  const { data: locations } = useFetch(
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
    <div className="p-3">
      <Table
        onDelete="cars"
        items={cars}
        img={[
          { key: "images", label: "Image" },
        ]}
        img2={[
          { key: "images", label: "Image" },
        ]}
        cover={[
          { key: "cover", label: "Cover" },
        ]}
        box={[
          { key: "inclusive", label: "Inclusive" },
        ]}
        select={[
          { key: "brand_id", label: "Brand", options: brands },
          { key: "model_id", label: "Model", options: models },
          { key: "city_id", label: "City", options: cities },
          { key: "category_id", label: "Category", options: categories },
          { key: "location_id", label: "Location", options: locations },
        ]}
        columns={[
          { key: "color", label: "Colour" },
          { key: "year", label: "Year" },
          { key: "seconds", label: "Seconds" },
          { key: "max_speed", label: "MaxSpeed" },
          { key: "max_people", label: "MaxPeople" },
          { key: "transmission", label: "Transmission" },
          { key: "motor", label: "Motor" },
          { key: "drive_side", label: "DriveSide" },
          { key: "petrol", label: "Petrol" },
          { key: "limitperday", label: "Limitperday" },
          { key: "deposit", label: "Deposit" },
          { key: "premium_protection", label: "PremProtec" },
          { key: "price_in_aed", label: "PriceInAed" },
          { key: "price_in_usd", label: "PriceInUsd" },
          { key: "price_in_aed_sale", label: "PriceInAedSale" },
          { key: "price_in_usd_sale", label: "PriceInUsdSale" },
        ]}
        fetchData={fetchData} 
      />
    </div>
  );
}
