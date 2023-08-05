'use client'
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SignupSchema } from "../../schemas/SignupSchemas";
import { useRouter } from "next/navigation";
import Link from "next/link";
//@ts-ignore
import { Button, Input } from "technogetic-iron-smart-ui";
import styles from "../../styles/auth.module.scss";
import sendRequest from "../../services/api/apiServices";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const initialValues = {
        fullName: "",
        userName: "",
        email: "",
        password: "",
    };

    const {
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const { fullName, userName, email, password } = values;
            if (rememberMe) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 30);
            }

            try {
                const response = await sendRequest("v1/signup", {
                    method: "POST",
                    data: { fullName, userName, email, password },
                });
                if (response.status === 200) {
                    localStorage.setItem("jwtToken", response.data.token);
                    router.push("/login");
                } else {
                    setError("Failed to sign up. Please try again.");
                }
            } catch (error: any) {
                setIsLoading(false);
                setError("Failed to sign up. Please try again.");
            }
        },
    });

    useEffect(() => {
        const storedFullname = localStorage.getItem("fullName");
        const storedPlayerId = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (storedFullname) {
            setFieldValue("fullName", storedFullname);
        }

        if (storedPlayerId) {
            setFieldValue("userName", storedPlayerId);
        }
        if (storedEmail) {
            setFieldValue("email", storedEmail);
        }
        if (storedPassword) {
            setFieldValue("password", storedPassword);
        }
    }, [setFieldValue]);

    return (
        <div className={styles.main_container}>
            <div className={styles.background_container}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <img src="./assests/logobgmi.svg" alt="Tg-logo" />
                    </div>
                    <div>
                        <h2 className={styles.headDesc}>Welcome back</h2>
                        <p className={styles.heading}>Welcome back! Please enter your details</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            {error && <div className={styles.error}>{error}</div>}
                            <div className={styles.input_box}>
                                <label className={styles.email} htmlFor="Fullname">
                                    <img src="./assests/fullnameicon.svg" alt="fullname" />
                                </label>
                                <Input

                                    id="fullName"
                                    className={styles.email_wrapper}
                                    type="text"
                                    name="fullName"
                                    autoComplete="off"
                                    placeholder="Full Name"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </div>
                            {errors.fullName && touched.fullName && (
                                <div className={styles.error}>{errors.fullName}</div>
                            )}
                            <div className={styles.input_box}>
                                <label className={styles.email} htmlFor="UserName">
                                    <img src="./assests/fullnameicon.svg" alt="fullname" />
                                </label>
                                <Input
                                    id="userName"
                                    className={styles.email_wrapper}
                                    type="text"
                                    name="userName"
                                    autoComplete="off"
                                    placeholder="Player ID / Username"
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </div>
                            {errors.userName && touched.userName && (
                                <div className={styles.error}>{errors.userName}</div>
                            )}
                            <div className={styles.input_box}>
                                <label className={styles.email} htmlFor="email">
                                    <img src="./assests/maillogo.svg" alt="mailogo" />
                                </label>
                                <Input
                                    id="email"
                                    className={styles.email_wrapper}
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    placeholder="Email ID"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </div>
                            {errors.email && touched.email && (
                                <div className={styles.error}>{errors.email}</div>
                            )}
                            <div className={styles.input_box}>
                                <label className={styles.password} htmlFor="password">
                                    <img src="./assests/passwordlogo.svg" alt="passwordlogo" />
                                </label>
                                <Input
                                    id="password"
                                    className={styles.password_wrapper}
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    placeholder="Your Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {errors.password && touched.password && (
                                <div className={styles.error}>{errors.password}</div>
                            )}

                            <div className={styles.signin_withgoogle}>
                                <FcGoogle /> Sign in with Google
                            </div>
                            <div className={styles.button_wrapper}>
                                <Button
                                    disabled={isLoading}
                                    className={styles.forgetbutton}
                                    variant="contained"
                                    type="submit"
                                    onClick={handleSubmit}

                                >
                                    {isLoading ? "Loading..." : "Sign up"}

                                </Button>
                            </div>
                            <div className={styles.signin}>
                                <span className={styles.forgotDesc}>
                                    <Link href="/login"> Already have a account ? &nbsp; <b>Login</b></Link>
                                </span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;







