import React, { useState, useCallback, useContext } from 'react';
import EoiButtons from './EoiButtons'
import PostedBy from './PostedBy';
import styles from './resBuy.scss';
import { Context } from './TupleContext';

const ContactInfo = (props) => {

    const [context, setContext] = useContext(Context);

    const {
        property: {
            FD,
            CLASS = '',
            CLASS_LABEL = '',
        } = {},
    } = context; 

    return (
        <div className={`${styles.contactWrap} ${FD == 'Y' ? styles.fdcWrap : ''}`}>
            <PostedBy FD={FD}/>
            <EoiButtons handleEoiClick={props.handleEoiClick} />
        </div>
    );
}

export default ContactInfo;