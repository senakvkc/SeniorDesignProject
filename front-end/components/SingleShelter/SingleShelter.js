import React from 'react';
import _ from 'lodash';
import { TouchableHighlight, View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import { COLORS, SIZES } from '../../constants/theme';

const SingleShelter = ({ t, item, isLast }) => {
  const adoptPet = () => {
    console.log('adopt pet');
  };

  const findNearestShelter = () => {
    console.log('find Nearest Shelter');
  };

  const goToAppointment = () => {
    console.log('appointment');
  };

  const goToProfile = () => {
    console.log('animal profile');
  };

  return (
    <View style={[styles.cardContainer, isLast && styles.addMargin]} key={item.id}>
      <View style={styles.cardLeftPanel}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      </View>
      <View style={styles.cardRightPanel}>
        <View style={styles.cardRightContainer}>
          <View style={styles.cardRightHeader}>
            <View>
              <Text style={styles.cardRightTitle}>{item.shelterName}</Text>
            </View>
          </View>

          <View style={styles.horizontalLine} />

          <View style={styles.cardRightBody}>
            <View style={styles.cardRightBodyItem}>
              <Icon name="map-pin" type="feather" size={12} />
              <Text style={styles.cardRightBodyItemText} onPress={goToAppointment}>
                {item.address}
              </Text>
            </View>
            <View style={styles.cardRightBodyItem}>
              <Icon name="calendar" type="feather" size={12} />
              <Text style={styles.cardRightBodyItemText} onPress={goToAppointment}>
                {item.workingTime}
              </Text>
            </View>
            <View style={styles.cardRightBodyItem}>
              <Icon name="smartphone" type="feather" size={12} />
              <Text style={styles.cardRightBodyItemText} onPress={goToProfile}>
                {item.phone}
              </Text>
            </View>
          </View>

          <View>
            <Button
              onPress={adoptPet}
              title={t('visitShelter')}
              buttonStyle={styles.adoptButton}
              titleStyle={styles.adoptButtonTitle}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.WHITE_LIGHT,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  cardLeftPanel: {
    flex: 2,
    marginRight: 10
  },
  cardRightPanel: {
    flex: 3,
    marginLeft: 10
  },
  cardImage: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    resizeMode: 'cover',
    borderColor: COLORS.PRIMARY
  },
  cardRightContainer: {
    justifyContent: 'space-between'
  },
  cardRightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardRightTitle: {
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.PRIMARY,
    fontWeight: '600'
  },
  cardRightText: {
    fontSize: SIZES.MINI_TEXT,
    color: COLORS.TEXT,
    fontWeight: '400'
  },
  cardRightSubTitle: {
    fontSize: SIZES.MINI_TEXT,
    fontWeight: '400',
    fontStyle: 'italic',
    color: COLORS.TEXT
  },
  horizontalLine: {
    width: 50,
    height: 1,
    backgroundColor: COLORS.PRIMARY,
    marginTop: 10,
    marginBottom: 5
  },
  cardRightBody: {
    flex: 1,
    flexDirection: 'column'
  },
  cardRightBodyItem: {
    flexDirection: 'row',
    marginVertical: 10
  },
  cardRightBodyItemText: {
    fontSize: SIZES.SMALL_TEXT,
    lineHeight: 14,
    marginLeft: 5
  },
  adoptButton: {
    backgroundColor: COLORS.PRIMARY
  },
  adoptButtonTitle: {
    marginLeft: 5,
    fontSize: SIZES.SMALL_TEXT
  },
  addMargin: {
    marginBottom: 70
  }
});

export default withTranslation()(SingleShelter);
