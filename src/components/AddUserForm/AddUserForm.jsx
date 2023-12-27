import React, { useEffect, useState } from "react";
import { getPositions, postUser } from "../../helpers/api/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./AddUserForm.module.scss";

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
  position: Yup.number().required("Position is required"),
  file: Yup.mixed().required("Photo is required"),
});

const AddUserForm = () => {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    const fetchPositions = async () => {
      const data = await getPositions();
      setPositions(data);
      console.log(positions);
    };
    fetchPositions();
  }, []);
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: 0,
    file: "",
  };

  const handleSubmit = (values) => {
    // console.log({ ...values, file: values.file.files[0] });
    // // postUser(values);
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    console.log({ ...values, file });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => (
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
          {positions.map((position, i) => (
            <div key={position.id}>
              <label htmlFor={`position-${position.id}`}>
                <Field
                  type="radio"
                  id={`position-${position.id}`}
                  name="position"
                  value={Number(i + 1)}
                  className={css.radio}
                />
                {position.name}
              </label>
            </div>
          ))}
          <ErrorMessage name="position" component="div" />
          <label htmlFor="file">
            File: <Field type="file" id="file" name="file" />
            <ErrorMessage name="file" component="div" />
          </label>

          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddUserForm;
