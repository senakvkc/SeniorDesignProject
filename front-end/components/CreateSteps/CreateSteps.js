import React from 'react'
import { withTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { COLORS } from '../../constants/theme';

const CreateSteps = ({ t, step }) => {
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: COLORS.PURPLE,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: COLORS.PURPLE,
    stepStrokeUnFinishedColor: COLORS.POMP,
    separatorFinishedColor: COLORS.PURPLE,
    separatorUnFinishedColor: COLORS.POMP,
    stepIndicatorFinishedColor: COLORS.PURPLE,
    stepIndicatorUnFinishedColor: COLORS.WHITE_F9,
    stepIndicatorCurrentColor: COLORS.PURPLE,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.WHITE_F9,
    stepIndicatorLabelFinishedColor: COLORS.WHITE_F9,
    stepIndicatorLabelUnFinishedColor: COLORS.POMP,
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: COLORS.PURPLE
  };

  return (
    <View style={styles.stepContainer}>
      <StepIndicator customStyles={customStyles} currentPosition={step} stepCount={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE_F9,
    marginBottom: 15
  },
});

export default withTranslation()(CreateSteps);
