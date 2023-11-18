import {
	Avatar,
	Button,
	Card,
	Column,
	DataTable,
	Dropdown,
	InputText,
	Password,
	PrimeVue,
	Toolbar,
	Tooltip,
	Sidebar,
} from './components';

export default function regPrimeVue(app) {
	app.use(PrimeVue, { ripple: true });
	app.directive('PTooltip', Tooltip);
	app.component('PInputText', InputText);
	app.component('PButton', Button);
	app.component('PCard', Card);
	app.component('PToolbar', Toolbar);
	app.component('PAvatar', Avatar);
	app.component('PDataTable', DataTable);
	app.component('PColumn', Column);
	app.component('PDropdown', Dropdown);
	app.component('PPassword', Password);
	app.component('PSidebar', Sidebar);
}
