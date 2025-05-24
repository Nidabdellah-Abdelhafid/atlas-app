import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { authService } from '../services/auth/authService';


const UpdateProfileForm = ({ user, onClose, onUpdate }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: user?.fullname || '',
      telephone: user?.telephone || '',
      pays: user?.pays || '',
      userPhoto: null
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Full name is required'),
      telephone: Yup.string().required('Phone number is required'),
      pays: Yup.string().required('Country is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const updatedUser = {
          ...user,
          ...values
        };
        
        const response = await authService.updateUser(user.id, updatedUser);
        onUpdate(response.data);
        onClose();
        
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been successfully updated.',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            container: 'font-manrope',
            popup: 'rounded-xl border-2',
            title: 'text-xl font-griffiths',
            htmlContainer: 'font-manrope text-gray-600'
          }
        });
      } catch (error) {
        console.error('Error updating user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update profile. Please try again.',
          customClass: {
            container: 'font-manrope',
            popup: 'rounded-xl border-2',
            title: 'text-xl font-griffiths',
            htmlContainer: 'font-manrope text-gray-600',
            confirmButton: 'bg-[#8C6EA8] font-manrope px-6 py-2 rounded-lg text-white'
          }
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        formik.setFieldError('userPhoto', 'Only JPG, JPEG, and PNG files are allowed.');
        setImagePreview(null);
        return;
      }

      if (file.size > maxSize) {
        formik.setFieldError('userPhoto', 'File size must be less than 2MB.');
        setImagePreview(null);
        return;
      }

      // Create preview
      const reader = new FileReader();
        reader.onload = () => {
        if (typeof reader.result === 'string') {
            setImagePreview(reader.result);
        }
        };
      reader.readAsDataURL(file);

      // Handle form data
      const dataReader = new FileReader();
      dataReader.onload = () => {
        if (dataReader.result instanceof ArrayBuffer) {
          const bytes = new Uint8Array(dataReader.result);
          formik.setFieldValue('userPhoto', Array.from(bytes));
        }
      };
      dataReader.readAsArrayBuffer(file);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImagePreview(null);
    formik.setFieldValue('userPhoto', null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
          
          <form onSubmit={formik.handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">Profile Photo</label>
              <div className="flex items-center justify-center w-full">
                <label className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                              border-gray-300 hover:border-[#8C6EA8] w-full">
                  {!imagePreview ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <i className="bi bi-upload text-4xl text-gray-500 mb-4"></i>
                      <p className="mb-2 text-sm text-gray-500">Upload a photo of your face</p>
                      <p className="text-xs text-gray-500">JPG, JPEG, and PNG (MAX. 2MB)</p>
                    </div>
                  ) : (
                    <div className="relative w-56 h-56 overflow-hidden rounded-lg mx-auto">
                      <img src={imagePreview} className="max-h-48 mx-auto" alt="Preview" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-[#8C6EA8] p-2 rounded-full text-white"
                        onClick={removeImage}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              {formik.errors.userPhoto && (
                <div className="text-sm text-error mt-1">{String(formik.errors.userPhoto)}</div>
                )}
            </div>

            <div className="form-control mb-4">
              <label className="label">Full Name</label>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                {...formik.getFieldProps('fullname')}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <div className="text-sm text-error mt-1">{String(formik.errors.fullname)}</div>
                )}
            </div>

            <div className="form-control mb-4">
              <label className="label">Telephone</label>
              <input
                type="tel"
                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                {...formik.getFieldProps('telephone')}
              />
              {formik.touched.telephone && formik.errors.telephone && (
                <div className="text-sm text-error mt-1">{String(formik.errors.telephone)}</div>
                )}
            </div>

            <div className="form-control mb-4">
              <label className="label">Country</label>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:border-[#8C6EA8]"
                {...formik.getFieldProps('pays')}
              />
              {formik.touched.pays && formik.errors.pays && (
                <div className="text-sm text-error mt-1">{String(formik.errors.pays)}</div>
                )}
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-[#8C6EA8] text-white"
                disabled={isLoading || !formik.isValid}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;