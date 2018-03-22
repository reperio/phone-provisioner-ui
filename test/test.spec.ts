import * as assert from 'assert'; //import doesn't work in tests because of the module in tsconfig
import reducer from '../src/reducers';
import {Store} from '../src/store/store';
import {ActionTypes} from "../src/constants/actionTypes";

const initialState: Store = {
    test: null,
    note: null,
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: []
    }
}

describe('The Redux store', () => {
    it('should return 4 for 2 + 2.', () => {
        const newState = reducer(initialState, {
            type: ActionTypes.GET_MANUFACTURERS,
            manufacturers: []
        });

        const expectedState = Object.assign({}, initialState);

        assert.equal(newState, expectedState);
    });
});