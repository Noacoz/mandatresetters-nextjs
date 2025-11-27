'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CreateReviewPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, bookingsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/bookings'),
      ]);
      const usersData = await usersRes.json();
      const bookingsData = await bookingsRes.json();
      setUsers(usersData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/reviews');
      }
    } catch (error) {
      console.error('Error creating review:', error);
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
      name: 'bookingId',
      label: 'Booking',
      type: 'select',
      required: false,
      options: bookings.map((b) => ({ value: b.id, label: `Booking #${b.id}` })),
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: '1 - Poor' },
        { value: '2', label: '2 - Fair' },
        { value: '3', label: '3 - Good' },
        { value: '4', label: '4 - Very Good' },
        { value: '5', label: '5 - Excellent' },
      ],
    },
    { name: 'comment', label: 'Comment', type: 'textarea', required: false },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Reviews', href: '/reviews' },
          { label: 'Create' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-6">Create Review</h1>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Review"
      />
    </div>
  );
}
