'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RouteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchRoute();
  }, [id]);

  const fetchRoute = async () => {
    try {
      const res = await fetch(`/api/routes/${id}`);
      const data = await res.json();
      setRoute(data);
    } catch (error) {
      console.error('Error fetching route:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/routes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/routes');
      }
    } catch (error) {
      console.error('Error updating route:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/routes/${id}`, { method: 'DELETE' });
        router.push('/routes');
      } catch (error) {
        console.error('Error deleting route:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!route) return <p>Route not found</p>;

  const fields = [
    { name: 'name', label: 'Route Name', type: 'text', required: true },
    { name: 'origin', label: 'Origin', type: 'text', required: true },
    { name: 'destination', label: 'Destination', type: 'text', required: true },
    { name: 'distance', label: 'Distance (km)', type: 'number', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'schedule', label: 'Schedule', type: 'text' },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Routes', href: '/routes' },
          { label: route.name },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit Route</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
      <Form
        fields={fields}
        initialData={route}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update Route"
      />
    </div>
  );
}
