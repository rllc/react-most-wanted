import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { withFirebase } from 'firekit-provider'
import isGranted from 'rmw-shell/lib/utils/auth'
import { Activity, Scrollbar } from 'rmw-shell'

class Sermons extends Component {
  componentDidMount () {
    const { watchList, firebaseApp } = this.props

    let ref = firebaseApp.database().ref('sermons').limitToFirst(20)

    watchList(ref)
  }

  renderList (sermons) {
    const { history } = this.props

    if (sermons === undefined) {
      return <div />
    }

    return sermons.map((sermon, index) => {
      return <div key={index}>
        <ListItem
          key={index}
          onClick={() => { history.push(`/sermons/play/${sermon.key}`) }}
          id={index}>
          {sermon.val.photoURL && <Avatar src={sermon.val.photoURL} alt='sermon' />}
          {!sermon.val.photoURL && <Avatar> <Icon > sermon </Icon>  </Avatar>}
          <ListItemText primary={sermon.val.title} secondary={sermon.val.minister} />
        </ListItem>
        <Divider inset />
      </div>
    })
  }

  render () {
    const { intl, sermons, theme, history, isGranted } = this.props

    return (
      <Activity
        isLoading={sermons === undefined}
        containerStyle={{ overflow: 'hidden' }}
        title={intl.formatMessage({ id: 'sermons' })}>
        <Scrollbar>

          <div style={{ overflow: 'none', backgroundColor: theme.palette.convasColor }}>
            <List id='test' style={{ height: '100%' }} ref={(field) => { this.list = field }}>
              {this.renderList(sermons)}
            </List>
          </div>

          <div style={{ position: 'fixed', right: 18, zIndex: 3, bottom: 18 }}>
            {
              isGranted('create_sermon') &&
              <Button variant='fab' color='secondary' onClick={() => { history.push(`/sermons/create`) }} >
                <Icon className='material-icons' >add</Icon>
              </Button>
            }
          </div>

        </Scrollbar>

      </Activity>
    )
  }
}

Sermons.propTypes = {
  sermons: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { auth, lists } = state

  return {
    sermons: lists.sermons,
    auth,
    isGranted: grant => isGranted(state, grant)
  }
}

export default connect(
  mapStateToProps
)(injectIntl(withTheme()(withRouter(withFirebase(Sermons)))))