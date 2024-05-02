import { createStore } from 'redux'

let sequence = [];
const saveExArray = [];

const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case '0':
      return 'a'
    case '1':
      return 'b'
    case '2':
      return 'c'
    default:
      return state
  }
}

let store = createStore(counterReducer)

const locator = {
  location: [
    { id: 0, text: 'a'},
    { id: 1, text: 'b'},
    { id: 2, text: 'c'}
  ]
}

const spontaneousAlternations = sequence => {
    if (!sequence.length > 2) return 0;

    const step = 3;
    const lastStartItem = sequence.length - step;
    let alternationsNumber = 0;

    for (let i = 0; i <= lastStartItem; i++) {
        const uniqueTriplet = new Set();
        for (let j = 0; j < step; j++) uniqueTriplet.add(sequence[i + j]);
        if (uniqueTriplet.size === step) alternationsNumber++;
    }

    return alternationsNumber / (sequence.length - 2) 
};

const rowAdding = (sheet, worksheet) => {
    const trial = sheet.getCell("B5")
    const arena = sheet.getCell("B7")
    const trialName = trial?.value && Number(trial.value) + 1
    const arenaName = arena?.value && Number(arena.value) + 1
    const percent = spontaneousAlternations(sequence, saveExArray)
    worksheet.addRow({
        trial: trialName,
        arena: arenaName,
        sequence: sequence,
        percent: percent
    });


}

export const sheetAnalyser = (sheet, worksheet) => {
    const totalRowCount = sheet.lastRow.number

    for (let i = 36; i <= totalRowCount; i = i + 50) {
        const targetRow = []
        const st = sheet.getRow(i)
        for (let j = 10; j <= 12; j++) {
            const cell = st.getCell(j)
            targetRow.push(cell.value)            
        }

        targetRow.forEach((element, inx) => {
            if(!element) return

            if (store.getState() !== locator.location[inx].text) {
                store.dispatch({ type: [inx].toString() })
                return sequence.push(store.getState())
            }
        });
    }

    rowAdding(sheet, worksheet)
}
