import React, { useCallback, useContext, useEffect } from 'react';
// import { connect } from 'react-redux';
import ShortlistBtn from './ShortlistBtn';
import Fomo from './Fomo';
import styles from './resBuy.scss';
import ImageTags from './ImageTags';
import { Context } from './TupleContext';

const ImageItems = ({
    caraousalImages,
    imgCount=0,
}) => {

    const [context, setContext] = useContext(Context);
    const {
        index,
        property: {
            PROPERTY_IMAGES = [],
            FOMO = {},
            projectUnitId = '',
            rescom = 'R',
            possessionStatus = {},
            formatted: {
                isPremium,
                isPhotoUnderScreening,
            }
        } = {},
        isPseudoTuple = false,
        // indexCarousal = 0,
    } = context;

    return (
        <>
            <div className={styles.topLeftItems}>
                <ImageTags />
            </div>
            <div className={styles.topRightItems}>
                <ShortlistBtn />
            </div>
            <div className={`${styles.bottom} ${(!Object.keys(FOMO).length && !Object.keys(possessionStatus).length) || (!isPremium && !isPseudoTuple) ? styles.noFomoBottom : ''}`}>

                <div className={styles.fomoOuter}>
                    {isPremium || isPseudoTuple ? <Fomo /> : null}
                </div>

                {!isPhotoUnderScreening && PROPERTY_IMAGES.length > 1 || caraousalImages && caraousalImages.length > 1 ?
                    <div className={`${styles.imgCount} ${(!Object.keys(FOMO).length && !Object.keys(possessionStatus).length) || (!isPseudoTuple && !isPremium) ? styles.noFomoCount : ''}`}>
                        {imgCount + 1}/{!isPseudoTuple ? PROPERTY_IMAGES.length : caraousalImages.length}
                    </div>
                    : null
                }
            </div>
        </>
    )
}

// const mstp = (state) => ({
//     // projectTuplesIds: state.srp.pageData.projectTuplesIds,
// })

export default ImageItems;
