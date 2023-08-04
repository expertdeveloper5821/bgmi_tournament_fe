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

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  function handleRememberMe(event: any) {
    setRememberMe(event.target.checked);
  }

  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe") === "true";
    setRememberMe(rememberMeValue);
  }, []);

  const initialValues = {
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
      const { email, password } = values;
      if (rememberMe) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      //manual login
      try {
        const response = await sendRequest("v1/login", {
          method: "POST",
          data: { email, password },
        });

        setIsLoading(false);
        
        if (response.status === 200) {
          localStorage.setItem("jwtToken", response.data.token);
          router.push("/adminDashboard");
        } else {
          setError("Invalid email or password");
        }
      } catch (error: any) {
        setIsLoading(false);
        setError("Invalid email or password");
      }
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail) {
      setFieldValue("email", storedEmail);
    }
    if (storedPassword) {
      setFieldValue("password", storedPassword);
    }
  }, [setFieldValue]);


  //verify token
  const handleVerifyToken = async (token: any) => {
    setIsLoading(true);
    try {
      const verifyResponse = await sendRequest("http://localhost:5000/auth/verify", {
        method: "GET",
        data: {
          token: token,
        },
      });

      setIsLoading(false);

      if (verifyResponse.status === 200) {
        router.push("/adminDashboard");
      } else {
        setError("Google Sign-In failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Google Sign-In failed");
    }
  };

 const handleGoogleLogin = () => {
  setIsLoading(true);

  try {
    window.location.href = "http://localhost:5000/auth/google/callback";
  } catch (error) {
    setIsLoading(false);
    setError("Google Sign-In failed");
    console.error("Error during Google Sign-In:", error);
  }
};

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  console.log("token", token, window.location.href);

  if (token) {
    handleVerifyToken(token);
  }
}, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.background_container}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="./assests/technogeticlogo.svg" alt="Tg-logo" />
          </div>

          <div>
            <h2 className={styles.headDesc}>Hello Admin !</h2>
            <p className={styles.heading}>
              Welcome back! Please enter your details
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}
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
                <label htmlFor="rememberMe">Remember Me</label>
              </div>

              <div className={styles.button_wrapper}>
                <Button
                  disabled={isLoading}
                  className={styles.forgetbutton}
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isLoading ? "Loading..." : "Sign in"}


                </Button>
              </div>

              <div className={styles.signin}>
                <span className={styles.forgotDesc}>
                  <Link href="/forget-password">Forget your Password?</Link>
                </span>
              </div>
              <div>
                Sign in
                <FcGoogle />
                <Button
                  disabled={isLoading}
                  className={styles.googleButton}
                  variant="contained"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  {isLoading ? "Loading..." : "Sign in with Google"}
                </Button>
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

export default Login;

// "use client"
// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import { SignupSchema } from "../../schemas/SignupSchemas";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// //@ts-ignore
// import { Button, Input } from "technogetic-iron-smart-ui";
// import styles from "../../styles/auth.module.scss";
// import sendRequest from "../../services/api/apiServices";
// import { FcGoogle } from "react-icons/fc";

// const Login = () => {
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     const rememberMeValue = localStorage.getItem("rememberMe") === "true";
//     setRememberMe(rememberMeValue);

//     const verifyToken = async () => {
//       const jwtToken = localStorage.getItem("jwtToken");
//       if (jwtToken) {
//         try {
//           const verifyResponse = await sendRequest("http://localhost:5000/auth/verify", {
//             method: "GET",
//             data: {
//               token: jwtToken,
//             },
//           });

//           if (verifyResponse.status === 200) {
//             router.push("/adminDashboard");
//           } else {
//             localStorage.removeItem("jwtToken");
//           }
//         } catch (error) {
//           localStorage.removeItem("jwtToken");
//         }
//       }
//     };

