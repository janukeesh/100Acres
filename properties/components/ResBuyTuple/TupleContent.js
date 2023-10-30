import React from 'react'
import TupleDescription from './TupleDescription'
import TupleHighlight from './TupleHighlight'
import styles from './resBuy.scss';
import PriceArea from './PriceArea';
import ContactInfo from './ContactInfo';
import LocAndTag from './LocAndTag';
import Heading from './Heading';
import LandmarkDistance from '../MobileTupple/PseudoTupleRevamp/LandmarkDistance';

const TupleContent = ({ handleEoiClick }) => {

    return (
        <div className={styles.contentWrap}>
            <div className={styles.locAndTags}>
                <LocAndTag />
            </div>
            <Heading />
            <div className={styles.priceAreaWrap}>
                <PriceArea />
            </div>
            <div className={styles.highlightDescWrap}>
                <LandmarkDistance />
                <div className={styles.noRight}>
                    <TupleHighlight />
                </div>
                <TupleDescription />
            </div>
            <ContactInfo handleEoiClick={handleEoiClick} />
        </div>
    )
}

export default React.memo(TupleContent);