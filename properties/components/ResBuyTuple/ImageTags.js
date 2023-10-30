import React, { useCallback, useContext, useMemo, useEffect } from 'react'
import { connect } from 'react-redux';
// import Tag from './Tag';
import { srpContext } from '99shared/src/components/pages/Srp/components/TupleRevampRN/srpContext.js';
import styles from './imgItems.scss';
import { Context } from './TupleContext';
import { STATIC_PATH } from '../../../../config/config';

const ImageTags = ({
    seenPropertiesAndProjects,
    contactedSpids,
    isInvestTuple = false
}) => {
    const [context, setContext] = useContext(isInvestTuple ? srpContext : Context)
    const {
        property: {
            SPID,
            PROP_ID,
            projectUnitId,
            PRIMARY_TAGS = [],
            SECONDARY_TAGS = [],
            tags = [],
            formatted: {
                isVerified,
            } = {},
            reraDisplayTag = '',
            PRELEASED_TAGS = [],
        } = {},
        isPseudoTuple,
    } = context

    let isFeatured = PRIMARY_TAGS?.includes('Featured');
    let isRera = SECONDARY_TAGS.length ? SECONDARY_TAGS?.includes('RERA') : reraDisplayTag == 'RERA';
    let isReraAndHera = reraDisplayTag == 'RERA | HIRA';
    let isSeenProperty = useMemo(() => seenPropertiesAndProjects?.includes(isPseudoTuple ? projectUnitId : PROP_ID), [seenPropertiesAndProjects])
    let isNoBrokerage = tags.length ? tags.find(tag => tag.id == "NO_BROKERAGE") : false;
    let is3d = tags.length ? tags.find(tag => tag.id == "FLOORPLANS_3D") : false;
    let isContacted = useMemo(() => contactedSpids?.includes(SPID), [contactedSpids])
    let isPreleased = PRELEASED_TAGS?.includes("Pre Leased");

    return (
        <>
            <div>
                {isVerified ? <img alt='Verified-Tag' style={{ width: '72px', height: '20px' }} className={styles.tag} src={`${STATIC_PATH}/Verified.png`} /> : null}
                {isFeatured ? <img alt='Featured-Tag' style={{ width: '63px', height: '20px' }} height={20} width={63} className={styles.tag} src={`${STATIC_PATH}/Featured.png`} /> : null}
                {isPseudoTuple && isRera && !isReraAndHera ? <img alt='Rera-Tag' style={{ width: '52px', height: '20px' }} className={styles.tag} src={`${STATIC_PATH}/rera.png`} /> : null}
                {isReraAndHera ? <img alt='Rera-Tag' style={{ width: '70px', height: '20px' }} className={styles.tag} src={`${STATIC_PATH}/reraHera.png`} /> : null}
                {isPseudoTuple && isNoBrokerage ? <img alt='No-Brokerage-Tag' style={{ width: '91px', height: '20px' }} className={styles.tag} src={`${STATIC_PATH}/NBZ.png`} /> : null}
                {isPseudoTuple && is3d ? <img alt='3D-Tag' style={{ width: '44px', height: '20px' }} className={styles.tag} src={`${STATIC_PATH}/d3.png`} /> : null}
                {isPreleased ? <img alt='isPreleased' style={{ width: '70px', height: '20px' }} className={styles.tag} src={`${STATIC_PATH}/preleased.png`} /> : null}
            </div>
            {isSeenProperty ? <div className={styles.tag}><img alt='Seen-Tag' style={{ width: '37px', height: '20px' }} src={`${STATIC_PATH}/Activity.png`} /></div> : null}
            {isContacted ? <div className={styles.tag}><img alt='Contacted-Tag' style={{ width: '73px', height: '20px' }} src={`${STATIC_PATH}/contacted.png`} /></div> : null}
        </>

    )
}

const mstp = (state) => ({
    seenPropertiesAndProjects: state.InvestReducer ? state.InvestReducer?.seenPropertiesAndProjects : state.srp.seenPropertiesAndProjects,
    contactedSpids: state.InvestReducer ? state.InvestReducer?.contactedSpids : (state.srp || {}).contactedSpids,
})

export default connect(mstp, null)(ImageTags);
