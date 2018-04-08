import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';

class SermonForm extends Component {
  componentDidMount() {
  }

  render() {
    const {
      handleSubmit,
      intl,
      initialized
    } = this.props;

    return (
      <form onSubmit={handleSubmit} 
      style={{ height: '100%', alignItems: 'strech' }}>
        <div>
          <Field
            name='bible_text'
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({ id: 'bible_text_hint' })}
            floatingLabelText={intl.formatMessage({ id: 'bible_text_label' })}
            ref='bible_text'
            withRef
          />
        </div>

        <div>
          <Field
            name='minister'
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({ id: 'minister_hint' })}
            floatingLabelText={intl.formatMessage({ id: 'minister_label' })}
            ref='minister'
            withRef
          />
        </div>
        <div>
          <Field
            name='title'
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({ id: 'title_hint' })}
            floatingLabelText={intl.formatMessage({ id: 'title_label' })}
            ref='title'
            withRef
          />
        </div>

        <div>
          <Field
            name='created'
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({ id: 'created_hint' })}
            floatingLabelText={intl.formatMessage({ id: 'created_label' })}
            ref='created'
            withRef
          />
        </div>

         <div>
          <Field
            name='congregation'
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({ id: 'congregation_hint' })}
            floatingLabelText={intl.formatMessage({ id: 'congregation_label' })}
            ref='congregation'
            withRef
          />
        </div>

        <div>
          <Field
            name='published'
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({ id: 'published_hint' })}
            floatingLabelText={intl.formatMessage({ id: 'published_label' })}
            ref='published'
            withRef
          />
        </div>

        <div>
          <Field
            name='url'
            disabled={!initialized}
            component={TextField}
            hintText={intl.formatMessage({ id: 'url_hint' })}
            floatingLabelText={intl.formatMessage({ id: 'url_label' })}
            ref='url'
            withRef
          />
        </div>

        <br />

        <div>
          <RaisedButton
            label={intl.formatMessage({ id: 'submit' })}
            type='submit'
            primary
            disabled={!initialized}
          />
        </div>
      </form>
    )
  }
}

SermonForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

SermonForm = reduxForm({ form: 'sermon' })(SermonForm);
const mapStateToProps = state => {
  const { intl, lists } = state;

  return {
    intl,
    sermons: lists.sermons
  };
};

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(SermonForm)));

