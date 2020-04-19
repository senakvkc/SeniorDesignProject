import React, { useState, createRef, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { Text, View, StyleSheet, ScrollView, Picker, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import StepIndicator from 'react-native-step-indicator';

import { COLORS, SIZES } from '../../../constants/theme';
import { GENDERS, AGE_INTERVALS, BREEDS } from '../../../constants/form';

import SheltyButton from '../../../components/common/SheltyButton';
import BasicSheltyButton from '../../../components/common/BasicSheltyButton';
import CreateSteps from '../../../components/CreateSteps';

const CreatePet = ({ t, navigation, data }) => {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    const { type } = navigation.state.params;
    setFormData({ ...formData, type })
  }, []);

  return (
    <View style={styles.container}>
      <CreateSteps step={0} stepCount={3} />
      <ScrollView style={styles.innerContainer}>
        <Text>Test</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#FFF'
  },
  innerContainer: {
    paddingHorizontal: 15
  }
});

CreatePet.propTypes = {
  t: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({})
};

CreatePet.defaultProps = {
  data: {}
}

export default withTranslation()(CreatePet);
