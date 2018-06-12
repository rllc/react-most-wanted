import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Activity } from 'rmw-shell'
import SermonForm from '../../components/Forms/SermonForm';
import { withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withFirebase } from 'firekit-provider'
import FireForm from 'fireform'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { submit } from 'redux-form';
import DialogTitle from '@material-ui/core/DialogTitle';

const path = '/sermons/';

class Sermon extends Component {

  componentDidMount() {
    this.props.watchList('users');
  }


  handleCreateValues = (values) => {

    const { auth } = this.props;

    return {
      created: new Date(),
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      completed: false,
      ...values
    }
  }

  
  handleUpdateValues = (values) => {

    return {
      updated: firebase.database.ServerValue.TIMESTAMP,
      ...values
    }
  }

  handleClose = () => {
    
  }

  handleDelete = () => {

    const { history, match, firebaseApp } = this.props;
    const uid = match.params.uid;

    if (uid) {
      firebaseApp.database().ref().child(`${path}${uid}`).remove().then(() => {
        this.handleClose();
        history.goBack();
      })
    }
  }

  render() {

    const { history, intl, dialogs, match, firebaseApp } = this.props;

    return (
      <Activity
        iconElementRight={
          match.params.uid ? <FlatButton
            style={{ marginTop: 4 }}
            onClick={() => {}}
            icon={<FontIcon className="material-icons" >edit</FontIcon>}
          /> : undefined
        }
        onBackClick={() => { history.goBack() }}
        title={intl.formatMessage({ id: this.props.match.params.uid ? 'edit_sermon' : 'create_sermon' })}>
        <div style={{ margin: 15, display: 'flex' }}>
          <FireForm
              firebaseApp={firebaseApp}
              name={'sermon'}
              path={path}
              onSubmitSuccess={(values) => { history.push('/sermons'); }}
              onDelete={(values) => { history.push('/sermons'); }}
              handleCreateValues={this.handleCreateValues}
              handleUpdateValues={this.handleUpdateValues}
              uid={this.props.match.params.uid}>
              <SermonForm />
            </FireForm>

        </div>
        <Dialog
          title={intl.formatMessage({ id: 'delete_sermon_title' })}
          actions={actions}
          modal={false}
          open={dialogs.delete_vehicle === true}
          onRequestClose={this.handleClose}>
          {intl.formatMessage({ id: 'delete_sermon_message' })}
        </Dialog>
      </Activity>
    );
  }
}


const mapStateToProps = (state) => {
  const { auth, intl, dialogs } = state;

  return {
    auth,
    intl,
    dialogs
  };
};

export default connect(
  mapStateToProps, { }
)(injectIntl(withRouter(withFirebase(Sermon))));
