import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Globe,
  Mail,
  Lock,
  CheckCircle2,
  Heart,
  LogOut,
  ArrowUpRight,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';
import { useApp } from './AppContext';
import '../styles/safehaven-footer.css';

// --- Main Footer Component ---
export function Footer() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isSurvivor = user?.role === 'SURVIVOR';
  const isProfessional = [
    'COUNSELOR',
    'MEDICAL_PROFESSIONAL',
    'LEGAL_ADVISOR',
    'MODERATOR',
    'ADMIN',
  ].includes(user?.role || '');

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === 'en' ? 'am' : 'en'));
  const handleSignOut = () => {
    navigate('/login');
  };
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      <footer className="sh-footer" role="contentinfo">
        {/* Gradient Accent Line */}
        <div className="sh-footer-accent" />

        <div className="sh-footer-main">
          <div className="sh-footer-container">
            {/* Brand & Mission */}
            <div className="sh-footer-brand">
              <div className="brand-logo">
                <Shield className="logo-icon" />
                <span className="brand-name">SAFEHAVEN</span>
              </div>
              <p className="brand-tagline">
                Your safety is our priority. Confidential support and resources
                available 24/7.
              </p>
              <div className="security-badge">
                <Lock className="h-3.5 w-3.5" />
                <span>256-bit E2E Encryption</span>
                <Sparkles className="h-3 w-3" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="sh-footer-section">
              <h4 className="section-title">Platform</h4>
              <nav className="section-links">
                <Link to="/" className="footer-link">
                  <span>Home</span>
                  <ArrowUpRight className="link-arrow" />
                </Link>
                {isSurvivor && (
                  <>
                    <Link to="/report" className="footer-link">
                      <span>Report Incident</span>
                      <ArrowUpRight className="link-arrow" />
                    </Link>
                    <Link to="/survivor/my-cases" className="footer-link">
                      <span>My Cases</span>
                      <ArrowUpRight className="link-arrow" />
                    </Link>
                    <Link to="/resources" className="footer-link">
                      <span>Resources</span>
                      <ArrowUpRight className="link-arrow" />
                    </Link>
                  </>
                )}
                {isProfessional && (
                  <>
                    <Link to="/reports" className="footer-link">
                      <span>Cases</span>
                      <ArrowUpRight className="link-arrow" />
                    </Link>
                    <Link to="/counselor/audit" className="footer-link">
                      <span>Audit Logs</span>
                      <ArrowUpRight className="link-arrow" />
                    </Link>
                  </>
                )}
                {!isSurvivor && !isProfessional && (
                  <>
                    <Link to="/report" className="footer-link">
                      <span>Report</span>
                      <ArrowUpRight className="link-arrow" />
                    </Link>
                    <Link to="/support-services" className="footer-link">
                      <span>Support</span>
                      <ArrowUpRight className="link-arrow" />
                    </Link>
                  </>
                )}
              </nav>
            </div>

            {/* Legal & Trust */}
            <div className="sh-footer-section">
              <h4 className="section-title">Legal</h4>
              <nav className="section-links">
                <Link to="/privacy" className="footer-link">
                  <span>Privacy Policy</span>
                  <ArrowUpRight className="link-arrow" />
                </Link>
                <Link to="/terms" className="footer-link">
                  <span>Terms of Service</span>
                  <ArrowUpRight className="link-arrow" />
                </Link>
                <Link to="/accessibility" className="footer-link">
                  <span>Accessibility</span>
                  <ArrowUpRight className="link-arrow" />
                </Link>
                <Link to="/transparency" className="footer-link">
                  <span>Transparency</span>
                  <ArrowUpRight className="link-arrow" />
                </Link>
              </nav>
              <div className="compliance-badges">
                <div className="badge-item">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>WCAG AA</span>
                </div>
                <div className="badge-item">
                  <Shield className="h-3.5 w-3.5" />
                  <span>ISO 27001</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="sh-footer-section">
              <h4 className="section-title">Stay Updated</h4>
              <p className="newsletter-text">
                Get security updates and resources
              </p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
              <div className="social-links">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="sh-footer-bottom">
          <div className="sh-footer-container">
            <div className="bottom-content">
              <div className="copyright">
                <span className="brand-mark">SAFEHAVEN</span>
                <span className="separator">·</span>
                <span>© 2025 All rights reserved</span>
              </div>
              <div className="bottom-meta">
                <div className="meta-item">
                  <Heart className="h-3 w-3" />
                  <span>Built for humanity</span>
                </div>
                {user && (
                  <button onClick={handleSignOut} className="logout-btn">
                    <LogOut className="h-3 w-3" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
