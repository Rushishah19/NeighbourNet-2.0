import { Link } from 'react-router-dom';
import { Briefcase, Search, Users } from 'lucide-react';

export function Home() {
  return (
   <div className="con bg-red-100">
     <div className="container mx-auto px-4 py-12 ">
      <div className=" text-center max-w-3xl mx-auto">
    
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Connect with Skilled Professionals in Canada
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Find skilled workers or offer your services across Canada. Join our community
          of professionals and customers.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <Briefcase className="w-12 h-12  mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">For Workers</h2>
            <p className="text-gray-600 mb-6">
              Showcase your skills, set your rates, and connect with customers looking
              for your expertise.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Join as a Worker
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <Search className="w-12 h-12  mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">For Customers</h2>
            <p className="text-gray-600 mb-6">
              Find skilled professionals for your projects. Browse profiles, compare
              rates, and connect directly.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Find Workers
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <Users className="w-12 h-12 text-green-800 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">
            Join Our Growing Community
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-800 mb-2">1000+</div>
              <div className="text-gray-600">Skilled Workers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-800 mb-2">5000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-800 mb-2">10k+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}