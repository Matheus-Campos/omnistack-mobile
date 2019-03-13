import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NewTeam from '../NewTeam';

import styles from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }).isRequired,
    getTeamsRequest: PropTypes.func.isRequired,
    selectTeam: PropTypes.func.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  render() {
    const { teams, selectTeam } = this.props;
    const { isModalOpen } = this.state;

    return (
      <View style={styles.container}>
        {teams.data.map(team => (
          <TouchableOpacity
            key={team.id}
            style={styles.teamContainer}
            onPress={() => selectTeam(team)}
          >
            <Image
              style={styles.teamAvatar}
              source={{
                uri: `https://ui-avatars.com/api/?font-size:0.33&background=7159c1&color=fff&name=${
                  team.name
                }`,
              }}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.newTeam} onPress={this.openModal}>
          <Icon name="add" size={24} color="#999" />
        </TouchableOpacity>

        <NewTeam visible={isModalOpen} onRequestClose={this.closeModal} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapDispatchToProps = dispatch => bindActionCreators(TeamsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);
