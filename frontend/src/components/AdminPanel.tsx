import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  CalendarIcon,
  FolderIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
  XMarkIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'completed';
  ipAddress?: string;
  files?: Array<{
    originalName: string;
    filename: string;
    size: number;
    mimetype: string;
    path?: string;
  }>;
  createdAt: string;
  updatedAt?: string;
}

interface DashboardStats {
  summary: {
    totalContacts: number;
    contactsThisMonth: number;
    contactsThisWeek: number;
    growthRate: number;
  };
  recentContacts: Contact[];
  projectTypeStats: Array<{
    _id: string;
    count: number;
  }>;
  monthlyTrend: Array<{
    _id: { year: number; month: number };
    count: number;
  }>;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contacts'>('dashboard');
  
  // Dashboard state
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  
  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Pagination and filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectTypeFilter, setProjectTypeFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || 'https://affluentia.onrender.com';

  // Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const response = await fetch(`${API_BASE}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', password);
        fetchDashboardData();
      } else {
        setAuthError('Invalid password');
      }
    } catch (error) {
      setAuthError('Connection error. Please try again.');
    }
  };

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setPassword(token);
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${password || localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Fetch contacts
  const fetchContacts = async (page = 1) => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (projectTypeFilter) params.append('projectType', projectTypeFilter);
      if (dateFromFilter) params.append('dateFrom', dateFromFilter);
      if (dateToFilter) params.append('dateTo', dateToFilter);

      const response = await fetch(`${API_BASE}/api/admin/contacts?${params}`, {
        headers: {
          'Authorization': `Bearer ${password || localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.data.contacts);
        setCurrentPage(data.data.pagination.currentPage);
        setTotalPages(data.data.pagination.totalPages);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (error) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };
  // Export contacts
  const exportContacts = async (format = 'csv') => {
    try {
      const filters: any = {};
      if (projectTypeFilter) filters.projectType = projectTypeFilter;
      if (dateFromFilter) filters.dateFrom = dateFromFilter;
      if (dateToFilter) filters.dateTo = dateToFilter;

      const response = await fetch(`${API_BASE}/api/admin/export`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password || localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ format, filters })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  // Delete contact
  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`${API_BASE}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password || localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        fetchContacts(currentPage);
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Download file
  const downloadFile = async (contactId: string, filename: string, originalName: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/files/${contactId}/${filename}`, {
        headers: {
          'Authorization': `Bearer ${password || localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = originalName;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  // Update contact status
  const updateContactStatus = async (contactId: string, newStatus: 'new' | 'contacted' | 'completed') => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/contacts/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${password || localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh the contacts list
        fetchContacts(currentPage);
        // Update selected contact if it's the one being updated
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact({ ...selectedContact, status: newStatus });
        }
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <ExclamationCircleIcon className="h-4 w-4" />;
      case 'contacted':
        return <ClockIcon className="h-4 w-4" />;
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4" />;
      default:
        return <ExclamationCircleIcon className="h-4 w-4" />;
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('adminToken');
    setDashboardData(null);
    setContacts([]);
  };

  // Load contacts when tab changes or filters change
  useEffect(() => {
    if (isAuthenticated && activeTab === 'contacts') {
      fetchContacts(1);
    }
  }, [activeTab, searchTerm, projectTypeFilter, dateFromFilter, dateToFilter]);

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <LockClosedIcon className="h-12 w-12 text-stone-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-stone-900">Admin Access</h1>
            <p className="text-stone-600 mt-2">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Access Admin Panel
            </button>
          </form>

          {/* <div className="mt-6 p-4 bg-stone-50 rounded-lg">
            <p className="text-xs text-stone-600">
              <strong>Default password:</strong> admin123<br />
              (Set ADMIN_PASSWORD in your environment variables to change this)
            </p>
          </div> */}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Admin Panel</h1>
            <p className="text-stone-600">Affluentia Interior Design</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'contacts' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Contacts
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && dashboardData && (
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">Total Contacts</p>
                  <p className="text-3xl font-bold text-stone-900">{dashboardData.summary.totalContacts}</p>
                </div>
                <UsersIcon className="h-12 w-12 text-blue-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">This Month</p>
                  <p className="text-3xl font-bold text-green-600">{dashboardData.summary.contactsThisMonth}</p>
                </div>
                <CalendarIcon className="h-12 w-12 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">This Week</p>
                  <p className="text-3xl font-bold text-purple-600">{dashboardData.summary.contactsThisWeek}</p>
                </div>
                <FolderIcon className="h-12 w-12 text-purple-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">Growth Rate</p>
                  <p className="text-3xl font-bold text-orange-600">{dashboardData.summary.growthRate}%</p>
                </div>
                <CalendarIcon className="h-12 w-12 text-orange-600" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Contacts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-200"
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Recent Contacts</h3>
              <div className="space-y-4">
                {dashboardData.recentContacts.map((contact) => (
                  <div key={contact._id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                    <div>
                      <p className="font-medium text-stone-900">{contact.name}</p>
                      <p className="text-sm text-stone-600">{contact.email}</p>
                      <p className="text-xs text-stone-500">{contact.projectType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-stone-600">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Project Types */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-200"
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Project Types</h3>
              <div className="space-y-3">
                {dashboardData.projectTypeStats.map((stat) => (
                  <div key={stat._id} className="flex items-center justify-between">
                    <span className="text-stone-700 capitalize">{stat._id || 'Not specified'}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-stone-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 rounded-full h-2" 
                          style={{ 
                            width: `${(stat.count / dashboardData.summary.totalContacts) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-stone-900 w-8">{stat.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Contacts Tab */}
      {activeTab === 'contacts' && (
        <div className="p-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Search</label>
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name, email, message..."
                    className="pl-10 w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Project Type</label>
                <select
                  value={projectTypeFilter}
                  onChange={(e) => setProjectTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="interior">Interior</option>
                  <option value="renovation">Renovation</option>
                  <option value="consultation">Consultation</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">From Date</label>
                <input
                  type="date"
                  value={dateFromFilter}
                  onChange={(e) => setDateFromFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">To Date</label>
                <input
                  type="date"
                  value={dateToFilter}
                  onChange={(e) => setDateToFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => exportContacts('csv')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200">
            <div className="p-6 border-b border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900">Contact Submissions</h3>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {error && (
              <div className="p-6 text-center text-red-600">{error}</div>
            )}

            {!loading && !error && contacts.length === 0 && (
              <div className="p-6 text-center text-stone-500">No contacts found</div>
            )}

            {!loading && !error && contacts.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Files</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {contacts.map((contact) => (
                        <tr key={contact._id} className="hover:bg-stone-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-stone-900">{contact.name}</div>
                              <div className="text-sm text-stone-600">{contact.email}</div>
                              <div className="text-sm text-stone-500">{contact.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="capitalize text-stone-700">{contact.projectType}</span>
                            {contact.budget && (
                              <div className="text-sm text-stone-500">{contact.budget}</div>
                            )}
                          </td>                          <td className="px-6 py-4 text-sm text-stone-600">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-stone-600">
                            {contact.files ? contact.files.length : 0} files
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(contact.status || 'new')}`}>
                              {getStatusIcon(contact.status || 'new')}
                              <span className="capitalize">{contact.status || 'new'}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedContact(contact)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteContact(contact._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
                  <div className="text-sm text-stone-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fetchContacts(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 text-stone-600 hover:bg-stone-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => fetchContacts(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="p-2 text-stone-600 hover:bg-stone-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-stone-900">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 text-stone-600 hover:bg-stone-50 rounded-lg"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>            <div className="p-6 space-y-6">
              {/* Status and Basic Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(selectedContact.status)}`}>
                      {getStatusIcon(selectedContact.status)}
                      <span className="capitalize">{selectedContact.status}</span>
                    </span>
                    <span className="text-sm text-stone-600">
                      ID: {selectedContact._id.slice(-8)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedContact.status}
                      onChange={(e) => updateContactStatus(selectedContact._id, e.target.value as 'new' | 'contacted' | 'completed')}
                      className="text-sm border border-stone-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                {selectedContact.ipAddress && (
                  <p className="text-sm text-stone-600">
                    <span className="font-medium">IP Address:</span> {selectedContact.ipAddress}
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="font-medium text-stone-700">Submitted:</span>
                    <br />
                    <span className="text-stone-600">{new Date(selectedContact.createdAt).toLocaleString()}</span>
                  </div>
                  {selectedContact.updatedAt && (
                    <div>
                      <span className="font-medium text-stone-700">Last Updated:</span>
                      <br />
                      <span className="text-stone-600">{new Date(selectedContact.updatedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                    <p className="text-stone-900 p-3 bg-stone-50 rounded-lg">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                    <p className="text-stone-900 p-3 bg-stone-50 rounded-lg">
                      <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:text-blue-800">
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                    <p className="text-stone-900 p-3 bg-stone-50 rounded-lg">
                      <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:text-blue-800">
                        {selectedContact.phone}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Project Type</label>
                    <p className="text-stone-900 p-3 bg-stone-50 rounded-lg capitalize">{selectedContact.projectType}</p>
                  </div>
                  {selectedContact.budget && (
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Budget Range</label>
                      <p className="text-stone-900 p-3 bg-stone-50 rounded-lg">{selectedContact.budget}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Message Length</label>
                    <p className="text-stone-600 p-3 bg-stone-50 rounded-lg text-sm">
                      {selectedContact.message.length} characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Project Details & Requirements</label>
                <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                  <p className="text-stone-900 whitespace-pre-wrap leading-relaxed">{selectedContact.message}</p>
                </div>
              </div>

              {/* Attached Files */}
              {selectedContact.files && selectedContact.files.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Attached Files ({selectedContact.files.length})
                  </label>
                  <div className="space-y-3">
                    {selectedContact.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <DocumentArrowDownIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-stone-900">{file.originalName}</p>
                            <div className="flex items-center gap-4 text-sm text-stone-600">
                              <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                              <span className="capitalize">{file.mimetype?.split('/')[1] || 'Unknown'}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadFile(selectedContact._id, file.filename, file.originalName)}
                          className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          Download
                        </button>
                      </div>
                    ))}
                    
                    {/* Bulk download all files */}
                    {selectedContact.files.length > 1 && (
                      <div className="pt-2 border-t border-stone-200">
                        <button
                          onClick={() => {
                            selectedContact.files?.forEach(file => {
                              downloadFile(selectedContact._id, file.filename, file.originalName);
                            });
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          Download All Files ({selectedContact.files.length})
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* No files message */}
              {(!selectedContact.files || selectedContact.files.length === 0) && (
                <div className="text-center py-8 text-stone-500">
                  <FolderIcon className="h-12 w-12 mx-auto mb-2 text-stone-300" />
                  <p>No files were attached to this inquiry</p>
                </div>
              )}
            </div>            <div className="p-6 border-t border-stone-200 bg-stone-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: Your Interior Design Inquiry&body=Dear ${selectedContact.name},%0D%0A%0D%0AThank you for your inquiry about ${selectedContact.projectType} design services.%0D%0A%0D%0ABest regards,%0D%0AAfluentia Interior Design Team`)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Reply
                  </button>
                  <button
                    onClick={() => window.open(`tel:${selectedContact.phone}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      // Export individual contact details
                      const contactData = {
                        'Contact Information': {
                          'Name': selectedContact.name,
                          'Email': selectedContact.email,
                          'Phone': selectedContact.phone,
                          'Project Type': selectedContact.projectType,
                          'Budget': selectedContact.budget || 'Not specified',
                          'Status': selectedContact.status
                        },
                        'Message': selectedContact.message,
                        'Files': selectedContact.files?.map(f => f.originalName).join(', ') || 'None',
                        'Submitted': new Date(selectedContact.createdAt).toLocaleString(),
                        'IP Address': selectedContact.ipAddress || 'Not recorded'
                      };
                      
                      const jsonStr = JSON.stringify(contactData, null, 2);
                      const blob = new Blob([jsonStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `contact-${selectedContact.name.replace(/\s+/g, '-')}-${selectedContact._id.slice(-8)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    title="Export contact details as JSON"
                  >
                    Export Data
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
                        deleteContact(selectedContact._id);
                      }
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Delete Contact
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
