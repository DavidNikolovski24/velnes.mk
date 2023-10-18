import { useEffect, useState } from "react";
import { SalonsDataContext } from "./SalonsDataContext";
import { IRoot } from "../../DummyData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export const SalonsDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [salonsData, setSalonsData] = useState<IRoot[]>();
  const salonsCollectionRef = collection(db, "salons");
  useEffect(() => {
    const getSalons = async () => {
      try {
        const data = await getDocs(salonsCollectionRef);

        setSalonsData(
          data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getSalons();
  }, []);

  const contextValue = {
    salonsData,
    setSalonsData,
  };

  return (
    <SalonsDataContext.Provider value={contextValue}>
      {children}
    </SalonsDataContext.Provider>
  );
};
