import { fetchUser } from "@/features/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ReduxLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return null;
}
