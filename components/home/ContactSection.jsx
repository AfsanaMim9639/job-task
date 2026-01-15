// components/home/ContactSection.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation on scroll
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-[#2D3D52]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#415169]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Mail className="w-12 h-12 text-[#2D3D52] mx-auto" />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-[#1C2B39]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions? We'd love to hear from you
          </motion.p>
        </motion.div>

        <motion.div 
          ref={formRef}
          className="relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                className="text-center"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1C2B39] mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you soon.</p>
              </motion.div>
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D3D52] focus:outline-none transition-all duration-300 resize-none"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button
                onClick={handleSubmit}
                className="group relative w-full bg-gradient-to-r from-[#2D3D52] to-[#415169] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                </span>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-6 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: '#2D3D52' }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Mail className="w-4 h-4" />
              </motion.div>
              <span>support@itemhub.com</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: '#2D3D52' }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Response within 24 hours</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;