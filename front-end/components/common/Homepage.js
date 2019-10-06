import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from 'native-base';

import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { BOTTOM_NAV_TABS, STORIES } from '../../contants';

const Homepage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('homepage');

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
    console.log('clicked');
  };

  const Story = ({ story }) => {
    console.log(story);
    return (
      <Container>
        <TouchableHighlight onPress={showStory} underlayColor="#ffffff">
          <Image source={{ uri: story.image }} style={styles.storyImage} />
        </TouchableHighlight>
        <Text style={styles.storyText}>{story.text}</Text>
      </Container>
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
            <Button style={styles.menuItem}>
              <Icon name="search" style={styles.headerIcon} />
            </Button>
            <Button style={styles.menuItem}>
              <Icon name="wallet" style={styles.headerIcon} />
            </Button>
            <Button style={styles.menuItem}>
              <Icon
                name="information-circle-outline"
                style={styles.headerIcon}
              />
            </Button>
          </Right>
        </Header>
        {/* Stories */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={STORIES}
          renderItem={({ item }) => <Story story={item} />}
          keyExtractor={item => item.text}
        />

        {/* Bottom Navigation */}
        <BottomNavigation
          onTabPress={newTab => setActiveTab({ activeTab: newTab.key })}
          renderTab={renderTab}
          tabs={BOTTOM_NAV_TABS}
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    flexDirection: 'row'
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#f56565',
    borderWidth: 1,
    overflow: 'hidden',
    margin: 5
  },
  storyText: {
    fontSize: 10,
    textAlign: 'center'
  }
});

export default Homepage;
