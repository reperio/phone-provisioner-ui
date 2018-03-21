import {Store} from '../store/store';

export const initialState: Store = {
    test: {
        message1: '',
        message2: '',
        message3: '',
        message4: '',
        message5: '',
        message6: '',
        message7: '',
        message8: '',
        testMessage: '',
        testAsyncMessage: '',
    },
    note: {
        test: '',
        noteToAdd: '',
        noteList: ['first note', 'second note']
    },
    configurationSettings: {
        anyUnsavedChanges: false,
        currentlyEditing: null,
        allConfigs: []
    }
  };
  