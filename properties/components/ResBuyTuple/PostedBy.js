import React from 'react';
import FeatureDealerDetail from "./FeatureDealerDetail";
import OwnerDealerDetail from "./OwnerDealerDetail";

const PostedBy = (props) => {

    const {
        FD
    } = props;    

    return (
        <>
            {
                FD == 'Y' ? <FeatureDealerDetail /> : <OwnerDealerDetail />
            }
        </>
    );
}

export default PostedBy;