import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Tabs, Tab } from 'material-ui/Tabs';
import PropTypes from 'prop-types';

import EqualSign from '../signs/equal/equal';
import Actions from '../actions/actions';

import '../signs/signs.css';

const style = {
  margin: 0,
  // marginLeft: 0,
};

class CreateRule extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="create-rule">
        <Tabs className="tabs">
          <Tab label="Conditions">
            <div className="wrapper-conditions">
              {this.props.currentRule.conditions.map((condition, index) =>
                <EqualSign key={index} updateRule={this.props.updateRule} currentRule={this.props.currentRule} arrayIndex={index} />,
              )}
            </div>
            <FloatingActionButton mini style={style} onClick={() => this.props.updateRule('add', 'condition')}>
              <ContentAdd />
            </FloatingActionButton>
          </Tab>
          <Tab label="Actions">
            <div className="wrapper-actions">
              <Actions updateRule={this.props.updateRule} currentRule={this.props.currentRule} />
            </div>
            <FloatingActionButton mini style={style} onClick={() => this.props.updateRule('add', 'action')}>
              <ContentAdd />
            </FloatingActionButton>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

CreateRule.propTypes = {
  updateRule: PropTypes.func.isRequired,
  currentRule: PropTypes.object.isRequired,
};

export default CreateRule;
