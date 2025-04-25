import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Check, Loader, UserPlus, LogIn } from 'lucide-react';
import { AuthProps, FormDataType } from '../../interfaces/authInterface';
import useNavigation from '../../hooks/useNavigation';

const Auth = ({ mode }: AuthProps) => {

  const { goToLogin, goToRegister } = useNavigation();

  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name as keyof FormDataType]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormDataType> = {};

    if (mode === 'register' && !formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'register' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        console.log(`${mode === 'login' ? 'Login' : 'Registration'} successful`, formData);
        setIsSubmitting(false);
        // Redirect to survey page
        window.location.href = '/survey';
      }, 1500);
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
              {mode === 'admin-login' ? 'Welcome Admin' : mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            {mode === 'login' || mode === 'admin-login' ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <p className="mt-2 text-blue-100">
            {mode === 'admin-login' ? 'Welcome to the Survey Administrator Dashboard. Please sign in to access all user survey submissions and manage survey data' : mode === 'login'
              ? 'Sign in to access your survey dashboard'
              : 'Join our survey platform to share your valuable feedback'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>
            )}

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
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
                  placeholder={mode === 'login' || mode === 'admin-login' ? "Enter your password" : "Create a password"}
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
              {mode === 'register' && <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>}
            </div>

            {mode === 'register' && (
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

            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>{mode === 'login' || mode=== 'admin-login' ? 'Signing In...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    <span>{mode === 'login' || mode === 'admin-login' ? 'Sign In' : 'Register'}</span>
                  </>
                )}
              </button>
            </div>

            {
              mode !== 'admin-login' && (
                <div className="text-center mt-4">
                  {mode === 'login' ? (
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
