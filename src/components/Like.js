import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css'

class Like extends Component {

    render () {
        let classes='fa fa-heart';
        if(!this.props.liked) classes+='-o'
        return (
         <i onClick={this.props.onLike} className={classes} aria-hidden="true"></i>
        )
    }
}

export default Like;

