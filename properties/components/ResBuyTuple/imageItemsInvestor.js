import React, { useCallback, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import ShortlistBtn from './ShortlistBtn';
import Fomo from './Fomo';
import styles from './resBuy.scss';
import ImageTags from './ImageTags';
import { srpContext } from '99shared/src/components/pages/Srp/components/TupleRevampRN/srpContext';

const ImageItems = ({
    caraousalImages,
    imgCount,
}) => {

    const [context, setContext] = useContext(srpContext);
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
                <ImageTags isInvestTuple={true} />
            </div>
            <div className={styles.topRightItems}>
                <ShortlistBtn isInvestTuple={true} />
            </div>
            <div className={`${styles.bottom} ${(!Object.keys(FOMO).length && !Object.keys(possessionStatus).length) || (!isPremium && !isPseudoTuple) ? styles.noFomoBottom : ''}`}>

                <div className={styles.fomoOuter}>
                    {isPremium || isPseudoTuple ? <Fomo isInvestTuple={true} /> : null}
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
