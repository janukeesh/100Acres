import React, { useState, useCallback, useContext } from 'react';
import { IDS } from '../SrpTuple/constants';
import styles from './resBuy.scss';
import { Context } from './TupleContext';
import { API_URL } from '../../../../config/config';
// import Arrow from '../../../../assets/images/arrow_right_alt.svg';

const TupleDescription = (props) => {

    const {
        tupleIndex,
        // descriptionParagraphs = [],
    } = props;

    const [context, setContext] = useContext(Context);
    const {
        index,
        property: {
            formatted: {
                descriptionParagraphs = [],
                isPremium,
            },
            description: {
                text = '',
            } = {},
        },
        isPseudoTuple,
    } = context;
    const [showDesc, setShowDesc] = useState(false);
    const descText = [text];

    const handleShowMoreClick = useCallback(e => {
        e.stopPropagation();
        if (e?.currentTarget?.classList?.contains('descPtag')) {
            if (!showDesc) setShowDesc(!showDesc);
        } else {
            setShowDesc(!showDesc);
        }
    }, [showDesc])

    return (
        <div className={`${styles.moreLessWrapper} ${showDesc ? styles.moreLessWrapCol : ''} ${!isPremium ? '' : styles.mt16}`} id={`${IDS.description}`}>
            {[...(isPseudoTuple ? descText : descriptionParagraphs)].map((paragraph, index) => (
                <p
                    key={`${IDS.descPara}_${tupleIndex}_${index}`}
                    className={`descPtag ${styles.descText} ${!showDesc ? ` ellipsis ${styles.collapsedDesc} ` : `${styles.expandedDesc}`
                        } ${index > 0 ? styles.dispNone : ""}`}
                    onClick={handleShowMoreClick}
                >
                    {paragraph}
                </p>
            ))}
            {!showDesc ?
                <div data-label='SEE_MORE'>
                    <i className={`iconS_srpMob_20 icon_dropdown`} onClick={handleShowMoreClick}></i>
                </div>
                :
                <div className={styles.bottomCont}>
                    <div className={styles.viewAllCont}>
                        <div className={styles.viewAll}>View all details</div>
                        <img alt='Right-Arrow' src={`https://static.99acres.com/universalapp/img/arrow_right_alt.svg`} />
                    </div>
                    <div data-label='SEE_LESS'>
                        <i className={`iconS_srpMob_20 icon_dropdown ${styles.rotateIcon}`} onClick={handleShowMoreClick}></i>
                    </div>
                </div>
            }
        </div>
    );
}

export default TupleDescription;