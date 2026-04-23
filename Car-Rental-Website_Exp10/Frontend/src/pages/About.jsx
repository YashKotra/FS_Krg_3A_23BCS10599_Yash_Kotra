import React from "react";
import { FaLinkedin, FaGithub, FaPhone, FaEnvelope } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <section className="rounded-[2rem] border border-gray-800 bg-gradient-to-b from-[#08090e] via-[#0a0b11] to-[#111827] p-8 shadow-2xl shadow-blue-500/20">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-blue-300 mb-4">
                About Me
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-6">
                I'm <span className="text-blue-400">Yash Kotra</span>
              </h1>
              <p className="max-w-3xl text-lg text-gray-300 leading-8 mb-8">
                I create polished digital experiences by combining clean UI,
                robust backend systems, and modern deployment workflows. My
                focus is on building full-stack applications that deliver value
                through fast performance, secure authentication, and intuitive
                usability.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-lg shadow-blue-500/10">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Contact
                  </h2>
                  <div className="space-y-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-blue-400" />
                      <span>+91 7056008838</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-400" />
                      <span>yash2019kotra@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaLinkedin className="text-blue-400" />
                      <a
                        href="https://www.linkedin.com/in/yash-kotra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300 transition"
                      >
                        linkedin.com/in/yash-kotra
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaGithub className="text-blue-400" />
                      <a
                        href="https://github.com/YashKotra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300 transition"
                      >
                        github.com/YashKotra
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-lg shadow-blue-500/10">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Education
                  </h2>
                  <div className="space-y-5 text-gray-300 text-sm">
                    <div>
                      <p className="font-semibold text-white">
                        Chandigarh University, Mohali, Punjab
                      </p>
                      <p>BE Computer Science — CGPA: 8.66/10</p>
                      <p className="text-gray-500">Aug. 2023 – July 2027</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        Kendriya Vidyalaya No.II Ambala Cantt
                      </p>
                      <p>Senior Secondary Education (Class 12) — 86.67%</p>
                      <p className="text-gray-500">Apr. 2022 – March 2023</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        Kendriya Vidyalaya No.II Ambala Cantt
                      </p>
                      <p>Secondary Education (Class 10) — 93%</p>
                      <p className="text-gray-500">Apr. 2019 – March 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-gray-800 bg-black p-8 shadow-xl shadow-blue-500/15">
              <div className="flex flex-col items-center justify-center gap-4 text-center mb-8">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-950 text-4xl font-bold text-white ring-2 ring-blue-400">
                  YK
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-blue-400 mb-2">
                    Full Stack Developer
                  </p>
                  <h2 className="text-3xl font-bold text-white">
                    Building product-grade web experiences.
                  </h2>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Java",
                    "JavaScript",
                    "SQL",
                    "HTML5",
                    "CSS",
                    "React.js",
                    "Node.js",
                    "Express.js",
                    "Redux",
                    "REST APIs",
                    "Tailwind",
                    "Bootstrap",
                    "EJS",
                    "MongoDB",
                    "MySQL",
                    "OOP",
                    "Data Structures",
                    "Problem Solving",
                    "Project Management",
                    "Git",
                    "GitHub",
                    "VS Code",
                    "Postman",
                    "Hoppscotch",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Achievements
                </h3>
                <ul className="space-y-4 text-gray-300 text-sm">
                  <li>
                    <span className="font-semibold text-white">LeetCode:</span>{" "}
                    1818 contest rating with 800+ problems solved.
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Codeforces:
                    </span>{" "}
                    Rated Pupil with a peak rating of 1317.
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Certifications:
                    </span>{" "}
                    NCC ‘A’ Certificate and NPTEL Cloud Computing Silver Medal.
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Leadership:
                    </span>{" "}
                    DCPD Class Representative and Academic Class Representative.
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <section className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-gray-800 bg-gray-950 p-8 shadow-xl shadow-blue-500/10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Featured Projects
              </h2>
              <div className="space-y-5 text-gray-300 text-sm">
                {[
                  {
                    title: "Car Rental Booking Website",
                    period: "Sept 2025 – Dec 2025",
                    items: [
                      "Built a scalable car rental platform with secure JWT authentication, RESTful APIs, and protected routes.",
                      "Designed end-to-end booking workflow including car listings, availability, and reservation lifecycle management.",
                      "Built a role-based admin dashboard for inventory, bookings, and user management.",
                      "Integrated Mapbox for precise pickup selection and Razorpay for secure payments.",
                      "Technologies: React.js, Node.js, Express.js, MongoDB, Redux Toolkit, JWT, Razorpay, Vercel.",
                    ],
                  },
                  {
                    title: "Clothing E-Commerce Website",
                    period: "Aug 2025 – Sept 2025",
                    items: [
                      "Delivered a full-stack MERN app with JWT authentication and role-based access control.",
                      "Implemented product catalog, cart, wishlist, and order tracking.",
                      "Integrated Razorpay for secure transaction flows.",
                      "Optimized images with Cloudinary and built a responsive Tailwind UI.",
                      "Technologies: React.js, Node.js, Express.js, MongoDB, Redux Toolkit, JWT, Razorpay, Vercel.",
                    ],
                  },
                  {
                    title: "WanderLust – Hotel Booking Website",
                    period: "June 2025 – July 2025",
                    items: [
                      "Engineered a hotel booking platform with OAuth authentication and secure session handling.",
                      "Enabled location-aware listings using Mapbox geolocation services.",
                      "Implemented multi-image upload workflows with Cloudinary.",
                      "Designed scalable MVC architecture with modular routing and error handling.",
                      "Technologies: Node.js, Express, MongoDB, EJS, Cloudinary, Mapbox, Bootstrap, Vercel, OAuth.",
                    ],
                  },
                ].map((project) => (
                  <article
                    key={project.title}
                    className="rounded-3xl border border-gray-800 bg-black p-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.25em] text-blue-400">
                        {project.period}
                      </span>
                    </div>
                    <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300">
                      {project.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-800 bg-gray-950 p-8 shadow-xl shadow-blue-500/10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Achievements & Roles
              </h2>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="rounded-3xl border border-gray-800 bg-black p-5">
                  <p className="font-semibold text-white mb-2">
                    LeetCode Performance
                  </p>
                  <p>Attained 1818 contest rating with 800+ problems solved.</p>
                </li>
                <li className="rounded-3xl border border-gray-800 bg-black p-5">
                  <p className="font-semibold text-white mb-2">
                    Codeforces Rating
                  </p>
                  <p>Rated Pupil with a peak rating of 1317.</p>
                </li>
                <li className="rounded-3xl border border-gray-800 bg-black p-5">
                  <p className="font-semibold text-white mb-2">Leadership</p>
                  <p>
                    DCPD Class Representative and Academic Class Representative.
                  </p>
                </li>
                <li className="rounded-3xl border border-gray-800 bg-black p-5">
                  <p className="font-semibold text-white mb-2">
                    Certifications
                  </p>
                  <p>
                    NCC ‘A’ Certificate Holder and NPTEL Cloud Computing Silver
                    Medal.
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default About;
