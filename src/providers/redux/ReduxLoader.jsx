import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "@/features/products/productsSlice";
import { fetchUser } from "@/features/user/userSlice";

export default function ReduxLoader() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = async () => {
      dispatch(fetchDataStart());
      try {
        const productsCollection = collection(db, "products");

        const filtersArray = [];
        if (filters.category)
          filtersArray.push(where("category", "==", filters.category));
        if (filters.subcategory)
          filtersArray.push(where("subcategory", "==", filters.subcategory));
        if (filters.minPrice)
          filtersArray.push(where("price", ">=", filters.minPrice));
        if (filters.maxPrice)
          filtersArray.push(where("price", "<=", filters.maxPrice));

        const q = query(productsCollection, ...filtersArray);
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchDataSuccess(data));
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
      }
    };

    unsubscribe();

    return () => unsubscribe();
  }, [filters, dispatch]);

  return null;
}
