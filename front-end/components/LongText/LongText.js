import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  Text
} from 'react-native';

import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
import { COLORS, SIZES } from '../../constants/theme';
import { Icon } from 'react-native-elements';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const defaultStyles = getDefaultStyles();

class LongText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      value: [getInitialObject()]
    };

    this.editor = null;
  }

  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = tag => {
    this.setState({ selectedTag: tag });
  };

  onSelectedStyleChanged = styles => {
    this.setState({ selectedStyles: styles });
  };

  onValueChanged = value => {
    this.setState({ value });
  };

  useLibraryHandler = async () => {
    console.log('library');
  };

  useCameraHandler = async () => {
    console.log('camera');
  };

  onImageSelectorClicked = value => {
    if (value == 1) {
      this.useCameraHandler();
    } else if (value == 2) {
      this.useLibraryHandler();
    }
  };

  renderImageSelector = () => {
    const { t } = this.props;
    return (
      <Menu renderer={SlideInMenu} onSelect={this.onImageSelectorClicked}>
        <MenuTrigger>
          <Icon name="image" size={SIZES.MENU_ICON} color="#737373" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1}>
            <Text style={styles.menuOptionText}>{t('takePhoto')}</Text>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption value={2}>
            <Text style={styles.menuOptionText}>{t('photoLibrary')}</Text>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption value={3}>
            <Text style={styles.menuOptionText}>{t('cancel')}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  render() {
    const { selectedStyles, selectedTag, value } = this.state;
    const { t } = this.props;

    const iconSet = [
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'bold',
            buttonTypes: 'style',
            iconComponent: (
              <Icon type="feather" name="bold" size={SIZES.MENU_ICON} />
            )
          }
        ]
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'italic',
            buttonTypes: 'style',
            iconComponent: (
              <Icon type="feather" name="italic" size={SIZES.MENU_ICON} />
            )
          }
        ]
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'underline',
            buttonTypes: 'style',
            iconComponent: (
              <Icon type="feather" name="underline" size={SIZES.MENU_ICON} />
            )
          }
        ]
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'body',
            buttonTypes: 'tag',
            iconComponent: (
              <Icon type="feather" name="type" size={SIZES.MENU_ICON} />
            )
          }
        ]
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'ul',
            buttonTypes: 'tag',
            iconComponent: (
              <Icon type="feather" name="list" size={SIZES.MENU_ICON} />
            )
          }
        ]
      },
      {
        type: 'tool',
        iconArray: [
          {
            toolTypeText: 'image',
            iconComponent: this.renderImageSelector()
          }
        ]
      }
    ];

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.keyboardContainer}
      >
        <MenuProvider style={styles.menuProvider}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
              <CNRichTextEditor
                ref={input => (this.editor = input)}
                onSelectedTagChanged={this.onSelectedTagChanged}
                onSelectedStyleChanged={this.onSelectedStyleChanged}
                value={value}
                style={styles.textEditor}
                styleList={defaultStyles}
                onValueChanged={this.onValueChanged}
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.toolbarContainer}>
            <CNToolbar
              style={styles.toolbar}
              iconSetContainerStyle={styles.iconSetContainer}
              iconSet={iconSet}
              selectedTag={selectedTag}
              selectedStyles={selectedStyles}
              onStyleKeyPress={this.onStyleKeyPress}
            />
          </View>
        </MenuProvider>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  menuProvider: {
    flex: 1
  },
  main: {
    flex: 1,
    paddingBottom: 1
  },
  textEditor: {
    backgroundColor: COLORS.WHITE,
    padding: 20
  },
  toolbarContainer: {
    height: 45
  },
  toolbar: {
    height: 45
  },
  iconSetContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  menuOptionText: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5
  }
});

export default withTranslation()(LongText);
