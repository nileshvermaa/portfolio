import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactMe = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-apple-dark pt-32 pb-24 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl p-8 md:p-12 rounded-3xl bg-[#1d1d1f]/50 backdrop-blur-xl border border-white/5 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-white/5 blur-[50px] pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Contact <span className="text-gradient">Me</span>.
          </h1>
          <p className="text-apple-gray text-lg">
            Have a question, proposal, or just want to say hello? Feel free to reach out.
          </p>
        </div>

        <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:bg-black/80 transition-all font-medium"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:bg-black/80 transition-all font-medium"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:bg-black/80 transition-all font-medium resize-none"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-white text-black font-semibold rounded-xl py-4 hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] mt-2"
          >
            Send Message
          </button>

          {status && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-medium mt-2 text-white/80"
            >
              {status}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default ContactMe;
