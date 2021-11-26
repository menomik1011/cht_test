import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../../firebase";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: name,
            photoURL: imageUrl
              ? imageUrl
              : "https://www.trackergps.com/canvas/images/icons/avatar.jpg",
          })
          .catch(function (error) {
            alert(error.message);
          });
        navigation.popToTop();
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        navigation.replace("Chat");
      } else {
        // No user is signed in.
        navigation.canGoBack() && navigation.popToTop();
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      {/* <Input
                placeholder="이름"
                label="이름"
                leftIcon={{
                    type: 'material', name: 'badge'
                }}
                value={name}
                onChangeText={text => setName(text)}
            /> */}
      <Input
        placeholder="이메일"
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
        title="회원가입"
        raised={true}
        type="outline"
        onPress={register}
      />
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
