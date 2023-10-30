import React, { useContext } from 'react';
import styles from './resBuy.scss';
import { Context } from "./TupleContext";
import { ENV_CONFIG } from '../../../../config/config';

const Heading = (props) => {
    const [context, setContext] = useContext(Context);

    const {
        index,
        property: {
            SECONDARY_TAGS = [],
            formatted: {
                propTypeHeading,
                propLocationHeading
            } = {},
            PROP_DETAILS_URL
        } = {}
    } = context;

    let isResale = SECONDARY_TAGS.includes("Resale");
    const anchorUrl = `${ENV_CONFIG.API_URL}/${PROP_DETAILS_URL}`;

    return (
        <div className={styles.tupleHeading}>
            <a className={`${styles.propertyHeading} ellipsis`} href={anchorUrl} onClick={(e)=>{
                e.preventDefault();
            }}>
                <h2 className={styles.propType}>{propTypeHeading}
                <span className={`ellipsis ${styles.propLocation}`}> in <span>{propLocationHeading}</span></span></h2>
            </a>
            {isResale ? <div className={styles.ribbon}><div>RESALE</div></div> : null}
        </div>
    );
}

export default Heading;