
import React, { Component } from 'react';
import cross from '../img/cross.svg';
import deleteButton from '../img/delete-button.svg';

class FlipperCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wideOpen : false,
            deleteClicked : false,
        };
    }

    confirmDelete = (e) => {
        if (!this.state.deleteClicked) {
            this.setState({
                deleteClicked : true,
            });
        } else {
            this.props.desactivateFlipper(this.props.flip, e)
        }
    }

    delete = (e) => {
        this.props.desactivateFlipper(this.props.flip, e);
    }

    render() {
    return (
        <div className={'flipDetails' + (this.props.isOpen? ' isOpen' :'') + (this.state.wideOpen? ' wideOpen' :'')}>

            <div className="media">
                <img className="d-flex mr-3" src="https://www.zupimages.net/up/18/04/z6it.png" alt="logo"/>
                    <div className="media-body">
                        <h3 className="flipName">{this.props.flip.flipName}</h3>
                        <h5 className="placeName">@{this.props.flip.placeName}</h5>
                        <p className="address">{this.props.flip.address}</p>
                    </div>
                <img className="closeIcon" onClick={(e) => this.props.closeFunction(this.props.flip, e)} src={cross} alt='close' />
            </div>

            <div className='flipCardContent'>
               <div className=""> Prix : 1€ -> {this.props.flip.price1} parties / 2€ -> {this.props.flip.price2}</div>
               <div className="deleteDiv">
                   <div className="btn btn-danger deleteBtn" onClick={(e) => this.confirmDelete(e)}>
                       {this.state.deleteClicked && <span> Supprimer ce flipper ?</span>}
                       <img className="deleteBin" src={deleteButton}/>
                   </div>
               </div>
            </div>

        </div>
    );
    }
}

FlipperCard.propTypes = {};
FlipperCard.defaultProps = {};

export default FlipperCard;




