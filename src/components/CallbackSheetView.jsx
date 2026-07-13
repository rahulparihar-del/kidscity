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
  AlertTriangle
} from 'lucide-react'
import styles from './CallbackSheetView.module.css'

export default function CallbackSheetView({ onBack }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('callback_sheet_auth') === 'true'
  })
  const [error, setError] = useState('')
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteLoadingId, setDeleteLoadingId] = useState(null)

  // Fetch callback requests from Supabase
  const fetchRequests = async () => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const { data, error: dbError } = await supabase
        .from('callback_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (dbError) throw dbError
      setRequests(data || [])
    } catch (err) {
      console.error('Error fetching callback requests:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests()
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
  }

  // Handle Delete Request
  const handleDelete = async (id) => {
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

  // Export to CSV
  const handleExportCSV = () => {
    if (requests.length === 0) return

    const headers = ['ID', 'Date & Time', 'Phone Number', 'Product Interest', 'Source']
    const rows = requests.map((r) => [
      r.id,
      new Date(r.created_at).toLocaleString('en-IN'),
      r.phone,
      r.product_name || 'N/A',
      r.source || 'product_detail_popup'
    ])

    // Generate CSV contents escaping commas/quotes
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
      `kidscity_callbacks_${new Date().toISOString().split('T')[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter requests based on search term
  const filteredRequests = requests.filter((r) => {
    const search = searchTerm.toLowerCase()
    const phoneMatch = r.phone && r.phone.toLowerCase().includes(search)
    const productMatch = r.product_name && r.product_name.toLowerCase().includes(search)
    const sourceMatch = r.source && r.source.toLowerCase().includes(search)
    return phoneMatch || productMatch || sourceMatch
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
            <h1 className={styles.title}>Callback Request Sheet</h1>
            <p className={styles.sub}>
              Manage phone call-back requests submitted by customers looking at items.
            </p>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button onClick={fetchRequests} className={styles.btnAction} disabled={loading}>
            <RefreshCw size={14} className={loading ? styles.spinner : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className={styles.btnAction}
            disabled={requests.length === 0}
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
          <span className={styles.statLabel}>Total Requests</span>
          <span className={styles.statValue}>{requests.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Today's Requests</span>
          <span className={styles.statValue}>
            {
              requests.filter(
                (r) =>
                  new Date(r.created_at).toDateString() === new Date().toDateString()
              ).length
            }
          </span>
        </div>
      </div>

      {/* Control row with search */}
      <div className={styles.controlRow}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by phone, product name, or source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.resultCount}>
          Showing {filteredRequests.length} of {requests.length} logs
        </div>
      </div>

      {/* Spreadsheet Content */}
      <div className={styles.tableWrapper}>
        {loading && requests.length === 0 ? (
          <div className={styles.centeredMessage}>
            <RefreshCw size={24} className={styles.spinner} />
            <p>Loading callback requests database...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className={styles.centeredMessage}>
            <FileSpreadsheet size={32} style={{ color: 'var(--text-muted)' }} />
            <p>No callback requests matching your search.</p>
          </div>
        ) : (
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
                      onClick={() => handleDelete(req.id)}
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
        )}
      </div>
    </div>
  )
}
