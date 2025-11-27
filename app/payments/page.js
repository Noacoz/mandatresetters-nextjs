'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/payments');
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/payments/${id}`, { method: 'DELETE' });
      fetchPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (payments.length === 0) return <EmptyState title="No Payments" link="/payments/create" />;

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'transactionId', label: 'Transaction ID', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'paymentType', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Payments' },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Payments</h1>
        <Link href="/payments/create" className="btn btn-primary">
          New Payment
        </Link>
      </div>
      <Table
        data={payments}
        columns={columns}
        onDelete={handleDelete}
        baseUrl="/payments"
      />
    </div>
  );
}
