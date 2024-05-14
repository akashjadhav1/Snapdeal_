import { useQuery } from "@tanstack/react-query";
import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";

async function fetchCategories() {
  const categoriesCollection = collection(db, "categories");
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 3600000,
  });
}
