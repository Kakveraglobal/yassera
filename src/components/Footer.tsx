import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'CUSTOMER SERVICES',
      links: [
        'Contact Us',
        'FAQ',
        'Track Your Order',
        'Shipping & Returns',
        'Care & Repair',
        'Book an Appointment'
      ]
    },
    {
      title: 'THE COMPANY',
      links: [
        'About Us',
        'Careers',
        'Latest News',
        'Sustainability',
        'Art & Culture',
        'Foundation'
      ]
    },
    {
      title: 'LEGAL',
      links: [
        'Terms & Conditions',
        'Privacy Policy',
        'Accessibility',
        'Cookie Settings',
        'Legal Notice'
      ]
    }
  ];

  return (
    <footer className="bg-neutral-900 text-white mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-light tracking-wider mb-6">
              YASSÉRA
            </h3>
            <p className="text-sm font-light text-gray-400 leading-relaxed mb-6">
              Since 1854, bringing perfection to the art of travel and elegance to everyday life.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-light tracking-widest mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-sm font-light text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-xs font-light text-gray-400">
              <span>Ship to: United States</span>
              <span>English (US)</span>
            </div>
            <p className="text-xs font-light text-gray-400">
              © 2025 YASSÉRA. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center items-center gap-4 opacity-50">
            <span className="text-xs font-light text-gray-400">PAYMENT METHODS:</span>
            <div className="flex gap-3">
              {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL', 'KLARNA'].map((method) => (
                <div
                  key={method}
                  className="px-3 py-1 border border-gray-700 text-xs font-light text-gray-400"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
