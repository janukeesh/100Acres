import React, { useState, useCallback, useContext } from 'react';
import { Context } from "./TupleContext";
import styles from './resBuy.scss';
import LazyImage from '../SrpTuple/LazyImage';
import { fetchTopDealerData, selectedProperty } from '../MobileSrpTuppleWrapper/actions.tuple';
import { connect } from 'react-redux';

const FeatureDealerDetail = (props) => {

    const [context, setContext] = useContext(Context);

    const {
        property: {
            SPID,
            PROFILEID,
            PREFERENCE,
            RES_COM,
            formatted: {
                name,
                userPhoto = '',
                formattedRegisterDays,
            } = {},
        } = {},
        property,
        isRecomTuple,
        isVspTuple,
        filters: {
            city,
        } = {},
    } = context;

    const {
        openTopDealerLayer
    } = props;

    const onDealerClickHandler = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();

        const topDealerParams = {
            profileId: PROFILEID,
            preference: PREFERENCE,
            rescom: RES_COM,
            city: city,
            SPID: SPID,
        }

        openTopDealerLayer(topDealerParams, { ...property, isRecomTuple, isVspTuple })
    }, [])
    const truncate = (input) => input.length > 16 ? `${input.substring(0, 16)}...` : input;

    return (
        <div className={`${styles.postedByWrap} ${styles.fdPostedWrap} ${userPhoto.includes('dealer_pnava') ? styles.noDealerPhotoWidth : ''}`} onClick={onDealerClickHandler}>
            {!userPhoto.includes('dealer_pnava') ?
                <div className={styles.fdImg}>
                    <LazyImage
                        src={userPhoto}
                        height={'26px'}
                        width={'26px'}
                        noBackground={true}
                    />
                    <div className={styles.badgeWrap}>
                        <img src="https://static.99acres.com/universalapp/img/FDbadge.png" alt="FD-Badge" />
                    </div>
                </div>
                :
                null
            }
            <div className={styles.pbDetail}>
                <div className={styles.pbL0}>
                    <span>{formattedRegisterDays}</span>
                </div>
                <div className={styles.fdBadge}>FEATURED DEALER</div>
                <div className={`${styles.pbL2} ellipsis`}>{name}</div>
            </div>
        </div>
    );
}

const mdtp = dispatch => ({
    openTopDealerLayer(topDealerParams, property) {
        dispatch(fetchTopDealerData(topDealerParams));
        dispatch(selectedProperty(property));
    },
});

export default connect(null, mdtp)(FeatureDealerDetail);