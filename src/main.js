import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import MenuBar from 'primevue/menubar'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Fieldset from 'primevue/fieldset';
import Password from 'primevue/password';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import axios from 'axios';
import Image from 'primevue/image';
import InputNumber from 'primevue/inputnumber';
import Breadcrumb from 'primevue/breadcrumb';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Toolbar from 'primevue/toolbar';
import SelectButton from 'primevue/selectbutton'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Steps from 'primevue/steps';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Panel from 'primevue/panel';
import RadioButton from 'primevue/radiobutton';
import Paginator from 'primevue/paginator';
import Menu from 'primevue/menu';
import Badge from 'primevue/badge';
import SplitButton from 'primevue/splitbutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Sidebar from 'primevue/sidebar';
import StyleClass from 'primevue/styleclass';
import Galleria from 'primevue/galleria';
import MegaMenu from 'primevue/megamenu';
import Rating from 'primevue/rating';
import AutoComplete from 'primevue/autocomplete';
import Listbox from 'primevue/listbox';
import Slider from 'primevue/slider';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';


 




// import Vue from 'vue'

// Vue.config.productionTip = false

import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

//Set token header
import setAuthHeader from './utils/setAuthHeader';


//Make Pinia data persistent on page refresh/reload
const pinia = createPinia();
pinia.use((context) =>{
    const storeId = context.store.$id
    const serilizer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }
    //Sync store from local storage
    const fromStorage = serilizer.deserialize(window.localStorage.getItem(storeId))
    // Listen to changes and update localstorage
    if(fromStorage){

        context.store.$patch(fromStorage)
    }
    context.store.$subscribe((mutation, state)=>{

        window.localStorage.setItem(storeId,serilizer.serialize(state))
    })
})



const app = createApp(App);
// app.provide('$axios', axios); 


app.config.globalProperties.axios=axios


// Global error handler
app.config.errorHandler = (err, instance, info) => {

    // Handle the error globally
    console.log("Global error:", err);
    console.log("Vue instance:", instance);
    console.log("Error info:", info);
  
    // Add code for UI notifications, reporting or other error handling logic
  };

  window.onerror = function (message, source, lineno, colno, error) {
    /// what you want to do with error here
    console.log(message)
  };

if(localStorage.jwtToken){
    setAuthHeader(localStorage.jwtToken);
}else{

    setAuthHeader(false)
}


app.component('MenuBar',MenuBar)
app.component('InputText',InputText)
app.component('Button',Button)
app.component('InputGroup',InputGroup)
app.component('InputGroupAddon',InputGroupAddon)
app.component('Fieldset',Fieldset)
app.component('Password',Password)
app.component('Toast',Toast)
app.component('Card',Card)
app.component('Image',Image)
app.component('InputNumber',InputNumber)
app.component('Breadcrumb',Breadcrumb)
app.component('Avatar',Avatar)
app.component('Divider',Divider)
app.component('Toolbar',Toolbar)
app.component('TabPanel',TabPanel)
app.component('TabView',TabView)
app.component('SelectButton',SelectButton)
app.component('Carousel',Carousel)
app.component('Tag',Tag)
app.component('Textarea',Textarea)
app.component('Steps',Steps)
app.component('DataView',DataView)
app.component('DataViewLayoutOptions',DataViewLayoutOptions)
app.component('ConfirmDialog',ConfirmDialog)
app.component('Panel',Panel)
app.component('RadioButton',RadioButton)
app.component('Paginator',Paginator)
app.component('Menu',Menu)
app.component('Badge',Badge)
app.component('SplitButton',SplitButton)
app.component('IconField',IconField)
app.component('InputIcon',InputIcon)
app.component('Sidebar',Sidebar)
app.component('Galleria',Galleria)
app.component('MegaMenu',MegaMenu)
app.component('Rating',Rating)
app.component('AutoComplete',AutoComplete)
app.component('Listbox',Listbox)
app.component('Slider',Slider)
app.component('Checkbox',Checkbox)
app.component('Dropdown',Dropdown)
app.component('ProgressSpinner',ProgressSpinner)


app.directive('styleclass', StyleClass);


app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.use(Breadcrumb);
app.use(ConfirmationService);




app.mount('#app')