//     verifyToken();
//   }, []);

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const handleFormSubmit = async (values: any, { setSubmitting }) => {
//     const { email, password } = values;
//     try {
//       const response = await sendRequest("v1/login", {
//         method: "POST",
//         data: { email, password },
//       });

//       if (response.status === 200) {
//         localStorage.setItem("jwtToken", response.data.token);
//         router.push("/adminDashboard");
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (error) {
//       setError("Server error occurred");
//     }

//     setSubmitting(false);
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: SignupSchema,
//     onSubmit: handleFormSubmit,
//   });

//   const handleVerifyToken = async (token: any) => {
//     setIsLoading(true);
//     try {
//       const verifyResponse = await sendRequest("http://localhost:5000/auth/verify", {
//         method: "GET",
//         data: {
//           token: token,
//         },
//       });

//       setIsLoading(false);

//       if (verifyResponse.status === 200) {
//         router.push("/adminDashboard");
//       } else {
//         setError("Google Sign-In failed");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       setError("Google Sign-In failed");
//     }
//   };

//   const handleRememberMe = (event: any) => {
//     setRememberMe(event.target.checked);
//   };

//   const handleGoogleLogin = () => {
//     setIsLoading(true);

//     try {
//       window.location.href = "http://localhost:5000/auth/google/callback";
//     } catch (error) {
//       setIsLoading(false);
//       setError("Google Sign-In failed");
//       console.error("Error during Google Sign-In:", error);
//     }
//   };

//   return (
//     <div className={styles.main_container}>
//       <div className={styles.background_container}>
//         <div className={styles.container}>
//           <div className={styles.logo}>
//             <img src="./assests/technogeticlogo.svg" alt="Tg-logo" />
//           </div>

//           <div>
//             <h2 className={styles.headDesc}>Hello Admin !</h2>
//             <p className={styles.heading}>
//               Welcome back! Please enter your details
//             </p>
//           </div>
//           <div>
//             <form onSubmit={formik.handleSubmit}>
//               {error && <div className={styles.error}>{error}</div>}
//               <div className={styles.input_box}>
//                 <label className={styles.email} htmlFor="email">
//                   Email ID
//                 </label>
//                 <Input
//                   id="email"
//                   className={styles.email_wrapper}
//                   type="email"
//                   name="email"
//                   autoComplete="off"
//                   placeholder="Enter email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <div className={styles.error}>{formik.errors.email}</div>
//                 )}
//               </div>

//               <div className={styles.input_box}>
//                 <label className={styles.password} htmlFor="password">
//                   Password
//                 </label>
//                 <Input
//                   id="password"
//                   className={styles.password_wrapper}
//                   type="password"
//                   name="password"
//                   autoComplete="off"
//                   placeholder="Enter password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <div className={styles.error}>{formik.errors.password}</div>
//                 )}
//               </div>

//               <div className={styles.checkbox_wrapper}>
//                 <input
//                   type="checkbox"
//                   id="rememberMe"
//                   name="rememberMe"
//                   checked={rememberMe}
//                   onChange={handleRememberMe}
//                 />
//                 <label htmlFor="rememberMe">Remember Me</label>
//               </div>

//               <div className={styles.button_wrapper}>
//                 <Button
//                   disabled={isLoading || formik.isSubmitting}
//                   className={styles.forgetbutton}
//                   variant="contained"
//                   type="submit"
//                 >
//                   {formik.isSubmitting ? "Loading..." : "Sign in"}
//                 </Button>
//               </div>

//               <div className={styles.signin}>
//                 <span className={styles.forgotDesc}>
//                   <Link href="/forget-password">Forget your Password?</Link>
//                 </span>
//               </div>
//               <div>
//                 Sign in
//                 <FcGoogle />
//                 <Button
//                   disabled={isLoading}
//                   className={styles.googleButton}
//                   variant="contained"
//                   type="button"
//                   onClick={handleGoogleLogin}
//                 >
//                   {isLoading ? "Loading..." : "Sign in with Google"}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className={styles.girlImg_wrapper}>
//           <img src="./assests/pubgImg.png" alt="bgmiImg" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
