import React, { Component } from 'react';

class InputNumber extends Component {

    add(){
        let up = this.props.valueNumber;
        this.update(this.props.name, ++ up);
    }
    minus(){
        let up = this.props.valueNumber;
        if (up === 0){
            this.update(this.props.name,0);
        } else {
            this.update(this.props.name,-- up);
        }
    }
    update(name, value){
        this.props.setValue({[name] :value});
    }

  render() {
    return (
      <div className="inputNumber">
          <div className="add" onClick={()=> this.add()}> ⌃ </div>
          {this.props.valueNumber}
          <div className="minus" onClick={()=> this.minus()}> ⌃ </div>
      </div>
    );
  }
}

InputNumber.propTypes = {};
InputNumber.defaultProps = {};

export default InputNumber;