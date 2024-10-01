import React from "react";

import { Rating } from "./feedback.style";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import greyStar from "../../../../assets/grey_star";
import star from "../../../../assets/star";
import { FeedbackContext } from "../../../service/feedback/feedback.context";

export const RatingComponent = () => {
  const { rating, handleChangesFeedback } = React.useContext(FeedbackContext);
  return (
    <View>
      <Rating>
        <TouchableOpacity
          key={"buttonstar1"}
          onPress={() => {
            handleChangesFeedback(1);
          }}
        >
          {rating <= 0 ? (
            <SvgXml key={"greystar1"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star1"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar2"}
          onPress={() => {
            handleChangesFeedback(2);
          }}
        >
          {rating <= 1 ? (
            <SvgXml key={"greystar2"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star2"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar3"}
          onPress={() => {
            handleChangesFeedback(3);
          }}
        >
          {rating <= 2 ? (
            <SvgXml key={"greystar3"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star3"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar4"}
          onPress={() => {
            handleChangesFeedback(4);
          }}
        >
          {rating <= 3 ? (
            <SvgXml key={"greystar4"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star4"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar5"}
          onPress={() => {
            handleChangesFeedback(5);
          }}
        >
          {rating <= 4 ? (
            <SvgXml key={"greystar5"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star5"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
      </Rating>
    </View>
  );
};
