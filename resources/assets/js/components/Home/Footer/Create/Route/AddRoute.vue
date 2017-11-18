<template>
    <div>
        <el-input type="text" placeholder="Enter New Route Name" v-model="form.name"
            v-validate="'required|alpha_spaces|min:2|max:40'" data-vv-delay="1000"
            data-vv-name="name" data-vv-as="name"
            @blur="$validator.validate('name', form.name)"
            :class="errors.has('name')">
        </el-input>
        <span v-show="errors.has('name')" class="help is-danger">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {{ errors.first('name') }}
        </span>
        <el-card class="el-route-card">
            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-input type="file" id="file" v-model="form.file">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-button type="success" v-on:click="uploadFile">Upload GPS Data</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="el-route-card-custom">
            <div slot="header" class="card-header">
                <span>Or Create Custom Path</span>
            </div>
            <el-row :gutter="24">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-button size="mini" type="primary" v-on:click="userPath">Activate & Click on Map</el-button>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-button size="mini" type="danger" v-on:click="clearUserPath">Clear</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-button class="el-button-route" type="primary" v-on:click="step">Add Route</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    routeFile: '',
                    routeFileExt: '',
                    mountain: ''
                }
            }
        },
        computed: {
            /**
             * Storage File Name
             * > name of file stored in storage to be used to fill info data
             */
            fileNameStored() {
                return this.$store.state.route.uploadedFile;
            }
        },
        methods: {
            userPath() {
                this.$store.dispatch('CREATE_USER_PATH_MARKER');
            },
            clearUserPath() {
                this.$store.dispatch('CLEAR_USER_PATH_MARKERS');
            },
            /**
             * Upload File
             * > get file name
             * > extract file extension
             * > on input file change create new Form Data
             * > append file data to data variable
             * > set file data to depending on file extension
             */
            uploadFile(file) {
                var fileName = document.getElementById('file').value;
                var fileExe = fileName.split('.').pop();

                let data = new FormData();
                data.append('file', document.getElementById('file').files[0]);

                if(fileExe == 'kml') {
                    this.$store.dispatch('FILE_KML', data);
                } else if(fileExe == 'gpx') {
                    this.$store.dispatch('FILE_GPX', data);
                } else {
                    alert('Unknown file extension');
                }
            },
            step() {
                /**
                 * Send objects with array
                 */
                this.$validator.validateAll()
                    .then((result) => {
                        if(result) {
                            /**
                             * Setup mountain_id & append it to info selected
                             */
                            var mountain_id = this.$store.state.mountain.mountain_id;
                            this.form.mountain = mountain_id;

                            /**
                             * Send Data
                             * > set routeFile to stored file name
                             * > set routeFileExt to stored file name extension
                             * > send data
                             */
                            this.form.routeFile = this.fileNameStored.fileStored;
                            this.form.routeFileExt = this.fileNameStored.fileStoredExt;
                            this.$emit('step', this.form);
                        }
                    });
            }
        }
    }
</script>