import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { reportsAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'VIOLENCE',
    severity: 'MEDIUM',
    isAnonymous: true,
  });

  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportsAPI.getReports(),
  });

  const createReportMutation = useMutation({
    mutationFn: (data: any) => reportsAPI.createReport(data),
    onSuccess: () => {
      setFormData({
        title: '',
        description: '',
        category: 'VIOLENCE',
        severity: 'MEDIUM',
        isAnonymous: true,
      });
      alert('Report submitted successfully');
    },
    onError: (error: any) => {
      alert('Failed to submit report: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReportMutation.mutate(formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit New Report</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-32"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="VIOLENCE">Violence</option>
                <option value="ABUSE">Abuse</option>
                <option value="BULLYING">Bullying</option>
                <option value="HARASSMENT">Harassment</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Severity</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="h-4 w-4 text-indigo-600"
              />
              <label className="ml-2 text-gray-700">Report Anonymously</label>
            </div>

            <button
              type="submit"
              disabled={createReportMutation.isPending}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {createReportMutation.isPending ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reports</h2>
          {isLoading ? (
            <p className="text-gray-600">Loading reports...</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {reports?.data?.data?.map((report: any) => (
                <div key={report.id} className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.category}</p>
                  <p className="text-sm text-gray-500 mt-2">Status: {report.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
