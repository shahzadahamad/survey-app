import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Check, Loader, UserPlus, LogIn } from 'lucide-react';
import { AuthProps, FormDataType } from '../../interfaces/auth';
import useNavigation from '../../hooks/useNavigation';
import { authenticateAdmin, authenticateUser, registerUser } from '../../apis/userApi';
import { AxiosError } from 'axios';
import { LoginRes } from '../../interfaces/apiResponses';
import { MESSAGES, VALIDATION_MESSAGES } from '../../constants/messages';
import { AuthModes } from '../../enums/authMode';
import { StorageKeys } from '../../enums/storageKeys';
import toast from 'react-hot-toast';

const Auth = ({ mode }: AuthProps) => {

  const { goToLogin, goToRegister, goToDashboard, goToHome } = useNavigation();

  const [formData, setFormData] = useState<FormDataType>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormDataType>>({});
  const [authError, setAuthError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name as keyof FormDataType]) {
      setErrors({ ...errors, [name]: '' });
    }
    setAuthError("");
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormDataType> = {};

    if (mode === AuthModes.REGISTER && !formData.fullname?.trim()) {
      newErrors.fullname = VALIDATION_MESSAGES.FULLNAME_REQUIRED;
    }

    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL_INVALID;
    }

    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED
    } else if (mode === AuthModes.REGISTER && formData.password.length < 8) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH
    }

    if (mode === AuthModes.REGISTER && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.PASSWORD_MISMATCH
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        if (mode === AuthModes.LOGIN) {
          const { response }: LoginRes = await authenticateUser(formData);
          localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.token);
          goToHome();
          toast.success(MESSAGES.SUCCESS.LOGIN_SUCCESS);
        } else if (mode === AuthModes.REGISTER) {
          await registerUser(formData);
          goToLogin();
          toast.success(MESSAGES.SUCCESS.REGISTRATION_SUCCESS);
        } else if (mode === AuthModes.ADMIN_LOGIN) {
          const { response }: LoginRes = await authenticateAdmin(formData);
          console.log(response);
          localStorage.setItem(StorageKeys.ADMIN_ACCESS_TOKEN, response.token);
          goToDashboard();
          toast.success(MESSAGES.SUCCESS.LOGIN_SUCCESS);
        }
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

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300">
        <div className="bg-blue-600 text-white py-6 px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {mode === AuthModes.ADMIN_LOGIN ? 'Welcome Admin' : mode === AuthModes.LOGIN ? 'Welcome Back' : 'Create Account'}
            </h1>
            {mode === AuthModes.LOGIN || mode === AuthModes.ADMIN_LOGIN ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <p className="mt-2 text-blue-100">
            {mode === AuthModes.ADMIN_LOGIN ? 'Welcome to the Survey Administrator Dashboard. Please sign in to access all user survey submissions and manage survey data' : mode === AuthModes.LOGIN
              ? 'Sign in to access your survey dashboard'
              : 'Join our survey platform to share your valuable feedback'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === AuthModes.REGISTER && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.fullname && <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>}
              </div>
            )}

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder={mode === AuthModes.LOGIN || mode === AuthModes.ADMIN_LOGIN ? "Enter your password" : "Create a password"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              {mode === AuthModes.REGISTER && <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>}
            </div>

            {mode === AuthModes.REGISTER && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            )}

            {authError && <p className="mt-1 text-sm text-center text-red-600">{authError}</p>}

            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>{mode === AuthModes.LOGIN || mode === AuthModes.REGISTER ? 'Signing In...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    <span>{mode === AuthModes.LOGIN || mode === AuthModes.REGISTER ? 'Sign In' : 'Register'}</span>
                  </>
                )}
              </button>
            </div>

            {
              mode !== AuthModes.ADMIN_LOGIN && (
                <div className="text-center mt-4">
                  {mode === AuthModes.LOGIN ? (
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <button
                        onClick={() => goToRegister()}
                        type="button"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Register
                      </button>
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <button
                        onClick={() => goToLogin()}
                        type="button"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Sign In
                      </button>
                    </p>
                  )}
                </div>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth
