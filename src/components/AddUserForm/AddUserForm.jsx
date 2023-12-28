import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./AddUserForm.module.scss";
import {
  useAddNewUserMutation,
  useGetPositionsQuery,
  useGetUsersQuery,
} from "../../helpers/redux/api";
import { toast } from "react-toastify";

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
    .matches(/^(\+380)[0-9]{9}$/, "Phone number should start with +380")
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

  const fileInput = document.getElementById("file");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
    file: "",
  };

  const handleSubmit = async (values) => {
    const file = fileInput.files[0];
    const position = Number(values.position);

    const newValues = { ...values, file, position };
    await addNewUser(newValues);
    refetch();
    isError && console.log(isError);
    isError.error?.status === 401 && toast("Please sign up!");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.textFields}>
            <div className={css.inputWrapper}>
              <Field
                type="text"
                id="name"
                name="name"
                className={`${css.input} ${
                  errors.name && touched.name ? css.invalid : ""
                }`}
                placeholder="Your name"
                aria-label="Input for name"
              />
              <label
                htmlFor="name"
                className={`${css.textInputLabel}   ${
                  errors.name && touched.name && css.invalid
                }
                `}
              >
                Your Name
              </label>
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                aria-label="Input for email"
                className={`${css.input}  ${
                  errors.email && touched.email ? css.invalid : ""
                }`}
              />
              <label
                htmlFor="email"
                className={`${css.textInputLabel}   ${
                  errors.file && touched.email && css.invalid
                }
                `}
              >
                Email
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.inputWrapper}>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className={`${css.input} ${css.telInput} ${
                  errors.phone && touched.phone ? css.invalid : ""
                }`}
                placeholder="Phone"
                aria-label="Input for phone"
              />
              <label
                htmlFor="phone"
                className={`${css.textInputLabel}   ${
                  errors.phone && touched.phone && css.invalid
                }
                `}
              >
                Phone
              </label>
              <ErrorMessage
                name="phone"
                component="div"
                className={css.error}
              />
              <p className={css.phoneTip}>+38 (XXX) XXX - XX - XX</p>
            </div>
          </div>
          <div className={css.nonTextFields}>
            <label className={`${css.label} ${css.radioWrapper}`}>
              <p className={css.selectPositionHelper}>Select your position:</p>
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
            <ErrorMessage
              name="position"
              component="div"
              className={css.error}
            />

            <label className={css.label} htmlFor="file">
              <Field
                type="file"
                id="file"
                name="file"
                accept="image/jpg, image/jpeg"
                aria-label="Input for photo"
                className={css.filePicker}
                hidden
              />
              <span
                className={`${css.customFilePicker}   ${
                  errors.file && touched.file && css.invalid
                }
                `}
              >
                <span
                  className={`${css.customFilePickerBtn}   ${
                    errors.file && touched.file && css.invalid
                  }
                `}
                >
                  Upload
                </span>
                <span
                  className={` ${css.customFilePickerText}  ${
                    errors.file && touched.file && css.invalid
                  }
                `}
                >
                  {fileInput?.files[0]?.name || "Upload your photo here"}
                </span>
              </span>
              <ErrorMessage name="file" component="div" className={css.error} />
            </label>
          </div>

          <button type="submit" disabled={!isValid || !dirty}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddUserForm;
