/**
 * Admin Dashboard Page
 */

export const metadata = {
  title: 'Admin Dashboard | Mandatresetters Holdings',
  description: 'Admin panel for managing businesses, messages, and more.',
};

export default function AdminDashboard() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <div className="breadcrumb">
            <a href="/">Home</a> <span>/</span> <span>Admin</span>
          </div>
        </div>
      </section>

      <section className="page-content" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-4">
            <div className="card">
              <div className="card-content">
                <h3>
                  <i className="fas fa-building" style={{ color: 'var(--copper)' }}></i> Businesses
                </h3>
                <p className="stat-number">4</p>
                <p>Portfolio companies</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3>
                  <i className="fas fa-envelope" style={{ color: 'var(--copper)' }}></i> Messages
                </h3>
                <p className="stat-number" id="messageCount">0</p>
                <p>Contact submissions</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3>
                  <i className="fas fa-users" style={{ color: 'var(--copper)' }}></i> Users
                </h3>
                <p className="stat-number" id="userCount">0</p>
                <p>Registered users</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3>
                  <i className="fas fa-chart-line" style={{ color: 'var(--copper)' }}></i> Activity
                </h3>
                <p className="stat-number">100%</p>
                <p>System healthy</p>
              </div>
            </div>
          </div>

          <section className="section" style={{ marginTop: '40px' }}>
            <div className="section-header">
              <h2>Recent Contact Messages</h2>
              <p>Latest inquiries from potential partners</p>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <table style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--light-gray)' }}>
                    <th style={{ padding: '10px' }}>Name</th>
                    <th style={{ padding: '10px' }}>Email</th>
                    <th style={{ padding: '10px' }}>Subject</th>
                    <th style={{ padding: '10px' }}>Date</th>
                  </tr>
                </thead>
                <tbody id="messagesTable">
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: 'var(--gray)' }}>
                      Loading messages...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h2>Admin Modules</h2>
              <p>Manage all system data</p>
            </div>
            <div className="grid grid-4">
              <a href="/users" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-users" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Users</span>
                </div>
              </a>
              <a href="/routes" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-map" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Routes</span>
                </div>
              </a>
              <a href="/bookings" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-ticket-alt" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Bookings</span>
                </div>
              </a>
              <a href="/rentals" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-box" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Rentals</span>
                </div>
              </a>
              <a href="/orders" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-shopping-cart" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Orders</span>
                </div>
              </a>
              <a href="/payments" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-credit-card" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Payments</span>
                </div>
              </a>
              <a href="/reviews" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-star" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Reviews</span>
                </div>
              </a>
              <a href="/messages" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div>
                  <i className="fas fa-envelope" style={{ display: 'block', fontSize: '24px', marginBottom: '8px' }}></i>
                  <span>Messages</span>
                </div>
              </a>
            </div>
          </section>
        </div>
      </section>

      <script>
        {`
          // Fetch and display messages
          async function loadMessages() {
            try {
              const res = await fetch('/api/admin/messages');
              if (!res.ok) throw new Error('Failed to load messages');
              const data = await res.json();
              const tbody = document.getElementById('messagesTable');
              
              if (data.data && data.data.length > 0) {
                tbody.innerHTML = data.data.slice(0, 5).map(msg => \`
                  <tr style="border-bottom: 1px solid var(--light-gray);">
                    <td style="padding: 10px;">\${msg.name}</td>
                    <td style="padding: 10px;">\${msg.email}</td>
                    <td style="padding: 10px;">\${msg.subject}</td>
                    <td style="padding: 10px;">\${new Date(msg.createdAt).toLocaleDateString()}</td>
                  </tr>
                \`).join('');
                document.getElementById('messageCount').textContent = data.data.length;
              }
            } catch (error) {
              console.error('Error loading messages:', error);
            }
          }
          
          loadMessages();
        `}
      </script>
    </>
  );
}
