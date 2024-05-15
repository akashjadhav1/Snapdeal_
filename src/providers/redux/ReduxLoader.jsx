import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setMinPrice } from "@/features/products/productsSlice";
import { fetchUser } from "@/features/user/userSlice";
import { fetchUserData } from "@/features/userData/userDataSlice";

export default function ReduxLoader() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const unsubscribe = () => dispatch(fetchUser());

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = () => {
      if (user.isAuthenticated) dispatch(fetchUserData());
    };

    return () => unsubscribe();
  }, [user.data]);

  return null;
}
