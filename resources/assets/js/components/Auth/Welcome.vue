<template>
    <div>
        <!-- ****** WELCOME PAGE ****** -->
        <app-header></app-header>
        <el-main>
            <!-- carousel - app statements -->
            <el-row class="row-bg">
                <el-col :span="24" class="el-carousel-auth">
                    <el-carousel :interval="4000" type="card" height="400px">
                        <el-carousel-item v-for="message in messages" :key="message">
                            <div class="e-carousel-text">
                                <p class="e-carousel-p">{{ message }}</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
            <!-- /.carousel -->
        </el-main>
        <app-footer></app-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                messages: [
                    'Mountain Orientation for Tour Guides',
                    'Web Mapping Service for your Needs',
                    'Detailed Route Information'
                ]
            }
        }
    }
</script>