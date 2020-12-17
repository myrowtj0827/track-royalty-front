import React, { Component } from 'react';
import {connect} from "react-redux";

class AssignTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                Assign Track Page
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(
    mapStateToProps,
    {

    }
)(AssignTrack);