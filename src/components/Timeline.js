import React from 'react';
import uuid from 'uuid';
import vis from 'vis';
import ReactDOM from 'react-dom';

var GroupTemplate = props => {
  var { group } = props;
  return (
    <div>
      <label>{group.content}</label>
    </div>
  );
};
var ItemTemplate = props => {
  var { item } = props;
  return (
    <div>
      <label>{item}</label>
    </div>
  );
};
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this._id = uuid();
  }

  componentDidMount() {
    const container = document.getElementById(this._id);
    this.items = new vis.DataSet([]);
    this.items.add([
      {
        id: uuid(),
        content: 'Start',
        start: new Date(),
        end: new Date(),
      },
    ]);
    const options = {
      //   orientation: 'top',
      maxHeight: 500,
      minHeight: 500,
      start: this.props.startDate || new Date(),
      end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
      editable: false,
    };
    this.timeline = new vis.Timeline(container, this.items, options);
  }
  componentWillReceiveProps(nextProps) {
    if (this.items) {
      const { data } = nextProps;
      const ids = this.items.getIds();
      const updated = data.filter(item => ids.includes(item.id));
      const added = data.filter(item => !ids.includes(item.id));
      this.items.update(updated);
      this.items.add(added);
    }
  }
  render() {
    return (
      <div>
        <div id={this._id} />
      </div>
    );
  }
}

export default Timeline;
