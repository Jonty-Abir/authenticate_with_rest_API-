import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../instance_axios/instance";

export default function useCustom(query) {
  const state = useSelector((state) => state.userDetailsSclice);

  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        const { data, status } = await instance.get("/createResetSession");
        if (status === 201 || status === 200) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }
        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}
