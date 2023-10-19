'use client';
import styles from '@/styles/privacy.module.scss';
const page = () => {
  return (
    <div className={styles.terms}>
      <div className={styles.container2}>
        <h1 className={styles.policy_heading}>Privacy Policy</h1>
        <h3 className={styles.policy_main_subheading}>Last updated on Aug 1st 2023</h3>
        <p className={styles.policy_para}>
          This privacy policy sets out how TECHNOGETIC PVT LTD uses and protects any information
          that you give TECHNOGETIC PVT LTD when you use this website.
        </p>
        <p className={styles.policy_para}>
          TECHNOGETIC PVT LTD is committed to ensuring that your privacy is protected. Should we ask
          you to provide certain information by which you can be identified when using this website,
          and then you can be assured that it will only be used in accordance with this privacy
          statement.
        </p>
        <p className={styles.policy_para}>
          TECHNOGETIC PVT LTD may change this policy from time to time by updating this page. You
          should check this page from time to time to ensure that you are happy with any changes.
        </p>
        <h3 className={styles.policy_subheading}>We may collect the following information:</h3>
        <ul className={styles.policy_points}>
          <li className={styles.policy_list}>Name and job title</li>
          <li className={styles.policy_list}>Contact information including email address</li>
          <li className={styles.policy_list}>
            Demographic information such as postcode, preferences and interests
          </li>
          <li className={styles.policy_list}>
            Other information relevant to customer surveys and/or offers
          </li>
        </ul>
        <h3 className={styles.policy_subheading}>What we do with the information we gather</h3>
        <p className={styles.policy_para}>
          We require this information to understand your needs and provide you with a better
          service, and in particular for the following reasons:
        </p>
        <ul className={styles.policy_points}>
          <li className={styles.policy_list}>Internal record keeping.</li>
          <li className={styles.policy_list}>
            We may use the information to improve our products and services.
          </li>
          <li className={styles.policy_list}>
            We may periodically send promotional emails about new products, special offers or other
            information which we think you may find interesting using the email address which you
            have provided.
          </li>
          <li className={styles.policy_list}>
            From time to time, we may also use your information to contact you for market research
            purposes. We may contact you by email, phone, fax or mail. We may use the information to
            customise the website according to your interests.
          </li>
        </ul>
        <p className={styles.policy_para}>
          We are committed to ensuring that your information is secure. In order to prevent
          unauthorised access or disclosure we have put in suitable measures.
        </p>
        <h3 className={styles.policy_subheading}>How we use cookies</h3>
        <p className={styles.policy_para}>
          A cookie is a small file which asks permission to be placed on your computer's hard drive.
          Once you agree, the file is added and the cookie helps analyses web traffic or lets you
          know when you visit a particular site. Cookies allow web applications to respond to you as
          an individual. The web application can tailor its operations to your needs, likes and
          dislikes by gathering and remembering information about your preferences.
        </p>
        <p className={styles.policy_para}>
          We use traffic log cookies to identify which pages are being used. This helps us analyses
          data about webpage traffic and improve our website in order to tailor it to customer
          needs. We only use this information for statistical analysis purposes and then the data is
          removed from the system.
        </p>
        <p className={styles.policy_para}>
          Overall, cookies help us provide you with a better website, by enabling us to monitor
          which pages you find useful and which you do not. A cookie in no way gives us access to
          your computer or any information about you, other than the data you choose to share with
          us.
        </p>
        <p className={styles.policy_para}>
          You can choose to accept or decline cookies. Most web browsers automatically accept
          cookies, but you can usually modify your browser setting to decline cookies if you prefer.
          This may prevent you from taking full advantage of the website.
        </p>
        <h3 className={styles.policy_subheading}>Controlling your personal information</h3>
        <p className={styles.policy_para}>
          You may choose to restrict the collection or use of your personal information in the
          following ways:
        </p>
        <ul className={styles.policy_points}>
          <li className={styles.policy_list}>
            whenever you are asked to fill in a form on the website, look for the box that you can
            click to indicate that you do not want the information to be used by anybody for direct
            marketing purposes
          </li>
          <li className={styles.policy_list}>
            if you have previously agreed to us using your personal information for direct marketing
            purposes, you may change your mind at any time by writing to or emailing us at
            support@pattseheadshot.com
          </li>
        </ul>
        <p className={styles.policy_para}>
          We will not sell, distribute or lease your personal information to third parties unless we
          have your permission or are required by law to do so. We may use your personal information
          to send you promotional information about third parties which we think you may find
          interesting if you tell us that you wish this to happen.
        </p>
        <p className={styles.policy_para}>
          If you believe that any information we are holding on you is incorrect or incomplete,
          please write to or email us as soon as possible, at the above address. We will promptly
          correct any information found to be incorrect.
        </p>
      </div>
    </div>
  );
};

export default page;
