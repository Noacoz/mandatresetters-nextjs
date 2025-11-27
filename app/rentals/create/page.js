'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CreateRentalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/rentals');
      }
    } catch (error) {
      console.error('Error creating rental:', error);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Item Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    {
      name: 'available',
      label: 'Available',
      type: 'checkbox',
      required: false,
    },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Rentals', href: '/rentals' },
          { label: 'Create' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-6">Create Rental Item</h1>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Item"
      />
    </div>
  );
}
