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
import styles from './CallbackSheetView.module.css'

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
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <div className={styles.lockIconCircle}>
              <Lock size={28} className={styles.lockIcon} />
            </div>
            <h1 className={styles.authTitle}>Kids City Console</h1>
            <p className={styles.authSub}>Access requires administrator authentication</p>
          </div>

          <form onSubmit={handleLogin} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="admin-password" className={styles.label}>
                Enter Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
                autoFocus
                required
              />
            </div>

            {error && (
              <div className={styles.errorAlert}>
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className={styles.authSubmitBtn}>
              <ShieldCheck size={16} />
              <span>Verify Password</span>
            </button>
          </form>

          <button onClick={onBack} className={styles.backHomeBtn}>
            <ArrowLeft size={14} />
            Back to home
          </button>
        </div>
      </div>
    )
  }

  // Render Sheet Dashboard View
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.sheetIconCircle}>
            <FileSpreadsheet size={24} className={styles.sheetHeaderIcon} />
          </div>
          <div>
            <h1 className={styles.title}>Kids City Management Console</h1>
            <p className={styles.sub}>
              Monitor customer callback requests and checkout inquiries in real-time.
            </p>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button onClick={fetchAllData} className={styles.btnAction} disabled={loading}>
            <RefreshCw size={14} className={loading ? styles.spinner : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className={styles.btnAction}
            disabled={activeTab === 'callbacks' ? requests.length === 0 : inquiries.length === 0}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button onClick={handleLogout} className={styles.btnDanger}>
            <LogOut size={14} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Callbacks</span>
          <span className={styles.statValue}>{requests.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Inquiries</span>
          <span className={styles.statValue}>{inquiries.length}</span>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className={styles.tabToggleRow}>
        <button
          className={`${styles.tabToggleBtn} ${activeTab === 'callbacks' ? styles.tabToggleActive : ''}`}
          onClick={() => {
            setActiveTab('callbacks')
            setSearchTerm('')
          }}
        >
          Callback Requests ({requests.length})
        </button>
        <button
          className={`${styles.tabToggleBtn} ${activeTab === 'inquiries' ? styles.tabToggleActive : ''}`}
          onClick={() => {
            setActiveTab('inquiries')
            setSearchTerm('')
          }}
        >
          Customer Inquiries ({inquiries.length})
        </button>
      </div>

      {/* Control row with search */}
      <div className={styles.controlRow}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder={
              activeTab === 'callbacks'
                ? "Search by phone, product name, or source..."
                : "Search by Name, Phone, Inquiry ID, or item details..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.resultCount}>
          Showing {activeTab === 'callbacks' ? filteredRequests.length : filteredInquiries.length} logs
        </div>
      </div>

      {/* Spreadsheet Content */}
      <div className={styles.tableWrapper}>
        {loading && (activeTab === 'callbacks' ? requests.length === 0 : inquiries.length === 0) ? (
          <div className={styles.centeredMessage}>
            <RefreshCw size={24} className={styles.spinner} />
            <p>Loading database records...</p>
          </div>
        ) : (activeTab === 'callbacks' ? filteredRequests.length === 0 : filteredInquiries.length === 0) ? (
          <div className={styles.centeredMessage}>
            <FileSpreadsheet size={32} style={{ color: 'var(--text-muted)' }} />
            <p>No records matching your search query.</p>
          </div>
        ) : activeTab === 'callbacks' ? (
          <table className={styles.sheetTable}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Row</th>
                <th>Request Date &amp; Time</th>
                <th>Customer Phone</th>
                <th>Product Interest</th>
                <th>Source</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req, index) => (
                <tr key={req.id || index}>
                  <td className={styles.rowIdx}>{index + 1}</td>
                  <td>
                    <div className={styles.cellIconWrap}>
                      <Calendar size={13} className={styles.cellIcon} />
                      <span>{formatDate(req.created_at)}</span>
                    </div>
                  </td>
                  <td>
                    <a href={`tel:${req.phone.replace(/\s+/g, '')}`} className={styles.phoneLink}>
                      <Phone size={13} className={styles.cellIcon} />
                      <strong>{req.phone}</strong>
                    </a>
                  </td>
                  <td>
                    <div className={styles.cellIconWrap}>
                      <ShoppingBag size={13} className={styles.cellIcon} />
                      <span>{req.product_name || 'Generic Shop Inquiry'}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.sourceTag}>{req.source || 'product_detail_popup'}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteCallback(req.id)}
                      className={styles.deleteBtn}
                      disabled={deleteLoadingId === req.id}
                      aria-label="Delete log entry"
                    >
                      {deleteLoadingId === req.id ? (
                        <RefreshCw size={13} className={styles.spinner} />
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
          <table className={styles.sheetTable}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Row</th>
                <th>Inquiry ID</th>
                <th>Date &amp; Time</th>
                <th>Customer Details</th>
                <th>Items &amp; Sizes Inquired</th>
                <th>Total Value</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inq, index) => (
                <tr key={inq.id || index}>
                  <td className={styles.rowIdx}>{index + 1}</td>
                  <td>
                    <strong>#{inq.inquiry_id}</strong>
                  </td>
                  <td>
                    <div className={styles.cellIconWrap}>
                      <Calendar size={13} className={styles.cellIcon} />
                      <span>{formatDate(inq.created_at)}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.88rem' }}>
                        <User size={13} className={styles.cellIcon} />
                        <strong>{inq.name}</strong>
                      </span>
                      {inq.phone && inq.phone !== 'N/A (WhatsApp Direct)' ? (
                        <a href={`tel:${inq.phone.replace(/\s+/g, '')}`} className={styles.phoneLink} style={{ fontSize: '0.82rem' }}>
                          <Phone size={11} className={styles.cellIcon} />
                          {inq.phone}
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '18px' }}>
                          Direct WhatsApp Order
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.itemsListCell}>
                      {(inq.items || []).map((item, idx) => (
                        <div key={idx} className={styles.itemBullet}>
                          • {item.name} <span style={{ color: 'var(--brand-terracotta)', fontWeight: '600' }}>({item.size})</span> — {item.price}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: '800', color: 'var(--brand-terracotta)' }}>{inq.total_price}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className={styles.deleteBtn}
                      disabled={deleteLoadingId === inq.id}
                      aria-label="Delete inquiry entry"
                    >
                      {deleteLoadingId === inq.id ? (
                        <RefreshCw size={13} className={styles.spinner} />
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

