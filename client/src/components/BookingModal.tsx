import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Worker } from '../types';
import { PayPalButton } from './PayPalButton';

type BookingModalProps = {
  worker: Worker;
  onClose: () => void;
};

export const BookingModal: React.FC<BookingModalProps> = ({ worker, onClose }) => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const availableTimeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 10:00 PM',
    '10:00 PM - 11:00 PM',
  ];

  const toggleTimeSlot = (timeSlot: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(timeSlot) ? prev.filter((slot) => slot !== timeSlot) : [...prev, timeSlot]
    );
  };

  const handleContinueToPayment = () => {
    if (selectedTimeSlots.length === 0) {
      alert('Please select at least one time slot before proceeding.');
      return;
    }
    setShowPaymentModal(true);
  };

  const totalHours = selectedTimeSlots.length;
  const hourlyRate = worker.hourlyRate;
  const totalAmount = totalHours * hourlyRate;
  const fee = totalAmount * 0.02; // 2% fee

  return (
    <>
      {!showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full mx-6 relative px-12 py-10">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Book {worker.name}</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slots</label>
              <div className="grid grid-cols-4 gap-3">
                {availableTimeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleTimeSlot(time)}
                    className={`p-2 rounded-md text-sm ${
                      selectedTimeSlots.includes(time)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {selectedTimeSlots.length > 0 && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Selected Time Slots:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTimeSlots.map((time) => (
                    <span key={time} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleContinueToPayment}
              disabled={selectedTimeSlots.length === 0}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full mx-6 relative px-12 py-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={20} />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Book {worker.name}</h2>
              <p className="text-sm text-gray-600">Rate: ${hourlyRate}/hour</p>
            </div>

            <div className="mt-6 mb-4">
              <h4 className="font-medium mb-2 text-gray-800">Booking Summary</h4>
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Time Slots:</span>
                  <div className="text-right">
                    {selectedTimeSlots.map((time, index) => (
                      <div key={index}>{time}</div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span>${hourlyRate}/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Hours:</span>
                  <span>{totalHours}</span>
                </div>
                <div className="flex justify-between">
                  <span>2% of Total Amount:</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Payment Section</h2>
              <PayPalButton
                clientId="BAAodjLrcqDpQ53DBs5ABjOVDQLjWLnVkNF5yo6gaqPIKpj4PRE1l7qYIZcHwKij1QRtODeoZWkzbKFqaA"
                hostedButtonId="6R3BLNA3RVVY8"
                currency="CAD"
                disableFunding={['venmo']}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};