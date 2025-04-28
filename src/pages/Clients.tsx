import React from 'react';
import Card from '../components/Card';
import Button from '../components/button';
import Table from '../components/Table';
import { Client } from '../types/client';

// Mock data (replace with API call later)
const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    createdAt: '2025-04-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    createdAt: '2025-04-02',
  },
];

const Clients: React.FC = () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleAddClient = () => {
    // Implement modal or form later
    alert('Add client clicked');
  };

  const handleEditClient = (id: string) => {
    alert(`Edit client ${id}`);
  };

  const handleDeleteClient = (id: string) => {
    alert(`Delete client ${id}`);
  };

  return (
    <div className="p-6">
      <Card title="Clients">
        <div className="mb-4">
          <Button onClick={handleAddClient}>Add Client</Button>
        </div>
        <Table<Client>
          columns={columns}
          data={mockClients}
          renderRow={(client) => (
            <>
              <td className="px-4 py-2">{client.name}</td>
              <td className="px-4 py-2">{client.email}</td>
              <td className="px-4 py-2">{client.phone || '-'}</td>
              <td className="px-4 py-2 flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => handleEditClient(client.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Delete
                </Button>
              </td>
            </>
          )}
        />
      </Card>
    </div>
  );
};

export default Clients;