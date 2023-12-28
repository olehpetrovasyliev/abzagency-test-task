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
          <label htmlFor="name">Name:</label>
          <Field
            type="text"
            id="name"
            name="name"
            className={css.input}
            placeholder="Your name"
          />
          <ErrorMessage name="name" component="div" />
          <label htmlFor="email">
            Email:
            <Field
              type="email"
              id="email"
              name="email"
              className={css.input}
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" />
          </label>
          <label htmlFor="phone">
            <Field
              type="tel"
              id="phone"
              name="phone"
              className={css.input}
              placeholder="Phone"
            />
            <ErrorMessage name="phone" component="div" />
            +38 (XXX) XXX - XX - XX
          </label>

          <label>Select your position:</label>
          {data?.positions.map((position) => (
            <div key={position.id}>
              <label htmlFor={position.id} className={css.radioLabel}>
                <Field
                  type="radio"
                  id={position.id}
                  name="position"
                  value={String(position.id)}
                  className={css.radio}
                />
                <span className={css.styledRadio}></span>

                {position.name}
              </label>
            </div>
          ))}
          <ErrorMessage name="position" component="div" />

          <label htmlFor="file">
            File:
            <Field
              type="file"
              id="file"
              name="file"
              accept="image/jpg, image/jpeg"
            />
            <ErrorMessage name="file" component="div" />
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
