import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/lib/hooks/useAxiosAauth";
import API from "@/common/constant/api-path";

export const useGetGoogle = ({ params }: { params: any }) => {
  const axiosAuth = useAxiosAuth();

  const getGoogle = async () => {
    const response = await axiosAuth.get(API.GOOGLE_OAUTH, { params });
    return response.data;
  };

  return useQuery({
    queryKey: ["google", params],
    queryFn: getGoogle,
  });
}; 