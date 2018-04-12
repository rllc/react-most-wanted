import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactDOM  from 'react-dom';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {injectIntl, intlShape} from 'react-intl';
import { Activity } from 'rmw-shell'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { green800} from 'material-ui/styles/colors';
import {BottomNavigation} from 'material-ui/BottomNavigation';
import {withRouter} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit-provider'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar';
import isGranted from 'rmw-shell/lib/utils/auth'

class Sermons extends Component {

  constructor(props) {
    super(props);
    this.name = null;
    this.listEnd=null
    this.new_sermon_title = null;
    this.state={value: '' }
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.listEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate(prevProps, prevState) {

    this.scrollToBottom();

  }

  componentDidMount() {
    const {watchList, firebaseApp}=this.props;

    let sermonsRef=firebaseApp.database().ref('sermons').orderByKey().limitToLast(20);
    watchList(sermonsRef)
    this.scrollToBottom();
  }

  handleKeyDown = (event, onSucces) => {
    if(event.keyCode===13){
      onSucces();
    }
  }

  handleUpdateSermon = (key, sermon) => {
    const { firebaseApp }=this.props;
    firebaseApp.database().ref(`sermons/${key}`).update(sermon);
  }


  userAvatar = (key, sermon) => {
    const {auth} =this.props;
    
    return sermon.completed?
    <Avatar
      onClick={auth.uid===sermon.userId?()=>{this.handleUpdateSermon(key,{...sermon, completed: !sermon.completed})}:undefined}
      alt="person"
      icon={<FontIcon className="material-icons" >done</FontIcon>}
      backgroundColor={green800}
    />
    :
    <Avatar
      onClick={auth.uid===sermon.userId?()=>{this.handleUpdateSermon(key,{...sermon, completed: !sermon.completed})}:undefined}
    >
    {sermon.minister.substr(0,1).toUpperCase()}
    </Avatar>
  }

  renderList(sermons) {
    const { intl, history, isGranted} =this.props;

    if(sermons===undefined){
      return <div></div>
    }

    return sermons.map((row, i) => {

      const sermon=row.val;
      const key=row.key;

      return <div key={key}>

        <ListItem
          key={key}
          onClick={()=>{history.push(`/sermons/play/${key}`)}}
          primaryText={sermon.title}
          secondaryText={`${sermon.minister} ${sermon.created?intl.formatRelative(new Date(sermon.created)):undefined}`}
          leftAvatar={this.userAvatar(key, sermon)}
          rightIconButton={
            isGranted('edit_sermon') ?
            <IconButton
              onClick={()=>{history.push(`/sermons/edit/${key}`);}}>
              <FontIcon className="material-icons">{'edit'}</FontIcon>
            </IconButton>:undefined
          }
          id={key}
        />
        <Divider inset={true}/>
      </div>
    });
  }

  handleClose = () => {
    const { setDialogIsOpen }=this.props;
    setDialogIsOpen('delete_sermon_from_list', undefined);
  }

  handleDelete = (key) => {
    const {firebaseApp, dialogs, unwatchList, watchList} =this.props;

    unwatchList('public_sermons');

    firebaseApp.database().ref(`public_sermons/${dialogs.delete_sermon_from_list}`).remove();

    let messagesRef=firebaseApp.database().ref('public_sermons').orderByKey().limitToLast(20);
    watchList(messagesRef)

    this.handleClose();

  }

  render(){
    const {intl, sermons, muiTheme, dialogs} =this.props;


    const actions = [
      <FlatButton
        label={intl.formatMessage({id: 'cancel'})}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={intl.formatMessage({id: 'delete'})}
        secondary={true}
        onClick={this.handleDelete}
      />,
    ];

    return (
      <Activity
        isLoading={sermons===undefined}
        containerStyle={{overflow:'hidden'}}
        title={intl.formatMessage({id: 'sermons'})}>

        <Scrollbar>

          <div style={{overflow: 'none', backgroundColor: muiTheme.palette.convasColor, paddingBottom: 56}}>
            <List  id='test' style={{height: '100%'}} ref={(field) => { this.list = field; }}>
              {this.renderList(sermons)}
            </List>
            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.listEnd = el; }}
            />
          </div>

        </Scrollbar>


        {sermons &&
          <BottomNavigation style={{width: '100%', position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 50}}>
            
          </BottomNavigation>
        }

        <Dialog
          title={intl.formatMessage({id: 'delete_sermon_title'})}
          actions={actions}
          modal={false}
          open={dialogs.delete_sermon_from_list!==undefined}
          onRequestClose={this.handleClose}>
          {intl.formatMessage({id: 'delete_sermon_message'})}
        </Dialog>




      </Activity>
    );

  }

}

Sermons.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { lists, auth, browser, dialogs } = state;

  return {
    sermons: lists.sermons,
    auth,
    browser,
    dialogs,
    isGranted: grant => isGranted(state, grant)
  };
};




export default connect(
  mapStateToProps,
  { setDialogIsOpen }
)(injectIntl(muiThemeable()(withRouter(withFirebase(Sermons)))));
