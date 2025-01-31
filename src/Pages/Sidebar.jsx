import { Link, NavLink } from "react-router";
import logo from "/IMG/logo.png";
import { FaHome } from "react-icons/fa";
import { TbBrandSketch, TbBrandSlack } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { GiModernCity } from "react-icons/gi";
import { IoCarSportOutline, IoSettingsOutline } from "react-icons/io5";

export default function Sidebar({ isMenuOpen }) {
    const linkClasses = ({ isActive }) =>
        isActive
            ? "duration-300 flex justify-start items-center gap-4 bg-[#222222] text-[#fff] mt-3 p-3 rounded-[8px] font-[800] text-xl duration-200"
            : "duration-300 flex justify-start items-center gap-4 bg-[#fff] text-[#000] mt-3 p-3 rounded-[8px] font-[800] text-xl hover:bg-[#222222] hover:text-[#fff] duration-200";
    const linkClasses2 = ({ isActive }) =>
        isActive
            ? "duration-300 flex justify-center items-center bg-[#222222] text-[#fff] mt-3 p-3 rounded-[8px] font-[800] text-2xl duration-200"
            : "duration-300 flex justify-center items-center bg-[#fff] text-[#000] mt-3 p-3 rounded-[8px] font-[800] text-3xl hover:bg-[#222222] hover:text-[#fff] duration-200";
    return (
        <div className="bg-[#ccc5b9] min-h-full rounded-[8px] w-full flex flex-col">
            <div className="p-3">
                <Link to={"/home"} className={isMenuOpen ? "duration-300  flex items-center justify-center gap-5 bg-[#fff] text-[#fff] p-2 rounded-[8px] mb-15 h-[80px]" : "duration-300  flex items-center justify-start gap-5 bg-[#fff] text-[] p-2 rounded-[8px] mb-15 h-[80px]"}>
                    <div className="w-[45px] h-[50px] overflow-hidden flex items-center justify-center bg-[#fff] rounded-[8px]">
                        <img src={logo} alt="" className="min-w-[110px] min-h-[80px] object-cover " />
                    </div>
                    <h1 className={isMenuOpen ? "hidden" : "font-[900] text-xl mr-4"}>AdminAutozoom</h1>
                </Link>
                <div>
                    {/* <NavLink className={isMenuOpen ? linkClasses2 : linkClasses} to={"/home/dashboard"}>
                        <FaHome className="text-2xl" />
                        <h1 className={isMenuOpen ? "hidden" : ""}>Dashboard</h1>
                    </NavLink> */}
                    <NavLink className={isMenuOpen ? linkClasses2 : linkClasses} to={"/home/brands"}>
                        <TbBrandSketch className="text-2xl" />
                        <h1 className={isMenuOpen ? "hidden" : ""}>Brands</h1>
                    </NavLink>
                    <NavLink className={isMenuOpen ? linkClasses2 : linkClasses} to={"/home/models"}>
                        <TbBrandSlack className="text-2xl" />
                        <h1 className={isMenuOpen ? "hidden" : ""}>Models</h1>
                    </NavLink>
                    <NavLink className={isMenuOpen ? linkClasses2 : linkClasses} to={"/home/locations"}>
                        <SlLocationPin className="text-2xl" />
                        <h1 className={isMenuOpen ? "hidden" : ""}>Locations</h1>
                    </NavLink>
                    <NavLink className={isMenuOpen ? linkClasses2 : linkClasses} to={"/home/cities"}>
                        <GiModernCity className="text-2xl" />
                        <h1 className={isMenuOpen ? "hidden" : ""}>Cities</h1>
                    </NavLink>
                    <NavLink className={isMenuOpen ? linkClasses2 : linkClasses} to={"/home/cars"}>
                        <IoCarSportOutline className="text-2xl" />
                        <h1 className={isMenuOpen ? "hidden" : ""}>Cars</h1>
                    </NavLink>
                </div>
            </div>
            <div className="mt-auto p-3">
                <NavLink className={isMenuOpen ? linkClasses2 : linkClasses} to={"/home/settings"}>
                    <IoSettingsOutline />
                    <h1 className={isMenuOpen ? "hidden" : ""}>Settings</h1>
                </NavLink>
            </div>
        </div>
    );
}
