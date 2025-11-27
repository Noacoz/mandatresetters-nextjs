'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CreateBookingPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, routesRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/routes'),
      ]);
      const usersData = await usersRes.json();
      const routesData = await routesRes.json();
      setUsers(usersData);
      setRoutes(routesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/bookings');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
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
      name: 'routeId',
      label: 'Route',
      type: 'select',
      required: true,
      options: routes.map((r) => ({ value: r.id, label: r.name })),
    },
    { name: 'passengerName', label: 'Passenger Name', type: 'text', required: true },
    { name: 'passengerPhone', label: 'Passenger Phone', type: 'text', required: true },
    { name: 'bookingDate', label: 'Booking Date', type: 'date', required: true },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'totalPrice', label: 'Total Price', type: 'number', required: true },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Bookings', href: '/bookings' },
          { label: 'Create' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-6">Create Booking</h1>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Booking"
      />
    </div>
  );
}
