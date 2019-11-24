import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LongText = ({ t, onChange, content }) => {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Input
          placeholder={t('longTextPlaceholder')}
          multiline={true}
          onChangeText={onChange}
          value={content}
          autoFocus={true}
          inputStyle={styles.inputStyle}
          underlineColorAndroid="transparent"
        />
      </ScrollView>
      <View style={styles.formattingButtons}>
        <Text>Test</Text>
        <Text>Test</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  inputStyle: {
    height: screenHeight,
    textAlignVertical: 'top',
    borderBottomColor: '#fff',
    borderBottomWidth: 0,
    padding: 20
  },
  formattingButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between'
  }
});

export default withTranslation()(LongText);
