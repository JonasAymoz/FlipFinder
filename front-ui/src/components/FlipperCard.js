
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cross from '../img/cross.svg';

class FlipperCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wideOpen : false,
        };
    }

    render() {
    return (
        <div className={'flipDetails' + (this.props.isOpen? ' isOpen' :'') + (this.state.wideOpen? ' wideOpen' :'')}>

            <div className="media">
                <img className="d-flex mr-3" src="https://www.zupimages.net/up/18/04/z6it.png" alt="Generic placeholder image"/>
                    <div className="media-body">
                        <h3 className="flipName">{this.props.flip.flipName}</h3>
                        <h5 className="placeName">@{this.props.flip.placeName}</h5>
                        <p className="address">{this.props.flip.address}</p>
                    </div>
            </div>
            <img className="closeIcon" onClick={(e) => this.props.closeFunction(this.props.flip, e)} src={cross} alt='close' />
            <div>
                Autre content
            </div>

        </div>
    );
    }
}

FlipperCard.propTypes = {};
FlipperCard.defaultProps = {};

export default FlipperCard;




