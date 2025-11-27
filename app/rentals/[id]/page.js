'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RentalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchRental();
  }, [id]);

  const fetchRental = async () => {
    try {
      const res = await fetch(`/api/rentals/${id}`);
      const data = await res.json();
      setRental(data);
    } catch (error) {
      console.error('Error fetching rental:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rentals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/rentals');
      }
    } catch (error) {
      console.error('Error updating rental:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/rentals/${id}`, { method: 'DELETE' });
        router.push('/rentals');
      } catch (error) {
        console.error('Error deleting rental:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!rental) return <p>Rental item not found</p>;

  const fields = [
    { name: 'name', label: 'Item Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'available', label: 'Available', type: 'checkbox', required: false },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Rentals', href: '/rentals' },
          { label: rental.name },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit Rental Item</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
      <Form
        fields={fields}
        initialData={rental}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update Item"
      />
    </div>
  );
}
