import React from 'react';
import _ from 'lodash';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { withTranslation } from 'react-i18next';
import { COLORS, SIZES } from '../../constants/theme';
import { Icon } from 'react-native-elements';
import SheltyButton from '../common/SheltyButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SinglePost = ({ t, post }) => {
  const readMoreOfPost = () => {
    console.log('read more');
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postDetailContainer}>
        <View style={styles.postMask}></View>
        <View style={styles.postDetail}>
          <Text style={styles.postTitle}>Test post başlığı</Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Icon type="feather" name="clock" size={SIZES.SMALL_TEXT} color={COLORS.BLACK_63} />
              <Text style={styles.metaItemText}>2 saat önce</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon type="feather" name="user" size={SIZES.SMALL_TEXT} color={COLORS.BLACK_63} />
              <Text style={styles.metaItemText}>rawsly</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon type="feather" name="folder" size={SIZES.SMALL_TEXT} color={COLORS.BLACK_63} />
              <Text style={styles.metaItemText}>Kedi</Text>
            </View>
          </View>
          <Text style={styles.postExcerpt}>Post kısa açıklaması. Post kısa açıklaması. Post kısa açıklaması...</Text>
          <View style={styles.postActionContainer}>
            <View style={styles.postActionIcons}>
              <Icon type="feather" name="thumbs-up" size={SIZES.NORMAL_TEXT} color="#FEA195" />
              <Icon
                type="feather"
                name="bookmark"
                containerStyle={styles.postActionIcon}
                size={SIZES.NORMAL_TEXT}
                color="#FEA195"
              />
            </View>
            <SheltyButton
              buttonStyles={styles.readMoreButton}
              onPressFunction={readMoreOfPost}
              gradientStyles={styles.readMoreButtonContainer}
              textStyles={styles.readMoreButtonText}
              text={t('readMore')}
            />
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} width={120} height={120} source={{ uri: post.featuredImage }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth - 40,
    height: 150,
    alignItems: 'center',
    marginVertical: 8
  },
  postDetailContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 150
  },
  postMask: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    backgroundColor: COLORS.MASK,
    position: 'absolute',
    top: 3,
    right: 3
  },
  postDetail: {
    flexDirection: 'column',
    height: 150,
    backgroundColor: COLORS.WHITE_F9,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: COLORS.WHITE_FB
  },
  postTitle: {
    fontWeight: '600',
    fontSize: SIZES.NORMAL_TEXT
  },
  metaContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaItemText: {
    marginLeft: 5,
    color: COLORS.BLACK_63,
    fontSize: SIZES.SMALL_TEXT
  },
  postExcerpt: {
    flex: 1,
    fontSize: SIZES.SMALL_TEXT,
    fontWeight: '400',
    color: COLORS.BLACK_5C
  },
  postActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  postActionIcons: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  postActionIcon: {
    marginLeft: 15
  },
  readMoreButtonContainer: {
    borderRadius: 10,
    height: 30,
    paddingHorizontal: 15
  },
  readMoreButton: {
    alignContent: 'center'
  },
  readMoreButtonText: {
    width: '100%',
    fontSize: SIZES.NORMAL_TEXT,
    color: COLORS.WHITE_F9,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 30,
    fontWeight: '400'
  },
  imageContainer: {
    width: 120,
    height: 150,
    alignSelf: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 15,
    overflow: 'hidden',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  }
});
export default withTranslation()(SinglePost);
