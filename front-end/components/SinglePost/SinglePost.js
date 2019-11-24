import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import { withTranslation } from 'react-i18next';

import { COLORS } from '../../constants/theme';

const SinglePost = ({ t, item }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postImageContainer}>
        <Image
          resizeMode="cover"
          source={{ uri: item.featuredImage }}
          containerStyle={styles.featuredImage}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.postDetailContainer}>
        <Text style={styles.postTitle}>
          {_.unescape(_.truncate(item.title, { length: 24 }))}
        </Text>
        <View style={styles.postSubDetail}>
          <Icon
            iconStyle={styles.postDetailIcon}
            type="feather"
            name="clock"
            color={COLORS.PRIMARY}
            size={12}
          />
          <Text style={styles.postSubDetailText}>
            {moment().fromNow(item.createdAt)}
          </Text>
          <Icon
            iconStyle={styles.postDetailIcon}
            type="feather"
            name="user"
            color={COLORS.PRIMARY}
            size={12}
          />
          <Text style={styles.postSubDetailText}>
            {_.unescape(item.fullName)}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.descriptionContainer}>
          <Text>
            {_.unescape(_.truncate(item.description, { length: 100 }))}
          </Text>
          <Button
            icon={
              <Icon
                type="feather"
                name="chevron-right"
                size={12}
                iconStyle={styles.moreButtonIcon}
              />
            }
            iconRight={true}
            title={t('readMore')}
            containerStyle={styles.moreButtonContainer}
            buttonStyle={styles.moreButton}
            titleStyle={styles.moreButtonTitle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 150,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  postImageContainer: {
    flex: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    overflow: 'hidden',
    marginRight: 15
  },
  postDetailContainer: {
    flex: 5
  },
  featuredImage: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    overflow: 'hidden'
  },
  line: {
    width: 50,
    height: 1,
    marginVertical: 10,
    backgroundColor: COLORS.PRIMARY
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY,
    marginBottom: 5
  },
  postSubDetail: {
    flexDirection: 'row'
  },
  postSubDetailText: {
    fontSize: 12,
    lineHeight: 12,
    fontStyle: 'italic',
    color: COLORS.TEXT,
    fontWeight: '400',
    marginRight: 15,
    alignSelf: 'center'
  },
  postDetailIcon: {
    marginRight: 5,
    alignSelf: 'center'
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  moreButton: {
    backgroundColor: COLORS.PRIMARY,
    width: 120,
    height: 30,
    alignSelf: 'flex-end'
  },
  moreButtonTitle: {
    fontSize: 12,
    alignSelf: 'center'
  },
  moreButtonIcon: {
    color: COLORS.WHITE,
    alignSelf: 'center'
  }
});
export default withTranslation()(SinglePost);
