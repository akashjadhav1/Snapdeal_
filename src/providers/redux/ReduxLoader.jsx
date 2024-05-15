import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/features/user/userSlice";
import { fetchUserData } from "@/features/userData/fetchUserData";

export default function ReduxLoader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const unsubscribe = () => dispatch(fetchUser());

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user.isAuthenticated) dispatch(fetchUserData());
  }, [user]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return null;
}
