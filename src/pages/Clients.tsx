import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Client } from '../types/client';

const API_URL = 'http://localhost:8080';

const Clients: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editClientData, setEditClientData] = useState<Client | null>(null);

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'actions', label: 'Actions' },
    ];

    useEffect(() => {
        console.log('useEffect triggered for fetching clients');
        axios
            .get(`${API_URL}/clients`)
            .then((res) => {
                console.log('Axios response:', res.data);
                setClients(res.data);
            })
            .catch((err) => console.error('Failed to fetch clients:', err));
    }, []);

    const handleAddClient = async (data: { name: string; email: string; phone?: string }) => {
        try {
            const res = await axios.post(`${API_URL}/clients`, data);
            setClients([...clients, res.data]);
            console.log('Client added:', res.data);
        } catch (err: any) {
            console.error('Failed to add client:', err.response?.data || err.message);
        }
    };

    const handleEditClient = async (data: { name: string; email: string; phone?: string }) => {
        if (!editClientData) return;
        try {
            const res = await axios.put(`${API_URL}/clients/${editClientData.id}`, {
                ...data,
                id: editClientData.id,
            });
            setClients(clients.map((c) => (c.id === editClientData.id ? res.data : c)));
            console.log('Client updated:', res.data);
        } catch (err: any) {
            console.error('Failed to update client:', err.response?.data || err.message);
        }
    };

    const handleDeleteClient = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/clients/${id}`);
            setClients(clients.filter((c) => c.id !== id));
            console.log('Client deleted:', id);
        } catch (err: any) {
            console.error('Failed to delete client:', err.response?.data || err.message);
        }
    };

    const clientFields = [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'phone', label: 'Phone', type: 'text' },
    ];

    return (
        <div className="p-6">
            <Card title="Clients">
                <div className="mb-4">
                    <Button onClick={() => setIsAddModalOpen(true)}>Add Client</Button>
                </div>
                <Table<Client>
                    columns={columns}
                    data={clients}
                    renderRow={(client) => (
                        <>
                            <td className="px-4 py-2 text-gray-900">{client.name}</td>
                            <td className="px-4 py-2 text-gray-900">{client.email}</td>
                            <td className="px-4 py-2 text-gray-900">{client.phone || '-'}</td>
                            <td className="px-4 py-2 flex space-x-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setEditClientData(client);
                                        setIsEditModalOpen(true);
                                    }}
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
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddClient}
                title="Add Client"
                fields={clientFields}
                initialData={{ name: '', email: '', phone: '' }}
            />
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditClientData(null);
                }}
                onSubmit={handleEditClient}
                title="Edit Client"
                fields={clientFields}
                initialData={
                    editClientData
                        ? { name: editClientData.name, email: editClientData.email, phone: editClientData.phone }
                        : { name: '', email: '', phone: '' }
                }
            />
        </div>
    );
};

export default Clients;