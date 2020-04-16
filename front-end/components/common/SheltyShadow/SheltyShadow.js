import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SheltyShadow = ({ component: Component, compHeight, compWidth, compBorderRadius, ...rest }) => {
  return (
    <>
      <View style={styles.shadow}></View>
      <Component {...rest} />
    </>
  );
};

SheltyShadow.propTypes = {
  component: PropType.func.isRequired,
  compHeight: PropTypes.number.isRequired,
  compBorderRadius: PropTypes.number,
  compWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

SheltyShadow.defaultProps = {
  compWidth: '100%',
  compBorderRadius: 10
};

const styles = StyleSheet.create({
  position: 'absolute',
  borderRadius: compBorderRadius,
  backgroundColor: COLORS.MASK,
  width: compWidth,
  height: compHeight,
  top: compHeight / 10,
  left: compHeight / 10
});

export default SheltyShadow;
