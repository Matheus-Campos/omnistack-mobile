import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';

import Modal from '../Modal';

import styles from './styles';

class NewTeam extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    createTeamRequest: PropTypes.func.isRequired,
  };

  state = {
    newTeam: '',
  };

  handleSubmit = () => {
    const { createTeamRequest, onRequestClose } = this.props;
    const { newTeam } = this.state;

    createTeamRequest(newTeam);
    onRequestClose();
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { newTeam } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>NOME</Text>

        <TextInput
          autoFocus
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={newTeam}
          onChangeText={text => this.setState({ newTeam: text })}
          style={styles.input}
        />

        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>CRIAR TIME</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>CANCELAR</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(TeamsActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(NewTeam);
