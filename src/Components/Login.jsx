import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    function Login(e) {
        e.preventDefault();
        setLoading(true)
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
                    setLoading(false)
                    navigate("/home");
                } else {
                    setLoading(false)
                    toast.error("Not found");

                }
            })
    }
    return (
        <div className="w-full m-auto h-[100vh] flex justify-center items-center bg-[#222222]">
            <div className="w-[350px] h-[350px] bg-[#ccc5b9] rounded-[20px]  duration-500 flex justify-center items-center flex-col gap-4 ">
                <input onInput={(e) => setPhone(e.target.value)} className="bg-[#fff] w-[75%] h-[50px]  placeholder:text-[#ccc5b9] rounded-[10px] p-4" placeholder="Phone Number" type="number" />
                <input onInput={(e) => setPassword(e.target.value)} className="bg-[#fff] w-[75%] h-[50px]  placeholder:text-[#ccc5b9] rounded-[10px] p-4" placeholder="Password" type="password" />
                {loading
                    ? <div className="mt-[10px]">
                        <ThreeDot variant="bounce" color="#000000" size="large" />
                    </div>
                    : <button onClick={Login} className=" w-[75%] h-[50px] rounded-[10px] p-4 bg-[#222222] text-[#ffffff] mt-[35px]">Login</button>
                }

            </div>
            <ToastContainer />
        </div>
    )
}
