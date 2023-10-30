import React, { useCallback, useState, useContext } from 'react'
import styles from './imgItems.scss'
// import ShortlistIcon from '../../../../assets/images/Shortlist.svg';
// import ShortlistedIcon from '../../../../assets/images/shortlisted.svg';
import { srpContext } from '99shared/src/components/pages/Srp/components/TupleRevampRN/srpContext';
import { getShortListed } from 'GlobalUtilities';
import { Context } from './TupleContext';

const ShortlistBtn = ({
    isInvestTuple = false,
}) => {

    const [context, setContext] = useContext(isInvestTuple ? srpContext : Context);

    const {
        index,
        updateShortlistCount,
        isRecomTuple,
        property: {
            PROP_ID,
            projectUnitId,
            formatted: {
                isShortlisted
            }
        } = {},
        filters: {
            res_com,
        } = {},
        isPseudoTuple,
        categoryPageName
    } = context;
    const [shortlist, setShortlist] = useState(isShortlisted);

    const doClickStreamTracking = ({ isRecomTuple, shortlist, PROP_ID, categoryPageName }) => {
        let trackingObject = JSON.stringify({
            'action': {
                'page': isInvestTuple ? `CP_${categoryPageName}`:isRecomTuple ? (typeof document != 'undefined' && document.getElementById('pagename') || {}).value : 'SRP',
                'stage': shortlist ? 'REMOVE' : 'ADD',
                'event': 'SHORTLIST',
            },
            'payload': {
                'property': {
                    'prop_id': PROP_ID
                }
            }
        })
        const clickStreamUrl = `${process.env.API_URL}/do/clickStreamTracking/ClickStream/trackData`;

        fetch(clickStreamUrl, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'trackingData[]=' + encodeURIComponent(trackingObject),
        })
            .then(() => { });
    }

    

    const handleShortlist = useCallback(e => {
        e.stopPropagation();
        setShortlist(!shortlist);

        function lazyGetShortListed() {
            isPseudoTuple ? getShortListed(projectUnitId, !shortlist, isRecomTuple ? (typeof document != 'undefined' && document.getElementById('pagename') || {}).value : 'SRP', 'Mobile',res_com) : getShortListed(PROP_ID, !shortlist, isRecomTuple ? (typeof document != 'undefined' && document.getElementById('pagename') || {}).value : 'SRP', 'Mobile');
        } 

        setTimeout(lazyGetShortListed, 10);

        updateShortlistCount();
        isPseudoTuple ? doClickStreamTracking({ isRecomTuple, shortlist, projectUnitId, categoryPageName}) : doClickStreamTracking({ isRecomTuple, shortlist, PROP_ID, categoryPageName });
    }, [shortlist])

    return (
        <div data-label="SHORTLIST" className={styles.shortlistBtnWrap} onClick={handleShortlist}>
            <img className={styles.shortlistImage} alt='Shortlist-Button' src={shortlist ? `https://static.99acres.com/universalapp/img/Shortlisted.png` : `https://static.99acres.com/universalapp/img/Shortlist.png`} />
        </div>
    )
}

export default ShortlistBtn;
