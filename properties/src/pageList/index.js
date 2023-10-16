import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pageList } from '../redux/store/actions/user';
import './pageList.scss'

const PageList = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user);

    const [temp, setTemp] = useState([])

    const tempFunc = async () => {
         dispatch(pageList())
    }

    useEffect(() => {
        setTemp(user);
    }, [user])



    return (
        <div className='parentDiv'>
            <button className='pageButton' onClick={tempFunc}>Redux</button>
            <div>
                { 
                  temp.map((el, index) => {
                        return <div key={index}>{el.employee_name}</div>
                    })
                }
            </div>
        </div>
    )
}

export default PageList;