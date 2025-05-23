import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userAuth/userService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { X } from 'lucide-react';

const AddUser = () => {
  const navigate = useNavigate();
  const [emailUsed, setEmailUsed] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      userPhoto: null,
      telephone: '',
      pays: ''
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      userPhoto: Yup.mixed()
        .test('fileRequired', 'Profile photo is required', function() {
          return this.parent.userPhoto !== null || userPhoto !== null;
        }),
      telephone: Yup.string()
        .required('Phone number is required'),
      pays: Yup.string()
        .required('Country is required')
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    
    Object.keys(values).forEach(key => {
      if (key !== 'userPhoto') {
        formData.append(key, values[key]);
      }
    });

    if (userPhoto) {
      formData.append('userPhoto', userPhoto);
    }

    try {
      const res = await userService.addUser(formData);
      await userService.addRoleToUser({
        email: values.email,
        roleName: 'USER'
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/login');
    } catch (error) {
      if (error.response?.data?.message) {
        setEmailUsed('Email is already in use');
      } else {
        alert('An unknown error occurred during user creation.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setFileError('Only JPG, JPEG, and PNG files are allowed.');
        setFilePreview(null);
        setUserPhoto(null);
        formik.setFieldValue('userPhoto', null);
        return;
      }

      if (file.size > maxSize) {
        setFileError('File size must be less than 2MB.');
        setFilePreview(null);
        setUserPhoto(null);
        formik.setFieldValue('userPhoto', null);
        return;
      }

      setFileError(null);
      setUserPhoto(file);
      formik.setFieldValue('userPhoto', file);

      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto px-6 pt-24 bg-[#FCFAF7] min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
            
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Full Name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps('fullname')}
                                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                                placeholder="Enter your full name"
                            />
                            {formik.touched.fullname && formik.errors.fullname && (
                                <div className="text-sm text-error mt-1">{formik.errors.fullname}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <input
                                type="email"
                                {...formik.getFieldProps('email')}
                                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                                placeholder="you@example.com"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-sm text-error mt-1">{formik.errors.email}</div>
                            )}
                            {emailUsed && <div className="text-sm text-error mt-1">{emailUsed}</div>}
                        </div>

                        {/* Password */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                {...formik.getFieldProps('password')}
                                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                                placeholder="••••••••"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-sm text-error mt-1">{formik.errors.password}</div>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                {...formik.getFieldProps('telephone')}
                                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                                placeholder="+212 (00) 000-0000"
                            />
                            {formik.touched.telephone && formik.errors.telephone && (
                                <div className="text-sm text-error mt-1">{formik.errors.telephone}</div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Photo Upload */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Profile Photo</span>
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                                                border-gray-300 hover:border-[#8C6EA8] w-full">
                                    {!filePreview ? (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <i className="bi bi-upload text-4xl text-gray-500 mb-4"></i>
                                            <p className="mb-2 text-sm text-gray-500">Upload a photo of your face</p>
                                            <p className="text-xs text-gray-500">Make sure your face is clearly visible</p>
                                            <p className="text-xs text-gray-500">JPG, JPEG, and PNG (MAX. 800x400px)</p>
                                        </div>
                                    ) : (
                                        <div className="relative w-56 h-56 overflow-hidden rounded-lg mx-auto">
                                            <img src={filePreview} className="max-h-48 mx-auto" alt="Preview" />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 bg-[#8C6EA8] p-1 rounded-full text-white"
                                                onClick={() => {
                                                    setFilePreview(null);
                                                    setUserPhoto(null);
                                                    formik.setFieldValue('userPhoto', null);
                                                    formik.setFieldTouched('userPhoto', true);
                                                    formik.validateForm();
                                                }}
                                            >
                                                <X size={16}/>
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            {fileError && <div className="text-sm text-error mt-1">{fileError}</div>}
                            {formik.touched.userPhoto && formik.errors.userPhoto && (
                                <div className="text-sm text-error mt-1">{formik.errors.userPhoto}</div>
                            )}
                        </div>

                        {/* Country */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Country</span>
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps('pays')}
                                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                                placeholder="Enter your country"
                            />
                            {formik.touched.pays && formik.errors.pays && (
                                <div className="text-sm text-error mt-1">{formik.errors.pays}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    {!isLoading ? (
                        <button
                            type="submit"
                            disabled={!formik.isValid || !userPhoto}
                            className="btn bg-[#8C6EA8] w-full text-white"
                        >
                            Register
                        </button>
                    ) : (
                        <button type="button" className="w-full">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                            Loading ...
                        </button>
                    )}
                </div>
            </form>
        </div>
    </div>
);
};

export default AddUser;