'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function RentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const res = await fetch('/api/rentals');
      const data = await res.json();
      setRentals(data);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/rentals/${id}`, { method: 'DELETE' });
      fetchRentals();
    } catch (error) {
      console.error('Error deleting rental:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (rentals.length === 0) return <EmptyState title="No Rental Items" link="/rentals/create" />;

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'available', label: 'Available', sortable: true },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Rentals' },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Rental Items</h1>
        <Link href="/rentals/create" className="btn btn-primary">
          New Item
        </Link>
      </div>
      <Table
        data={rentals}
        columns={columns}
        onDelete={handleDelete}
        baseUrl="/rentals"
      />
    </div>
  );
}
