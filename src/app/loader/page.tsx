'use client';
import {useState, useEffect} from 'react';
import styles from './loader.module.scss';
import {useRouter} from 'next/navigation';
import sendRequest from '@/services/auth/auth_All_Api';

type Props = {};

const Loader = (props: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleVerifyToken = async (token: any) => {
    setIsLoading(true);
    try {
      const verifyResponse = await sendRequest("auth/verify/?" +`token=${token}` , {
        method: "GET",
       
      });
      console.log("verifyResponse", verifyResponse);

      setIsLoading(false);

      if (verifyResponse.status === 200) {
        router.push("/dashboardPage");
      } else {
        setError("Google Sign-In failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Google Sign-In failed");
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/login');
  //   }, 2000);
  // });
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token", token,window.location.href)
    handleVerifyToken(token)
  },[])

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.background_container}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <img src="./assests/technogeticlogo.svg" alt="Tg-logo"></img>
            </div>
          </div>
        </div>
      </div>
      <h2>Loader</h2>
    </>
  );
};

export default Loader;
