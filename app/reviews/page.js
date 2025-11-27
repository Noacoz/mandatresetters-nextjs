'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (reviews.length === 0) return <EmptyState title="No Reviews" link="/reviews/create" />;

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'userId', label: 'User ID', sortable: true },
    { key: 'rating', label: 'Rating', sortable: true },
    { key: 'comment', label: 'Comment', sortable: false },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Reviews' },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Reviews</h1>
        <Link href="/reviews/create" className="btn btn-primary">
          New Review
        </Link>
      </div>
      <Table
        data={reviews}
        columns={columns}
        onDelete={handleDelete}
        baseUrl="/reviews"
      />
    </div>
  );
}
