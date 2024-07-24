// components/withAuth.tsx
"use client";
import { useEffect, useState, ComponentType, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchUserRole } from "@/util/api/auth-api";

interface WithAuthProps {
  requiredRole: string;
}

const WithAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredRole: string[]
) => {
  const WithAuth = (props: P) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = localStorage.getItem("accessToken");

          if (!token) {
            return;
          }

          const userRoles = await fetchUserRole(token);

          const hasRequiredRole = userRoles.some((role: string) =>
            requiredRole.includes(role)
          );

          if (hasRequiredRole) {
            setAuthorized(true);
          } else {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
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
