import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).then((userCredentail)=>{
        var user = userCredentail.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        navigation.replace("Chat");
      } else {
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <Input
        placeholder="이메일 주소"
        label="이메일"
        leftIcon={{
          type: "material",
          name: "email",
        }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="비밀번호"
        label="비밀번호"
        leftIcon={{
          type: "material",
          name: "lock",
        }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        title="로그인"
        // raised={true}
        type="outline"
        onPress={signIn}
        buttonStyle={styles.button}
      />

      <Button
        title="회원가입"
        // raised={true}
        type="outline"
        onPress={() => navigation.navigate("회원가입")}
        buttonStyle={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
  },
  button: {
    width: 100,
    marginTop: 10,
    backgroundColor: "white"
  },
});

export default LoginScreen;
