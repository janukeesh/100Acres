import React, {useCallback, useContext } from 'react';
import { connect } from "react-redux";
import { Context } from "./TupleContext";
import withStore from '../../../HOC/StoreConsumer';
import styles from './resBuy.scss';

const EoiButtons = (props) => {

    const [context, setContext] = useContext(Context);

    const {
        property,
        property: {
            formatted: {
                customInfo,
            } = {},
            CLASS = '',
            CLASS_LABEL = ''
        } = {},
        isRecomTuple,
        isVspTuple,
        filters: {
            city,
            res_com = 'R',
            preference = 'S',
        } = {},
        isBOSSPackNotActivated,
    } = context;

    const {
        store,
        openBocLayer
    } = props;

    const eoiClickHandler = useCallback((e, isCallBtn, options = {}) => {
        e.stopPropagation();
        e.preventDefault();
        store.dispatch({ type: 'SET_STORE_DATA', data: { isFullPageLoader: true } })

        Promise.all([
            import(/* webpackChunkName: "mTupleEoiCta" */ '../MobileSrpTuppleWrapper/tuple.cta')
        ]).then(result => {
            result[0].eoiClickHandler(property, store, {
                isCallBtnClicked: isCallBtn,
                isChatOption: options.isChatOption,
                isRecomTuple: isRecomTuple,
                isVspTuple: isVspTuple,
                res_com,
                preference,
                isReqPhotos: options.isReqPhotos,
            })
        });
    }, [])

    const handleWhatsappEoiClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        eoiClickHandler(e, false, { isChatOption: true });
        openBocLayer();
    },[])

    const handleCallMsgEoiClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        eoiClickHandler(e, true)
        openBocLayer();
    },[])

    const whatsappClickHandler = useCallback(e => eoiClickHandler(e, false, { isChatOption: true }), []);
    const callMsgHandler = useCallback(e => eoiClickHandler(e, true), []);
    // const reqPhotoHandler = useCallback(e => eoiClickHandler(e, false, { isReqPhotos: true }), []);

    return (
        <>
            <div className={styles.eoiItemsWrap}>
                <button
                    className={`${styles.eoiItem} ${styles.viewNumber} ${isBOSSPackNotActivated && (CLASS == 'O' || CLASS_LABEL == 'Owner') ? styles.imgGrey : ''}`}
                    onClick={eoiClickHandler}
                    data-label={isBOSSPackNotActivated && (CLASS == 'O' || CLASS_LABEL == 'Owner') ? "BOSS_EOI_PHONE" : "PHONE"}
                    data-custominfo={customInfo}
                    disabled={isBOSSPackNotActivated && (CLASS == 'O' || CLASS_LABEL == 'Owner')}
                >
                    View number
                </button>
                <img
                    data-label={isBOSSPackNotActivated && (CLASS == 'O' || CLASS_LABEL == 'Owner') ? "BOSS_CHAT_NOW" : "CHAT_NOW"}
                    data-custominfo={customInfo}
                    alt='Whatsapp-Icon'
                    src={`https://static.99acres.com/universalapp/img/whatsappNew.svg`}
                    onClick={isBOSSPackNotActivated && (CLASS == 'O' || CLASS_LABEL == 'Owner') ? handleWhatsappEoiClick : whatsappClickHandler}
                />
                <img
                    data-label={isBOSSPackNotActivated && (CLASS == 'O' || CLASS_LABEL == 'Owner') ? "BOSS_CONTACT" : "CONTACT"}
                    data-custominfo={customInfo}
                    alt='Call-Icon'
                    src={`https://static.99acres.com/universalapp/img/callNew.svg`}
                    onClick={isBOSSPackNotActivated && (CLASS == 'O' || CLASS_LABEL == 'Owner') ? handleCallMsgEoiClick : callMsgHandler}
                />
            </div>
        </>
    );
}

const mdtp = dispatch => ({
    openBocLayer: () => dispatch({ type: 'UPDATE_BOC_OVERLAY', data: { visibility: !0 }})
})

export default withStore(connect(null, mdtp)(EoiButtons));