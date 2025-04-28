import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Project } from '../types/project';
import { Client } from '../types/client';

const API_URL = 'http://localhost:8080';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const columns = [
        { key: 'title', label: 'Title' },
        { key: 'clientId', label: 'Client ID' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' },
    ];

    useEffect(() => {
        axios.get(`${API_URL}/projects`).then((res) => setProjects(res.data));
        axios.get(`${API_URL}/clients`).then((res) => setClients(res.data));
    }, []);

    const handleAddProject = async (data: { title: string; clientId: string; description?: string; status: string }) => {
        try {
            const payload = {
                clientId: data.clientId,
                title: data.title,
                description: data.description || '',
                status: data.status || 'Active',
            };
            console.log('Sending project payload:', payload);
            const res = await axios.post(`${API_URL}/projects`, payload);
            setProjects([...projects, res.data]);
            console.log('Project added:', res.data);
        } catch (err: any) {
            console.error('Failed to add project:', err.response?.data || err.message);
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/projects/${id}`);
            setProjects(projects.filter((p) => p.id !== id));
            console.log('Project deleted:', id);
        } catch (err: any) {
            console.error('Failed to delete project:', err.response?.data || err.message);
        }
    };

    const projectFields = [
        { key: 'title', label: 'Title', type: 'text', required: true },
        {
            key: 'clientId',
            label: 'Client',
            type: 'select',
            required: true,
            options: clients.map((client) => ({
                value: client.id,
                label: client.name,
            })),
        },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'status', label: 'Status', type: 'text', required: true },
    ];

    return (
        <div className="p-6">
            <Card title="Projects">
                <div className="mb-4">
                    <Button onClick={() => setIsAddModalOpen(true)}>Add Project</Button>
                </div>
                <Table<Project>
                    columns={columns}
                    data={projects}
                    renderRow={(project) => (
                        <>
                            <td className="px-4 py-2 text-gray-900">{project.title}</td>
                            <td className="px-4 py-2 text-gray-900">{project.clientId}</td>
                            <td className="px-4 py-2 text-gray-900">{project.status}</td>
                            <td className="px-4 py-2 flex space-x-2">
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteProject(project.id)}
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
                onSubmit={handleAddProject}
                title="Add Project"
                fields={projectFields}
                initialData={{ title: '', clientId: clients[0]?.id || '', description: '', status: 'Active' }}
            />
        </div>
    );
};

export default Projects;