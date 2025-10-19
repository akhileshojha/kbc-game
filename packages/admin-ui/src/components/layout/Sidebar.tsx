import { NavLink } from 'react-router-dom';
import { Home, List, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
      isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4">
      <div className="text-2xl font-bold text-center mb-10">KBC Admin</div>
      <nav className="space-y-2">
        <NavLink to="/" end className={navLinkClasses}>
          <Home className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink to="/quizzes" className={navLinkClasses}>
          <List className="w-5 h-5 mr-3" />
          Manage Quizzes
        </NavLink>
        <NavLink to="/quizzes/new" className={navLinkClasses}>
          <PlusCircle className="w-5 h-5 mr-3" />
          Create Quiz
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
