import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Freelance CRM</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Clients
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;