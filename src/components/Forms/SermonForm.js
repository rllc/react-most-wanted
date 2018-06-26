import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Switch from '@material-ui/core/Switch';
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types';

class Form extends Component {
  
  render() {
    const {
      handleSubmit,
      intl,
      initialized,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button type="submit" style={{ display: 'none' }} />

        <div style={{ margin: 15, display: 'flex', flexDirection: 'column' }}>

          <div>
            <Field
              name="bible_text"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'bible_text_hint' })}
              label={intl.formatMessage({ id: 'bible_text_label' })}
              ref="bible_text"
              withRef
            />
          </div>

          <div>
            <Field
              name="minister"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'minister_hint' })}
              label={intl.formatMessage({ id: 'minister_label' })}
              ref="minister"
              withRef
            />
          </div>

          <div>
            <Field
              name="title"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'title_hint' })}
              label={intl.formatMessage({ id: 'title_label' })}
              ref="title"
              withRef
            />
          </div>

          
          <div>
            <Field
              name="created"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'created_hint' })}
              label={intl.formatMessage({ id: 'created_label' })}
              ref="created"
              withRef
            />
          </div>
          
          <div>
            <Field
              name="congregation"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'congregation_hint' })}
              label={intl.formatMessage({ id: 'congregation_label' })}
              ref="congregation"
              withRef
            />
          </div>

          
          <div>
            <Field
              name="published"
              disabled={!initialized}
              component={Switch}
              label={intl.formatMessage({ id: 'published_label' })}
              ref="published"
              withRef
            />
          </div>

          
          <div>
            <Field
              name="url"
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'url_hint' })}
              label={intl.formatMessage({ id: 'url_label' })}
              ref="url"
              withRef
            />
          </div>

        </div>
      </form>
    );
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


Form = reduxForm({ form: 'sermon' })(Form);

const mapStateToProps = state => {
  const { intl, lists, users, dialogs } = state;

  return {
    intl,
    sermons: lists.sermons,
    users,
    dialogs
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(withTheme()(Form))));
