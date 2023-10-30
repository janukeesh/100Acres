import React, { useCallback, useContext } from 'react';
import styles from './imgItems.scss';
import { srpContext } from '99shared/src/components/pages/Srp/components/TupleRevampRN/srpContext';
import { Context } from './TupleContext';

const Fomo = ({
isInvestTuple = false,
}) => {

    const [context, setContext] = useContext(isInvestTuple ? srpContext : Context)

    const {
        property: {
            FOMO = {},
            possessionStatus = {},
            possessionStatus: {
                label = '',
            } = {},
        } = {},
        isPseudoTuple,
    } = context;

    if (!Object.keys(FOMO).length && !Object.keys(possessionStatus).length) return null;
    return (
        <div className={styles.fomoWrap}>
            {!isPseudoTuple ? <img className={styles.star} alt='Fomo-Star' src={`https://static.99acres.com/universalapp/img/star_fomo.svg`} /> : null}
            {!isPseudoTuple ? <span>{FOMO.text}</span> : null}
            {isPseudoTuple && possessionStatus && label ?
                <>
                    <span className={`${styles.m12} ${styles.colorN200} ellipsis`}>
                        {label.includes('(') ? `${label.split("(")[0]} · ` : label}  
                        <span style={{ fontWeight: 600 }}>
                            {label.includes('(') ? label.split("(")[1].split(")")[0] : null}
                        </span>
                    </span>
                </>
                : null
            }
        </div>
    )
}

export default Fomo;
