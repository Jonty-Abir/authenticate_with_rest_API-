import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserToToken } from "../helpers/helper";
import instance from "../instance_axios/instance";

export default function useHook(query) {
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
        const { userName } = state?.userName ? state : await getUserToToken();
        const time2 = state?.userName ? state : await getUserToToken();
        setData((prev) => ({ ...prev, isLoading: true }));
        const { data, status } = query
          ? await instance.get(
              `/user/userName?userName=${userName ? userName : time2.userName}`
            )
          : await instance.get(
              `/user/userName?userName=${userName ? userName : time2.userName}`
            );

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
  }, [query,state]);

  return [getData, setData];
}
