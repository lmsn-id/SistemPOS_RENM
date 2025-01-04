import icon from "../../../public/vite.svg";
export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 left-0 w-full z-10 p-6 bg-gray-200">
        <nav className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg">
          <div className="icon">
            <img src={icon} alt="" />
          </div>
          <ul className="flex space-x-4">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
