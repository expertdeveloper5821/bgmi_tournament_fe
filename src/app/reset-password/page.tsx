"use client"
import React from "react";
import styles from "./credential.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../../schemas/SignupSchemas";
//@ts-ignore
import { Button, Input } from "technogetic-iron-smart-ui";
import sendRequest from "../../services/api/apiServices";

const UpdateCredential = () => {
  const [token, setToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const tokenParam = searchParams.get("token");
      setToken(tokenParam || "");
    }
  }, []);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      const { newPassword, confirmPassword } = values;
      try {
        const response = await sendRequest(`v1/reset-password?token=${token}`, {
          method: "POST",
          data: { newPassword, confirmPassword },
        });
        if (response.status === 200) {
          router.push("reset-password/updateCredSuccess");;
        } else {
          console.error("Password update failed");
        }
      } catch (error: any) { }
    },
  });


  return (
    <div className={styles.main_container}>
      <div className={styles.background_container}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="./assests/technogeticlogo.svg" alt="Tg-logo"></img>
          </div>

          <div>
            <h2>Reset Password</h2>
            <p className={styles.heading}>
              Please enter your password and confirm the password
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className={styles.input_box}>
                <label htmlFor="newPassword" className={styles.password}>
                  New password
                </label>

                <Input
                  id="newPassword"
                  className={styles.password_wrapper}
                  name="newPassword"
                  autoComplete="off"
                  placeholder="Enter password"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Input>
                <div className={styles.error}>
                  {errors.newPassword && touched.newPassword ? (
                    <p>{(errors.newPassword = "Password must be at least 6 characters")}</p>
                  ) : null}
                </div>
              </div>

              <div className={styles.input_box}>
                <label
                  htmlFor="confirmPassword"
                  className={styles.password}
                >
                  Confirm New Password
                </label>
                <Input
                  id="confirmPassword"
                  className={styles.password_wrapper}
                  name="confirmPassword"
                  autoComplete="off"
                  placeholder="Enter new password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Input>
                <div className={styles.error}>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p>{(errors.confirmPassword = "Both passwords must match")}</p>
                  ) : null}
                </div>
              </div>

              <div className={styles.button_wrapper}>
                <Button
                  varient="contained"
                  className={styles.forgetbutton}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.girlImg_wrapper}>
          <img src="./assests/pubgImg.png" alt="bgmiImg"></img>
        </div>
      </div>
    </div>
  );
};

export default UpdateCredential;