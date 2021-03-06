import Vue from "vue";
import Vuelidate from "vuelidate";
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import FormGroup from "@/components/FormGroup";
import { messages } from "@/lang";

Vue.use(Vuelidate);
Vue.use(vuelidateErrorExtractor, {
  messages,
  i18n: "validation"
});

Vue.component("FormGroup", FormGroup);
Vue.component("formWrapper", templates.FormWrapper);
