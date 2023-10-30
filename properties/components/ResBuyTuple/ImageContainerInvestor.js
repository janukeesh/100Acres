import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './resBuy.scss';
import { connect } from 'react-redux';
import LazyImage from '../SrpTuple/LazyImage';
import ImageItemsInvestor from './imageItemsInvestor';
import { srpContext } from '99shared/src/components/pages/Srp/components/TupleRevampRN/srpContext';
// import noImage from '../../../../assets/images/noImageBg.svg';  //confirm on image part 10kb vs 22kb
import { preloadTupleCount } from '../SrpTuple/constants';
import asyncComponent from '../../../HOC/asyncComponent';
// import CarousalRevamp from '../MobileTupple/CarousalRevamp/CarousalRevamp';
const AsyncCarousalRevamp = asyncComponent(() => import(/*webpackChunkName: "mSrpCarousel"*/ '../MobileTupple/CarousalRevamp/CarousalRevamp'));
import withStore from '../../../HOC/StoreConsumer/withStore';

import { STATIC_PATH } from '../../../../config/config';

const PREMIMUM_UNDER_SCREEN_IMG = `https://static.99acres.com/universalapp/img/UnderScreeningPremium.svg`;
const UNDER_SCREEN_IMG = `https://static.99acres.com/universalapp/img/UnderScreening.svg`;
const PREMIUM_NO_IMG = `https://static.99acres.com/universalapp/img/noImageBgPremium.svg`;
const NO_IMG = `https://static.99acres.com/universalapp/img/noImageBg.svg`;
const NO_IMG_PSEUDO = `https://static.99acres.com/universalapp/img/noImagePseudo.svg`

const ImageContainer = props => {

    const [context, setContext] = useContext(srpContext);
    const [imgCount, setimgCount] = useState(0);

    const {
        index,
        property = {},
        property: {
            projectUnitId,
            PROPERTY_IMAGES = [],
            coverImage,
            formatted: {
                isPremium = true,
                imageSource,
                isPhotoUnderScreening,
            } = {},
            PHOTO_URL = '',
        } = {},
        isPseudoTuple = false,
        showNpsrpWidget,
        isRecomTuple,
        isVspTuple,
        filters: {
            city,
            res_com = 'R',
            preference = 'S',
        } = {},
        isInvestTuple=false,
        categoryPageName
    } = context;

    const {
        store,
        projectTuplesIds = {},
        isLighthouse,
    } = props

    let carousalImages = [];
    let underScreening = isPhotoUnderScreening ? isPhotoUnderScreening : PHOTO_URL.includes('under_screening_image');

    if (isPseudoTuple) {
        const projectId = 'C' + "" + projectUnitId;
        carousalImages = projectTuplesIds[projectId];
    }

    const [showCarousel, setShowCarousel] = useState(false);

    useEffect(() => {
        if (!isLighthouse) setTimeout(() => {
            setShowCarousel(true);
        }, 3000);
    }, [])

    const eoiClickHandler = useCallback((e, isCallBtn, options = {}) => {
        e.stopPropagation();
        e.preventDefault();
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
                isInvestTuple,
                categoryPageName 
            })
        });
    }, [])

    const reqPhotoHandler = useCallback(e => eoiClickHandler(e, false, { isReqPhotos: true }), []);

    const onImageClick = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();
        reqPhotoHandler(e);
    }, [])

    const isMultipleImages = ((PROPERTY_IMAGES && PROPERTY_IMAGES.length > 1) || (carousalImages && carousalImages.length > 1)) && (isPremium || isPseudoTuple) && !underScreening;
    const isPreloadedTuple = index < preloadTupleCount;

    return (
        <div className={`${styles.imgWrap} ${isPremium || isPseudoTuple ? styles.premium : ''}`}>
            <ImageItemsInvestor caraousalImages={carousalImages} imgCount={imgCount} />
            <div className={styles.imageContainer}>
                {imageSource.includes('noImage') ? <span data-label="REQ_PHOTOS" className={styles.photoCTA} onClick={onImageClick}></span> : null}
                {
                    isMultipleImages
                        ? showCarousel
                            ? <AsyncCarousalRevamp carousalImages={carousalImages} isInvestTuple={isInvestTuple} setimgCount={setimgCount} />
                            : isPreloadedTuple
                                ? <img
                                    src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                    style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                    alt={!isPseudoTuple ? PROPERTY_IMAGES.length ? 'PROPERTY-IMAGE' : underScreening ? 'IMAGE-UNDER-SCREENING' : !imageSource.includes('noImage') ? 'PROPERTY-IMAGE' : 'NO-IMAGE' : 'PROJECT-IMAGE'}
                                    className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                                />
                                : <LazyImage decoding='async'
                                    src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                    style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                    className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                                    alt='Tuple-Images'
                                    placeholder={isPremium ? PREMIUM_NO_IMG : NO_IMG}
                                    noBackground={true}
                                />
                        : isPreloadedTuple
                            ? <img
                                src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                alt={!isPseudoTuple ? PROPERTY_IMAGES.length ? 'PROPERTY-IMAGE' : underScreening ? 'IMAGE-UNDER-SCREENING' : !imageSource.includes('noImage') ? 'PROPERTY-IMAGE' : 'NO-IMAGE' : 'PROJECT-IMAGE'}
                                className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                            />
                            : <LazyImage decoding='async'
                                src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                                alt='Tuple-Images'
                                placeholder={isPremium ? PREMIUM_NO_IMG : NO_IMG}
                                noBackground={true}
                            />
                }
            </div>
        </div>
    )

}

const mstp = state => ({
    projectTuplesIds: state?.InvestReducer?.projectTuplesIds,
    isLighthouse: state.global.isLighthouse,
});

export default withStore(connect(mstp)(ImageContainer));
