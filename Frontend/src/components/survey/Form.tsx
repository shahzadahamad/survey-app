import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Loader, Check, } from 'lucide-react';
import { CountryName, FormDataType, RawCountry } from '../../interfaces/survey';
import useNavigation from '../../hooks/useNavigation';
import { createSurvey, fetchNationalityData } from '../../apis/apis';
import { MESSAGES, VALIDATION_MESSAGES } from '../../constants/messages';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

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
  });
  const [nationalities, setNationalities] = useState<CountryName[]>([]);
  const [authError, setAuthError] = useState<string>("");

  useEffect(() => {
    const getNationalities = async () => {
      try {
        const data = await fetchNationalityData();
        const countryNames: CountryName[] = data.map((country: RawCountry) => ({ name: country.name.common, flag: country.flags.png })).sort((a: CountryName, b: CountryName) => a.name.localeCompare(b.name));
        setNationalities(countryNames);
      } catch (error) {
        console.error(MESSAGES.ERROR.GENERAL_ERROR, error);
      }
    };
    getNationalities();
  }, []);

  // Using Partial<FormDataType> for errors like in Auth component
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

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
      newErrors.name = VALIDATION_MESSAGES.FULLNAME_REQUIRED
    }

    if (!formData.gender) {
      newErrors.gender = VALIDATION_MESSAGES.GENDER_REQUIRED
    }

    if (!formData.nationality?.trim()) {
      newErrors.nationality = VALIDATION_MESSAGES.NATIONALITY_REQUIRED
    }

    if (!formData.email?.trim()) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL_INVALID
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = VALIDATION_MESSAGES.PHONE_REQUIRED
    } else if (!/^[0-9\-+\s()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = VALIDATION_MESSAGES.PHONE_INVALID
    }

    if (!formData.address?.trim()) {
      newErrors.address = VALIDATION_MESSAGES.ADDRESS_REQUIRED
    }

    if (!formData.message?.trim()) {
      newErrors.message = VALIDATION_MESSAGES.MESSAGE_REQUIRED
    } else if (formData.message.trim().length < 10) {
      newErrors.message = VALIDATION_MESSAGES.MESSAGE_MIN_LENGTH
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await createSurvey(formData);
        toast.success(MESSAGES.SUCCESS.SURVEY_SUBMITTED);
        setFormData({
          name: '',
          gender: '',
          nationality: '',
          email: '',
          phone: '',
          address: '',
          message: '',
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setAuthError(error.response.data.message);
          } else {
            setAuthError(MESSAGES.ERROR.GENERAL_ERROR);
          }
        } else {
          setAuthError(MESSAGES.ERROR.UNEXPECTED_ERROR);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="w-full sm:w-2/3 p-6 transition-all duration-500 transform translate-y-0 opacity-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
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

          {authError && <p className="mt-1 text-sm text-center text-red-600">{authError}</p>}

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