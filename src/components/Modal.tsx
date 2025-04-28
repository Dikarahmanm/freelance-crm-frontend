import React, { useState, useEffect } from 'react';

interface ModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
    initialData?: T;
    title: string;
    fields: { key: keyof T; label: string; type: string; required?: boolean; options?: { value: string; label: string }[] }[];
}

const Modal = <T,>({ isOpen, onClose, onSubmit, initialData, title, fields }: ModalProps<T>) => {
    const [formData, setFormData] = useState<T>(initialData || ({} as T));

    useEffect(() => {
        setFormData(initialData || ({} as T));
    }, [initialData]);

    const handleChange = (key: keyof T, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={String(field.key)} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    value={(formData[field.key] as string) || ''}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                    required={field.required}
                                >
                                    <option value="">Select {field.label}</option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    value={(formData[field.key] as string) || ''}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;