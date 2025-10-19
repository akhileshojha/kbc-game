const Header = () => {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div>
          {/* User profile button or other header items can go here */}
          <button className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></button>
        </div>
      </header>
    );
  };
  
  export default Header;
  