import React, { useCallback, useContext } from 'react';
import style from './resBuy.scss';
import { connect } from 'react-redux';
import ImageContainer from './ImageContainer';
import TupleContent from './TupleContent';
import { updateSeenPropertiesMobile } from '../MobileSrpTuppleWrapper/actions.tuple';
import { makeUrlForXid } from '../../../../pages/searchPg/mobile/util.srp.page';
import { Context } from './TupleContext';
import { API_URL } from '../../../../config/config';

const TupleCard = ({ updateSeenProps, setWidgetsData, openBocLayer, vspId }) => {
  const [context, setContext] = useContext(Context);

  const {
    index,
    property: {
      SPID,
      PROP_ID,
      PROP_DETAILS_URL,
      IS_FSL,
      formatted: { rank, recomCustomInfo, customInfo, isPremium },
      eoi,
      CLASS = '',
      CLASS_LABEL = '',
    } = {},
    filters,
    isVspTuple,
    isRecomTuple,
    properties,
    isBOSSPackNotActivated,
    recommendation,
    vsp_ab,
  } = context;
  const dataLabel = isVspTuple
    ? 'COLLABPROP.TUPLE'
    : (IS_FSL === 'Y' ? 'FSL_' : isRecomTuple ? 'RECOM_' : '') + `TUPLE.${index + 1}`;
  const tupleClickHandler = useCallback(() => {
    if (vsp_ab) {
      sessionStorage.setItem(
        'VSP_ID',
        JSON.stringify({ propid: PROP_ID, index: index, isPD: true })
      );
      Promise.all([
        import(
          /* webpackChunkName: "msiteCookDataForPD" */'../MobileSrpTuppleWrapper/utils/cookDataForPD'
        )
      ]).then(res => {
        const param = res[0].cookDataForPD(PROP_ID, properties);
        fetch(
          `${API_URL}/api-aggregator/recom/vsp?${param}platform=msite&moduleName=msite_SRP&pageName=SRP&type=recom&algoType=COLLABORATIVE_PROPERTY`
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            if (data?.recommedations[0]?.prop_details?.length > 1)
              setWidgetsData({ vspData: data.recommedations[0].prop_details });
            else setWidgetsData({ vspData: [] });
          })
          .finally(() => {
            updateSeenPropertiesMobile(PROP_ID)();
            setTimeout(() => {
              updateSeenProps(PROP_ID);
            }, 1000);
            const params = makeUrlForXid(filters);
            // setCookieData('tuple_seen', JSON.stringify(true));
            // setCookieData('widget_seen', widgetSeen)
            const url = `/${PROP_DETAILS_URL}?${params.join('&')}`;
            window.location.href = url;
          });
    })
    }
    else{
      updateSeenPropertiesMobile(PROP_ID)();
      setTimeout(() => {
          updateSeenProps(PROP_ID);
      }, 1000);
      const params = makeUrlForXid(filters);
      // setCookieData('tuple_seen', JSON.stringify(true));
      // setCookieData('widget_seen', widgetSeen)
      const url = `/${PROP_DETAILS_URL}?${params.join('&')}`;
      window.location.href = url;

    }
  }, []);

  const handleEoiClick = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    openBocLayer();
  },[]);

  let customInfoVsp = {};
  if (isVspTuple && recommendation) {
    recommendation['selected_entity'] = [
      { id: SPID, rank: index + 1, res_com: recommendation?.res_com },
    ];
    customInfoVsp = JSON.stringify({ payload: { recommendation } });
  }
  return (
    <div
      className={vspId == PROP_ID ? style.condOuterTupleWrap : style.outerTupleWrap}
      onClick={tupleClickHandler}
      id={PROP_ID}
      data-propid={PROP_ID}
      data-rank={rank}
      data-label={dataLabel}
      topmost={'true'}
      data-attribute={IS_FSL === 'Y' ? 'FSL' : ''}
      data-custominfo={isVspTuple ? customInfoVsp : isRecomTuple ? recomCustomInfo : customInfo}
      data-premium={isPremium}
    >
      <div className={style.tupleWrap}>
        <ImageContainer />
        <TupleContent handleEoiClick={handleEoiClick} />
      </div>
    </div>
  );
};

const mdtp = dispatch => ({
  updateSeenProps: data => dispatch({ type: 'UPDATE_SEEN_PROPS', data }),
  setWidgetsData(data) {
    dispatch({
      type: 'SET_STORE_DATA',
      data: data,
    });
  },
  openBocLayer: () => dispatch({ type: 'UPDATE_BOC_OVERLAY', data: { visibility: !0 } }),
});

export default connect(null, mdtp)(TupleCard);
