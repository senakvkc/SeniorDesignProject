import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { Icon } from "react-native-elements";
import _ from "lodash";
import io from "socket.io-client";

import BackHandler from "../../components/common/BackHandler";
import { NO_SHADOW, SOCKET_BACKEND, MESSAGES } from "../../constants";
import { Platform } from "react-native";
import { toMessageDate } from "../../utils/DateUtil";
import { SOCKET_EVENTS } from "../../constants/socketEvents";
import moment from "moment";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ConversationScreen = ({ t, navigation }) => {
  const { user, targetUser } = navigation.state.params;
  const [message, setMessage] = useState(null);
  const [chatMessages, setChatMessages] = useState(MESSAGES);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const initSocketConnection = () => {
    const socket = io(SOCKET_BACKEND);
    socket.emit(SOCKET_EVENTS.USER_CONNECTED, ({ user, targetUser }));
    
    setSocket(socket);
    setLoggedInUser(user);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.emit("disconnect");
      socket.off();
    }
  };

  useEffect(() => {
    initSocketConnection();
    return () => {
      disconnectSocket();
    };
  }, []);

  const YourMessage = ({ item }) => {
    return (
      <View style={[styles.messageContainer, styles.rightContainer]}>
        <View style={[styles.message, styles.rightMessage]}>
          <Text style={[styles.messageText, styles.rightMessageText]}>
            {item.message}
          </Text>
        </View>
        <View>
          <Text style={[styles.dateText, styles.rightDateText]}>{toMessageDate(item.date)}</Text>
        </View>
      </View>
    );
  };

  const MyMessage = ({ item }) => {
    return (
      <View style={[styles.messageContainer, styles.leftContainer]}>
        <View>
          <Text style={[styles.dateText, styles.leftDateText]}>{toMessageDate(item.date)}</Text>
        </View>
        <View style={[styles.message, styles.leftMessage]}>
          <Text style={[styles.messageText, styles.leftMessageText]}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };
  
  const sendMessage = () => {
    const trimmed = _.trim(message);
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, trimmed, handleSendMessage);
  };

  const handleSendMessage = () => {
    const newMessage = createMessage();
    setChatMessages([newMessage, ...chatMessages]);
    setMessage("");
  }

  const createMessage = () => {
    return {
      id: _.uniqueId("message_"),
      user,
      message: _.trim(message),
      date: moment()
    }
  };

  const getMessageItem = (item) => {
    console.log(item.user._id, user._id);
    if (item.user._id === user._id) {
      console.log("my message");
      return <MyMessage item={item} />;
    }

    return <YourMessage item={item} />;
  };

  const handleChangeMessage = text => {
    setMessage(text);
  };

  const disabled = _.isEmpty(_.trim(message));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        inverted
        data={chatMessages}
        renderItem={({ item }) => getMessageItem(item)}
        keyExtractor={(item) => item.id}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          onChangeText={text => handleChangeMessage(text)}
          value={message}
          underlineColorAndroid="transparent"
          multiline={true}
          maxLength={300}
          placeholder={t('yourMessage')}
        />
        <TouchableOpacity disabled={disabled} onPress={sendMessage} activeOpacity={1} style={styles.sendTextContainer}>
          <Text style={[styles.sendText, disabled && styles.disabledText]}>
            {t('send')} 
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: screenWidth - 60
  },
  dateText: {
    fontSize: 11,
    color: "#888",
    marginTop: 5,
  },
  leftDateText: {
    marginRight: 10,
  },
  rightDateText: {
    marginLeft: 10,
  },
  message: {
    padding: 15,
    width: screenWidth - 100,
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
  leftMessage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#FEA195",
  },
  rightMessage: {
    backgroundColor: "#E2E3E4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  messageText: {
    fontSize: 15,
  },
  leftMessageText: {
    color: "#fff",
  },
  rightMessageText: {
    color: "#666",
  },
  messageInput: {
    width: screenWidth - 60,
    borderRadius: 30,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 60,
    alignSelf: "center",
    minHeight: 40,
    backgroundColor: 'rgba(253,253,253, 1)',
    color: '#555',
    borderWidth: 1,
    marginTop: 15,
    borderColor: 'rgba(0, 0, 0, 0.05)'
  },
  sendTextContainer: {
    alignSelf: 'flex-end',
    position: 'relative',
    right: 20,
    bottom: 35,
  },
  sendText: {
    color: '#FEA195',
  },
  disabledText: {
    color: 'rgba(0, 0, 0, 0.5)'
  }
});

const renderHeaderTitle = navigation => {
  const { user } = navigation.state.params;
  return `${user.firstName} ${user.lastName}`;
};

ConversationScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: renderHeaderTitle(navigation),
  headerTitleStyle: {
    color: "#FE9595",
  },
  headerStyle: {
    ...NO_SHADOW,
  },
  headerLeft: <BackHandler navigation={navigation} />,
  headerRight: (
    <Icon
      type="material"
      name="error-outline"
      color="#FEA195"
      size={24}
      containerStyle={{ marginRight: 15 }}
      onPress={() => console.log("report")}
    />
  ),
  tabBarComponent: () => null,
  tabBarVisible: false,
});

ConversationScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}),
};

export default hoistStatics(
  withTranslation()(ConversationScreen),
  ConversationScreen
);
