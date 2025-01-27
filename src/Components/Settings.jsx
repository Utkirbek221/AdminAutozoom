import { Commet } from "react-loading-indicators";
import Table from "./Table";
import { useFetch } from "../Pages/useFetch";

export default function Settings() {
    const token = localStorage.getItem("token");
    const { data: settings, loading, error } = useFetch(
        "https://realauto.limsa.uz/api/categories",
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
                items={settings}
                columns={[
                    { key: "name_ru", label: "Name" },
                    { key: "name_uz", label: "Name" },
                    { key: "images", label: "Img" },
                ]}
            />
        </div>
    );
}


