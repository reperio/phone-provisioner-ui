import {Store} from '../store/store';

export const initialState: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [],
        currentOrganization: {
            name: 'Global',
            id: '0',
            global: true
        },
        //TODO: load from db
        organizations: [
            {
                name: 'Global',
                id: '0',
                global: true
            },
            {
                name: 'Test',
                id: '1',
                global: false
            }
        ],
        defaultOptions: {}
    }
  };
  