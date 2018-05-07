import {Store} from '../store/store';

export const initialState: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [],
        currentOrganization: {
            name: 'Global',
            id: '0',
            is_global_organization: true
        },
        organizations: []
    }
  };
  