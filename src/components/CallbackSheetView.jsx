import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import {
  Lock,
  RefreshCw,
  Download,
  Trash2,
  Search,
  LogOut,
  ArrowLeft,
  Calendar,
  Phone,
  ShoppingBag,
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle,
  User
} from 'lucide-react'

export default function CallbackSheetView({ onBack }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('callback_sheet_auth') === 'true'
  })
  const [error, setError] = useState('')
  const [requests, setRequests] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteLoadingId, setDeleteLoadingId] = useState(null)
  const [activeTab, setActiveTab] = useState('callbacks') // 'callbacks' | 'inquiries'

  // Fetch all data from Supabase
  const fetchAllData = async () => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      // Fetch Callbacks
      const { data: callbacksData, error: dbError } = await supabase
          .from('callback_requests')
          .select('*')
          .order('created_at', { ascending: false })

      if (dbError) throw dbError
      setRequests(callbacksData || [])

      // Fetch Inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
          .from('customer_inquiries')
          .select('*')
          .order('created_at', { ascending: false })

      if (inquiriesError) throw inquiriesError
      setInquiries(inquiriesData || [])
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData()
    }
  }, [isAuthenticated])

  // Handle password submission
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'Rahul@2001') {
      setIsAuthenticated(true)
      sessionStorage.setItem('callback_sheet_auth', 'true')
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('callback_sheet_auth')
    setPassword('')
    setRequests([])
    setInquiries([])
  }

  // Handle Delete Callback Request
  const handleDeleteCallback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this callback request?')) return
    setDeleteLoadingId(id)
    try {
      const { error: deleteError } = await supabase
          .from('callback_requests')
          .delete()
          .eq('id', id)

      if (deleteError) throw deleteError
      setRequests((prev) => prev.filter((req) => req.id !== id))
    } catch (err) {
      console.error('Failed to delete request:', err)
      alert('Error deleting request. Please try again.')
    } finally {
      setDeleteLoadingId(null)
    }
  }

  // Handle Delete Inquiry Request
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return
    setDeleteLoadingId(id)
    try {
      const { error: deleteError } = await supabase
          .from('customer_inquiries')
          .delete()
          .eq('id', id)

      if (deleteError) throw deleteError
      setInquiries((prev) => prev.filter((inq) => inq.id !== id))
    } catch (err) {
      console.error('Failed to delete inquiry:', err)
      alert('Error deleting inquiry. Please try again.')
    } finally {
      setDeleteLoadingId(null)
    }
  }

  // Export to CSV
  const handleExportCSV = () => {
    if (activeTab === 'callbacks') {
      if (requests.length === 0) return
      const headers = ['ID', 'Date & Time', 'Phone Number', 'Product Interest', 'Source']
      const rows = requests.map((r) => [
        r.id,
        new Date(r.created_at).toLocaleString('en-IN'),
        r.phone,
        r.product_name || 'N/A',
        r.source || 'product_detail_popup'
      ])
      triggerCSVDownload(headers, rows, 'callbacks')
    } else {
      if (inquiries.length === 0) return
      const headers = ['ID', 'Inquiry ID', 'Date & Time', 'Customer Name', 'Phone', 'Items Checked Out', 'Total Value']
      const rows = inquiries.map((inq) => [
        inq.id,
        inq.inquiry_id,
        new Date(inq.created_at).toLocaleString('en-IN'),
        inq.name,
        inq.phone,
        (inq.items || []).map((item) => `${item.name} (${item.size})`).join('; '),
        inq.total_price
      ])
      triggerCSVDownload(headers, rows, 'customer_inquiries')
    }
  }

  const triggerCSVDownload = (headers, rows, filename) => {
    const csvContent =
        'data:text/csv;charset=utf-8,\uFEFF' +
        [
          headers.join(','),
          ...rows.map((row) =>
              row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
          )
        ].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute(
        'download',
        `kidscity_${filename}_${new Date().toISOString().split('T')[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter requests/inquiries based on search term
  const filteredRequests = requests.filter((r) => {
    const search = searchTerm.toLowerCase()
    const phoneMatch = r.phone && r.phone.toLowerCase().includes(search)
    const productMatch = r.product_name && r.product_name.toLowerCase().includes(search)
    const sourceMatch = r.source && r.source.toLowerCase().includes(search)
    return phoneMatch || productMatch || sourceMatch
  })

  const filteredInquiries = inquiries.filter((inq) => {
    const search = searchTerm.toLowerCase()
    const nameMatch = inq.name && inq.name.toLowerCase().includes(search)
    const phoneMatch = inq.phone && inq.phone.toLowerCase().includes(search)
    const idMatch = inq.inquiry_id && inq.inquiry_id.toLowerCase().includes(search)
    const itemsMatch = inq.items && inq.items.some((item) =>
        item.name.toLowerCase().includes(search) || item.size.toLowerCase().includes(search)
    )
    return nameMatch || phoneMatch || idMatch || itemsMatch
  })

  // Format date nicely
  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    } catch (e) {
      return isoString
    }
  }

  // Render Login Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#fafaf6] px-5 py-10">
        <div className="bg-white border border-border rounded-3xl w-full max-w-[440px] p-10 text-center shadow-lg">
          <div className="mb-[30px]">
            <div className="w-16 h-16 rounded-full bg-[#fdf2f2] flex items-center justify-center mx-auto mb-4 text-[#ef4444] border border-[#fee2e2]">
              <Lock size={28} className="text-[#ef4444]" />
            </div>
            <h1 className="font-[family-name:var(--font-head)] text-[1.6rem] font-extrabold text-brand-navy-dark mb-2">Kids City Console</h1>
            <p className="text-sm text-text-mid">Access requires administrator authentication</p>
          </div>

          <form onSubmit={handleLogin} className="text-left mb-6">
            <div className="mb-5">
              <label htmlFor="admin-password" className="block text-[0.85rem] font-semibold text-brand-navy-dark mb-2">
                Enter Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-base border border-border rounded-lg bg-[#fafafa] text-brand-navy-dark transition-all duration-200 focus:outline-none focus:bg-white focus:border-brand-navy-dark focus:ring-3 focus:ring-[#0d1b28]/8"
                autoFocus
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-[#fdf2f2] border border-[#fde8e8] rounded-lg p-3 mb-5 text-[#b91c1c] text-[0.85rem]">
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-brand-navy-dark text-white p-3.5 text-[0.95rem] font-semibold rounded-lg transition-all hover:bg-[#1b2e46] active:translate-y-px">
              <ShieldCheck size={16} />
              <span>Verify Password</span>
            </button>
          </form>

          <button onClick={onBack} className="inline-flex items-center gap-1.5 bg-transparent border-none text-text-mid text-[0.85rem] cursor-pointer transition-colors duration-200 px-3 py-2 rounded-md hover:text-brand-navy-dark hover:bg-[#f5f5f5]">
            <ArrowLeft size={14} />
            Back to home
          </button>
        </div>
      </div>
    )
  }

  // Render Sheet Dashboard View
  return (
    <div className="max-w-[1200px] mt-[120px] mb-20 mx-auto px-5">
      <header className="flex items-center justify-between flex-wrap gap-5 border-b border-border pb-6 mb-[30px] max-[768px]:flex-col max-[768px]:items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#eefdf4] border border-[#d1fae5] rounded-xl flex items-center justify-center text-[#10b981]">
            <FileSpreadsheet size={24} className="text-[#10b981]" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-head)] text-[1.8rem] font-extrabold text-brand-navy-dark mb-1">Kids City Management Console</h1>
            <p className="text-sm text-text-mid">
              Monitor customer callback requests and checkout inquiries in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 max-[768px]:w-full max-[768px]:justify-start">
          <button onClick={fetchAllData} className="inline-flex items-center gap-2 bg-white border border-border text-brand-navy-dark px-4 py-2.5 text-[0.85rem] font-semibold rounded-lg transition-all hover:bg-[#fafafa] hover:border-[#bbb] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-white border border-border text-brand-navy-dark px-4 py-2.5 text-[0.85rem] font-semibold rounded-lg transition-all hover:bg-[#fafafa] hover:border-[#bbb] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeTab === 'callbacks' ? requests.length === 0 : inquiries.length === 0}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button onClick={handleLogout} className="inline-flex items-center gap-2 bg-[#fff5f5] border border-[#fed7d7] text-[#c53030] px-4 py-2.5 text-[0.85rem] font-semibold rounded-lg transition-all hover:bg-[#fff0f0] hover:border-[#feb2b2]">
            <LogOut size={14} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div className="grid grid-cols-2 max-[768px]:grid-cols-1 gap-5 max-[768px]:gap-3 mb-[30px]">
        <div className="bg-white border border-border rounded-2xl p-[20px_24px] flex flex-col">
          <span className="text-[0.85rem] font-semibold text-text-mid uppercase tracking-[0.05em] mb-1.5">Total Callbacks</span>
          <span className="text-[2rem] font-[800] text-brand-navy-dark">{requests.length}</span>
        </div>
        <div className="bg-white border border-border rounded-2xl p-[20px_24px] flex flex-col">
          <span className="text-[0.85rem] font-semibold text-text-mid uppercase tracking-[0.05em] mb-1.5">Total Inquiries</span>
          <span className="text-[2rem] font-[800] text-brand-navy-dark">{inquiries.length}</span>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex gap-3 mb-6 border-b-2 border-border pb-0.5">
        <button
          className={`px-5 py-2.5 font-[family-name:var(--font-head)] font-semibold text-[0.95rem] bg-transparent border-none cursor-pointer relative transition-colors duration-150 ${activeTab === 'callbacks' ? 'text-brand-terracotta after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:height-[3px] after:bg-brand-terracotta after:rounded-sm' : 'text-text-muted hover:text-brand-navy'}`}
          onClick={() => {
            setActiveTab('callbacks')
            setSearchTerm('')
          }}
        >
          Callback Requests ({requests.length})
        </button>
        <button
          className={`px-5 py-2.5 font-[family-name:var(--font-head)] font-semibold text-[0.95rem] bg-transparent border-none cursor-pointer relative transition-colors duration-150 ${activeTab === 'inquiries' ? 'text-brand-terracotta after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:height-[3px] after:bg-brand-terracotta after:rounded-sm' : 'text-text-muted hover:text-brand-navy'}`}
          onClick={() => {
            setActiveTab('inquiries')
            setSearchTerm('')
          }}
        >
          Customer Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Control row with search */}
      <div className="flex items-center justify-between gap-5 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-[480px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-mid pointer-events-none" />
          <input
            type="text"
            placeholder={
              activeTab === 'callbacks'
                  ? "Search by phone, product name, or source..."
                  : "Search by Name, Phone, Inquiry ID, or item details..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2.5 pl-10 pr-4 text-sm border border-border rounded-lg bg-white text-brand-navy-dark transition-all duration-200 focus:outline-none focus:border-brand-navy-dark focus:ring-3 focus:ring-[#0d1b28]/6"
          />
        </div>
        <div className="text-sm text-text-mid font-medium">
          Showing {activeTab === 'callbacks' ? filteredRequests.length : filteredInquiries.length} logs
        </div>
      </div>

      {/* Spreadsheet Content */}
      <div className="bg-white border border-border rounded-2xl overflow-x-auto shadow-sm min-h-[320px] relative">
        {loading && (activeTab === 'callbacks' ? requests.length === 0 : inquiries.length === 0) ? (
          <div className="py-20 px-5 flex flex-col items-center justify-center gap-3 text-center text-text-mid text-[0.95rem]">
            <RefreshCw size={24} className="animate-spin" />
            <p>Loading database records...</p>
          </div>
        ) : (activeTab === 'callbacks' ? filteredRequests.length === 0 : filteredInquiries.length === 0) ? (
          <div className="py-20 px-5 flex flex-col items-center justify-center gap-3 text-center text-text-mid text-[0.95rem]">
            <FileSpreadsheet size={32} style={{ color: 'var(--text-muted)' }} />
            <p>No records matching your search query.</p>
          </div>
        ) : activeTab === 'callbacks' ? (
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide" style={{ width: '60px' }}>Row</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Request Date &amp; Time</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Customer Phone</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Product Interest</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Source</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide" style={{ width: '100px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req, index) => (
                <tr key={req.id || index} className="hover:bg-[#fcfdfe]">
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle text-text-mid font-semibold">{index + 1}</td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-text-mid shrink-0" />
                      <span>{formatDate(req.created_at)}</span>
                    </div>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <a href={`tel:${req.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 text-brand-navy-dark text-decoration-none px-2 py-1 bg-[#f0f4f8] rounded-md transition-colors duration-150 hover:bg-[#e1eaf2] hover:text-[#0b1521]">
                      <Phone size={13} className="text-text-mid shrink-0" />
                      <strong>{req.phone}</strong>
                    </a>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={13} className="text-text-mid shrink-0" />
                      <span>{req.product_name || 'Generic Shop Inquiry'}</span>
                    </div>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <span className="inline-block text-[0.75rem] font-semibold px-2 py-1 bg-[#f1f3f5] rounded-full text-[#495057]">{req.source || 'product_detail_popup'}</span>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle" style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteCallback(req.id)}
                      className="bg-transparent border-none text-text-mid cursor-pointer p-2 rounded-md transition-all hover:text-[#ef4444] hover:bg-[#fff5f5] inline-flex items-center justify-center"
                      disabled={deleteLoadingId === req.id}
                      aria-label="Delete log entry"
                    >
                      {deleteLoadingId === req.id ? (
                        <RefreshCw size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide" style={{ width: '60px' }}>Row</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Inquiry ID</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Date &amp; Time</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Customer Details</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Items &amp; Sizes Inquired</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide">Total Value</th>
                <th className="bg-[#f7f9fa] text-brand-navy-dark font-bold p-[14px_20px] border-b-2 border-border text-[0.85rem] uppercase tracking-wide" style={{ width: '100px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inq, index) => (
                <tr key={inq.id || index} className="hover:bg-[#fcfdfe]">
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle text-text-mid font-semibold">{index + 1}</td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <strong>#{inq.inquiry_id}</strong>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-text-mid shrink-0" />
                      <span>{formatDate(inq.created_at)}</span>
                    </div>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-[0.88rem]">
                        <User size={13} className="text-text-mid shrink-0" />
                        <strong>{inq.name}</strong>
                      </span>
                      {inq.phone && inq.phone !== 'N/A (WhatsApp Direct)' ? (
                        <a href={`tel:${inq.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 text-brand-navy-dark text-decoration-none px-2 py-1 bg-[#f0f4f8] rounded-md transition-colors duration-150 hover:bg-[#e1eaf2] hover:text-[#0b1521] text-[0.82rem]">
                          <Phone size={11} className="text-text-mid shrink-0" />
                          {inq.phone}
                        </a>
                      ) : (
                        <span className="text-[0.8rem] text-text-muted ml-[18px]">
                          Direct WhatsApp Order
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <div className="flex flex-col gap-1 max-w-[280px]">
                      {(inq.items || []).map((item, idx) => (
                        <div key={idx} className="text-[0.85rem] text-brand-navy leading-normal">
                          • {item.name} <span className="text-brand-terracotta font-semibold">({item.size})</span> — {item.price}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle">
                    <span className="font-extrabold text-brand-terracotta">{inq.total_price}</span>
                  </td>
                  <td className="p-[16px_20px] border-b border-border text-brand-navy-dark align-middle" style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="bg-transparent border-none text-text-mid cursor-pointer p-2 rounded-md transition-all hover:text-[#ef4444] hover:bg-[#fff5f5] inline-flex items-center justify-center"
                      disabled={deleteLoadingId === inq.id}
                      aria-label="Delete inquiry entry"
                    >
                      {deleteLoadingId === inq.id ? (
                        <RefreshCw size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
