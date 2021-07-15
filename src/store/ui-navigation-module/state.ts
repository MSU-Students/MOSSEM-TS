export interface UiNavStateInterface {
  ShowDanceDialog: boolean,
  ShowInstrumentDialog: boolean,
  ShowPictureDialog: boolean,
  ShowSongDialog: boolean
}

function state(): UiNavStateInterface {
  return {
    ShowDanceDialog: false,
    ShowInstrumentDialog: false,
    ShowPictureDialog: false,
    ShowSongDialog: false
  };
}

export default state;
