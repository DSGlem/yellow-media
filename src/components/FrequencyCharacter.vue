<template>
    <div>
        <label>
            <input type="text" v-model="testStr" />
        </label>
        <p>
            <span>
                {{ getNoteText }}
            </span>
            <b v-show="getTheMostFrequentCharacter"
                >{{ getTheMostFrequentCharacter }}
            </b>
        </p>
    </div>
</template>
<script>
import { getFreqncyCharacters, sortFromHigh } from '@/helpers';
export default {
    data() {
        return {
            testStr: '',
        };
    },
    computed: {
        getNoteText() {
            return this.getTheMostFrequentCharacter
                ? 'the most frequent character'
                : 'input is empty';
        },
        getTheMostFrequentCharacter() {
            const result = sortFromHigh(
                Object.entries(getFreqncyCharacters(this.testStr))
            )[0];

            return result ? `${result[0]}: ${result[1]}` : 0;
        },
    },
};
</script>
