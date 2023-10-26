import { useEffect, useState } from 'react';
import Loader from '../CommonComponent/Loader/Loader';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Fetch user data here and set it using setUser
      // For example:
      const token = localStorage.getItem('jwtToken');
      setUser(token);
      setLoading(false);
    }, []);

    if (loading) {
      return (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Loader />
        </div>
      );
    }

    if (!user) {
      window.location.href = '/';
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.getInitialProps = async (ctx) => {
    const wrappedComponentInitialProps = WrappedComponent.getInitialProps
      ? await WrappedComponent.getInitialProps(ctx)
      : {};

    return { ...wrappedComponentInitialProps };
  };

  return WithAuth;
};

export default withAuth;
