import { useState, ChangeEvent, FormEvent } from 'react';
import { Loader, Check, } from 'lucide-react';
import { FormDataType, SubmissionType } from '../../interfaces/surveyInterface';
import useNavigation from '../../hooks/useNavigation';

const Form = () => {

  const { goToHome } = useNavigation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    date: '',
  });

  const [submissions, setSubmissions] = useState<SubmissionType[]>([
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!', date: '24/02/2024' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!', date: '24/02/2024' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!', date: '24/02/2024' },
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmissions([
        ...submissions,
        { id: submissions.length + 1, ...formData }
      ]);
      setFormData({
        name: '',
        gender: '',
        nationality: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        date: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="w-full sm:w-2/3 p-6 transition-all duration-500 transform translate-y-0 opacity-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your full name"
                />
                <div className="absolute -top-8 left-0 bg-gray-800 text-white p-2 rounded text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
                  Please enter your full name
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your nationality"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your address"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your message"
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => goToHome()}
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-md transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Check size={18} />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form;
