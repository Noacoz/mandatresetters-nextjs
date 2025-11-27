'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await fetch('/api/routes');
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/routes/${id}`, { method: 'DELETE' });
      setRoutes(routes.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Route Name' },
    { key: 'origin', label: 'Origin' },
    { key: 'destination', label: 'Destination' },
    { key: 'distance', label: 'Distance (km)' },
    { key: 'price', label: 'Price' },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Routes' }]}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Transport Routes</h1>
        <Link href="/routes/create" className="btn btn-primary">
          Add New Route
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : routes.length === 0 ? (
        <EmptyState message="No routes found" />
      ) : (
        <Table
          columns={columns}
          data={routes}
          onDelete={handleDelete}
          editLink={(id) => `/routes/${id}`}
        />
      )}
    </div>
  );
}
