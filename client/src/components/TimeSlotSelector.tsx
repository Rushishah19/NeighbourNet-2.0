import { useState } from 'react';
import { Worker, TimeSlot } from '../types';
import { Calendar, Clock } from 'lucide-react';

interface TimeSlotSelectorProps {
  worker: Worker;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

export function TimeSlotSelector({ worker, onSelectTimeSlot }: TimeSlotSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const dates = [...new Set(worker.timeSlots.map(slot => slot.date))];
  const timeSlots = worker.timeSlots.filter(slot => slot.date === selectedDate);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <div className="relative">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Choose a date</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </option>
            ))}
          </select>
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Time Slots
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot)}
                disabled={!slot.isAvailable}
                className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium
                  ${
                    slot.isAvailable
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Clock size={16} className="mr-2" />
                {slot.startTime} - {slot.endTime}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}