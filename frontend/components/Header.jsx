export default function Header(prop) {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex p-5 flex-row justify-between">
        <a className="title-font font-medium items-center text-white mb-0">
          <span className="md:ml-3  text-xl">Ecomm</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex-col md:flex-row items-center hidden md:block text-base justify-self-center">
          <a className="mr-5 hover:text-white">First Link</a>
          <a className="mr-5 hover:text-white">Second Link</a>
          <a className="mr-5 hover:text-white">Third Link</a>
          <a className="mr-5 hover:text-white">Fourth Link</a>
        </nav>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-500 hover:text-gray-50 rounded mt-0">
          Sign in
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
