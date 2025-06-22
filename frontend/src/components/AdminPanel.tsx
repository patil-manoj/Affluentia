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
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget?: string;
  message: string;
  files?: Array<{
    filename: string;
    originalName: string;
    size: number;
  }>;
  createdAt: string;
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
                          </td>
                          <td className="px-6 py-4 text-sm text-stone-600">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-stone-600">
                            {contact.files ? contact.files.length : 0} files
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
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                  <p className="text-stone-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <p className="text-stone-900">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                  <p className="text-stone-900">{selectedContact.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Project Type</label>
                  <p className="text-stone-900 capitalize">{selectedContact.projectType}</p>
                </div>
                {selectedContact.budget && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Budget</label>
                    <p className="text-stone-900">{selectedContact.budget}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Submitted</label>
                  <p className="text-stone-900">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                <div className="bg-stone-50 rounded-lg p-4">
                  <p className="text-stone-900 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {selectedContact.files && selectedContact.files.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Attached Files ({selectedContact.files.length})
                  </label>
                  <div className="space-y-2">
                    {selectedContact.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                        <div>
                          <p className="font-medium text-stone-900">{file.originalName}</p>
                          <p className="text-sm text-stone-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => deleteContact(selectedContact._id)}
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
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
