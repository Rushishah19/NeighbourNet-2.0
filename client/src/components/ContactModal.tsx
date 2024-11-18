import { useState } from 'react';
import { X } from 'lucide-react';
import { Worker } from '../types';
import { useStore } from '../store';

interface ContactModalProps {
  worker: Worker;
  onClose: () => void;
}

export function ContactModal({ worker, onClose }: ContactModalProps) {
  const { currentUser, addContact } = useStore();
  const [showContact, setShowContact] = useState(false);

  const handleConnect = () => {
    if (currentUser) {
      addContact({
        workerId: worker.id,
        customerId: currentUser.id,
        timestamp: Date.now(),
      });
      setShowContact(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h3 className="text-xl font-semibold mb-4">Contact {worker.name}</h3>

        {!showContact ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              Would you like to connect with {worker.name}? Once connected, you'll be
              able to see their contact information.
            </p>
            <button
              onClick={handleConnect}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-black-900 mb-2">Contact Information</h4>
              <p className="text-gray-800">
                <strong>Email:</strong> {worker.email}
              </p>
              <p className="text-gray-800">
                <strong>Phone:</strong> {worker.phone}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              You can now contact {worker.name} directly using the information above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}