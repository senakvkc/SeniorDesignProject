import React from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../../constants/theme';
import { withTranslation } from 'react-i18next';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SearchBox = ({ t, onSearch, value, filterIcon, searchIcon }) => {
  const showFilters = () => {
    console.log('filter clicked');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomMask} />
      <View style={styles.inputContainer}>
        {searchIcon && (
          <Icon
            type="feather"
            name="search"
            size={SIZES.NORMAL_TEXT}
            color={COLORS.BLACK_A}
            style={styles.searchIcon}
          />
        )}
        <TextInput
          style={styles.searchInput}
          onChangeText={text => onSearch(text)}
          value={value}
          placeholder={t('searchPetOrShelter')}
          placeholderTextColor={COLORS.BLACK_A}
          underlineColorAndroid={COLORS.TRANSPARENT}
        />
        {filterIcon && (
          <Icon
            type="feather"
            name="filter"
            size={SIZES.NORMAL_TEXT}
            color={COLORS.BLACK_A}
            style={styles.filterIcon}
            onPress={showFilters}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    height: 50,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    marginBottom: 10
  },
  bottomMask: {
    width: screenWidth - 80,
    height: 50,
    borderRadius: 20,
    backgroundColor: COLORS.MASK,
    position: 'absolute',
    top: 2,
    left: 2
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
    alignSelf: 'stretch',
    color: COLORS.BLACK_25,
    fontSize: SIZES.SMALL_TEXT
  },
  filterIcon: {
    alignSelf: 'flex-end'
  }
});

SearchBox.propTypes = {
  t: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  filterIcon: PropTypes.bool,
  searchIcon: PropTypes.bool
};

SearchBox.defaultProps = {
  filterIcon: false,
  searchIcon: false
};

export default withTranslation()(SearchBox);
