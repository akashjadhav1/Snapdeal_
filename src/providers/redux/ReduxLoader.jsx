import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setMinPrice } from "@/features/products/productsSlice";
import { fetchUser } from "@/features/user/userSlice";

export default function ReduxLoader() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  useEffect(() => {
    const unsubscribe = () => dispatch(fetchUser());

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = () => dispatch(fetchData());

    return () => unsubscribe();
  }, [filters, dispatch]);

  return null;
}
