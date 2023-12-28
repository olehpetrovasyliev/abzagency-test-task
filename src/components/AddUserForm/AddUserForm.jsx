import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./AddUserForm.module.scss";
import {
  useAddNewUserMutation,
  useGetPositionsQuery,
  useGetUsersQuery,
} from "../../helpers/redux/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must not exceed 60 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(
      /^(\+380)[0-9]{9}$/,
      "Invalid phone number format. Should start with +380"
    )
    .required("Phone is required"),
  position: Yup.string().required("Position is required"),
  file: Yup.mixed()
    .test("fileSize", "File size is too large", () => {
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0];
      return file.size <= MAX_FILE_SIZE;
    })
    .required("Photo is required"),
});

const AddUserForm = () => {
  const { data } = useGetPositionsQuery();
  const { refetch } = useGetUsersQuery(1);

  const [addNewUser, isError] = useAddNewUserMutation();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
    file: "",
  };

  const handleSubmit = async (values) => {
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const position = Number(values.position);

    const newValues = { ...values, file, position };
    await addNewUser(newValues);
    refetch();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty }) => (
        <Form>
          <label className={css.label} htmlFor="name">
            <Field
              type="text"
              id="name"
              name="name"
              className={css.input}
              placeholder="Your name"
              aria-label="Input for name"
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label className={css.label} htmlFor="email">
            <Field
              type="email"
              id="email"
              name="email"
              className={css.input}
              placeholder="Email"
              aria-label="Input for email"
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label} htmlFor="phone">
            <Field
              type="tel"
              id="phone"
              name="phone"
              className={`${css.input} ${css.telInput}`}
              placeholder="Phone"
              aria-label="Input for phone"
            />
            <ErrorMessage name="phone" component="div" className={css.error} />
            <p className={css.phoneTip}>+38 (XXX) XXX - XX - XX</p>
          </label>

          <label className={css.label}>
            Select your position:
            {data?.positions.map((position) => (
              <div key={position.id}>
                <label htmlFor={position.id} className={css.radioLabel}>
                  <Field
                    type="radio"
                    id={position.id}
                    name="position"
                    value={String(position.id)}
                    className={css.radio}
                    aria-label={`${position.name}`}
                  />
                  <span className={css.styledRadio}></span>

                  {position.name}
                </label>
              </div>
            ))}
          </label>
          <ErrorMessage name="position" component="div" className={css.error} />

          <label className={css.label} htmlFor="file">
            File:
            <Field
              type="file"
              id="file"
              name="file"
              accept="image/jpg, image/jpeg"
              aria-label="Input for photo"
            />
            <ErrorMessage name="file" component="div" className={css.error} />
          </label>

          <button type="submit" disabled={!isValid || !dirty}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddUserForm;
