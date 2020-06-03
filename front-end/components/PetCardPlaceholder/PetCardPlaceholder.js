import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import PropTypes from 'prop-types';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import _ from 'lodash';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PlaceholderContainer = () => {
  return (
    <Placeholder
      Animation={Fade}
      style={{ marginVertical: 10 }}
      Left={props => (<PlaceholderMedia size={100} style={{marginRight: 10}} />)}
    >
      <PlaceholderLine width={50} />
      <PlaceholderLine width={30} style={{ marginBottom: 25 }} />
      <PlaceholderLine width={30} />
      <PlaceholderLine width={60} />
    </Placeholder>
  )
}

const PetCardPlaceholder = ({ width, number }) => {
  return (
    <View
      style={styles.container, {
        width: width - 15,
        marginTop: 10
      }}
    >
      {_.times(number, () => <PlaceholderContainer key={_.uniqueId('placeholder_')} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

PetCardPlaceholder.propTypes = {
  width: PropTypes.number,
  number: PropTypes.number,
};

PetCardPlaceholder.defaultProps = {
  width: screenWidth - 40,
  number: 3
};

export default PetCardPlaceholder;
