import { SkinSpriteName } from "@sonolus/core";

export const skin = defineSkin({
  sprites: {
    //snake 🐍
    head: SkinSpriteName.NoteHeadNeutral,
    headDead: SkinSpriteName.NoteHeadRed,
    headSmile: SkinSpriteName.NoteHeadGreen,
    shadow: SkinSpriteName.NoteHeadBlue,
    eyelid: SkinSpriteName.Lane,

    bodyLight: SkinSpriteName.NoteTickNeutral,
    bodyDark: SkinSpriteName.NoteTickGreen,
    //fruit 🍓
    apple: SkinSpriteName.NoteTailRed,
    lemon: SkinSpriteName.NoteTailYellow,
    //grid 
    grid: SkinSpriteName.GridNeutral,
    border: SkinSpriteName.GridBlue,
    borderDanger: SkinSpriteName.GridRed,
    //points
    plusOne: SkinSpriteName.NoteConnectionNeutral,
    plusTwo: SkinSpriteName.NoteConnectionYellow,
    plusFour: SkinSpriteName.NoteConnectionGreen,
    //dpad
    button: SkinSpriteName.NoteConnectionBlueSeamless,
  },
}) 
