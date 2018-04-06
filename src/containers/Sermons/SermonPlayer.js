import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Activity } from 'rmw-shell'
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { withFirebase } from 'firekit-provider'
import AudioPlayer from'react-responsive-audio-player';
import './audioplayer.css'

const path = '/sermons/';

class SermonPlayer extends Component {

  componentDidMount() {
    this.props.watchList('users');
  }


  handleCreateValues = (values) => {

    const { auth } = this.props;

    return {
      created: firebase.database.ServerValue.TIMESTAMP,
      userName: auth.displayName,
      userPhotoURL: auth.photoURL,
      userId: auth.uid,
      completed: false,
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

    const { sermons, history, intl, match } = this.props;
    const sermon = sermons.find((val, index, obj) => {
        return val.key === match.params.uid
    });
    console.table(sermon);

    return (
      <Activity
        iconElementRight={
          match.params.uid ? <FlatButton
            style={{ marginTop: 4 }}
            icon={<FontIcon className="material-icons" >edit</FontIcon>}
          /> : undefined
        }
        onBackClick={() => { history.goBack() }}
        title={intl.formatMessage({ id: this.props.match.params.uid ? 'play_sermon' : 'create_sermon' })}>
        <div style={{ margin: 15, display: 'flex' }}>
            <AudioPlayer
                playlist={[{ 
                    url: sermon.val.url, 
                    title: sermon.val.title + " : " + sermon.val.bible_text,
                    artist: sermon.val.minister,
                    album: sermon.val.bible_text
                }]}
                autoplay="true"
            />
        </div>
      </Activity>
    );
  }
}


const mapStateToProps = (state) => {
  const { lists, auth, intl, dialogs } = state;

  return {
    auth,
    intl,
    dialogs,
    sermons: lists.sermons
  };
};

export default connect(
  mapStateToProps, { }
)(injectIntl(withRouter(withFirebase(SermonPlayer))));
