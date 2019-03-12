import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import TeamSwitcher from '~/components/TeamSwitcher';
import Projects from '~/components/Projects';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

class Main extends Component {
  state = {
    leftOpen: false,
  };

  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    activeTeam: null,
  };

  toggleMenu = (position, isOpen) => {
    this.setState({ [`${position}Open`]: isOpen });
  };

  render() {
    const { activeTeam } = this.props;
    const { leftOpen } = this.state;

    return (
      <View style={styles.backgroundWrapper}>
        <SideMenu
          isOpen={leftOpen}
          disableGestures
          onChange={isOpen => this.toggleMenu('left', isOpen)}
          openMenuOffset={70}
          menu={<TeamSwitcher />}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 10,
                  right: 10,
                }}
                onPress={() => this.toggleMenu('left', true)}
              >
                <Icon name="menu" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.teamTitle}>
                {activeTeam ? activeTeam.name : 'Selecione um time'}
              </Text>
              <TouchableOpacity
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 10,
                  right: 10,
                }}
                onPress={() => {}}
              >
                <Icon name="group" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <Projects />
          </View>
        </SideMenu>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
});

export default connect(mapStateToProps)(Main);
