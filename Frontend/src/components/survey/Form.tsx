import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Loader, Check, } from 'lucide-react';
import { CountryName, FormDataType, RawCountry, SubmissionType } from '../../interfaces/surveyInterface';
import useNavigation from '../../hooks/useNavigation';
import { fetchNationalityData } from '../../apis/api/userApi';

const Form = () => {

  const { goToHome } = useNavigation();

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
  const [nationalities, setNationalities] = useState<CountryName[]>([]);

  useEffect(() => {
    const getNationalities = async () => {
      try {
        const data = await fetchNationalityData();
        const countryNames: CountryName[] = data.map((country: RawCountry) => ({ name: country.name.common, flag: country.flags.png })).sort((a: CountryName, b: CountryName) => a.name.localeCompare(b.name));
        setNationalities(countryNames);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };
    getNationalities();
  }, []);

  // Using Partial<FormDataType> for errors like in Auth component
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  const [submissions, setSubmissions] = useState<SubmissionType[]>([
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!', date: '24/02/2024' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!', date: '24/02/2024' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!', date: '24/02/2024' },
  ]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types (similar to Auth component)
    if (errors[name as keyof FormDataType]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormDataType> = {};

    // Required field validations
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.nationality?.trim()) {
      newErrors.nationality = 'Nationality is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9\-+\s()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.message?.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateForm()) {
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
    }
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

                  className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.nationality ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              >
                <option value="">Select Nationality</option>
                {
                  nationalities.map((country: CountryName) => (
                    <option key={country.name} value={country.name}><img src={country.flag} alt={country.name} className="w-5 h-5 mr-2" />{country.name}</option>
                  ))
                }
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="Enter your message"
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
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