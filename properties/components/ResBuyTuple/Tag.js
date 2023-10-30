


import React, { useCallback } from 'react'
import style from './imgItems.scss';

const getClasses = (varient) => {
    let tagClass = '';
    let textClass = '';

    let validVarients = [
        'verified',
        'featured'
    ]

    if (validVarients.includes(varient)) {
        tagClass = `${varient}Tag`;
        textClass = `${varient}Text`;
    }

    return { tagClass, textClass }
}

const Tag = props => {

    const {
        varient,
        hasLeftIcon,
        upperCase,
        text = '',
    } = props;

    let { tagClass = '', textClass = '' } = getClasses(varient);

    return (
        <div className={`${style.tagWrap} ${style[tagClass]}`}>
            {hasLeftIcon && <i class=" iconS_tn_12 icon_verified nudgesList__grayScaleIcon"></i>}
            <span className={`${style.tagText} ${style[textClass]}`}>{upperCase ? text?.toUpperCase() : text}</span>
        </div>
    )
}

export default Tag;
