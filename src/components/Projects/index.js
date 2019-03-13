import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NewProject from '../NewProject';

import styles from './styles';

class Projects extends Component {
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    activeTeam: PropTypes.shape(),
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { projects, activeTeam } = this.props;
    const { isModalOpen } = this.state;

    if (!activeTeam) return null;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.projectsList}
          data={projects.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.projectContainer}>
              <Text style={styles.projectTitle}>{item.title}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.newProjectButton} onPress={this.openModal}>
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>

        <NewProject visible={isModalOpen} onRequestClose={this.closeModal} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  activeTeam: state.teams.active,
});

const mapDispatchToProps = dispatch => bindActionCreators(ProjectsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
