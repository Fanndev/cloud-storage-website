import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAauth";
import API from "@/common/constant/api-path";

export const useGetFile = ({ params }: { params: any }) => {
  const axiosAuth = useAxiosAuth();

  const getCourseFile = async () => {
    const response = await axiosAuth.get(API.FILE, { params });
    return response.data;
  };

  return useQuery({
    queryKey: ["file", params],
    queryFn: getCourseFile,
  });
}; 