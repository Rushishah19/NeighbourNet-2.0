import { useStore } from '../store';
import { ShoppingCart, X, DollarSign } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, clearCart } = useStore();

  const total = cart.reduce((sum, item) => sum + item.hourlyRate, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <ShoppingCart className="mr-2" />
              Cart
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.workerId}-${item.timeSlot.id}`}
                    className="bg-white rounded-lg border p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.workerName}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(item.timeSlot.date).toLocaleDateString()} <br />
                          {item.timeSlot.startTime} - {item.timeSlot.endTime}
                        </p>
                        <p className="text-blue-600 font-medium mt-2">
                          ${item.hourlyRate}/hour
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.workerId, item.timeSlot.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold flex items-center">
                  <DollarSign size={20} />
                  {total}
                </span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {/* Implement checkout */}}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}