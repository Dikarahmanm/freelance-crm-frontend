import React from 'react';
import Card from '../components/Card';

const Home: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-amber-500">
        <Card title="Total Clients">
          <p className="text-3xl font-semibold">12</p>
        </Card>
        <Card title="Active Projects">
          <p className="text-3xl font-semibold">5</p>
        </Card>
        <Card title="Pending Invoices">
          <p className="text-3xl font-semibold">3</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;