import React from 'react'
import { View, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';

import { COLORS } from '../../constants/theme';

const CreateSteps = ({ step, stepCount }) => {
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe9595',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe9595",
    stepStrokeUnFinishedColor: "#fe9595",
    separatorFinishedColor: "#fe9595",
    separatorUnFinishedColor: "#fe9595",
    stepIndicatorFinishedColor: "#fe9595",
    stepIndicatorUnFinishedColor: COLORS.WHITE_F9,
    stepIndicatorCurrentColor: "#fe9595",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.WHITE_F9,
    stepIndicatorLabelFinishedColor: COLORS.WHITE_F9,
    stepIndicatorLabelUnFinishedColor: "#fe9595",
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: "#fe9595"
  };

  return (
    <View style={styles.stepContainer}>
      <StepIndicator customStyles={customStyles} currentPosition={step} stepCount={stepCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    paddingVertical: 10,
    backgroundColor: 'rgb(252, 252, 252)',
    height: 60
  },
});

CreateSteps.propTypes = {
  step: PropTypes.number.isRequired,
  stepCount: PropTypes.number.isRequired
}

export default CreateSteps;
