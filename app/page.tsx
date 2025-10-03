import { Button } from "@/components/ui/button";
import { Code2, Shield, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sabbir Ahmed
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Full Stack Developer & Portfolio v2
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Welcome to my portfolio website built with Next.js, TypeScript,
              and modern web technologies. This is the foundation for showcasing
              projects, blogs, and technical expertise.
            </p>
          </div>

          {/* Authentication Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication System Implemented ✅
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              JWT-based authentication with bcrypt password hashing is now
              ready. The admin dashboard is protected and fully functional.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✅ Backend Features
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Express.js API server</li>
                  <li>• JWT token authentication</li>
                  <li>• bcrypt password hashing</li>
                  <li>• Admin user seeding</li>
                  <li>• Protected API endpoints</li>
                </ul>
              </div>
              <div className="text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✅ Frontend Features
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• React Context auth state</li>
                  <li>• Protected routes component</li>
                  <li>• Login form with validation</li>
                  <li>• Admin dashboard</li>
                  <li>• Toast notifications</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admin/login">
                <Button className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Access Admin Dashboard</span>
                </Button>
              </Link>
              <Button variant="outline" asChild>
                <a
                  href="http://localhost:3001/api/auth/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Code2 className="h-4 w-4" />
                  <span>View API Credentials</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              🔑 Demo Admin Credentials
            </h3>
            <div className="text-blue-800 dark:text-blue-200 space-y-1">
              <p>
                <strong>Email:</strong> admin@sabbir.dev
              </p>
              <p>
                <strong>Password:</strong> Admin123!
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
              🚀 Ready for Next Implementation
            </h3>
            <p className="text-green-800 dark:text-green-200 mb-3">
              The authentication foundation is complete! You can now proceed
              with:
            </p>
            <ul className="text-green-700 dark:text-green-300 space-y-2">
              <li>• Blog management system (CRUD operations)</li>
              <li>• Project showcase functionality</li>
              <li>• About me section with SSG</li>
              <li>• Public pages with ISR</li>
              <li>• Rich text editor integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
