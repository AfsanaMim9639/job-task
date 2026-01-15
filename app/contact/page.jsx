'use client'

import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  User,
  Building2,
  CheckCircle,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'info@dataplatform.bd',
      subDetails: 'support@dataplatform.bd',
      link: 'mailto:info@dataplatform.bd'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+880 1234-567890',
      subDetails: '+880 9876-543210',
      link: 'tel:+8801234567890'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'House 123, Road 45, Gulshan 2',
      subDetails: 'Dhaka 1212, Bangladesh',
      link: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Sunday - Thursday',
      subDetails: '9:00 AM - 6:00 PM',
      link: null
    }
  ]

  const departments = [
    {
      title: 'General Inquiries',
      email: 'info@dataplatform.bd',
      description: 'For general questions about our platform and services'
    },
    {
      title: 'Technical Support',
      email: 'support@dataplatform.bd',
      description: 'For technical issues and API support'
    },
    {
      title: 'Data Partnerships',
      email: 'partners@dataplatform.bd',
      description: 'For organizations interested in data sharing'
    },
    {
      title: 'Media & Press',
      email: 'media@dataplatform.bd',
      description: 'For media inquiries and press releases'
    }
  ]

  const faqs = [
    {
      question: 'How can I access the datasets?',
      answer: 'All datasets are freely available on our platform. Simply browse or search for the data you need and download it in your preferred format.'
    },
    {
      question: 'Is there an API available?',
      answer: 'Yes, we provide a comprehensive API for developers. Visit our API documentation page for details on endpoints and authentication.'
    },
    {
      question: 'Can I contribute data?',
      answer: 'Absolutely! We welcome data contributions from verified sources. Contact our partnerships team to discuss the process.'
    },
    {
      question: 'How often is the data updated?',
      answer: 'Update frequency varies by dataset. Most are updated quarterly or annually, while some real-time data is updated daily.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have questions or feedback? We'd love to hear from you. Our team is here to help.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 text-center hover:border-[#00d4ff]/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-[#00d4ff] hover:text-[#0066ff] transition-colors text-sm block mb-1">
                    {info.details}
                  </a>
                ) : (
                  <p className="text-[#00d4ff] text-sm mb-1">{info.details}</p>
                )}
                <p className="text-gray-400 text-sm">{info.subDetails}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
              <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

              {isSubmitted ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
                  <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-white mb-2">
                      Organization (Optional)
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                        placeholder="Your Company/Organization"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-[#0d1428] border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Departments */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Contact by Department</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="pb-4 border-b border-[#00d4ff]/10 last:border-0 last:pb-0">
                    <h4 className="text-white font-semibold mb-1">{dept.title}</h4>
                    <a href={`mailto:${dept.email}`} className="text-[#00d4ff] text-sm hover:text-[#0066ff] transition-colors block mb-2">
                      {dept.email}
                    </a>
                    <p className="text-gray-400 text-xs">{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex items-center gap-3 p-3 bg-[#0d1428] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                  <Linkedin className="text-[#00d4ff]" size={20} />
                  <span className="text-white text-sm font-medium">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-[#0d1428] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                  <Twitter className="text-[#00d4ff]" size={20} />
                  <span className="text-white text-sm font-medium">Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-[#0d1428] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                  <Facebook className="text-[#00d4ff]" size={20} />
                  <span className="text-white text-sm font-medium">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-[#0d1428] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                  <Instagram className="text-[#00d4ff]" size={20} />
                  <span className="text-white text-sm font-medium">Instagram</span>
                </a>
              </div>
            </div>

            {/* Office Hours Note */}
            <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#0066ff]/10 border border-[#00d4ff]/20 rounded-2xl p-6">
              <Clock className="text-[#00d4ff] mb-3" size={24} />
              <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
              <p className="text-gray-400 text-sm">
                We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 hover:border-[#00d4ff]/30 transition-all">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl overflow-hidden">
          <div className="aspect-video relative">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0977669447937!2d90.41440831498193!3d23.780573084578942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a1c5678bb7%3A0x5a7c65e5e7c8f4a0!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1642345678901!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-[#1a2332]/95 backdrop-blur-sm border border-[#00d4ff]/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Our Office Location</h3>
                  <p className="text-gray-300 text-sm mb-3">House 123, Road 45, Gulshan 2, Dhaka 1212, Bangladesh</p>
                  <a 
                    href="https://www.google.com/maps/place/Gulshan+2,+Dhaka/@23.7805731,90.4144083,17z" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform text-sm"
                  >
                    <MapPin size={16} />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  )
}