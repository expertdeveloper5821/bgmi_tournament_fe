import { useEffect, useState } from 'react';
import Router from 'next/router';

const withAuth = (WrappedComponent: any) => {
  const WithAuth = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      // Fetch user data here and set it using setUser
      // For example:
      const token = localStorage.getItem('jwtToken');
      console.log('jwtToken', token);
      setUser(token);
      setLoading(false);
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      window.location.href = '/';
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.getInitialProps = async (ctx: any) => {
    const wrappedComponentInitialProps = WrappedComponent.getInitialProps
      ? await WrappedComponent.getInitialProps(ctx)
      : {};

    return { ...wrappedComponentInitialProps };
  };

  return WithAuth;
};

export default withAuth;
