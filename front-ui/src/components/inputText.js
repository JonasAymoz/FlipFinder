import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


class InputText extends  PureComponent {



    render() {
        return(
        <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor={this.props.id}>{this.props.label}</label>
            <input  type="text"
                   className="form-control col-sm-10"
                   id={this.props.id || this.props.name}
                   placeholder={this.props.placeHolder}
                   name={this.props.name}
                   value={this.props.value}
                   onChange={this.props.onChange}
            />
        </div>
    )}
}


InputText.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
};

export default InputText;