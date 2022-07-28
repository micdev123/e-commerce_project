import { useContext, useEffect, useReducer} from "react";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../requestController";

import './css/widgetSm.css'
import { getError } from "../utils";
import { Store } from "../Store";


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default function WidgetSm() {
    const [{ loading, users, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await userRequest.get("users/?new=true", {
                    headers: { token: `Bearer ${userInfo.accessToken}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
                
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err),});
            }
        };
        getUsers();
    }, [userInfo]);
    // console.log(users);
  
  
    return (
        loading ? ( <p>Loading</p> ) : error ? ( <p className="danger">{error}</p>) : (
            <div className="widgetSm">
                <span className="widgetSmTitle">New Join Members</span>
                <ul className="widgetSmList">
                    {users.map((user) => (
                    <li className="widgetSmListItem" key={user._id}>
                        <img
                            src={
                                user.img ||
                                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                            }
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                    ))}
                </ul>
            </div>
        )
    );
}
