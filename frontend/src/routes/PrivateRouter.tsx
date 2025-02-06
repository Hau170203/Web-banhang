import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {  Outlet } from 'react-router';
import { NotFound } from '../pages/NotFound';

export const PrivateRouter = () => {
    const user = useSelector((state: RootState) => state.user);
    // console.log(user.isAdmin)
    
    return user.isAdmin ? (<Outlet/>) : (<NotFound />);
}
