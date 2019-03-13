import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '~/store/ducks/members';

import Icon from 'react-native-vector-icons/MaterialIcons';

import InviteMember from '../InviteMember';

import styles from './styles';

class Members extends Component {
  static propTypes = {
    getMembersRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          user: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      ),
    }).isRequired,
  };

  state = {
    isInviteModalOpen: false,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  openInviteModal = () => this.setState({ isInviteModalOpen: true });

  closeInviteModal = () => this.setState({ isInviteModalOpen: false });

  render() {
    const { members } = this.props;
    const { isInviteModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MEMBROS</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>

              <TouchableOpacity
                hitSlop={{
                  top: 5,
                  bottom: 5,
                  left: 5,
                  right: 5,
                }}
                onPress={() => {}}
              >
                <Icon name="settings" size={20} color="#b0b0b0" />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.button} onPress={this.openInviteModal}>
              <Text style={styles.buttonText}>CONVIDAR</Text>
            </TouchableOpacity>
          )}
        />

        <InviteMember visible={isInviteModalOpen} onRequestClose={this.closeInviteModal} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
