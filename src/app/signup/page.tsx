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


    function handleRememberMe(event: React.ChangeEvent<HTMLInputElement>) {
        setRememberMe(event.target.checked);
    }

    // useEffect(() => {
    //     const rememberMeValue = localStorage.getItem("rememberMe") === "true";
    //     setRememberMe(rememberMeValue);
    // }, []);

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
            // console.log("fullName", fullName);
            // console.log("userName", userName);
            // console.log("email", email);
            // console.log("password", password);


            if (rememberMe) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 30);
                // localStorage.setItem("fullName", fullName);
                // localStorage.setItem("userName", userName);
                // localStorage.setItem("email", email);
                // localStorage.setItem("password", password);
                // localStorage.setItem("rememberMe", "true");
            } else {
                // localStorage.removeItem("fullName");
                // localStorage.removeItem("userName");
                // localStorage.removeItem("email");
                // localStorage.removeItem("password");
                // localStorage.removeItem("rememberMe");
            }

            try {
                const response = await sendRequest("v1/signup", {
                    method: "POST",
                    data: { fullName, userName, email, password },
                });
                // console.log("Fullname", values.fullName);
                // console.log("UserName", values.userName);
                // console.log("response", response)

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
        console.log("check ==>", storedFullname);
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
                        {/* <img src="./assests/technogeticlogo.svg" alt="Tg-logo" /> */}
                    </div>
                    <div>
                        {/* <h2 className={styles.headDesc}>Hello Admin !</h2> */}
                        <p className={styles.heading}>Welcome back! Please enter your details</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            {error && <div className={styles.error}>{error}</div>}
                            <div className={styles.input_box}>
                                <label className={styles.email} htmlFor="Fullname">
                                    Full name
                                </label>
                                <Input
                                    id="fullName"
                                    className={styles.email_wrapper}
                                    type="text"
                                    name="fullName"
                                    autoComplete="off"
                                    placeholder="Enter fullname"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.fullName && touched.fullName && (
                                    <div className={styles.error}>{errors.fullName}</div>
                                )}
                            </div>
                            <div className={styles.input_box}>
                                <label className={styles.email} htmlFor="UserName">
                                    Player Id / Username
                                </label>
                                <Input
                                    id="userName"
                                    className={styles.email_wrapper}
                                    type="text"
                                    name="userName"
                                    autoComplete="off"
                                    placeholder="Player Id"
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.userName && touched.userName && (
                                    <div className={styles.error}>{errors.userName}</div>
                                )}
                            </div>
                            <div className={styles.input_box}>
                                <label className={styles.email} htmlFor="email">
                                    Email ID
                                </label>
                                <Input
                                    id="email"
                                    className={styles.email_wrapper}
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (
                                    <div className={styles.error}>{errors.email}</div>
                                )}
                            </div>
                            <div className={styles.input_box}>
                                <label className={styles.password} htmlFor="password">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    className={styles.password_wrapper}
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    placeholder="Enter password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password && (
                                    <div className={styles.error}>{errors.password}</div>
                                )}
                            </div>
                            <div className={styles.checkbox_wrapper}>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={rememberMe}
                                    onChange={handleRememberMe}
                                />
                                <label htmlFor="rememberMe">Already a Member ? Log In</label>
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
                                    Already a Member  ? <Link href="/login">Log In</Link>
                                </span>
                            </div>
                            <div>
                                Sign in <FcGoogle />
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.girlImg_wrapper}>
                    <img src="./assests/pubgImg.png" alt="bgmiImg" />
                </div>
            </div>
        </div>
    );
};

export default Signup;







