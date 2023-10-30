import React, { useState, useCallback, useContext } from 'react';
import styles from './resBuy.scss';
import { Context } from "./TupleContext";
import { capitalizeFirstLetter } from 'GlobalUtilities'

const PriceArea = (props) => {

    const [context, setContext] = useContext(Context);

    const {
        index,
        property: {
            MAX_PRICE = '',
            MIN_PRICE = '',
            MAX_AREA = '',
            MIN_AREA = '',
            SECONDARY_TAGS = [],
            formatted: {
                price,
                priceValue,
                propertyAreaDetail,
                profileAreaType,
                formattedAreaValue,
                formattedBathValue,
                formattedSecondaryAreaValue,
                isPriceRange,
                isAreaRange,
            } = {}
        } = {}
    } = context

    const constructionStatus = SECONDARY_TAGS.includes("Ready To Move") ? "Ready To Move" : "Under Construction";
    return (
        <>
            <div className={styles.priceWrap}>
                <div className={`${styles.priceAndPerSqftWrap} ${isPriceRange ? styles.priceAndPerSqftWrapCol : ''}`}>
                    <div className={styles.priceValWrap}>{`${price !== 'Price on Request' ? priceValue : price}`}</div>
                    {!isPriceRange ? <div className={styles.divider}></div> : null}
                    <div className={`${styles.perSqftWrap} ${isPriceRange ? styles.perSqftWrapCol : ''} ellipsis`}>{price !== 'Price on Request' ? propertyAreaDetail : null}</div>
                </div>
                <div className={styles.possessionBy}>{constructionStatus}</div>
            </div>
            <div className={styles.areaWrap}>
                <div className={`${styles.totolAreaWrap} ${isAreaRange ? styles.totolAreaWrapCol : ''}`}>
                    <span className={styles.area1Type}>{formattedAreaValue}{formattedBathValue}</span>
                    <span className={`${styles.area2Type} ${isAreaRange ? styles.area2TypeCol : ''} ellipsis`}>{formattedSecondaryAreaValue}</span>
                </div>
                <div className={styles.areaType}>{capitalizeFirstLetter(profileAreaType)}</div>
            </div>
        </>
    );
}

export default PriceArea;