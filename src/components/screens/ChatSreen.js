import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import { GiftedChat } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/AntDesign";
import { auth } from "../../firebase";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  //   const [msg, setMsg] = useState("");
  const [chatMsg, setChatMsg] = useState([]);
  const [botmsg,setBotmsg] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
            // size={24}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 20,
          }}
          onPress={SignOut}
        >
          <Icon name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const SignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("로그인");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  let msg = "";
  const devUrl = "http://4dd2-1-235-57-107.ngrok.io";
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let msgData = {};
  let mmm = {};
  const onSend = useCallback(async(messages = []) => {
    console.log("messages : ", messages[0]);
    msg = messages[0].text;
    msgData = {
      input_text: msg,
      present_bdi: "",
    };

    setMessages((previousMessages) => {
      GiftedChat.append(previousMessages, messages);
      console.log(previousMessages);
    });

    await axios({
      method: "post",
      url: `${devUrl}/bdiscale`,
      headers: header,
      data: msgData,
    })
      .then((res) => {
        setChatMsg(res.data)
      })
      .catch((e) => console.log("error : ", e));
    //   if()
}, []);
const setbot = (msg)=>{
    setBotmsg({
      _id: 2,
      createdAt: new Date(),
      text: msg["생성된 질문"].질문,
      user:{
          _id: auth?.currentUser?.email,
          name:'aron',
          avatar: 'https://placeimg.com/150/150/any',
        }
    })
}
// console.log(chatMsg["생성된 질문"].질문);
  setbot(chatMsg);

    
    // let text = "";
    // text = chatMsg["생성된 질문"].질문;
    // console.log("chatMsg : ", chatMsg["생성된 질문"].질문);
    // console.log("mmm : ", mmm["생성된 질문"].질문);


  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
      showAvatarForEveryMessage={true}
    />
  );
};

export default ChatScreen;
