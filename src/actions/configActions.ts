import {ActionTypes} from "../constants/actionTypes";
import * as ConfigService from "../services/configService";

export const getManufacturers = () => async (dispatch:any) => {
    const manufacturers = await ConfigService.getManufacturers();

    dispatch({
        type: ActionTypes.GET_MANUFACTURERS,
        manufacturers: manufacturers
    });
};