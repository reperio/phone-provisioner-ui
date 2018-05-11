import {Store} from '../store/store';
import {OrganizationType} from "../constants/organizationType";

export const initialState: Store = {
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: [],
        currentOrganization: {
            name: 'Global',
            id: '0',
            type: OrganizationType.GLOBAL
        },
        organizations: []
    }
  };
  