import styled from "styled-components";
import {
  H4Styled,
  PError,
  PHelpText,
} from "../../../styles/Headlines/Headlines";

import { theme } from "../../../styles/themeStyles";
import ReviewStar from "../../../styles/Icons/ListingSmall/ReviewStar";
import FavoriteHeart from "../../../styles/Icons/Heart/FavoriteHeart";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IReviewsOverall } from "../../../DummyData";
import { useRatingConverter } from "../../../Hooks/useRatingConverter";

import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

interface Props {
  id: number;
  name: string;
  category: string;
  thumbnail: string;
  reviewsOverall: IReviewsOverall;
  reviewsNumber: number;
  isFavorite?: boolean;
}

const CardRecommended = ({
  reviewsOverall,
  isFavorite,
  thumbnail,
  name,
  reviewsNumber,
  category,
  id,
}: Props) => {
  const [isFavoriteState, setisFavoriteState] = useState<boolean | undefined>(
    isFavorite
  );

  const navigate = useNavigate();

  const rating = useRatingConverter(reviewsOverall);

  const putData = async () => {
    const salonDocRef = doc(collection(db, "salons"), id.toString());
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
              setisFavoriteState((prev) => !prev);
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
  };
  return (
    <CardRecommendedStyledDiv
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/salon/${id}`);
        window.scrollTo(0, 0);
      }}
    >
      <CardRecommendedStyledDivImg img={thumbnail}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            putData();
          }}
        >
          <FavoriteHeart
            color={
              isFavoriteState ? theme.colors.primary.orange : "transparent"
            }
          />
        </div>
      </CardRecommendedStyledDivImg>
      <CardRecommendedStyledDivDesc>
        <H4Styled>{name}</H4Styled>
        <PError color={theme.colors.primary.orange}>
          <ReviewStar color={theme.colors.primary.orange} />
          {rating} <span>&#183;</span>{" "}
          <SpanTagReview>{reviewsNumber} reviwes</SpanTagReview>
        </PError>

        <PHelpText color={theme.colors.primary.black}>{category}</PHelpText>
      </CardRecommendedStyledDivDesc>
    </CardRecommendedStyledDiv>
  );
};

export default CardRecommended;
const CardRecommendedStyledDiv = styled.div`
  width: 270px;
  height: 230px;
`;
const CardRecommendedStyledDivDesc = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  border-radius: 0px 0px 12px 12px;
  background: #fff;
  z-index: 1111;
`;
const CardRecommendedStyledDivImg = styled.div<any>`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  width: 270px;
  height: 230px;
  background: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const SpanTagReview = styled.span`
  color: ${theme.colors.greys[700]};
  font-size: 12px;
  font-weight: 400;
`;
