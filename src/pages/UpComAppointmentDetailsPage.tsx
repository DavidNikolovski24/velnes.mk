import styled from "styled-components";
import Titlebar from "../components/Titlebar/Titlebar";
import { ALink, PrimaryButtonFull } from "../styles/Buttons/Buttons";
import {
  ButtonsTypo,
  H2Styled,
  H3Styled,
  PHelpText,
  PnormalTextBold,
  PnormalTextRegular,
} from "../styles/Headlines/Headlines";
import { theme } from "../styles/themeStyles";

import Badge from "../components/Badge/Badge";
import {
  ContainerAlignCenter,
  ContainerInlineFDirColAlignStart,
  ContainerJSpaceBetweenAStart,
  PageContainerPrimary,
} from "../styles/Section/SectionStyled";
import AppointmentDetailsCard from "../components/Cards/AppointmentDetailsCard/AppointmentDetailsCard";
import Accordion from "../components/Accordion/Accordion";
import { WarningDiv } from "./ReviewAndConfirmPage";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { IRoot } from "../DummyData";
import { useRandomIncreasingPrice } from "../Hooks/useRandomIncreasingPrice";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const UpComAppointmentDetailsPage = () => {
  const [findedSalon, setFindedSalon] = useState<IRoot>();
  const [isUpcommingApp, setIsUpcommingApp] = useState<boolean>();

  const navigate = useNavigate();
  const totalPrice = findedSalon?.appointments?.reduce(
    (total: number, serv: any) => total + (serv.price || 0),
    0
  );

  const randomHigherPrice = useRandomIncreasingPrice(totalPrice || 0);
  const { id } = useParams();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

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
  }, []);

  useEffect(() => {
    const currentDate = new Date().getDate();
    let hasUpcomingApp = false;

    if (findedSalon?.appointments) {
      findedSalon.appointments.forEach((appointment) => {
        if (
          appointment.choosedDate &&
          appointment.choosedDate.date >= currentDate
        ) {
          hasUpcomingApp = true;
        }
      });
    }

    setIsUpcommingApp(hasUpcomingApp);
  }, [findedSalon]);

  return (
    <>
      <Titlebar icons={false} headline="" bg="white" closeIcon={true} />
      <PageContainerPrimary pbot={100}>
        {/*  */}
        <BadgesContainer>
          <Badge text={isUpcommingApp ? "Confirmed" : "Finished"} />
          <Badge text={isUpcommingApp ? "Payment on the spot" : "Paid"} />
        </BadgesContainer>
        {/*  */}
        <H2Styled color={theme.colors.primary.brown}>
          {findedSalon?.appointments &&
            `${findedSalon?.appointments[0].choosedDate?.day} ${findedSalon?.appointments[0].choosedDate?.date} ${currentMonth} at ${findedSalon?.appointments[0].choosedTime}`}
        </H2Styled>
        {/*  */}
        <ContainerInlineFDirColAlignStart gap={theme.spacings.XXS}>
          <PnormalTextBold>{findedSalon?.name}</PnormalTextBold>
          <ContainerAlignCenter gap={theme.spacings.XS}>
            <PnormalTextRegular>Closed</PnormalTextRegular>
            <span>&#183;</span>
            <PnormalTextRegular>Opens on Tuesday at 10:00</PnormalTextRegular>
          </ContainerAlignCenter>
          <ALink color={theme.colors.primary.orange}>
            {findedSalon?.address + " " + findedSalon?.location}
          </ALink>
        </ContainerInlineFDirColAlignStart>
        {/*  */}
        <PrimaryButtonFull
          bg="white"
          outline={theme.colors.primary.orange}
          onClick={() => {
            isUpcommingApp
              ? navigate(`/my-appointments/manage-appointments/${id}`)
              : navigate("feedback");
          }}
        >
          <ButtonsTypo color={theme.colors.primary.brown}>
            {isUpcommingApp ? "Manage appointment" : "Write a review"}
          </ButtonsTypo>
        </PrimaryButtonFull>
        {/*  */}
        <ContainerInlineFDirColAlignStart gap={theme.spacings.XL}>
          <H3Styled color={theme.colors.primary.black}>
            Appointment details
          </H3Styled>
          <ContainerInlineFDirColAlignStart gap={theme.spacings.XS}>
            {findedSalon?.appointments?.map((appo) => (
              <AppointmentDetailsCard key={appo.treatment} {...appo} />
            ))}

            <PnormalTextRegular color={theme.colors.greys[700]}>
              Total treatment time{" "}
              {findedSalon && findedSalon.appointments
                ? findedSalon.appointments.length * 30 + " min"
                : "N/A"}
            </PnormalTextRegular>
          </ContainerInlineFDirColAlignStart>
        </ContainerInlineFDirColAlignStart>
        <ContainerInlineFDirColAlignStart gap={theme.spacings.XXS}>
          <ContainerJSpaceBetweenAStart>
            <PnormalTextRegular color={theme.colors.greys[700]}>
              Loyalty points to earn
            </PnormalTextRegular>
            <PnormalTextRegular color={theme.colors.greys[700]}>
              14
            </PnormalTextRegular>
          </ContainerJSpaceBetweenAStart>
          <ContainerJSpaceBetweenAStart>
            <PnormalTextBold color={"black"}>Total</PnormalTextBold>
            <FlexContainer>
              <PnormalTextBoldModified color={theme.colors.greys[700]}>
                {randomHigherPrice}
                EUR
              </PnormalTextBoldModified>
              <PnormalTextBold color={"black"}>
                {totalPrice} EUR
              </PnormalTextBold>
            </FlexContainer>
          </ContainerJSpaceBetweenAStart>
        </ContainerInlineFDirColAlignStart>
        <Accordion headline="Reschedule & cancellation" />
        <WarningDiv>
          <PHelpText color={theme.colors.primary.orange}>
            You will receive a full refund if you cancel right now
          </PHelpText>
        </WarningDiv>
        <PnormalTextRegular color={theme.colors.primary.black}>
          If your plans change, you can reschedule your booking up to 1 hour
          before your appointment.
        </PnormalTextRegular>
        <PnormalTextRegular color={theme.colors.primary.black}>
          You can cancel your booking up to 24 hours before your appointment and
          receive a full refund to your original payment method.
        </PnormalTextRegular>
      </PageContainerPrimary>
    </>
  );
};

export default UpComAppointmentDetailsPage;

const BadgesContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
`;

const PnormalTextBoldModified = styled(PnormalTextBold)`
  text-decoration: line-through;
`;
const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
`;
