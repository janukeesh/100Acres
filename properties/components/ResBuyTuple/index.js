import React, { useCallback, useState } from 'react'
// import ReactDOM from "react-dom";
import TupleCard from './TupleCard';
import withHydrationOnDemand from '../../../../progressivehydration/withHydrationOnDemand';
import { Context } from "./TupleContext";

const ResBuyTuple = props => {

    const {
        index,
        property,
        filters,
        updateShortlistCount,
        isRecomTuple,
        isVspTuple,
        showNpsrpWidget,
        searchParams,
        vspId,
        count,
        isPD,
        XIDDetails=[],
        vspIndex,
        properties,
        isBOSSPackNotActivated,
        recommendation = recommendation ? JSON.parse(recommendation) : {},
        vsp_ab
        
        
    } = props;

    const [context, setContext] = useState({
        index,
        property,
        filters,
        updateShortlistCount,
        isRecomTuple,
        isVspTuple,
        showNpsrpWidget,
        searchParams,
        properties,
        vspIndex,
        count,
        isPD,
        XIDDetails,
        isBOSSPackNotActivated,
        recommendation,
        vsp_ab
    });
    

    return <Context.Provider value={[context, setContext]}>
        <TupleCard vspId={vspId}/>
    </Context.Provider>
}

export default withHydrationOnDemand({ on: [['visible'], ["scroll", () => document]] })(ResBuyTuple);
