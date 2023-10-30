import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './resBuy.scss';
import { connect } from 'react-redux';
import LazyImage from '../SrpTuple/LazyImage';
import ImageItems from './ImageItems';
import { Context } from './TupleContext';
// import noImage from '../../../../assets/images/noImageBg.svg';  //confirm on image part 10kb vs 22kb
import { preloadTupleCount } from '../SrpTuple/constants';
import asyncComponent from '../../../HOC/asyncComponent';
// import CarousalRevamp from '../MobileTupple/CarousalRevamp/CarousalRevamp';
const AsyncCarousalRevamp = asyncComponent(() => import(/*webpackChunkName: "mSrpCarousel"*/ '../MobileTupple/CarousalRevamp/CarousalRevamp'));
import withStore from '../../../HOC/StoreConsumer/withStore';

import { STATIC_PATH } from '../../../../config/config';

const PREMIMUM_UNDER_SCREEN_IMG = `${STATIC_PATH}/UnderScreeningPremium.svg`;
const UNDER_SCREEN_IMG = `${STATIC_PATH}/UnderScreening.svg`;
const PREMIUM_NO_IMG = `${STATIC_PATH}/noImageBgPremium.svg`;
const NO_IMG = `${STATIC_PATH}/noImageBg.svg`;
const NO_IMG_PSEUDO = `${STATIC_PATH}/noImagePseudo.svg`

const ImageContainer = props => {

    const [context, setContext] = useContext(Context);

    const {
        index,
        property = {},
        property: {
            projectUnitId,
            PROPERTY_IMAGES = [],
            coverImage,
            formatted: {
                isPremium,
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
        } = {}
    } = context;

    const {
        store,
        projectTuplesIds = {},
        isLighthouse,
    } = props

    let carousalImages = [];
    let underScreening = isPhotoUnderScreening ? isPhotoUnderScreening : PHOTO_URL.includes('under_screening_image');

    if (isPseudoTuple) {
        const projectId = 'R' + "" + projectUnitId;
        carousalImages = projectTuplesIds[projectId];
    }

    const [showCarousel, setShowCarousel] = useState(false);
    const [imgCount, setimgCount] = useState(0);

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
            <ImageItems caraousalImages={carousalImages} imgCount={imgCount} />
            <div className={styles.imageContainer}>
                {imageSource.includes('noImage') ? <span data-label="REQ_PHOTOS" className={styles.photoCTA} onClick={onImageClick}></span> : null}
                {
                    isMultipleImages
                        ? showCarousel
                            ? <AsyncCarousalRevamp carousalImages={carousalImages} setimgCount={setimgCount} />
                            : isPreloadedTuple
                                ? <img
                                    src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : imageSource.includes('noImage') ? NO_IMG_PSEUDO : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                    style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                    alt={!isPseudoTuple ? PROPERTY_IMAGES.length ? 'PROPERTY-IMAGE' : underScreening ? 'IMAGE-UNDER-SCREENING' : !imageSource.includes('noImage') ? 'PROPERTY-IMAGE' : 'NO-IMAGE' : 'PROJECT-IMAGE'}
                                    className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                                    fetchpriority="high"
                                    decoding='async'
                                    loading='lazy'
                                />
                                : <LazyImage decoding='async'
                                    src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : imageSource.includes('noImage') ? NO_IMG_PSEUDO : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                    style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                    className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                                    alt='Tuple-Images'
                                    placeholder={isPremium ? PREMIUM_NO_IMG : NO_IMG}
                                    noBackground={true}
                                    loading='lazy'
                                />
                        : isPreloadedTuple
                            ? <img
                                src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : imageSource.includes('noImage') ? NO_IMG_PSEUDO : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                alt={!isPseudoTuple ? PROPERTY_IMAGES.length ? 'PROPERTY-IMAGE' : underScreening ? 'IMAGE-UNDER-SCREENING' : !imageSource.includes('noImage') ? 'PROPERTY-IMAGE' : 'NO-IMAGE' : 'PROJECT-IMAGE'}
                                className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                                fetchpriority="high"
                                decoding='async'
                            />
                            : <LazyImage decoding='async'
                                src={!isPseudoTuple ? underScreening ? isPremium ? PREMIMUM_UNDER_SCREEN_IMG : UNDER_SCREEN_IMG : PROPERTY_IMAGES.length ? PROPERTY_IMAGES[0] : !imageSource.includes('noImage') ? imageSource : isPremium ? PREMIUM_NO_IMG : NO_IMG : imageSource.includes('noImage') ? NO_IMG_PSEUDO : coverImage && coverImage.url ? coverImage.url : NO_IMG_PSEUDO}
                                style={{ objectFit: "cover", width: '100%', height: "100%" }}
                                className={`${imageSource.includes('noImage') ? `reqPhotoImg ${styles.noImageBg}` : ''}`}
                                alt='Tuple-Images'
                                placeholder={isPremium ? PREMIUM_NO_IMG : NO_IMG}
                                noBackground={true}
                                loading='lazy'
                            />
                }
            </div>
        </div>
    )

}

const mstp = state => ({
    projectTuplesIds: state.srp.pageData.projectTuplesIds,
    isLighthouse: state.global.isLighthouse,
});

export default withStore(connect(mstp)(ImageContainer));
