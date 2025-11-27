'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (bookings.length === 0) return <EmptyState title="No Bookings" link="/bookings/create" />;

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'passengerName', label: 'Passenger Name', sortable: true },
    { key: 'passengerPhone', label: 'Phone', sortable: false },
    { key: 'quantity', label: 'Qty', sortable: true },
    { key: 'totalPrice', label: 'Total Price', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Bookings' },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Bookings</h1>
        <Link href="/bookings/create" className="btn btn-primary">
          New Booking
        </Link>
      </div>
      <Table
        data={bookings}
        columns={columns}
        onDelete={handleDelete}
        baseUrl="/bookings"
      />
    </div>
  );
}
