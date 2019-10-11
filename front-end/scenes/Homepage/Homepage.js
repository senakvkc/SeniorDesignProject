import React, { useState, useEffect, useRef } from 'react';
import { AppLoading } from 'expo';
import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Platform,
  View,
  ScrollView
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Card,
  CardItem
} from 'native-base';

import { Icon } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import _ from 'lodash';



import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {
  BOTTOM_NAV_TABS,
  STORIES,
  CAROUSEL_ITEMS,
  MENU_ITEMS,
  LAST_ITEMS
} from '../../constants';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profile from '../Profile';
import Blog from '../Blog';
import Shelters from '../Shelters';

const { width: screenWidth } = Dimensions.get('window');

const Homepage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('homepage');
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
      Roboto_medium: require('../../assets/fonts/Roboto-Medium.ttf'),
      ...Ionicons.font
    });
  }

  useEffect(() => {
    loadFonts().then(() => {
      setIsLoading(false);
    });
  }, []);

  const renderIcon = icon => ({ isActive }) => (
    <Icon
      style={{
        fontSize: icon === 'add' ? 40 : 24,
        color: icon === 'add' ? '#d6402c' : '#504746'
      }}
      name={icon}
    />
  );

  const renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={tab.labelStyle}
      renderIcon={renderIcon(tab.icon)}
    />
  );

  const showStory = () => {
    console.log('story');
  };

  const showLastItem = () => {
    console.log('last item');
  };

  const adoptPet = () => {
    console.log('adopt pet');
  };

  const Story = ({ story }) => {
    return (
      <Container>
        <TouchableHighlight onPress={showStory} underlayColor="#ffffff">
          <View>
            <Image source={{ uri: story.image }} style={styles.storyImage} />
            <Text style={styles.storyText}>{story.text}</Text>
          </View>
        </TouchableHighlight>
      </Container>
    );
  };

  const SheltyCard = ({ item }) => {
    return (
      <TouchableHighlight onPress={showLastItem} underlayColor="#ffffff">
        <View>
          <Card style={styles.lastItemContainer}>
            <CardItem cardBody style={styles.lastItemBody}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.lastItemImage}
              />
            </CardItem>
            <CardItem footer style={styles.lastItemFooter}>
              <Left>
                <Text style={styles.lastItemText}>{item.title}</Text>
              </Left>
              <Right>
                <Button transparent onPress={adoptPet}>
                  <Icon name="paw" style={styles.lastItemIcon} />
                  <Text style={styles.lastItemText}>Sahiplen</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </View>
      </TouchableHighlight>
    );
  };

  const renderCarouselItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.carouselItem}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.carouselImageContainer}
          style={styles.carouselImage}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.carouselTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return isLoading ? (
    <AppLoading />
  ) : (
    <>
      {/* Header */}
      <Container>
        <Header style={styles.headerContainer}>
          <Left>
            <Button style={styles.menuItem}>
              <Icon name="menu" style={styles.headerIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.menuItem}>Shelty</Title>
          </Body>
          <Right>
            {_.map(MENU_ITEMS, MENU_ITEM => (
              <Button key={MENU_ITEM.id} style={styles.menuItem}>
                <Icon name={MENU_ITEM.icon} style={styles.headerIcon} />
              </Button>
            ))}
          </Right>
        </Header>
        {/* Stories */}
        <View style={styles.storyContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={STORIES}
            renderItem={({ item }) => <Story story={item} />}
            keyExtractor={item => item.text}
          />
        </View>
        {/* Emergency - Carousel */}
        <ScrollView>
          <View>
            <Text style={styles.carouselHeader}>Yuva Arayanlar</Text>
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth}
              sliderHeight={150}
              itemWidth={screenWidth - 60}
              data={CAROUSEL_ITEMS}
              renderItem={renderCarouselItem}
              hasParallaxImages={true}
            />
          </View>
          {/* Last Items */}
          <View style={styles.lastContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={LAST_ITEMS}
              renderItem={({ item }) => <SheltyCard item={item} />}
              keyExtractor={item => item.text}
            />
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  headerContainer: {
    backgroundColor: '#f9f9f9'
  },
  menuItem: {
    color: '#504746',
    backgroundColor: '#f9f9f9',
    borderWidth: 0,
    borderColor: '#f9f9f9',
    elevation: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  headerIcon: {
    color: '#504746'
  },
  storyContainer: {
    height: 90
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: '#f56565',
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0
  },
  storyText: {
    fontSize: 10,
    textAlign: 'center'
  },
  carouselHeader: {
    marginLeft: 30,
    marginBottom: 10
  },
  carouselItem: {
    width: screenWidth - 60,
    height: 150
  },
  carouselImageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain'
  },
  carouselTitle: {
    fontSize: 14,
    position: 'relative',
    top: -30,
    left: 20,
    marginBottom: 10,
    color: '#f0f0f0'
  },
  hairline: {
    width: 50,
    height: 2,
    backgroundColor: '#f0f0f0'
  },
  lastContainer: {
    marginBottom: 60
  },
  lastItemContainer: {
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15
  },
  lastItemImage: {
    height: 150,
    width: null,
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  lastItemBody: {
    borderRadius: 15
  },
  lastItemIcon: {
    fontSize: 12,
    marginRight: 5
  },
  lastItemFooter: {
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 15,
    height: 40,
    borderColor: '#b89685',
    borderBottomWidth: 3
  },
  lastItemText: {
    fontSize: 12
  }
});


const BottomTabNavigator = createBottomTabNavigator(
  {
    Homepage: Homepage,
    Shelters: Shelters,
    Blog: Blog,
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Homepage') {
          iconName = 'home';
        } else if (routeName === 'Shelters') {
          iconName = 'barcode';
        } else if (routeName === 'Blog') {
          iconName = 'paper';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#B89685',
      inactiveTintColor: '#504746'
    }
  }
);

export default createAppContainer(BottomTabNavigator);
