import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/features/user/userSlice";
import { fetchUserData } from "@/features/userData/fetchUserData";
import { Spinner } from "@nextui-org/react";

export default function ReduxLoader({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(fetchUser());
    // No need for cleanup as there's no subscription to unsubscribe from
  }, [dispatch]);

  useEffect(() => {
    if (user.isAuthenticated) {
      dispatch(fetchUserData());
    }
  }, [user.isAuthenticated, dispatch]);

  const isUserLoaded = user.status === "fulfilled";
  const isUserDataLoaded =
    !user.isAuthenticated || userData.status === "fulfilled";

  if (isUserLoaded && isUserDataLoaded) {
    return children;
  } else {
    return (
      <div className="flex min-w-full h-screen justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
}
