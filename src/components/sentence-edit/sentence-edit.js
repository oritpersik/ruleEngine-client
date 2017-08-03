import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import ColorPicker from 'material-ui-color-picker';
import Radium, { StyleRoot } from 'radium';
import * as animations from 'react-animations';
import DatesSection from '../dates-section/dates-section';
import AnimationDemo from './animation-demo';
import ErrorSelect from '../error-select/error-select';
import HotelSelect from '../hotel-select/hotel-select';

import './sentence-edit.css';

const styles = {}
const animationNames = [];

for (let key in animations) {
  if (
    key === 'global' ||
    key === 'merge' ||
    key === 'container'
  ) {
    continue;
  }
  animationNames.push(key);
  const animation = animations[key];
  styles[key] = {
    ...styles[key],
    animation: 'x',
    animationName: Radium.keyframes(animation, key),
  };
}

class SentenceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationValue: '',
    }
  }

  handleErrorChange = (event, index, value) => {
    this.props.updateRule({ key: 'error', sign: 'equal or null', value, factProp: 'error' });
  }

  handleAnimationChange = (event, index, value) => {
    this.props.updateRuleAction({ key: 'effect', sign: 'equal', value, factProp: 'effect' });
    this.setState({ animationValue: value });
  }

  updateHotel = (data) => {
    this.props.updateRule({ key: 'hotel', sign: 'in array', value: data, factProp: 'hotel' });
  }

  render() {
    return (
      <StyleRoot>
        <div className="sentence-edit">
          <Tabs className="tabs">
            {this.props.currentTab === 'not available' &&
              <Tab label="Cause" className="tab">
                <div>
                  <ErrorSelect selectedError={this.props.currentRule.error.value} handleErrorChange={this.handleErrorChange} />
                </div>
              </Tab>
            }
            <Tab label="Dates" className="tab">
              <div>
                <DatesSection currentRule={this.props.currentRule} updateRule={this.props.updateRule} />
              </div>
            </Tab>
            <Tab label="Hotel" className="tab">
              <div>
                <HotelSelect 
                  multiple={true}
                  selectedHotel={this.props.currentRule.hotel.value}
                  updateHotel={this.updateHotel} 
                  updateRooms={() => {}} 
                />
              </div>
            </Tab>
            <Tab label="Action" className="tab">
              <div>
                <div>
                  <TextField
                    floatingLabelText="sentence"
                    hintText="enter entence"
                    value={this.props.currentAction.sentence.value}
                    onChange={(event, value) =>
                      this.props.updateRuleAction({ key: 'sentence', sign: 'equal', value, factProp: 'sentence' })}
                    />
                </div>
                <div>
                  <ColorPicker
                    hintText="choose color"
                    name='color'
                    floatingLabelText="color"
                    defaultValue={this.props.currentAction.color.value}
                    onChange={(value) =>
                      this.props.updateRuleAction({ key: 'color', sign: 'equal', value, factProp: 'color' })}
                    />
                </div>
                <div className="effect-wrapper">
                  <SelectField
                    floatingLabelText="animation"
                    value={this.props.currentAction.effect.value}
                    onChange={this.handleAnimationChange}
                    >
                    {animationNames.map((name, index) => (
                      <MenuItem key={index} value={name} primaryText={name} />
                    ))}
                  </SelectField>
                  <AnimationDemo animation={this.state.animationValue} styles={styles} />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </StyleRoot >
    )
  }
}

export default SentenceEdit