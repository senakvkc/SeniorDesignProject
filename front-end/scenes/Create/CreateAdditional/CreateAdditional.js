import React, { useState } from 'react'
import { Text, View, ScrollView, KeyboardAvoidingView, StyleSheet, Picker } from 'react-native'
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

import CreateSteps from '../../../components/CreateSteps';
import { CHARACTERISTICS } from '../../../constants/form';
import { COLORS } from '../../../constants/theme';
import BasicSheltyButton from '../../../components/common/BasicSheltyButton';

const CreateAdditional = ({ t, navigation }) => {
  const { data } = navigation.state.params;

  const [formData, setFormData] = useState({
    ...data,
    characteristics: [CHARACTERISTICS[0].value, CHARACTERISTICS[1].value, CHARACTERISTICS[2].value],
  });

  const handleCharacteristicsChange = (itemValue, itemIndex, index) => {
    let newCharacteristics = formData.characteristics;
    newCharacteristics[index] = itemValue;

    setFormData({ ...formData, characteristics: newCharacteristics });
  }

  const handleNext = () => {
    navigation.navigate('CreateFinal', {
      data: formData
    });
  };

  const renderChar = index => (
    <View style={styles.fieldContainer}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>Characteristics</Text>
        <Picker
          selectedValue={formData.characteristics[index]}
          style={styles.formPickerField}
          onValueChange={(itemValue, itemIndex) => handleCharacteristicsChange(itemValue, itemIndex, index)}
          itemStyle={styles.formPickerItem}
          mode="dropdown"
        >
          {_.map(CHARACTERISTICS, characteristics => (
            <Picker.Item key={characteristics.value} label={characteristics.text} value={characteristics.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderForm = () => (
    <>
      {renderChar(1)}
      {renderChar(2)}
      {renderChar(3)}
    </>
  );

  const isNextDisabled = _.uniq(formData.characteristics).length !== 3;

  const renderNextButton = () => (
    <View style={styles.stepActionContainer}>
      <BasicSheltyButton disabled={isNextDisabled} onPress={handleNext} text={t('nextStep')} containerStyle={styles.stepButton} />
    </View>
  );

  return (
    <View style={styles.container}>
      <CreateSteps step={1} />
      <ScrollView>
        <KeyboardAvoidingView behaviour="padding" style={styles.formContainer}>
          {renderForm()}
          {renderNextButton()}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 15,
    marginTop: 10,
    backgroundColor: COLORS.WHITE_FB
  },
  fieldContainer: {
    marginVertical: 10
  },
  pickerContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.WHITE_D9,
    borderRadius: 5,
    paddingLeft: 15,
    color: COLORS.BLACK_63,
    paddingTop: 5
  },
  pickerText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.WHITE_D9,
  },
  formPickerField: {
    color: COLORS.BLACK_63,
    marginLeft: -5,
    fontSize: 12,
    position: 'relative',
    bottom: 5,
  },
  formPickerItem: {
    fontSize: 12
  },
  stepButton: {
    flex: 1,
    borderRadius: 10,
    height: 40
  },
});


export default withTranslation()(CreateAdditional);
