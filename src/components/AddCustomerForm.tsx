import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export const AddCustomerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [dob, setDob] = useState('');
  const [visitHistory, setVisitHistory] = useState<string[]>([]);
  const [newVisit, setNewVisit] = useState('');

  const handleAddVisit = () => {
    if (newVisit.trim()) {
      setVisitHistory([...visitHistory, newVisit.trim()]);
      setNewVisit('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'customers'), {
        name,
        contact,
        vehicle,
        dob,
        visitHistory,
      });
      setName('');
      setContact('');
      setVehicle('');
      setDob('');
      setVisitHistory([]);
      alert('Customer added successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'customers');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Add New Customer</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Vehicle Details" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-2 border rounded" />
      <div>
        <label className="block font-medium">Visit History</label>
        <div className="flex gap-2">
          <input type="text" value={newVisit} onChange={(e) => setNewVisit(e.target.value)} className="flex-grow p-2 border rounded" />
          <button type="button" onClick={handleAddVisit} className="bg-gray-200 p-2 rounded">Add</button>
        </div>
        <ul className="list-disc pl-5 mt-2">
          {visitHistory.map((visit, index) => <li key={index}>{visit}</li>)}
        </ul>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Customer</button>
    </form>
  );
};
