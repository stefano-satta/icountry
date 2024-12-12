import {reactive, toRaw} from "vue";
import {Country} from "../types";


export const store = {
    state: reactive({
        country: {} as Country,
    }),
    actions: {
        setCountry(country: Country) {
            return store.state.country = country;
        }
    },
    getters: {
        getCountry(): Country {
            return toRaw(store.state.country);
        }
    }
}