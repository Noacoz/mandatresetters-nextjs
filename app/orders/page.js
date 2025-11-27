'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (orders.length === 0) return <EmptyState title="No Orders" link="/orders/create" />;

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'item', label: 'Item', sortable: false, render: (row) => row.item?.name },
    { key: 'user', label: 'User', sortable: false, render: (row) => row.user?.name },
    { key: 'totalPrice', label: 'Total Price', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Orders' },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Rental Orders</h1>
        <Link href="/orders/create" className="btn btn-primary">
          New Order
        </Link>
      </div>
      <Table
        data={orders}
        columns={columns}
        onDelete={handleDelete}
        baseUrl="/orders"
      />
    </div>
  );
}
