import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '../services/auth/authService';
import { jwtTokenService } from '../services/auth/jwtTokenService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { changeStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(8, 'Must be 8 characters or more').required('Required')
    }),
    onSubmit: (values) => {
      handleLogin(values);
    }
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const res = await authService.login(values);
      handleResponse(res.data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = (res) => {
    if (res.status === 403) {
      setErrorMessage('Access Denied. Invalid credentials!');
      return;
    }
    jwtTokenService.handle(res);
    changeStatus(true);
    toast.success('Login successful!');
    navigate('/espaceClient');
  };

  const handleError = (err) => {
    if (err.response?.status === 403) {
      setErrorMessage('Access Denied. Invalid credentials!');
      toast.error('Access Denied. Invalid credentials!');
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFAF7] pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm flex items-center gap-2">
                    <i className="bi bi-exclamation-circle"></i>
                    {errorMessage}
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="bi bi-envelope text-gray-400"></i>
                        </div>
                        <input
                            {...formik.getFieldProps('email')}
                            type="email"
                            id="email"
                            className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#8C6EA8]"
                            placeholder="you@example.com"
                        />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-sm text-error mt-1">{formik.errors.email}</div>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="bi bi-lock text-gray-400"></i>
                        </div>
                        <input
                            {...formik.getFieldProps('password')}
                            type="password"
                            id="password"
                            className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#8C6EA8]"
                            placeholder="••••••••"
                        />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-sm text-error mt-1">{formik.errors.password}</div>
                    )}
                </div>

                {/* Submit Button */}
                {!isLoading ? (
                    <button
                        type="submit"
                        disabled={!formik.isValid}
                        className="btn bg-[#8C6EA8] w-full gap-2"
                    >
                        <i className="bi bi-box-arrow-in-right"></i>
                        Sign in
                    </button>
                ) : (
                    <button type="button" className="w-full">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        Loading ...
                    </button>
                )}

                {/* Register Link */}
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link to="/register" className="text-[#8C6EA8] hover:text-[#584669] font-medium ml-1">
                        Create one now
                    </Link>
                </p>
            </form>
        </div>
    </div>
);
};

export default Login;