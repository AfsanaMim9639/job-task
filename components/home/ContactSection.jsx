// components/home/ContactSection.jsx
import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1C2B39]">Get in Touch</h2>
          <p className="text-xl text-gray-600">Have questions? We'd love to hear from you</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition"
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#2D3D52] to-[#415169] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;