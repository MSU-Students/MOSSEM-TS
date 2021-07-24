export interface UiNavStateInterface {
  ShowDanceDialog: boolean,
  ShowInstrumentDialog: boolean,
  ShowPictureDialog: boolean,
  ShowSongDialog: boolean,
  ShowEquipmentDialog: boolean
}

function state(): UiNavStateInterface {
  return {
    ShowDanceDialog: false,
    ShowInstrumentDialog: false,
    ShowPictureDialog: false,
    ShowSongDialog: false,
    ShowEquipmentDialog: false
  };
}

export default state;
