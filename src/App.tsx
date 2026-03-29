/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser } from './firebase';
import { Dashboard } from './components/Dashboard';
import { ServiceIntake } from './components/ServiceIntake';
import { AddCustomerForm } from './components/AddCustomerForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Login } from './components/Login';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Four Wheel Appeal CRM</h1>
        <button
          onClick={signOutUser}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </nav>
      <main className="container mx-auto p-4">
        <ErrorBoundary>
          <Dashboard />
          <AddCustomerForm />
          <ServiceIntake />
        </ErrorBoundary>
      </main>
    </div>
  );
}
