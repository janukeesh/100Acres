import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {pageList} from '../redux/store/actions/user';

const PageList = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    return (
        <div>
           <button style={{height: '20px', width: '30px'}} onClick={()=>dispatch(pageList())}>hihihihi</button>
        </div>
    )
}

export default PageList;