import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


class InputText extends  PureComponent {



    render() {
        return(
        <div className="form-group row">
            {!this.props.noLabel && <label className="col-form-label col-sm-2" htmlFor={this.props.id}>{this.props.label}</label>}
            <input type="text"
                   ref={this.props.innerRef}
                   className={'form-control' + (!this.props.noLabel? ' col-sm-10' : ' col-sm-12')}
                   id={this.props.id || this.props.name}
                   placeholder={this.props.placeHolder}
                   name={this.props.name}
                   value={this.props.value}
                   onChange={this.props.onChange}
                   onInput={this.props.onInput}
                   onKeyDown={this.props.onKeyDown}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   onKeyUp={this.props.onKeyUp}
                   autocomplete="off"
            />
        </div>
    )}
}


InputText.propTypes = {
    ref: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    noLabel : PropTypes.bool,
};

export default InputText;