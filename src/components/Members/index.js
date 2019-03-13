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
import RoleUpdater from '../RoleUpdater';
import Can from '../Can';

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
    isRoleModalOpen: false,
    activeMember: null,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  openInviteModal = () => this.setState({ isInviteModalOpen: true });

  closeInviteModal = () => this.setState({ isInviteModalOpen: false });

  openRoleModal = member => this.setState({ isRoleModalOpen: true, activeMember: member });

  closeRoleModal = () => this.setState({ isRoleModalOpen: false, activeMember: null });

  render() {
    const { members } = this.props;
    const { isInviteModalOpen, isRoleModalOpen, activeMember } = this.state;

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

              <Can checkRole="administrator">
                <TouchableOpacity
                  hitSlop={{
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                  }}
                  onPress={() => this.openRoleModal(item)}
                >
                  <Icon name="settings" size={20} color="#b0b0b0" />
                </TouchableOpacity>
              </Can>
            </View>
          )}
          ListFooterComponent={() => (
            <Can checkPermission="invites_create">
              <TouchableOpacity style={styles.button} onPress={this.openInviteModal}>
                <Text style={styles.buttonText}>CONVIDAR</Text>
              </TouchableOpacity>
            </Can>
          )}
        />

        {activeMember && (
          <RoleUpdater
            visible={isRoleModalOpen}
            onRequestClose={this.closeRoleModal}
            member={activeMember}
          />
        )}

        <Can checkPermission="invites_create">
          <InviteMember visible={isInviteModalOpen} onRequestClose={this.closeInviteModal} />
        </Can>
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
