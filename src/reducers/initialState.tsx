import {Store} from '../store/store';

export const initialState: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: []
    }
  };
  