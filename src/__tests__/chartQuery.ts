import {generateDates} from '../utils';

describe('Generating dates',() => {
    it('works', () => {
        const {unixTimestamps, plotlyTimestamps} = generateDates(6)
        console.log(unixTimestamps)
        console.log(plotlyTimestamps)
        expect(unixTimestamps).toHaveLength(6)
        expect(plotlyTimestamps).toHaveLength(6)
    })
})
