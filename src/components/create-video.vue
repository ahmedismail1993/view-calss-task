/* eslint-disable no-console */ /* eslint-disable no-console */ /*
eslint-disable no-console */
<template>
  <b-container>
    <b-row>
      <b-col cols="8" class="mx-auto">
        <b-card>
          <template v-slot:header>
            <h4 class="mb-0">Create Video</h4>
          </template>
          <b-card>
            <h4 class="mb-0 form-title">Create new Video</h4>

            <b-card-body>
              <formWrapper :validator="$v.form">
                <b-form>
                  <b-col cols="12">
                    <form-group name="title">
                      <template slot-scope="{ attrs, listeners }">
                        <b-form-input
                          id="title"
                          v-model="form.title"
                          v-bind="attrs"
                          v-on="listeners"
                        ></b-form-input>
                      </template>
                    </form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-checkbox
                      id="checkbox-1"
                      class="mb-2"
                      v-model="form.can_students_download"
                    >
                      can Students Download
                    </b-form-checkbox>
                  </b-col>
                  <b-col cols="12">
                    <form-group name="descriptions">
                      <template slot-scope="{ attrs, listeners }">
                        <b-form-textarea
                          v-bind="attrs"
                          v-on="listeners"
                          id="textarea"
                          v-model="form.descriptions"
                          rows="6"
                        ></b-form-textarea>
                      </template>
                    </form-group>
                  </b-col>
                  <transition-group name="fade" mode="out-in">
                    <b-col key="1" cols="12" v-if="showUrlInput">
                      <form-group name="video_url">
                        <template slot-scope="{ attrs, listeners }">
                          <b-form-input
                            id="video_url"
                            v-model="form.video_url"
                            v-bind="attrs"
                            v-on="listeners"
                          ></b-form-input>
                        </template>
                      </form-group>
                    </b-col>
                    <b-col v-if="showUploadFile" key="2" cols="12" class="mb-5">
                      <b-form-file
                        v-model="form.video_file"
                        accept="video/mp4,video/x-m4v,video/*"
                      ></b-form-file
                    ></b-col>
                  </transition-group>
                  <b-col cols="12">
                    <b-list-group horizontal>
                      <b-list-group-item
                        v-for="(item, index) in listItems"
                        :key="index"
                        :style="{ 'background-color': item.color }"
                        class="mx-2"
                        :title="item.name"
                        @click="handleAddVideoUrl(item)"
                      >
                        <b-img
                          fluid
                          :src="require(`@/assets/imgs/${item.name}.png`)"
                        ></b-img>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                  <b-col cols="12" class="mt-5">
                    <form-group name="publish_date">
                      <template slot-scope="{ attrs, listeners }">
                        <datepicker
                          :format="customFormatter"
                          v-bind="attrs"
                          v-on="listeners"
                          class="date-picker"
                          v-model="form.publish_date"
                          name="uniquename"
                        ></datepicker>
                      </template>
                    </form-group>
                  </b-col>
                  <b-col cols="12">
                    <form-group name="preparations">
                      <template slot-scope="{ attrs, listeners }">
                        <b-form-select
                          v-bind="attrs"
                          v-on="listeners"
                          v-model.number="form.preparation_id"
                          :options="PreparationsList"
                        ></b-form-select>
                      </template>
                    </form-group>
                  </b-col>
                  <b-col cols="12">
                    <label for="tags">Tags</label>

                    <b-form-tags
                      id="tags"
                      v-model="form.tags"
                      class="mb-2"
                    ></b-form-tags>
                  </b-col>
                  <h2 class="label my-2">sharing contents</h2>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        id="checkbox-2"
                        class="mb-2"
                        v-model="form.publish_on_timeline"
                      >
                        publish on my timeline
                      </b-form-checkbox>
                    </b-col>

                    <b-col cols="6">
                      <label for="publish_in" class="label"
                        >Publish it in</label
                      >
                      <b-form-select
                        id="publish_in"
                        v-model="form.publish_in"
                        :options="publishOtions"
                      ></b-form-select>
                    </b-col>
                    <b-col cols="6"></b-col>
                    <b-col cols="6" class="my-2">
                      <label for="publish_in_special_lib" class="label"
                        >Publish it in special libraries</label
                      >
                      <b-form-select
                        id="publish_in_special_lib"
                        v-model="form.publish_custom_library"
                        :options="publishInSpecial"
                      ></b-form-select>
                    </b-col>
                  </b-row>
                  <h2 class="label">Share Conetent With Students</h2>
                  <small class="label"
                    >*must selected at least on section</small
                  >
                  <b-col>
                    <b-form-group>
                      <b-form-checkbox-group
                        v-model="form.classes"
                        :options="studentsClasses"
                        name="flavour-2a"
                        stacked
                      ></b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                </b-form>
              </formWrapper>
            </b-card-body>
          </b-card>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import Datepicker from "vuejs-datepicker";
import { StoreData, IndexData } from "@/api/apiMethods.js";
import moment from "moment";
export default {
  name: "CreateVideo",
  components: {
    Datepicker
  },
  data() {
    return {
      form: {
        title: "",
        descriptions: "",
        video_url: "",
        can_students_download: false,
        publish_on_timeline: false,
        video_type: "",
        publish_date: "",
        video_file: null,
        preparation_id: "",
        tags: [],
        publish_in: "",
        publish_custom_library: []
      },
      PreparationsList: [],
      publishInSpecial: [],
      studentsClasses: [],
      publishOtions: ["public library", "Schools", "nothing"],
      listItems: [
        { name: "upload", color: "#404040c2" },
        { name: "vemo", color: "#5dc6f8" },
        { name: "youtube", color: "#ec4031" }
      ],
      showUrlInput: false,
      showUploadFile: false
    };
  },
  created() {
    this.handleGetData("preparing.list", "PreparationsList", "subject_id");
    this.handleGetData("class.students.list", "studentsClasses", "class_id");
    this.handleGetPublishIn();
  },
  methods: {
    async handleGetData(endPoint, selectedField, dataBody) {
      try {
        const res = await StoreData(endPoint, { [dataBody]: 1 });
        this[selectedField] = res.data[1];
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async handleGetPublishIn() {
      try {
        const res = await IndexData("custom-libraries.list", { subject_id: 1 });
        this.publishInSpecial = res.data[1];
        // eslint-disable-next-line no-console
        console.log(res);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    customFormatter(date) {
      return moment(date).format("Do MMMM YYYY, h:mm:ss a");
    },
    handleAddVideoUrl({ name }) {
      // eslint-disable-next-line no-console
      console.log(name);
      if (name !== "upload") {
        this.showUrlInput = true;
        this.form.video_type = name;
      } else {
        this.showUploadFile = true;
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255)
      },
      descriptions: {
        maxLength: maxLength(1000)
      },
      video_url: {
        url
      },
      publish_date: {
        required
      }
    }
  }
};
</script>

<style>
.form-title {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
label,
legend,
.label {
  color: darkblue;
  font-weight: bold;
}
.list-group-item {
  border: none;
  width: 300px;
  height: 100px;
  cursor: pointer;
}
img {
  display: block;
  width: 100%;
  height: 100% !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.date-picker input {
  width: 100% !important;
}
</style>
