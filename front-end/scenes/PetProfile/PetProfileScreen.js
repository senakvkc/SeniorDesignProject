import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { Icon } from "react-native-elements";
import { AppLoading } from "expo";
import _ from "lodash";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import MainButton from "../../components/common/MainButton";
import FriendlySvg from "../../assets/svgs/friendly-cat.svg";
import { getLoggedInUser } from "../../utils/User";
import { USER_TYPES, AGE_INTERVALS_OBJ, ANIMAL_TYPES, CAT_CHARACTERISTICS, DOG_CHARACTERISTICS, SHADOW } from "../../constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const actualHeight = screenHeight - 60;
const cardHeight = 100;
const cardPosition = (cardHeight / 2 + 24) * -1;

const PetProfileScreen = ({ t, navigation }) => {
  const [petData, setPetData] = useState(navigation.state.params.pet);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(getLoggedInUser());
  }, []);

  const goToAdopt = () => {
    console.log("adopt");
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Testing share",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared activity type", result);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("share dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderFullname = () => {
    const { user } = petData;
    const { firstName, lastName } = user;
    return `${_.upperFirst(firstName)} ${_.upperFirst(lastName)}`;
  };

  const renderUserType = () => {
    const { user } = petData;
    const { userType } = user;

    return USER_TYPES[userType].text;
  };

  const renderProfile = () => (
    <View style={styles.profileContainer}>
      <View style={styles.profileInfoContainer}>
        <Image
          source={{ uri: "https://placedog.net/80/80" }}
          style={styles.profileImage}
        />
        <View style={styles.profileDetailContainer}>
          <Text style={styles.profileName}>{renderFullname()}</Text>
          <Text style={styles.profileRole}>{renderUserType()}</Text>
        </View>
      </View>
      <Icon
        name="check-circle"
        type="feather"
        size={24}
        color="#34A554"
        containerStyle={styles.profileIcon}
      />
    </View>
  );

  const reportProfile = () => {
    console.log("report profile");
  };

  const likePet = () => {
    console.log("liked profile");
  };

  const renderDescription = () => (
    <Text style={styles.profileDesc}>
      {_.truncate(petData.description, { length: 150 })}
    </Text>
  );

  const getCharacteristics = () => {
    const chars = petData.animalType === ANIMAL_TYPES.CAT ? CAT_CHARACTERISTICS : DOG_CHARACTERISTICS;
    const result = {};
    _.forEach(chars, char => {
      result[char.value] = { ...char };
    });

    return result; 
  }

  const isLiked = true;
  const CHARACTERISTICS = getCharacteristics();
  const bgColors = ['#FFF5F4', '#F3F9FE', '#F0FFF5'];

  return _.isNull(petData) || _.isNull(petData.user) ? (
    <AppLoading />
  ) : (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <ImageBackground
          style={styles.photoSection}
          source={{ uri: petData.profilePhoto }}
        >
          <View style={styles.topActions}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0}
            >
              <Icon type="feather" name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={reportProfile} activeOpacity={0}>
              <Icon type="feather" name="alert-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.mainSection}>
          <View style={styles.petCard}>
            <View style={styles.leftPetCard}>
              <View style={styles.petName}>
                <Text style={styles.petNameText}>{petData.name}</Text>
                <Icon type="ionicon" name="ios-female" color="#AAA" size={22} />
              </View>
              <Text style={styles.breed}>{petData.breed}</Text>
              <Text style={styles.age}>
                {AGE_INTERVALS_OBJ[petData.ageInterval].text()}
              </Text>
            </View>
            <View style={styles.rightPetCard}>
              <View style={styles.petCardActions}>
                <TouchableOpacity onPress={handleShare} activeOpacity={0}>
                  <Icon
                    iconStyle={styles.petCardActionIcon}
                    type="feather"
                    name="share-2"
                    color="#FEA195"
                    size={18}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={likePet} activeOpacity={0}>
                  <Icon
                    type="material"
                    name={isLiked ? "favorite" : "favorite-border"}
                    color="#FEA195"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.features}>
            {_.map(petData.characteristics, (characteristic, index) => (
              <View style={[styles.featureItem, { backgroundColor: bgColors[index] }]} key={characteristic}>
                <Image source={CHARACTERISTICS[characteristic].image} width={30} height={30} />
                <Text style={styles.featureText}>
                  {CHARACTERISTICS[characteristic].text}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.owner}>
            {petData && petData.user && renderProfile()}
            <View style={{ flex: 1, flexGrow: 1, alignSelf: 'stretch', alignContent: 'stretch' }}>
              {renderDescription()}
            </View>
          </View>

          <View style={styles.contact}>
            <MainButton onPress={goToAdopt} text={t("contact")} secondary />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: actualHeight,
    flexDirection: "column",
  },
  photoSection: {
    flex: 4,
    backgroundColor: "#FEA195",
  },
  topActions: {
    width: screenWidth - 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignContent: "center",
    marginTop: 25,
  },
  mainSection: {
    flex: 6,
    padding: 24,
    flexDirection: "column",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
    position: "relative",
    top: -15,
  },
  petCard: {
    height: 100,
    backgroundColor: "#fff",
    marginTop: cardPosition,
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  petName: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  petNameText: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
  breed: {
    fontSize: 15,
    marginBottom: 5,
    color: "#888",
  },
  age: {
    fontSize: 14,
    color: "#454545",
  },
  rightPetCard: {
    justifyContent: "center",
  },
  petCardActions: {
    flexDirection: "row",
  },
  petCardActionIcon: {
    marginRight: 20,
  },

  features: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
  },
  featureItem: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 10,
    ...SHADOW
  },
  featureText: {
    color: "#FEA195",
  },

  owner: {
    flexDirection: "column",
    marginBottom: 25,
    alignSelf: 'stretch',
    flex: 10,
    alignContent: 'stretch'
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 15,
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: "hidden",
    marginRight: 10,
  },
  profileDetailContainer: {
    flexDirection: "column",
  },
  profileName: {
    fontSize: 18,
    color: "#333",
  },
  profileRole: {
    fontSize: 14,
    color: "#AAA",
  },
  profileIcon: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },

  profileDesc: {
    fontSize: 15,
    color: "#888",
    textAlign: "justify",
  },
  contact: {
  },
});

PetProfileScreen.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default withTranslation()(PetProfileScreen);
