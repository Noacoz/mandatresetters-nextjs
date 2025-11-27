'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const res = await fetch(`/api/bookings/${id}`);
      const data = await res.json();
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/bookings');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
        router.push('/bookings');
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!booking) return <p>Booking not found</p>;

  const fields = [
    { name: 'passengerName', label: 'Passenger Name', type: 'text', required: true },
    { name: 'passengerPhone', label: 'Passenger Phone', type: 'text', required: true },
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
          { label: `#${booking.id}` },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit Booking</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
      <Form
        fields={fields}
        initialData={booking}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update Booking"
      />
    </div>
  );
}
