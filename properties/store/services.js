import axios from 'axios';
import * as actions from './actions';

export const fetchSearchedProperties = () => async dispatch => {
  try {
    const {data} = await axios.get(
      'https://www.99acres.com/api-aggregator/srp/search?platform=DESKTOP&city=7&preference=S&area_unit=1&res_com=R&search_type=QS&page_size=25&moduleName=GRAILS_SRP&workflow=GRAILS_SRP&groupByConfigurations=true&isGoogleBot=false&recomGroupType=VSP&pageName=SRP&isFirstLoad=true',
    );

    console.log(data.properties, 'data');
    return dispatch(actions.fetchSearchedProperties(data.properties));
  } catch (error) {
    console.log(error);
  }
};
