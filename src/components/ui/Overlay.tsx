import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface OverlayProps {
  activeSection: string | null;
  onClose: () => void;
}

const contentData: Record<string, React.ReactNode> = {
  summary: (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Professional Summary</h2>
      <p className="text-gray-700 leading-relaxed">
        Results-driven Full-Stack Developer and Software Engineering student with hands-on experience delivering production web platforms, e-commerce stores, Laravel systems, AI workflow automation and Shopify customizations.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Skilled in React, Next.js, Laravel, PHP, Python, MySQL, REST APIs, Git/GitHub, Liquid and Azure AI. Experienced in leading small teams, resolving live production issues, building client platforms under AstriX Digital Systems and integrating AI/API automation for smarter digital workflows.
      </p>
    </div>
  ),
  experience: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Work Experience</h2>

      <div>
        <h3 className="font-semibold text-lg text-indigo-600">Prompt Engineering Intern</h3>
        <p className="text-sm text-gray-500">Ransh Innovations | Remote | Feb 2026 - Present</p>
        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
          <li>Engineer and optimize LLM prompts to improve AI model outputs</li>
          <li>Integrate AI functionality into real-world projects</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-indigo-600">Software Engineer (Project Basis)</h3>
        <p className="text-sm text-gray-500">ICTA Sri Lanka | Hybrid | Nov 2025 - Jan 2026</p>
        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
          <li>Stabilized the ATLAS government web system by resolving critical bugs</li>
          <li>Refactored Laravel controllers, routing and Blade templates</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-indigo-600">Web Manager & E-Commerce Specialist</h3>
        <p className="text-sm text-gray-500">Truebytina | On-site | Aug 2025 - Present</p>
        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
          <li>Customized Shopify themes using Liquid, HTML and CSS</li>
          <li>Led technical redesign and managed high-traffic platform</li>
        </ul>
      </div>
    </div>
  ),
  projects: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Projects & Automation</h2>

      <div>
        <h3 className="font-semibold text-lg text-amber-600">AstriX Client Projects</h3>
        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
          <li><strong>CEAC Educational Platform:</strong> Custom LMS and public website digitizing the student lifecycle.</li>
          <li><strong>Fashionable Attires Store:</strong> Scalable Shopify e-commerce store with modern UI flows.</li>
          <li><strong>Mazoon Al-Suhub Construction:</strong> Saudi B2B construction portal with dynamic service presentation.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-amber-600">Automation Tools</h3>
        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
          <li><strong>TopJobs Extractor:</strong> Used Gemini API to summarize job listings into Excel.</li>
          <li><strong>NIBM Netlink Pro:</strong> Network login/session automation tool for monitoring and account rotation.</li>
        </ul>
      </div>
    </div>
  ),
  education: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Education & Training</h2>

      <div>
        <h3 className="font-semibold text-lg text-pink-600">BSc, Computer Science with Applied AI</h3>
        <p className="text-gray-700">Coventry University | Apr 2026 - 2028</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-pink-600">HND, Computer Software Engineering</h3>
        <p className="text-gray-700">National Institute of Business Management (NIBM) | Apr 2025 - Mar 2026</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-pink-600">Diploma, Software Engineering</h3>
        <p className="text-gray-700">NIBM | Dec 2023 - Dec 2024</p>
      </div>
    </div>
  ),
  contact: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Contact Details</h2>
      <div className="space-y-4 text-gray-700">
        <p><strong>Name:</strong> ANHAJ UWAISULKARNI</p>
        <p><strong>Location:</strong> Colombo, Sri Lanka</p>
        <p><strong>Phone:</strong> +94 76 467 4005</p>
        <p><strong>Email:</strong> <a href="mailto:Anhaj02003@gmail.com" className="text-blue-600 hover:underline">Anhaj02003@gmail.com</a></p>
        <p>
          <strong>Portfolio:</strong> <a href="https://asrx.me" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">asrx.me</a>
        </p>
        <p>
          <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/anhaj-uwaisulkarni" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/anhaj-uwaisulkarni</a>
        </p>
        <p>
          <strong>GitHub:</strong> <a href="https://github.com/Anhaj0" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">github.com/Anhaj0</a>
        </p>
      </div>
    </div>
  ),
};

export default function Overlay({ activeSection, onClose }: OverlayProps) {
  return (
    <AnimatePresence>
      {activeSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-0 right-0 h-full w-full md:w-[450px] p-6 pointer-events-auto"
        >
          <div className="bg-white/95 backdrop-blur-md w-full h-full rounded-3xl shadow-2xl p-8 overflow-y-auto border border-gray-100 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
            <div className="mt-8">
              {contentData[activeSection] || null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
