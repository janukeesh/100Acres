import React, { useState, useCallback, useContext } from 'react';
import { Context } from "./TupleContext";
import styles from './resBuy.scss';

const OwnerDealerDetail = (props) => {

    const [context, setContext] = useContext(Context);

    const {
        property: {
            formatted: {
                isTopDealer,
                isDealer,
                isOwner,
                isBuilder,
                isReraReg,
                name,
                userPhoto,
                formattedRegisterDays,
            } = {},
            REGISTER_DATE_FORMATTED: {
                type = '',
                value = '',
            } = {},
            REGISTERED_DAYS='',
        } = {}
    } = context;

    return (
        <div className={`${styles.postedByWrap} ${styles.ownerDealerPostedWrap}`}>
            <div className={styles.pbL1}>
                {
                    (isDealer || isBuilder) && <>
                        <span>{`${isBuilder ? 'Builder' : 'Dealer'}`}</span>
                        <span className={styles.dot}>&middot;</span>
                    </>
                }

                <span>{formattedRegisterDays}</span>
            </div>
            <div className={`${styles.pbL2} ellipsis`}>{`${(isDealer || isBuilder) ? name : 'Owner'} `}</div>
        </div>
    );
}

export default OwnerDealerDetail;