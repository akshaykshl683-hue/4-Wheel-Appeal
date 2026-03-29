import React, { useState } from 'react';

export const ServiceIntake: React.FC = () => {
  const [mainService, setMainService] = useState('');
  const [subService, setSubService] = useState('');
  const [scope, setScope] = useState('');

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Service Intake</h2>
      <div className="space-y-4">
        <select className="w-full p-2 border rounded" onChange={(e) => setMainService(e.target.value)}>
          <option value="">Select Main Service</option>
          <option value="ppf">PPF</option>
          <option value="ceramic">Ceramic Coating</option>
        </select>
        <select className="w-full p-2 border rounded" onChange={(e) => setSubService(e.target.value)} disabled={!mainService}>
          <option value="">Select Sub-Category</option>
          {mainService === 'ppf' && <><option value="colored">Colored</option><option value="matte">Matte</option></>}
        </select>
        <select className="w-full p-2 border rounded" onChange={(e) => setScope(e.target.value)} disabled={!subService}>
          <option value="">Select Scope</option>
          <option value="full">Full Body</option>
          <option value="partial">Partial</option>
        </select>
        <button className="w-full bg-blue-500 text-white p-2 rounded">Calculate Price</button>
      </div>
    </div>
  );
};
