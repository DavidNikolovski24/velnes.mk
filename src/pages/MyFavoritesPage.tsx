import Titlebar from "../components/Titlebar/Titlebar";
import { H2Styled } from "../styles/Headlines/Headlines";
import { theme } from "../styles/themeStyles";
import CardSaloon from "../components/Cards/CardSaloon/CardSaloon";
import { PageContainerPrimary } from "../styles/Section/SectionStyled";
import { IRoot } from "../DummyData";
import { useEffect, useState } from "react";
import { useSalonsDataContext } from "../Context/SalonsDataContext/SalonsDataContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const MyFavoritesPage = () => {
  const [clickedSalon, setClickedSalon] = useState(null);
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

  useEffect(() => {
    if (clickedSalon) {
      const salonDocRef = doc(collection(db, "salons"), clickedSalon);

      getDoc(salonDocRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const salon = snapshot.data();

            const updates = {
              ...salon,
              isFavorite: !salon.isFavorite,
            };

            updateDoc(salonDocRef, updates)
              .then(() => {
                console.log("doc updated");
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
    setSalonsData((prevSalonsData: any) => {
      return prevSalonsData?.map((salon: IRoot) => {
        if (salon.id === clickedSalon) {
          return { ...salon, isFavorite: !salon.isFavorite };
        } else {
          return salon;
        }
      });
    });
  }, [clickedSalon]);

  return (
    <>
      <Titlebar icons={false} headline="" bg="white" closeIcon={true} />
      <PageContainerPrimary gap={theme.spacings.L * 2}>
        <H2Styled color={theme.colors.primary.brown}>My favorites</H2Styled>
        {salonsData?.map((salon: IRoot) =>
          salon.isFavorite === true ? (
            <CardSaloon
              key={salon.id}
              {...salon}
              outsideSetterFav={setClickedSalon}
            />
          ) : (
            false
          )
        )}
      </PageContainerPrimary>
    </>
  );
};

export default MyFavoritesPage;
