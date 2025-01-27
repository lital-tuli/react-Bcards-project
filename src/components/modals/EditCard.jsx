import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateCard } from '../../services/CardService';
import { useSnack } from '../../providers/SnackBarProvider';
import FormField from '../common/FormField';

const EditCard = ({ show, handleClose, card, onRefresh }) => {
  const { theme } = useTheme();
  const setSnack = useSnack();

  const formik = useFormik({
    initialValues: {
      title: card?.title || '',
      subtitle: card?.subtitle || '',
      description: card?.description || '',
      phone: card?.phone || '',
      email: card?.email || '',
      web: card?.web || '',
      image: {
        url: card?.image?.url || '',
        alt: card?.image?.alt || '',
      },
      address: {
        state: card?.address?.state || '',
        country: card?.address?.country || '',
        city: card?.address?.city || '',
        street: card?.address?.street || '',
        houseNumber: card?.address?.houseNumber || '',
        zip: card?.address?.zip || '',
      },
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      subtitle: Yup.string().required('Subtitle is required'),
      description: Yup.string().required('Description is required'),
      phone: Yup.string().required('Phone is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      web: Yup.string().url('Invalid URL'),
      image: Yup.object({
        url: Yup.string().url('Invalid URL'),
        alt: Yup.string(),
      }),
      address: Yup.object({
        state: Yup.string(),
        country: Yup.string().required('Country is required'),
        city: Yup.string().required('City is required'),
        street: Yup.string().required('Street is required'),
        houseNumber: Yup.number().required('House number is required'),
        zip: Yup.string().required('ZIP is required'),
      }),
    }),
    onSubmit: async (values) => {
      try {
        await updateCard(card._id, values);
        setSnack('success', 'Card updated successfully');
        onRefresh?.();
        handleClose();
      } catch (error) {
        setSnack('danger', 'Failed to update card');
      }
    },
  });

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className={`modal-content ${theme.bgColor}`}>
            <div className={`modal-header ${theme.borderColor}`}>
              <h5 className={`modal-title ${theme.textColor}`}>
                <i className="bi bi-pencil-square me-2"></i>
                Edit Card
              </h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <FormField name="title" label="Title" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="subtitle" label="Subtitle" formik={formik} />
                  </div>
                  <div className="col-12">
                    <FormField name="description" label="Description" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="phone" label="Phone" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="email" label="Email" formik={formik} />
                  </div>
                  <div className="col-12">
                    <FormField name="web" label="Website" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="image.url" label="Image URL" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="image.alt" label="Image Alt" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="address.country" label="Country" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="address.state" label="State" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="address.city" label="City" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="address.street" label="Street" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="address.houseNumber" label="House Number" type="number" formik={formik} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="address.zip" label="ZIP" formik={formik} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={!formik.isValid || !formik.dirty}>
                    <i className="bi bi-save me-2"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCard;