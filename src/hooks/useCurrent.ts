import React from "react";

import { useAuth } from "./useAuth";
import { useClearSessionCookieMutation, useFindProfileQuery } from "@/graphql/generated/output";

export const useCurrent = () => {
  const { isAuthentificated, exit } = useAuth();

  const { data, loading, refetch, error } = useFindProfileQuery({
    skip: !isAuthentificated,
  });

  const [clear] = useClearSessionCookieMutation();

  React.useEffect(() => {
    // if (error) {
    //   if (isAuthentificated) {
    //     clear();
    //   }
    //   exit();
    // }
  }, [isAuthentificated, exit, clear]);

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
};
