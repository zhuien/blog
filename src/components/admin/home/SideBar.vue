<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <!-- <tree-menu :items="items"></tree-menu> -->
            <!-- <TreeMenu :items="items"></TreeMenu> -->
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children" :index="subItem.url" :key="subItem.url">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.url">
                                    {{ threeItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.url" :key="subItem.url">
                                {{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {MY_URL} from '../../../config'
    import { treeDataTranslate } from '../../../utils';
    // import TreeMenu from './TreeMenu';
    import bus from './bus';
    export default {
        components: {
            // TreeMenu
        },
        data() {
            return {
                menuUrl: MY_URL + '/api/getMenuList',
                collapse: false,
                items: []
            }
        },
        methods: {
            getMenu () {
                this.axios.post(this.menuUrl)
                    .then((res) => {
                        this.items = treeDataTranslate(res.data)
                        // this.items = res.data
                        console.log(res.data)
                        console.log(this.items)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created () {
            this.getMenu()
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>