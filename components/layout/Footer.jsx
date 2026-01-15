export default function Footer() {
  const footerSections = [
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Community', href: '#' }
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Mission', href: '#' },
        { name: 'Team', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Data License', href: '#' }
      ]
    }
  ]

  return (
    <footer className="bg-[#0d1428] border-t border-[#00d4ff]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BD</span>
              </div>
              <span className="text-xl font-bold gradient-text">Open Data</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Bangladesh with accessible, transparent, and actionable data.
            </p>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4 text-base">{section.title}</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-[#00d4ff] transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="border-t border-[#00d4ff]/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2026 BD Open Data Visualizer. All rights reserved.
        </div>
      </div>
    </footer>
  )
}