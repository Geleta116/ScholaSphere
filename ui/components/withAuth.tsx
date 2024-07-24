// components/withAuth.tsx
import { useEffect, useState, ComponentType, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { fetchUserRole } from '@/util/api/auth-api';

interface WithAuthProps {
  requiredRole: string;
}

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>, requiredRole: string) => {
  const WithAuth = (props: P) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            router.push('/login');
            return;
          }

          const role = await fetchUserRole(token);

          if (role === requiredRole) {
            setAuthorized(true);
          } else {
            router.push('/login');
          }
        } catch (error) {
          router.push('/login');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!authorized) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default WithAuth;
