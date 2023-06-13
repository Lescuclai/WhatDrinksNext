import { View } from "react-native";
import { Button } from "react-native-paper";

function CustomButton({ onPressFunc, title, mode, disabled }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
      }}>
      <Button mode={mode} onPress={onPressFunc} disabled={disabled}>
        {title}
      </Button>
    </View>
  );
}

export default CustomButton;
