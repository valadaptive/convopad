import style from './style.scss';

import {Component, JSX} from 'preact';

import CommandBox from '../CommandBox/CommandBox';
import CharacterList from '../CharacterList/CharacterList';
import CharacterSettingsModal from '../CharacterSettingsModal/CharacterSettingsModal';
import ConvoList from '../ConvoList/ConvoList';
import ExportConvoModal from '../ExportConvoModal/ExportConvoModal';
import Messages from '../Messages/Messages';
import Modal from '../Modal/Modal';
import ProjectBar from '../ProjectBar/ProjectBar';
import ReplaceCharacterModal from '../ReplaceCharacterModal/ReplaceCharacterModal';

import setEditedCharacterID from '../../actions/set-edited-character-id';
import setToBeReplacedCharacterID from '../../actions/set-to-be-replaced-character-id';
import setExportedConvoID from '../../actions/set-exported-convo-id';

import {connect, InjectProps} from '../../util/store';

const connectedKeys = ['convos', 'currentConvoID', 'editedCharID', 'toBeReplacedCharID', 'exportedConvoID'] as const;
const connectedActions = {setEditedCharacterID, setToBeReplacedCharacterID, setExportedConvoID};
type Props = InjectProps<{}, typeof connectedKeys, typeof connectedActions>;

class App extends Component<Props> {
    constructor (props: Props) {
        super(props);

        this.closeCharacterSettings = this.closeCharacterSettings.bind(this);
        this.closeCharacterReplaceDialog = this.closeCharacterReplaceDialog.bind(this);
        this.closeExportConvoDialog = this.closeExportConvoDialog.bind(this);
    }

    closeCharacterSettings (): void {
        this.props.setEditedCharacterID(null);
    }

    closeCharacterReplaceDialog (): void {
        this.props.setToBeReplacedCharacterID(null);
    }

    closeExportConvoDialog (): void {
        this.props.setExportedConvoID(null);
    }

    render (): JSX.Element {
        const {convos, currentConvoID, editedCharID, toBeReplacedCharID, exportedConvoID} = this.props;
        return (
            <div className={style.app}>
                <div className={style.projectBarPane}>
                    <ProjectBar />
                </div>
                <div className={style.appPane}>
                    <div className={style.convosPane}>
                        <ConvoList />
                    </div>
                    <div className={style.messagesPane}>
                        <Messages convo={currentConvoID !== null ? convos[currentConvoID] : undefined} />
                        <div className={style.commandBoxPane}>
                            <CommandBox />
                        </div>
                    </div>
                    <div className={style.charactersPane}>
                        <CharacterList />
                    </div>
                </div>
                {editedCharID !== null ?
                    <Modal onClose={this.closeCharacterSettings}>
                        <CharacterSettingsModal />
                    </Modal> :
                    null}
                {toBeReplacedCharID !== null ?
                    <Modal onClose={this.closeCharacterReplaceDialog}>
                        <ReplaceCharacterModal />
                    </Modal> :
                    null}
                {exportedConvoID !== null ?
                    <Modal onClose={this.closeExportConvoDialog}>
                        <ExportConvoModal />
                    </Modal> :
                    null}
            </div>
        );
    }
}

export default connect(connectedKeys, connectedActions)(App);
