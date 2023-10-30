import React, { useContext } from 'react';
import styles from './resBuy.scss';
import { Context } from './TupleContext';

const TupleHighlight = ({ }) => {

    const [context, setContext] = useContext(Context);
    const {
        property: {
            PRODUCT_TYPE,
            TOP_USPS = [],
            formatted: {
                isPremium,
            } = {},
            locationHighlights: {
                landMarks,
            } = {},
        } = {},
        isPseudoTuple,
    } = context;

    if (isPseudoTuple && !landMarks || landMarks && !landMarks.length) return null;
    if (!isPseudoTuple && (!TOP_USPS.length || !isPremium)) return null;
    return (
        <div topmost='true' className={styles.scrollableHighlights}
            data-label={isPseudoTuple ? 'USP' : 'USP_BAND'}
            data-customInfo={isPseudoTuple ? '' : JSON.stringify({ "product_type": `${PRODUCT_TYPE}` })}
        >
            <div className={styles.highlightsWrap}>
                <div className={styles.highligtsHeading}>{isPseudoTuple && landMarks.length ? 'Nearby :' : ' Highlights :'}</div>
                {
                    [...(isPseudoTuple ? landMarks : TOP_USPS)].map(hl => {
                        return <div className={styles.unitHighlight}>
                            <span className={styles.unitHighlightTxt}>{isPseudoTuple ? hl.label : hl}</span>
                        </div>
                    })
                }

            </div>
        </div>
    );
}

export default TupleHighlight;