import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <div className='w-full h-[90vh] flex justify-center items-center'>
        <Link to={"/home/main"} className="text-4xl font-[800]">
          Welcome to AdminAutozoom
        </Link>
      </div>
    </>
  )
}
