import { View } from "react-native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { MotiImage, MotiView } from "moti";
import logo from "../../../../assets/logo";
import { SvgXml } from "react-native-svg";
import loadingLogo from "../../../../assets/loadingLogo";

export const LoadingComponent = ({ size }) => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={{
        marginTop: 40,
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: "#4649E3",
        shadowColor: "#4649E3",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SvgXml
        xml={loadingLogo}
        style={{
          marginTop: 40,
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
        }}
      />
    </MotiView>
  );
};
