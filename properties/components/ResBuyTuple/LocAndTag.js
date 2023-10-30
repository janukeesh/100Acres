import React, { useContext } from 'react'
import styles from './resBuy.scss';
import { Context } from "./TupleContext";

const LocAndTag = ({ }) => {
    const [context, setContext] = useContext(Context);

    const {
        index,
        property: {
            LOCALITY_WO_CITY,
            CITY,
            SECONDARY_TAGS = [],
            xid: {
                PROJECT_RATING
            } = {},
            formatted: {
                formattedPropName
            } = {}
        } = {}
    } = context

    // let isResale = SECONDARY_TAGS?.includes('Resale')
    let isRera = SECONDARY_TAGS?.includes('RERA')
    let isReraHera = SECONDARY_TAGS?.includes('RERA | HIRA')

    return (
        <div className={styles.headingCont}>
            <div className={styles.headingNrera}>
                <div className={`${styles.locationName} ellipsis`}>
                    {formattedPropName || `${LOCALITY_WO_CITY}, ${CITY}`}
                </div>
                {
                    PROJECT_RATING && <span className={styles.locRatings}>
                        <img style={{width: '10px', height: '10px'}} alt='Green-Star' src={`https://static.99acres.com/universalapp/img/greenStarSRP.png`} />
                        <span>
                            {typeof (PROJECT_RATING) == "string" ? parseFloat(PROJECT_RATING).toFixed(1) : PROJECT_RATING.toFixed(1)}
                        </span>
                    </span>
                }
            </div>
            <div className={styles.contentTags}>
                {/* {isResale && <span>Resale</span>}
                {(isResale && isRera) && <span className={styles.tagDot}>&middot;</span>} */}
                {isRera &&
                    <div className={styles.rera}>
                        <img alt='Grey-Tick' src={`https://static.99acres.com/universalapp/img/checkLineGray.svg`} />
                        <span>RERA</span>
                    </div>
                }
                {isReraHera &&
                    <div className={styles.rera}>
                        <img alt='Grey-Tick' src={`https://static.99acres.com/universalapp/img/checkLineGray.svg`} />
                        <span>RERA | HIRA</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default LocAndTag;