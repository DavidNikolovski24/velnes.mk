import styled, { css } from "styled-components";
import Titlebar from "../components/Titlebar/Titlebar";
import { H2Styled, PnormalTextRegular } from "../styles/Headlines/Headlines";
import { theme } from "../styles/themeStyles";

import AppointmentList from "../components/AppointmentsList/AppointmentList";
import SearchCta from "../components/BottomCta/SearchCta";
import { ReactDimmer } from "react-dimmer";
import { useEffect, useState } from "react";
import { PageContainerPrimary } from "../styles/Section/SectionStyled";
import { useNavigate, useParams } from "react-router";
import { IRoot } from "../DummyData";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const CancelPage = () => {
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [findedSalon, setFindedSalon] = useState<IRoot>();

  const salonDocRef = doc(collection(db, "salons"), id);
  useEffect(() => {
    getDoc(salonDocRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setFindedSalon(snapshot.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
    console.log(findedSalon);
  }, []);

  const putData = async () => {
    const salonDocRef = doc(collection(db, "salons"), id);

    const updates = {
      ...findedSalon,
      appointments: [],
    };

    updateDoc(salonDocRef, updates).then(() => {
      console.log("doc updated");
    });
  };

  return (
    <>
      <Titlebar icons={false} headline="" bg="white" closeIcon={true} />
      <PageContainerPrimary gap={theme.spacings.XL}>
        <H2Styled color={theme.colors.primary.brown}>
          Are you sure you want to cancel?
        </H2Styled>
        {findedSalon && <AppointmentList iconRight={true} {...findedSalon} />}

        <PnormalTextRegular color={theme.colors.primary.black}>
          If you want to change the appointment time, you can reschedule your
          appointment.
        </PnormalTextRegular>
      </PageContainerPrimary>
      <BottomContainer>
        <SearchCta
          firstText="Close"
          secondText="Confirm"
          nextHandler={() => {
            setIsModalConfirm(true);
            putData();
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }}
          prevHandler={() => {
            navigate(-1);
          }}
        />
      </BottomContainer>
      <CancelModalContainer data-ismodalopen={isModalConfirm}>
        <H2Styled color="white">Appointment cancelled</H2Styled>
      </CancelModalContainer>
      <ReactDimmer
        isOpen={isModalConfirm}
        exitDimmer={setIsModalConfirm}
        zIndex={100}
        transition={0.4}
        opacity={0.6}
      />
    </>
  );
};

export default CancelPage;

const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  min-width: 100%;
  background: white;
`;
const openModalStyles = css`
  transform: translateY(0%);
`;
const CancelModalContainer = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  z-index: 9999;
  overflow: auto;
  padding-top: 20px;
  padding: 22px 24px 32px 24px;
  transform: translateY(200%);
  transition: 0.5s;

  &[data-ismodalopen="true"] {
    ${openModalStyles}
  }
`;
