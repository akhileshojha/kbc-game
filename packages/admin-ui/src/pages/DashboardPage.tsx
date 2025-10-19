const DashboardPage = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat Cards - these would fetch real data */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Quizzes</h3>
            <p className="text-4xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Questions</h3>
            <p className="text-4xl font-bold mt-2">150</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Games Played</h3>
            <p className="text-4xl font-bold mt-2">1,234</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Active Players</h3>
            <p className="text-4xl font-bold mt-2">78</p>
          </div>
        </div>
        {/* You can add charts or recent activity feeds here */}
      </div>
    );
  };
  
  export default DashboardPage;
  