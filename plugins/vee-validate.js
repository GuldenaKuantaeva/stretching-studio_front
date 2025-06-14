import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email, min, confirmed, is, length} from 'vee-validate/dist/rules'

Vue.defineComponent('ValidationObserver', ValidationObserver)
Vue.defineComponent('ValidationProvider', ValidationProvider)

extend('required', {
    ...required,
    message: 'Обязательное поле'
})

extend('email', {
    ...email,
    message: 'Укажите корректный email'
})

extend('confirmed', {
    ...confirmed,
    message: 'Пароли должны совпадать'
})

extend('min', {
    ...min,
    message: 'Поле должно иметь длину как минимум {length}'
})