import { PrimeVue, InputText, Button, Card, Toolbar, Avatar } from './components'

export default function regPrimeVue(app) {
    app.use(PrimeVue, { ripple: true })
    app.component('PInputText', InputText)
    app.component('PButton', Button)
    app.component('PCard', Card)
    app.component('PToolbar', Toolbar)
    app.component('PAvatar', Avatar)
}
