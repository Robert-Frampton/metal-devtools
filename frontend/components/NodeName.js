import Component, {Config} from 'metal-jsx';

import otherProps from '../lib/otherProps';

export const OPENING = 0;
export const NORMAL_CLOSING = 1;
export const SELF_CLOSING = 2;

/**
 * Component used to display a component node
 */
class NodeName extends Component {
  render() {
    const {name, type} = this.props;

    return (
      <span class="node-name-container" {...otherProps(this)}>
        {type === NORMAL_CLOSING ? '</' : '<'}

        <span class="name">{name}</span>

        {type === SELF_CLOSING ? ' />' : '>'}
      </span>
    );
  }
}

NodeName.PROPS = {
  name: Config.string(),
  type: Config.oneOf([OPENING, NORMAL_CLOSING, SELF_CLOSING]).value(OPENING)
};

export default NodeName;
