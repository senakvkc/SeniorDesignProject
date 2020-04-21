import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { SHADOW } from '../../../constants';
import BackHandler from '../BackHandler';

const SheltyPicker = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(navigation.state.params.selectedItem);

  const { items, onSelect } = navigation.state.params;

  const handleSelect = item => {
  	setSelectedItem(item);
  	onSelect(item);
  }

  return (
    <ScrollView style={styles.container}>
    	{_.map(items, item => (
    		<TouchableOpacity activeOpacity={0.8} key={item.key} style={styles.itemContainer} onPress={() => handleSelect(item)}>
	    		<Text style={styles.itemText}>{item.text}</Text>
	    		{selectedItem.text === item.text && <Icon iconStyle={styles.itemIcon} type="feather" name="check-circle" size={16} color="#FEA195" />}
	    	</TouchableOpacity>
		))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1'
	},
	itemText: {
		color: '#777',
		fontSize: 16,
		marginLeft: 20
	},
	itemIcon: {
		marginRight: 20
	}
});

SheltyPicker.navigationOptions = ({ navigation }) => ({
	headerTitle: navigation.state.params.title,
	headerTitleStyle: {
		color: '#FE9595'
	},
	headerLeft: <BackHandler navigation={navigation} />,
});

SheltyPicker.propTypes = {
	navigation: PropTypes.shape({}).isRequired
};

export default SheltyPicker;