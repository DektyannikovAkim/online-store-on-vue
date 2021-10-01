export const validateForm = {
    data() {
        return {
            patterns: {
                name: /^[a-zа-яё]+$/i,
                phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
                email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
            },
            errors: {
                name: 'Имя должно содержать только буквы',
                phone: 'Телефон подчиняется шаблону +7(000)000-0000',
                email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
            },
            inputValues: {
                name: '',
                phone: '',
                email: ''
            },
            validationResult: {
                name: true,
                phone: true,
                email: true
            },
            invalid: 0
        }
    },

    methods: {
        checkForm() {
            this.invalid = 0;
            for (let item in this.validationResult) {
                this.validationResult[item] = this.patterns[item].test(this.inputValues[item]);
                if (!this.validationResult[item]) {
                    this.invalid = ++this.invalid;
                }
            }

            if (this.invalid === 0) {
                console.log('Валидация прошла')
            }
        }
    },

    template: `
    <form class="feedback" @submit.prevent="checkForm">
                <div class="wrapper-for-input">
                    <label>
                    <span class="field-name">Имя:</span>
                    <input 
                    class="name"
                    :class="!validationResult.name ? 'incorrect' : ''"
                    type="text" 
                    name="name" 
                    v-model.trim="inputValues.name">
                    <div 
                    v-if="!validationResult.name"
                    class="error-msg">{{ errors.name }}</div>
                    </label>
                </div>

                <div class="wrapper-for-input">
                    <label>
                    <span class="field-name">Номер телефона:</span>
                    <input 
                    class="numb"
                    :class="!validationResult.phone ? 'incorrect' : ''"
                     type="tel" 
                     name="phone" 
                     v-model.trim="inputValues.phone">
                    <div
                    v-if="!validationResult.phone"
                    class="error-msg">{{ errors.phone }}</div>
                    </label>
                </div>

                <div class="wrapper-for-input">
                    <label>
                    <span class="field-name">E-mail:</span>
                    <input 
                    class="mail" 
                    :class="!validationResult.email ? 'incorrect' : ''"
                    type="email" 
                    name="email" 
                    v-model.trim="inputValues.email">
                    <div
                    v-if="!validationResult.email"
                    class="error-msg">{{ errors.email }}</div>
                    </label>
                </div>

                <div class="wrapper-for-input">
                    <label>
                    <span class="field-name">Текст обращения:</span>
                    <textarea class="appeal" name="appeal" cols="30" rows="10"></textarea>
                    </label>
                </div>

                <button class="send" type="submit">Send</button>
            </form>
    `
}