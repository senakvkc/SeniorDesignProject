import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { SIZES, COLORS } from '../../constants/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OwnerInfo = () => {
  return (
    <View>
      <View style={styles.ownerContainer}>
        <View style={styles.leftOwner}>
          <View style={styles.ownerIconContainer}>
            <Icon type="feather" name="user" size={SIZES.HUGE} color={COLORS.SILVER_PINK} />
          </View>
          <View style={styles.ownerNameContainer}>
            <Text style={styles.ownerName}>Ahmet Özdemir</Text>
            <Text style={styles.ownerType}>Owner</Text>
          </View>
        </View>
        <View style={styles.rightOwner}>
          <Icon type="feather" name="check-circle" size={SIZES.MENU_ICON} color={COLORS.GREEN} />
        </View>
      </View>
      <View style={styles.ownerDescription}>
        <Text style={styles.ownerDescriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec elit ut neque ullamcorper tempor.
          Curabitur aliquet lorem metus.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ownerContainer: {
    width: screenWidth - 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 15
  },
  leftOwner: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  ownerNameContainer: {
    marginLeft: 5,
    flexDirection: 'column'
  },
  ownerName: {
    fontSize: SIZES.NORMAL_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_25
  },
  ownerType: {
    fontSize: SIZES.SMALL_TEXT,
    color: COLORS.BLACK_A
  },
  ownerIconContainer: {
    alignSelf: 'center'
  },
  ownerDescription: {
    width: screenWidth - 60,
    marginTop: 15
  },
  ownerDescriptionText: {
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_5C,
    lineHeight: 21,
    textAlign: 'justify'
  }
});

export default OwnerInfo;
