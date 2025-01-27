import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function Login(e) {
        e.preventDefault();
        fetch("https://realauto.limsa.uz/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone_number: phone,
                password: password,
            })
        }).then((response) => response.json())
            .then((data) => {
                // console.log(data?.data?.tokens?.accessToken?.token);
                if (data?.success) {
                    toast.success(data?.message);
                    localStorage.setItem("token", data?.data?.tokens?.accessToken?.token);
                    navigate("/home");
                } else {
                    toast.error(data?.message);
                }
            })
    }
    return (
        <div className="w-full m-auto h-[100vh] flex justify-center items-center bg-[#222222]">
            <div className="w-[350px] h-[350px] bg-[#ccd8fd] rounded-[20px]  duration-500 flex justify-center items-center flex-col gap-4 ">
                <input onInput={(e) => setPhone(e.target.value)} className="bg-[#fff] w-[75%] h-[50px]  placeholder:text-[#ccd8fd] rounded-[10px] p-4" placeholder="Phone Number" type="number" />
                <input onInput={(e) => setPassword(e.target.value)} className="bg-[#fff] w-[75%] h-[50px]  placeholder:text-[#ccd8fd] rounded-[10px] p-4" placeholder="Password" type="password" />
                <button onClick={Login} className=" w-[75%] h-[50px] rounded-[10px] p-4 bg-[#222222] text-[#ffffff] mt-[35px]">Login</button>
            </div>
            <ToastContainer />
        </div>
    )
}
