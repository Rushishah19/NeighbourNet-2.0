export function ContactUs() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", // Replace this URL with your desired background image
      }}
    >
      {/* Semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Glassmorphic container */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-3xl bg-white bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-black-700 mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Reach out to us with your questions, feedback, or suggestions. We'd
          love to hear from you!
        </p>
        <form
          action="https://formsubmit.co/neighbournet01@gmail.com"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Write your message here..."
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-all duration-200"
              rows={5}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none text-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
