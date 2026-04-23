import React, { useState } from "react";
import api from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/contact", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8 text-center">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-400 mb-6">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <span>📍</span>
                <span>123 Chandigarh</span>
              </div>

              <div className="flex items-center space-x-3">
                <span>📞</span>
                <span>+91 98XXXXXXX</span>
              </div>

              <div className="flex items-center space-x-3">
                <span>✉️</span>
                <span>supportTest@example.com</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-900 p-8 rounded-lg">
            {success ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Message Sent
                </h3>
                <p className="text-gray-400">
                  Thank you for contacting us. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 underline text-gray-300 hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-gray-800 text-gray-200 p-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-white outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition duration-200"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
