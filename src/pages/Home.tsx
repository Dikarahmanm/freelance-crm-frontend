import React from 'react';
import Button from '../components/button';

const Home: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Freelance CRM</h1>
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Get Started
      </Button>
    </div>
  );
};

export default Home;