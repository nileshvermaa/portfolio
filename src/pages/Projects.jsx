import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import ProjectPreviewPane from './ProjectPreviewPane';
import './Projects.css';

const projectData = [
  {
    title: 'Sandbox for Codenavigator',
    description: 'An automated sandbox deployment platform integrating UI, backend, and CI/CD to spin up demo environments on demand.',
    details: `This internal tooling project enables seamless deployment of isolated environments for product demos:
- A JavaScript-based UI button embedded in a WordPress site triggers the process.
- The button hits an Express.js backend hosted in Docker, which securely handles Jenkins credentials and manages job execution.
- Jenkins pulls, builds, dockerizes, and deploys a Java project to a remote server, returning the live URL.`,
    link: '#', 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
    accordionItems: [
      { title: "WordPress UI Integration", content: "A JS script deployed in WordPress displays a trigger button that initiates a sandbox deployment flow and polls the backend for deployment status." },
      { title: "Node.js Express Middleware", content: "Handles secure API calls from the UI, triggers Jenkins pipelines, and serves console outputs and deployment details to the frontend." },
      { title: "Jenkins CI/CD", content: "Builds and dockerizes a Java project from an internal Git repo and deploys it to a remote server, exposing the sandbox to customers." }
    ]
  },
  {
    title: 'Dynamic Jenkins CI/CD Pipeline',
    description: 'A multi-module CI/CD pipeline for building, testing, and Dockerizing Java projects with custom user environments.',
    details: 'Designed and implemented an advanced Jenkins pipeline using scripted Groovy syntax. It dynamically allocates PostgreSQL ports per user, builds Maven-based multi-module Java projects, handles resource constraints gracefully, packages Docker containers, and archives build artifacts with rollback capabilities.',
    link: '#', 
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop', 
    accordionItems: [
      { title: "Dynamic Port Allocation", content: "Each build session is assigned a unique PostgreSQL port by reserving entries in a shared database, ensuring isolated environments per user." },
      { title: "Modular Maven Builds", content: "Multiple Java modules are independently built and packaged using Maven, supporting efficient modular development." },
      { title: "Dockerization & Archiving", content: "Each successful build is Dockerized with custom tags and pushed to a private registry. Artifacts are archived for rollback and auditing." },
      { title: "Failure Handling & Cleanup", content: "Includes robust error handling and post-build cleanup logic. Frees up database reservations and resources to avoid port leakage." }
    ]
  },
  {
    title: 'Event-Driven Java Debugger Backend',
    description: 'A backend system for real-time debugging of Java programs by intercepting and analyzing JVM events to monitor variable states and program flow.',
    details: 'Contributed to the development of a Java-based debugger backend that leverages the Java Debug Interface (JDI) to capture runtime events such as method entry/exit, variable changes, and breakpoints. Implemented handlers to track and log variable values and control program execution flow for enhanced debugging capabilities.',
    link: '#', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', 
    accordionItems: [
      { title: "JVM Event Interception", content: "Used JDI to listen for events like breakpoints, variable modifications, and method invocations to enable dynamic inspection of the target program." },
      { title: "Variable State Tracking", content: "Tracked variable values during program execution and maintained a history of changes to aid in runtime analysis and debugging." },
      { title: "Custom Debug Operations", content: "Implemented custom handlers to pause/resume execution, inspect call stacks, and manipulate program flow based on debug events." }
    ]
  },
  {
    title: "Java Bus Management System",
    description: "A native Java Swing-based bus management system with MySQL integration, offering full CRUD operations for buses, drivers, conductors, routes, passengers, and tours.",
    details: "Developed a desktop application using Java Swing and MySQL Connector/J that enables administrators and operators to manage all aspects of bus transportation — from scheduling tours and assigning routes to managing passengers and staff.",
    link: "https://github.com/newton00009/bus_management", 
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2669&auto=format&fit=crop", 
    accordionItems: [
      { title: "Modular GUI with Swing", content: "Each feature (add/update/delete/view) for buses, conductors, drivers, passengers, and routes is built as a separate GUI module using Swing's form builder." },
      { title: "MySQL-Backed Data Persistence", content: "All data such as tours, schedules, and staff assignments are stored and retrieved using MySQL via JDBC connection." }
    ]
  },
  {
    title: 'Personal Budgeting Web App',
    description: 'A full-stack budgeting application that helps users track expenses, manage earnings, and visualize spending patterns with real-time charts.',
    details: 'Built a MERN-stack budgeting tool with secure authentication, dynamic chart rendering, and intuitive expense tracking. Users can register, log in, add or remove expenses, update earnings, and get real-time financial insights.',
    link: 'https://github.com/Prateekg2050/Budgeting_WebApplication', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    accordionItems: [
      { title: "Secure Auth & JWT Integration", content: "Implemented user registration and login with hashed passwords using bcrypt and JWT tokens for secure route access." },
      { title: "Expense CRUD API", content: "Users can add, view, and delete expenses through authenticated API routes that interact with MongoDB collections." }
    ]
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-apple-dark pt-32 pb-24 px-6 relative z-10 selection:bg-white/30">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
          >
            My <span className="text-gradient">Projects.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-apple-gray max-w-2xl font-medium"
          >
            A showcase of my recent technical architecture, CI/CD pipelines, and software engineering endeavors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, ease: 'easeOut' }}
              className={`bento-card group cursor-pointer overflow-hidden flex flex-col justify-end ${
                index % 4 === 0 || index % 5 === 0 ? 'md:col-span-2' : ''
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                />
              </div>

              <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-apple-gray text-sm md:text-base line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
                
                <div className="flex items-center text-white text-sm font-semibold gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  View Project <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectPreviewPane 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
