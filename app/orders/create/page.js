'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CreateOrderPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, itemsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/rentals'),
      ]);
      const usersData = await usersRes.json();
      const itemsData = await itemsRes.json();
      setUsers(usersData);
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/orders');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const fields = [
    {
      name: 'userId',
      label: 'User',
      type: 'select',
      required: true,
      options: users.map((u) => ({ value: u.id, label: u.name })),
    },
    {
      name: 'itemId',
      label: 'Item',
      type: 'select',
      required: true,
      options: items.map((i) => ({ value: i.id, label: i.name })),
    },
    { name: 'rentStartDate', label: 'Start Date', type: 'date', required: true },
    { name: 'rentEndDate', label: 'End Date', type: 'date', required: true },
    { name: 'totalPrice', label: 'Total Price', type: 'number', required: true },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
      ],
    },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Orders', href: '/orders' },
          { label: 'Create' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-6">Create Order</h1>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Order"
      />
    </div>
  );
}
