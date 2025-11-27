'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';

export default function CreateRoutePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/routes');
      }
    } catch (error) {
      console.error('Error creating route:', error);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Route Name', type: 'text', required: true },
    { name: 'origin', label: 'Origin', type: 'text', required: true },
    { name: 'destination', label: 'Destination', type: 'text', required: true },
    { name: 'distance', label: 'Distance (km)', type: 'number', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'schedule', label: 'Schedule', type: 'text', placeholder: 'e.g., Mon-Fri 8:00 AM' },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Routes', href: '/routes' },
          { label: 'Create' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-6">Create New Route</h1>
      <Form fields={fields} onSubmit={handleSubmit} loading={loading} submitLabel="Create Route" />
    </div>
  );
}
