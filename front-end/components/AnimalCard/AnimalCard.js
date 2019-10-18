import React from 'react';
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { withTranslation } from 'react-i18next';

const AnimalCard = ({t, item }) => {
  const goToAnimalProfile = () => {
    console.log('show item');
  };

  const adoptPet = () => {
    console.log('adopt pet');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardLeftPanel}>
        <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
      </View>
      <View style={styles.cardRightPanel}>
        <View style={styles.cardRightContainer}>
          <View style={styles.cardRightHeader}>
            <View>
              <Text style={styles.cardRightTitle}>Karabaş</Text>
            </View>
            <View>
              <Icon
                name="female-symbol"
                type="foundation"
                size={18}
                color="#b89685"
              />
            </View>
          </View>

          <Text style={styles.cardRightSubTitle}>
            Cinsi <Text style={styles.cardRightText}>(10 aylık)</Text>
          </Text>

          <View style={styles.horizontalLine} />

          <View style={styles.cardRightBody}>
            <View style={styles.cardRightBodyItem}>
              <Icon name="map-pin" type="feather" size={12} />
              <Text style={styles.cardRightBodyItemText}>{t('nameOfShelter')}</Text>
            </View>
            <View style={styles.cardRightBodyItem}>
              <Icon name="calendar" type="feather" size={12} />
              <Text style={styles.cardRightBodyItemText}>{t('makeAnAppointment')}</Text>
            </View>
            <View style={styles.cardRightBodyItem}>
              <Icon name="award" type="feather" size={12} />
              <Text style={styles.cardRightBodyItemText}>{t('profile')}</Text>
            </View>
          </View>

          <View>
            <Button
              onPress={adoptPet}
              icon={<Icon name="heart" type="feather" size={12} color="#fff" />}
              title={t('adopt')}
              buttonStyle={styles.adoptButton}
              titleStyle={styles.adoptButtonTitle}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeftButton: {
    paddingLeft: 15
  },
  headerRightButton: {
    paddingRight: 15
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  cardLeftPanel: {
    flex: 3,
    marginBottom: 20,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b89685'
  },
  cardRightPanel: {
    flex: 2,
    marginLeft: 10,
    marginBottom: 20
  },
  cardImage: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    resizeMode: 'cover'
  },
  cardRightContainer: {
    padding: 5,
    justifyContent: 'space-between'
  },
  cardRightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardRightTitle: {
    fontSize: 12,
    color: '#b89685',
    fontWeight: '600'
  },
  cardRightText: {
    fontSize: 10,
    color: '#504746',
    fontWeight: '400'
  },
  cardRightSubTitle: {
    fontSize: 10,
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#504746'
  },
  horizontalLine: {
    width: 50,
    height: 1,
    backgroundColor: '#b89685',
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
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 5
  },
  adoptButton: {
    backgroundColor: '#b89685'
  },
  adoptButtonTitle: {
    marginLeft: 5,
    fontSize: 12
  }
});

export default withTranslation()(AnimalCard);
